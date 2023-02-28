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
    body("username")
        .exists().withMessage("Username is required")
        .isLength({ min: 8 }).withMessage("Username must have minimum 8 characters")
        .custom(async value => {
            const user = await userModel.findOne({ username: value });

            if (user) {
                return Promise.reject("Username already used");
            }
        }),
    body("password")
        .exists().withMessage("Password is required")
        .isLength({ min: 8 }).withMessage("Password must have minimum 8 characters"),
    body("confirmPassword")
        .exists().withMessage("Confirm Password is required")
        .isLength({ min: 8 }).withMessage("Confirm Password must have minimum 8 characters")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Confirm Password not match");
            }
            return true;
        }),
    body("displayName")
        .exists().withMessage("Display Name is required")
        .isLength({ min: 8 }).withMessage("Display Name must have minimum 8 characters"),
    requestHandler.validate,
    userController.signup
);

router.post(
    "/signin",
    body("username").isLength({ min: 8 })
        .exists().withMessage("Username is required")
        .withMessage("Username must have minimum 8 characters"),
    body("password").isLength({ min: 8 })
        .exists().withMessage("Password is required")
        .withMessage("Password must have minimum 8 characters"),
    requestHandler.validate,
    userController.signin
);

router.put(
    "/update-password",
    tokenMiddleware.auth,
    body("password")
        .exists().withMessage("Password is required")
        .isLength({ min: 8 }).withMessage("Password must have minimum 8 characters"),
    body("newPassword")
        .exists().withMessage("New Password is required")
        .isLength({ min: 8 }).withMessage("New Password must have minimum 8 characters"),
    body("confirmPassword")
        .exists().withMessage("Confirm Password is required")
        .isLength({ min: 8 }).withMessage("Confirm Password must have minimum 8 characters")
        .custom((value, { req }) => {
            if (value !== req.body.newPassword) {
                throw new Error("Confirm Password not match");
            }
            return true;
        }),
    requestHandler.validate,
    userController.updatePassword
);

router.get(
    "/info",
    tokenMiddleware.auth,
    userController.getInfo
);

export default router;
