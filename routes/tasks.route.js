import express from 'express';

import {createTask, deleteTask, getTask, listTasks, updateTask} from '../controllers/tasks.controller.js';
import {createTaskValidator, deleteTaskValidator, updateTaskValidator} from '../validators/task.validator.js';

const router = express.Router();


router.route("/")
    .get(listTasks)
    .post(createTaskValidator, createTask)

router.route("/:id")
    .get(getTask)
    .delete(deleteTaskValidator, deleteTask)
    .put(updateTaskValidator, updateTask)

export default router;