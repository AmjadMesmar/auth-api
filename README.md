# auth-api

## About

The server has two api versions:

Version 1 :

Consists of 2 routes, food and clothes with CRUD operations and Mongoose Database.

Version 2:

The server will allow users to sign up and sign in using basic authentication and bearer authentication, RBAC rules are applied on the users.The users have different CRUD permissions depends on their roles in the Mongoose Database.

<hr>

## Author

#### Amjad Mesmar

<hr>

## Links

- [Repo](https://github.com/AmjadMesmar/auth-api)

- [Submission Pull Request](https://github.com/AmjadMesmar/auth-api/pull/2)

- [Deployed App](https://souls-auth-api.herokuapp.com)

- [Action Report](https://github.com/AmjadMesmar/auth-api/actions)

<hr>

## Setup

1. ***(.env)*** file:

```

PORT=5000
MONGODB_URI=mongodb+srv://souls:55555@cluster0.upvew.mongodb.net/auth-api
MONGOOSE_TEST_URI=mongodb+srv://souls:55555@cluster0.upvew.mongodb.net/auth-api-test
SECRET=55555


```

2. Install the following dependencies

```

"dependencies": {
    "@code-fellows/supergoose": "^1.1.0",
    "base-64": "^1.0.0",
    "bcrypt": "^5.0.1",
    "cors": "^2.8.5",
    "dotenv": "^10.0.0",
    "eslint": "^7.27.0",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.12.11",
    "morgan": "^1.10.0",
    "multer": "^1.4.2",
    "supergoose": "^0.2.6"
  },
  "devDependencies": {
    "jest": "^27.0.1",
    "supertest": "^6.1.3"
  }
```

<br>

## Running the app

1. clone the repo.
2. Enter the command `npm start`
3. Use endpoints :

<br>

## API V1

### `*/api/v1/food`

- **Method**: get, post, put, delete
- **Response Body**: JSON
- ***calories should be a number only***
- ***type should be only FRUIT,VEGETABLE or PROTIEN, it will also return all in uppercase.***

```
{
    "_id": "60aed7758b6ab734c5f2bcec",
    "name": "apple",
    "calories": 50,
    "type": "FRUIT",
    "__v": 0
}

```

### `*/api/v1/clothes`

- **Method**: get, post, put, delete
- **Response Body**: JSON
- ***All keys are string***

```
{
    "_id": "60aed8698b6ab734c5f2bced",
    "name": "T-shirt",
    "color": "red",
    "size": "xl",
    "__v": 0
}

```

## API V2

## signup

### `*/signup`

<br>

- **Method**: post
- ***Basic Authentication sign up and will give token***
- ***Role should be: admin, editor, writer or user, if not filled the difault will always be user**
- **Response Body**: JSON

```

{
    "user": {
        "role": "admin",
        "_id": "60aed8d48b6ab734c5f2bcee",
        "username": "Ainz-Sama",
        "password": "$2b$10$M1KGjJQLzXfb.oKqExkVR.cErQTv2oI2aVJHws2b1lk3zbNdMqmha",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFpbnotU2FtYSIsImlhdCI6MTYyMjA3MTUwOX0.iSnqB9akQgdKJUD1HLEB55kb4iw2z3BaeLeAxVLrKm4"
}


```

## Signin

### `*/signin`

<br>

- **Method**: POST
- ***Basic Authentication Login***
- ***With user name and password**
- **Response Body**: JSON


```

{
    "user": {
        "role": "admin",
        "_id": "60aed8d48b6ab734c5f2bcee",
        "username": "Ainz-Sama",
        "password": "$2b$10$M1KGjJQLzXfb.oKqExkVR.cErQTv2oI2aVJHws2b1lk3zbNdMqmha",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFpbnotU2FtYSIsImlhdCI6MTYyMjA3MTk0NX0.oV6CQFwUGonHZ_EZcYuSjk-hF65JVpC_6uE_Z3aMi-I"
}

```

<br>

## secret

### `*/api/v2/secret`

<br>

- **Method**: get
- ***Sign in using bearer authentication using token and secret***
- **Response Body**: Text


```

Welcome to the secret area, Ainz-Sama !

```

<br>

## Users

### `*/api/v2/users`

<br>

- **Method**: get
- ***Will use the user's token with bearer authentication***
- ***Will return all users in the database, this only works for admins since the user must have delete permission***
- **Response Body**: Array


```

[
    "ainz",
    "emran",
    "ainz-sama",
    "melon",
    "Ainz-Sama"
]
```

<br>

## Read

### `*/api/v2/user`

<br>

- **Method**: get
- ***Will use the user's token with bearer authentication***
- ***Will return the user's from database, this works for all users since it's for read permission.***
- **Response Body**: JSON


```

{
    "user": {
        "role": "admin",
        "_id": "60aed8d48b6ab734c5f2bcee",
        "username": "Ainz-Sama",
        "password": "$2b$10$M1KGjJQLzXfb.oKqExkVR.cErQTv2oI2aVJHws2b1lk3zbNdMqmha",
        "__v": 0
    }
}
```

## Create

### `*/api/v2/create`

<br>

- **Method**: post
- ***Will use the user's token with bearer authentication***
- ***Will return a text if user have permission to create.***
- **Response Body**: TEXT

```

Hey Ainz-Sama, You can create something!!

```

<br>

## Update

### `*/api/v2/update`

<br>

- **Method**: put
- ***Will use the user's token with bearer authentication***
- ***Will return a text if user have permission to update.***
- **Response Body**: TEXT

```

Hey Ainz-Sama, You can update something!!

```

<br>

## Patch

### `*/api/v2/patch`

<br>

- **Method**: patch
- ***Will use the user's token with bearer authentication***
- ***Will return a text if user have permission to update.***
- **Response Body**: TEXT

```

Hey Ainz-Sama, You can patch something!!
```

<br>

## Delete

### `*/api/v2/delete`

<br>

- **Method**: delete
- ***Will use the user's token with bearer authentication***
- ***Will return a text if user have permission to delete.***
- **Response Body**: TEXT

```

Hey Ainz-Sama, You can delete something!!

```

<br>

## What happens If user does not have a permission?

<br>

- **Method**: any except read ('*/api/v1/user') since its for all users.
- ***Will use the user's token with bearer authentication***
- **Response Body**:JSON

```

{
    "error": "Access Denied"
}
```

<br>


4. Test:

- To test the server write in terminal:

```
npm test
```

<br><br><br>

<hr>

<br><br>

## UML Diagram

![Uml diagram](Auth-Api-Uml.png)
