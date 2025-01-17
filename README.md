# TaskManagementApp

## Steps to start the app

1. clone git repository
2. install dependencies: npm install
3. start JSON server (Mock API): npm run start:mock-api
- JSON server endpoints:
- http://localhost:3000/users
- http://localhost:3000/tasks
4. run Angular app: ng serve
5. login credentials (can be found on http://localhost:3000/users):
- username: admin
- password: test
- 
- username: user1
- password: test
- 
- username: user2
- password: test

## Features
- View, filter, and sort tasks.
- Create, edit, delete tasks.
- Change task status (Pending, In Progress, Completed).
- Receive notifications about assigned tasks and updated statuses.
- User login (Admin and User roles).

Notes:
- login or reload Admin page to receive notifications for status changes (if any were made)
- login or reload User page to receive notifications for new tasks assigned to current user (ex. user1)
- User can only edit and delete tasks that he created and only update statuses on tasks assigned to him
- Admin can edit and delete all tasks   
- If user is assigned a task with deadline on next day, he will receive notification every 5 seconds until status is changed to completed

## Technologies used

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.
Node: 18.20.5
Package Manager: npm 10.8.2

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.



