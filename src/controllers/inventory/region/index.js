import grpcClient from '@lib/grpc-client';
import logger from '@lib/logger';

const createRegion = async (params) => {
    let inventoryV1 = await grpcClient.get('inventory', 'v1');
    let response = await inventoryV1.Region.create(params);

    return response;
};

const updateRegion = async (params) => {
    let inventoryV1 = await grpcClient.get('inventory', 'v1');
    let response = await inventoryV1.Region.update(params);

    return response;
};

const deleteRegion = async (params) => {
    let inventoryV1 = await grpcClient.get('inventory', 'v1');
    let response = await inventoryV1.Region.delete(params);

    return response;
};

const getRegion = async (params) => {
    let inventoryV1 = await grpcClient.get('inventory', 'v1');
    let response = await inventoryV1.Region.get(params);

    return response;
};

const listRegions = async (params) => {
    let inventoryV1 = await grpcClient.get('inventory', 'v1');
    let response = await inventoryV1.Region.list(params);

    return response;
};

const statRegions = async (params) => {
    let inventoryV1 = await grpcClient.get('inventory', 'v1');
    let response = await inventoryV1.Region.stat(params);

    return response;
};

export {
    createRegion,
    updateRegion,
    deleteRegion,
    getRegion,
    listRegions,
    statRegions
};
