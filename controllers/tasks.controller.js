import {
    getTasks,
    countTasks,
    createOneTask,
    deleteOneTask,
    findTaskById,
    updateOneTask, sortTaskByTitle,
} from "../services/tasks.service.js";
import { v4 as uuidv4 } from 'uuid';

/**
 * @async
 * @description create Task
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 */
export const createTask =  (req, res) => {
    try {
        const { title, description } = req.body;
        const createdAt = new Date();
        const updatedAt = new Date();
        const id =  uuidv4()
        const task = { id, title, description, createdAt, updatedAt };
        const tasksCount =  createOneTask(task);
        return res
            .status(201)
            .json({ message: "Task created successfully", data: task, tasksCount });
    } catch (error) {
        return res.status(500).json({ message: `error ${error}` });
    }
};

/**
 * @async
 * @description update Task by id
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 */
export const updateTask =  (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const updatedAt = new Date();
        const oldTask =  findTaskById(id);
        if(!oldTask) return res.status(404).json({ message: "Task not found" });
        const task =  updateOneTask(id, { title, description, updatedAt });
        return res
            .status(200)
            .json({ message: "Task updated successfully", data: task });
    } catch (error) {
        return res.status(500).json({ message: `error ${error}` });
    }
};

/**
 * @async
 * @description delete Task by id
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 */
export const deleteTask =  (req, res) => {
    try {
        const { id } = req.params;
        const Task =  findTaskById(id);
        // check if the Task exists
        if(!Task) return res.status(404).json({ message: "Task not found" });
        const isDeleted =  deleteOneTask(id);
        console.log("isDeleted: ",isDeleted)
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: `error ${error}` });
    }
};

/**
 * @async
 * @description get Task and make checking record
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 */
export const getTask =  (req, res) => {
    try {
        const { id } = req.params;
        const task =  findTaskById(id);
        if(!task) return res.status(404).json({ message: "Task not found" });
        return res
            .status(200)
            .json({message: "success", task });
    } catch (error) {
        return res.status(500).json({ message: `error ${error}` });
    }
};

/**
 * @async
 * @description list all Tasks
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 */
export const listTasks =  (req, res) => {
    try {
        const { page = 1, count = 10, sort="title" } = req.query;
        const offset = (parseInt(page) - 1) * parseInt(count);

        let tasks =  getTasks(offset, count);
        const tasksCount =  countTasks();
        const sortedTasks = sortTaskByTitle(tasks);

        return res.status(200).json({ data: sortedTasks ?? tasks, total: tasksCount, page });
    } catch (error) {
        return res.status(500).json({ message: `Error: ${error}` });
    }
};

