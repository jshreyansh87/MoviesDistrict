import requestHandler from '../handlers/request.handler.js';
import express from 'express';
import { body } from 'express-validator';
import reviewController from '../controllers/review.controller.js';
import tokenMiddleware from '../middlewares/token.middleware.js';

const router = express.Router({ mergeParams: true });

router.get(
    "/",
    tokenMiddleware.auth,
    reviewController.getReviewOfUser
);

router.post(
    "/",
    tokenMiddleware.auth,
    body("mediaId")
        .exists().withMessage("Media Id is required")
        .isLength({ min: 1 }).withMessage("Media Id cannot be empty"),
    body("content")
        .exists().withMessage("Content is required")
        .isLength({ min: 1 }).withMessage("Content cannot be empty"),
    body("mediaType")
        .exists().withMessage("Media Type is required")
        .custom(type => ["movie", "tv"].includes(type)).withMessage("Media Type is invalid"),
    body("mediaTitle")
        .exists().withMessage("Media Title is required"),
    body("mediaPoster")
        .exists().withMessage("Media Poster is required"),
    requestHandler.validate,
    reviewController.create
);

export default router;
