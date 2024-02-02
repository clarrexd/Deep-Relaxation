# Welcome to Deep Relaxation!

The project in its current form is not a finished product and should be regarded as a POC (proof of concept).

The idea behind this project is to have a webshop and a warehouse dashboard that can communicate with each other. This is done in the backend via APIs. When a status is changed on an order in the warehouse dashboard, the user that has placed that order can see what the new status is.

The project has two backends because it was requested that PHP was used somewhere in the project.

# Requirements

This is a list of what has been used when creating this project:

- Node v20.10
- XAMPP v3.3.0
- PHP v8.2.12
- Python v3.12
- Angular 17
- Typescript v4.9.5
- NPM v10.3.0
- PIP v23.3.2
- MySQL Workbench 8.0

# Get started

- Open the XAMPP control panel and start the MySQL server.

- Create the database by running the code in the sql file in the Database folder in MySQL Workbench (or some other visual database design tool). There is already data in the database tables for test purposes, including an admin account in the users table to login to the warehouse dashboard.

After this has been done, you need to start the backend servers. Start by navigating to Deep Relaxation/Webshop/backend in your terminal and run:

```sh
pip install -r requirements.txt
```

Then,

```sh
python -m uvicorn main:app --reload
```

This will start the uvicorn server at port 8000 and install the libraries and dependencies used.

Then, navigate to Deep Relaxation/Warehouse dashboard/backend in your terminal and run:

```sh
php -S localhost:9000
```

This will start the php development server at port 9000.

To start the Angular frontends (both webshop and warehouse dashboard) you need to install the angular CLI. Run this command in your terminal:

```sh
npm install -g @angular/cli
```

Then, navigate to Deep Relaxation/Webshop/frontend in your terminal and run:

```sh
npm ci
```

Then,

```sh
ng serve
```

This will start the webshop frontend at localhost:4200 and install the necessary libraries and dependencies used.

After this has been done you want to start the warehouse dashboard frontend as well. Navigate to Deep Relaxation/Warehouse dashboard/frontend in your terminal and run:

```sh
npm ci
```

Then,

```sh
ng serve –port 5200
```

This will start the warehouse dashboard frontend at localhost:5200 and install the necessary libraries and dependencies used.
