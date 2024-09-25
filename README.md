# Distributed Task Scheduler 📦

This is a simple **Distributed Task Scheduler API** that allows you to create and manage tasks in a distributed system using MongoDB as the database, Node.js as the backend, and Docker/Kubernetes for scalability. The project is containerized using Docker and supports deployment in Kubernetes clusters.

## Features:
- Create new tasks.
- Fetch all tasks.
- Scale horizontally with Kubernetes.
- MongoDB as the persistent data store.
  

## Prerequisites:

- **Docker** and **Docker Compose**
- **Node.js** (if running without Docker)
- **MongoDB** (locally or using MongoDB Atlas)
- **kubectl** and a Kubernetes cluster (for Kubernetes deployment)

## Getting Started:

### 1. Clone the repository:
```bash
git clone https://github.com/rsubramani/distributed_task_scheduler.git
cd distributed_task_scheduler
```

### 2. Running with Docker Compose:
```bash
docker-compose up --build
```
This will run the application and MongoDB in containers. The API will be available at `http://localhost:5000`.

### 3. Running Manually (Without Docker):
1. Install dependencies:
   ```bash
   npm install
   ```
2. Set the `MONGO_URI` environment variable:
   ```bash
   export MONGO_URI=mongodb://localhost:27017/scheduler
   ```
3. Start the server:
   ```bash
   npm start
   ```
The API will be available at `http://localhost:5000`.

### 4. Deploying to Kubernetes:
1. Deploy the application to your Kubernetes cluster:
   ```bash
   kubectl apply -f kubernetes/deployment.yaml
   ```
2. Expose the service (if not already exposed):
   ```bash
   kubectl expose deployment scheduler-api --type=LoadBalancer --name=scheduler-api
   ```

## API Endpoints:

### **Create a Task**
- **Endpoint**: `POST /tasks`
- **Description**: Create a new task with a description.
- **Request**:
    ```json
    {
      "description": "Complete distributed task scheduler project"
    }
    ```
- **Response**:
    ```json
    {
      "_id": "5f50c31d9aeb8b001db4a167",
      "description": "Complete distributed task scheduler project",
      "completed": false
    }
    ```

### **Fetch All Tasks**
- **Endpoint**: `GET /tasks`
- **Description**: Retrieve all tasks.
- **Response**:
    ```json
    [
      {
        "_id": "5f50c31d9aeb8b001db4a167",
        "description": "Complete distributed task scheduler project",
        "completed": false
      }
    ]
    ```

## Running Tests:

1. To run tests, install `jest` and `supertest` as development dependencies:
   ```bash
   npm install --save-dev jest supertest
   ```
2. Run the tests using:
   ```bash
   npm test
   ```

## Tests

Tests for the API are located in the `tests/` directory. Below are some sample test cases:

### Tests for `/tasks` endpoint:

```javascript
const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const Task = require('../src/models/Task');

beforeAll(async () => {
  mongoose.connect('mongodb://localhost:27017/scheduler', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Task Scheduler API', () => {

  // Test for creating a task
  it('should create a new task', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({ description: 'Test the task creation' })
      .expect(201);

    expect(response.body.description).toBe('Test the task creation');
    expect(response.body.completed).toBe(false);
  });

  // Test for fetching all tasks
  it('should fetch all tasks', async () => {
    const response = await request(app).get('/tasks').expect(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

});
```

## Test Cases:

1. **Create a Task**
   - **Input**: `{ "description": "Test task" }`
   - **Expected Output**: Status 201, returns created task with description "Test task" and `completed: false`.

2. **Fetch All Tasks**
   - **Input**: None (GET request).
   - **Expected Output**: Status 200, returns an array of tasks.

3. **Invalid Task Creation**
   - **Input**: `{}` (no description).
   - **Expected Output**: Status 400, returns validation error.

4. **Database Connection Test**
   - **Purpose**: Ensures the application successfully connects to MongoDB on startup.

---

## Future Improvements:
- Add user authentication with JWT tokens.
- Add task prioritization and scheduling logic.
- Implement a front-end using React.
  
---

## License:
Distributed under the MIT License. See `LICENSE` for more information.
