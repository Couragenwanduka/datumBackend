import express from 'express';
const teirRouter = express.Router();
import { createTierController } from '../controllers/tier.controller.js';
import { getAllTiersController } from '../controllers/tier.controller.js';
import { validator } from '../middlewares/validator.middleware.js';
import { teirSchema } from '../schema/teir.joi.js';

// Create a new tier
teirRouter.post('/tier', [validator(teirSchema)],createTierController);

// Get all tiers
teirRouter.get('/tier', getAllTiersController);

export default teirRouter;

