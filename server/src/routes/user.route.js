import requestHandler from '../handlers/request.handler.js';
import express from 'express';
import { body } from 'express-validator';
import favoriteController from '../controllers/favorite.controller.js';
import userController from '../controllers/user.controller.js';
import userModel from '../models/user.model.js';
import tokenMiddleware from '../middlewares/token.middleware.js';

const router = express.Router();

router.post(
    "/signup",
    body("username").isLength({ min: 8 }).withMessage("Username must have minimum 8 characters")
        .custom(async value => {
            const user = await userModel.findOne({ username: value });

            if (user) {
                return Promise.reject("Username already used");
            }
        }),
    body("password").isLength({ min: 8 }).withMessage("Password must have minimum 8 characters"),
    body("confirmPassword").isLength({ min: 8 }).withMessage("Confirm Password must have minimum 8 characters")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Confirm Password not match");
            }
            return true;
        }),
    body("displayName").isLength({ min: 8 }).withMessage("Display Name must have minimum 8 characters"),
    requestHandler.validate,
    userController.signup
);

export default router;