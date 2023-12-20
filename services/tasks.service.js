import {tasks} from "../database/storage.js";

/**
 * @description get Tasks
 * @param  {int} offset - pagination offset
 * @param  {int} count - pagination limit
 */
export const getTasks =   (offset, count)=>{
    if (offset < 0 || count < 0) return [];
    if (tasks.length < offset) return [];
    if (tasks.length < count) return tasks;
    return tasks.slice(offset, offset + count);
}

/**
 * @description count Tasks 
 */
export const countTasks =   ()=>{
    return tasks.length;
}

/**
 * @description get Task
 * @param  {int} id - Task ID
 */
export const findTaskById =   (id)=>{
    return tasks.find((task) => task.id === id);
}

/**
 * @description get Tasks
 * @param  {Object} data - Task data
 */
export const createOneTask =   (data)=>{
    const task = tasks.push(data);
    return task;
}

/**
 * @description get Tasks
 * @param  {int} id - Task id
 * @param  {Object} data - Task data
 */
export const updateOneTask =   (id, data)=>{
    const task = tasks.find((task) => task.id === id);
    if(task){
        tasks.forEach((task) => {
            if (task.id === id) {
                task.title = data.title;
                task.description = data.description;
                task.updatedAt = data.updatedAt;
            }
        });
    }
    return task;
}

/**
 * @description get Tasks
 * @param  {int} id - Task id
 */
export const deleteOneTask = (id)=>{
    const task = tasks.find((task) => task.id === id);
    if(task){
        console.log("index of task: ",tasks.indexOf(task))
        tasks.forEach((task) => {
            if (task.id === id) {
                console.log("index of task: ",tasks.indexOf(task))
                tasks.splice(tasks.indexOf(task), 1);
                console.log("Fucken DELETED!!!")
                return true;
            }
        });
    }
    return false;
}

export const sortTaskByTitle = (tasks) =>{
    tasks.sort((a, b) => {
        const titleA = a.title.toUpperCase(); // Convert to uppercase for case-insensitive comparison
        const titleB = b.title.toUpperCase(); // Convert to uppercase for case-insensitive comparison

        if (titleA < titleB) {
            return -1;
        }
        if (titleA > titleB) {
            return 1;
        }
        return 0; // titles are equal
    });

    return tasks;
}