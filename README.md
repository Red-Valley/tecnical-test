# Tecnical test

## Prerequisites

- `npm 8.x`
- `node 16.x`
- `docker` - optional if you don't want to use the [Quick Start](#quick-start)

## Before start

Before you can start to test/check this project, you might want to generate a couple of environment files, one for root folder called `'.env'` and the other one inside `frontend` folder with the same name (`'.env'`).

You can copy `.env.example` file content and paste it in your root folder **.env** file, then, you can do the same with the `env.example` content file inside `frontend` folder and paste in the **.env** file inside that folder.

PD: You have to provide your own values of each **.env** key

## Installation

### Root dependencies

Install the **Root dependencies** (which are the backend dependencies) using `$ npm install`.

### Frontend/React dependencies

Move to `frontend` folder and install the **Frontend/React dependencies** using `$ npm install`.

## Running locally

If you want to run this project locally, you need to do, first, in the root folder, run `$ npm start` to start the server, then, move to `frontend` folder and run `$ npm start`.

Those commands will start the server and client apps respectively.

## Quick Start

In order to run this project (without running the commands above), you can run `$ npm start:dev` in the project root folder. This will start the **server** at http://localhost:8000, **client** at http://localhost:3000, **mongo-express** at http://localhost:8081 (to manage your database) and **mongodb** services.

### Note

If you use the **Quick Start** option, you have to set the following values inside each **.env** file too:

#### root _.env_ file:

```sh
...other keys
#mongo
DB_URL=mongodb://<custom_username>:<custom_password>@mongodb:27017
DB_NAME=<custom_db_name>
MONGO_ADMINDB=admin
MONGO_INITDB_ROOT_USERNAME=<custom_username>
MONGO_INITDB_ROOT_PASSWORD=<custom_password>

#mongo-express*
ME_CONFIG_MONGODB_ADMINUSERNAME=<custom_username>
ME_CONFIG_MONGODB_ADMINPASSWORD=<custom_password>
ME_CONFIG_MONGODB_SERVER=mongodb
ME_CONFIG_MONGODB_ENABLE_ADMIN=true
...
```

#### _./frontend/.env_ file:

```sh
...other keys
REACT_APP_BASE_URL=http://localhost:8000
...other keys
```

## Testing

You can run the server **test suites** executing `$ npm run test`.
