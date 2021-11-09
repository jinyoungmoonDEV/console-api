import express from 'express';
import asyncHandler from 'express-async-handler';
import * as budgetUsage from '@controllers/cost-analysis/budget-usage';

const router = express.Router();

const controllers = [
    { url: '/list', func: budgetUsage.listBudgetUsages },
    { url: '/stat', func: budgetUsage.statBudgetUsages }
];

controllers.forEach((config) => {
    router.post(config.url, asyncHandler(async (req, res) => {
        res.json(await config.func(req.body));
    }));
});

export default router;
