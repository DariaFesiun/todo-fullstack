# Todo Backend API

Simple RESTful API for a Todo app using Node.js and Express.

## Available Scripts

### `npm start`

Runs the server on `http://localhost:4000`

## Endpoints
- `GET /tasks` — get all tasks
- `POST /tasks` — add new task (requires `{ title }` in body)
- `PATCH /tasks/:id` — update task by ID
- `DELETE /tasks/:id` — delete task by ID

## Frontend
The application is compatible with a React frontend that uses this API for task management.