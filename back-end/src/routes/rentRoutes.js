import express from "express";
import * as rentController from "../controllers/rentController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/', authenticateToken, rentController.getAllRents);
router.post('/', authenticateToken, rentController.createRent);
router.post('/devolution', authenticateToken, rentController.devolutionRent);
router.get('/landlord/:userId', authenticateToken, rentController.getRentsByLandlordId);
router.get('/renter/:userId', authenticateToken, rentController.getRentsByRenterId);
router.delete('/:id', authenticateToken, rentController.deleteRentByID);
router.delete('/user/:id', authenticateToken, rentController.deleteAllRentsByUserID);
router.delete('/', authenticateToken, rentController.deleteAllRentsFromAllUsers);

export default router;