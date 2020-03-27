import grpcClient from '@lib/grpc-client';
import { changeQueryKeyword } from '@lib/utils';
import logger from '@lib/logger';

const createSecret = async (params) => {
    let secretV1 = await grpcClient.get('secret', 'v1');
    let response = await secretV1.Secret.create(params);

    return response;
};

const updateSecret = async (params) => {
    let secretV1 = await grpcClient.get('secret', 'v1');
    let response = await secretV1.Secret.update(params);

    return response;
};



const deleteSecret = async (params) => {
    let secretV1 = await grpcClient.get('secret', 'v1');
    let response = await secretV1.Secret.delete(params);

    return response;
};


const getSecret = async (params) => {
    let secretV1 = await grpcClient.get('secret', 'v1');
    let response = await secretV1.Secret.get(params);

    return response;
};

const listSecrets = async (params) => {
    changeQueryKeyword(params.query, ['credential_id', 'name']);
    let secretV1 = await grpcClient.get('secret', 'v1');
    let response = await secretV1.Secret.list(params);

    return response;
};

export {
    createSecret,
    updateSecret,
    deleteSecret,
    getSecret,
    listSecrets
};