import {tasks} from "../database/storage";

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
    return tasks.find((task) => task.id === parseInt(id));
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
    const task = tasks.find((task) => task.id === parseInt(id));
    if(task){
        tasks.forEach((task) => {
            if (task.id === parseInt(id)) {
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
export const deleteOneTask =   (id)=>{
    const task = tasks.find((task) => task.id === parseInt(id));
    if(task){
        tasks.forEach((task) => {
            if (task.id === parseInt(id)) {
                tasks.splice(tasks.indexOf(task), 1);
                return true;
            }
        });
    }
    return false;
}