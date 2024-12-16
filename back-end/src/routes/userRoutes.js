import express from "express";
import * as userController from "../controllers/userController.js";
import { deleteAllBikesFromAllUsers, deleteAllBikesByLandlordID } from "../controllers/bikeController.js";
import { validateUser } from "../middlewares/validationMiddleware.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { deleteAllRentsFromAllUsers, deleteAllRentsByUserID } from "../controllers/rentController.js";

const router = express.Router();

router.post('/login', userController.loginUser);
router.post('/', validateUser, userController.createUser);

router.get('/', authenticateToken, userController.getAllUsers);
router.get('/:id', authenticateToken, userController.getUserByID);
router.get('/name/:name', authenticateToken, userController.getUserByName);
router.delete('/:id', authenticateToken, deleteAllRentsByUserID, deleteAllBikesByLandlordID, userController.deleteUserByID);
router.delete('/', authenticateToken, deleteAllRentsFromAllUsers, deleteAllBikesFromAllUsers, userController.deleteAllUsers);
router.put('/:id', authenticateToken, validateUser, userController.updateUserByID);

router.get('/', authenticateToken, userController.getAllUsers);

export default router;