import {describe, test, expect, beforeAll} from "@jest/globals";
import request from "supertest";
import {tasks} from "../../database/storage.js";
import {faker} from '@faker-js/faker';

import {app} from "../../app.js";
import {validate} from "uuid";
import {validateDate} from "../../validators/validateDate.js";

/**
*
 *  Some tests to cover the API endpoints
 *  @see https://jestjs.io/docs/api
 *
*/
function isValidateTask(task) {
    return task.hasOwnProperty('id') &&
        task.hasOwnProperty('title') &&
        task.hasOwnProperty('description') &&
        task.hasOwnProperty('createdAt') &&
        task.hasOwnProperty('updatedAt') &&
        typeof task.id === 'string' &&
        typeof task.title === 'string' &&
        typeof task.description === 'string' &&
        typeof task.createdAt === 'string' &&
        typeof task.updatedAt === 'string' &&
        validate(task.id) &&
        validateDate(task.createdAt) &&
        validateDate(task.updatedAt);
}

beforeAll(async () => {
    for (let i = 0; i < 10; i++) {
        const task = {
            id: faker.string.uuid(),
            title: faker.lorem.sentence(),
            description: faker.lorem.sentence(),
            createdAt: faker.date.past(),
            updatedAt: faker.date.past(),
        }
        tasks.push(task);
    }
});

test('should return 200 and array of task objects', async function () {
        const response = await request(app).get('/tasks');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body.data.length).toBe(tasks.length);

        for (let i = 0; i < response.body.data.length; i++) {
            expect(isValidateTask(response.body.data[i])).toBeTruthy();
        }
    }
);

test('should return 200 and object of task', async function () {
        const response = await request(app).get(`/tasks/${tasks[0].id}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('task');
        expect(isValidateTask(response.body.task)).toBeTruthy();
    }
);

test('should return 404', async function () {
        const response = await request(app).get(`/tasks/${faker.string.uuid()}`);
        expect(response.status).toBe(404);
    }
);

test('should return 201 and object of task', async function () {
        const task = {
            title: faker.lorem.sentence(),
            description: faker.lorem.sentence(),
        }
        const response = await request(app).post(`/tasks`).send(task);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('data');
        expect(isValidateTask(response.body.data)).toBeTruthy();
    }
);

test('should return 400', async function () {
        const task = {
            title: faker.lorem.sentence(),
        }
        const response = await request(app).post(`/tasks`).send(task);
        expect(response.status).toBe(400);
    }
);