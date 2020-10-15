import grpcClient from '@lib/grpc-client';
import logger from '@lib/logger';
import httpContext from 'express-http-context';
import { PowerSchedulerResourcesFactory } from '@factories/statistics/topic/power-scheduler-resources';

const getDefaultQuery = () => {
    return {
        'resource_type': 'identity.Project',
        'query': {
            'sort': {
                'name': 'total',
                'desc': true
            },
            'page': {
                'limit': 5
            },
            'aggregate': {
                'group': {
                    'keys': [
                        {
                            'key': 'project_id',
                            'name': 'project_id'
                        },
                        {
                            'key': 'name',
                            'name': 'project'
                        },
                        {
                            'key': 'project_group.project_group_id',
                            'name': 'project_group_id'
                        },
                        {
                            'key': 'project_group.name',
                            'name': 'project_group'
                        }
                    ],
                    'fields': []
                }
            }
        },
        'join': [
            {
                'keys': [
                    'project_id'
                ],
                'resource_type': 'inventory.Server',
                'query': {
                    'aggregate': {
                        'group': {
                            'keys': [
                                {
                                    'key': 'project_id',
                                    'name': 'project_id'
                                }
                            ],
                            'fields': [
                                {
                                    'name': 'servers',
                                    'operator': 'count'
                                }
                            ]
                        }
                    }
                }
            },
            {
                'keys': [
                    'project_id'
                ],
                'resource_type': 'inventory.CloudService',
                'query': {
                    'aggregate': {
                        'group': {
                            'keys': [
                                {
                                    'key': 'project_id',
                                    'name': 'project_id'
                                }
                            ],
                            'fields': [
                                {
                                    'name': 'cloud_services',
                                    'operator': 'count'
                                }
                            ]
                        }
                    }
                }
            }
        ],
        'formulas': [
            {
                'name': 'total',
                'formula': 'cloud_services + servers'
            },
            {
                'formula': 'total > 0',
                'operator': 'QUERY'
            }
        ]
    };
};

const makeRequest = (params) => {
    let requestParams = getDefaultQuery();
    // requestParams['query']['filter'].push({
    //     k: 'project_id',
    //     v: params.projects,
    //     o: 'in'
    // });

    return requestParams;
};

const powerSchedulerResources = async (params) => {
    if (!params.projects) {
        throw new Error('Required Parameter. (key = projects)');
    }

    if (httpContext.get('mock_mode')) {
        return new PowerSchedulerResourcesFactory(params.projects);
    }

    const statisticsV1 = await grpcClient.get('statistics', 'v1');
    const requestParams = makeRequest(params);
    const response = await statisticsV1.Resource.stat(requestParams);

    return response;
};

export default powerSchedulerResources;