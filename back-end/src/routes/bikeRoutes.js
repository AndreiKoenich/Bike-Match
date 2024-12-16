import express from "express";
import * as bikeController from "../controllers/bikeController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import upload from "../config/uploadConfig.js";

const router = express.Router();

router.post('/', authenticateToken, upload, bikeController.createBike);
router.get('/', authenticateToken, bikeController.getAllBikes);
router.get('/:id', authenticateToken, bikeController.getBikeByID);
router.get('/landlord/:landlord', authenticateToken, bikeController.getBikeByLandlord);
router.get('/brand/:brand', authenticateToken, bikeController.getBikeByBrand);
router.get('/model/:model', authenticateToken, bikeController.getBikeByModel);
router.delete('/:id', authenticateToken, bikeController.deleteBikeByID);
router.delete('/', authenticateToken, bikeController.deleteAllBikes);
router.put('/:id', authenticateToken, bikeController.updateBikeByID);

export default router;