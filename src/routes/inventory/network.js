import express from 'express';
import asyncHandler from 'express-async-handler';
import * as network from '@controllers/inventory/network';
import getData from '@controllers/inventory/network/get-data';

const router = express.Router();
const controllers = [
    { url: '/create', func: network.createNetwork },
    { url: '/update', func: network.updateNetwork },
    { url: '/delete', func: network.deleteNetwork },
    { url: '/get', func: network.getNetwork },
    { url: '/list', func: network.listNetworks },
    { url: '/get-data', func: getData }
];

controllers.map((config) => {
    router.post(config.url, asyncHandler(async (req, res, next) => {
        res.json(await config.func(req.body));
    }));
});

export default router;