# Task Management System - ICloudReady-Task 
## Documentation
### 1. Implemented Features
- [x] The required CRUD operations for the task entity
- [x] Data stored in a simple in-memory database [ Array of Objects ]
- [x] API documentation using Swagger
- [x] Pagination for the list of tasks [ Bonus ]
- [x] Sorting by title [ will sort by default ] [ Bonus ]
- [x] Unit Tests [ Bonus ]

### 2. How to run the application
#### 2.1. Prerequisites
- Node.js v16 to be installed on your machine
#### 2.2. Clone the repository
```bash
git clone https://github.com/Ahmed1monm/iCloudReady-Task.git
```
#### 2.3. Install dependencies
```bash
npm install
```
#### 2.4. Run the application
```bash
npm run start
```
#### 2.5. Run the tests
```bash
npm run test
```

### 3. API Documentation
#### 3.1. Swagger
- Swagger UI: http://localhost:8000/swagger/

#### 3.2. API Endpoints
```
- GET /tasks
- post /tasks
- GET /tasks/{id}
- PUT /tasks/{id}
- DELETE /tasks/{id}
```