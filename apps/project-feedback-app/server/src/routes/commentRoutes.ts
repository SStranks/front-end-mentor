import type { Router } from 'express';

import express from 'express';

import { createComment, updateComment } from '#Controllers/commentController.js';

const commentRouter: Router = express.Router();

commentRouter.route('/').post(createComment);

commentRouter.route('/:id').patch(updateComment);

export default commentRouter;
