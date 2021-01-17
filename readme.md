# Phone book system

This is a small system that allows a user to create, update, delete , and list phone contacts

## pre requisite

- docker
- docker-compose
- node.js

## configure

take a copy from .env.example and rename .env
example .env

```
MONGO_HOST=127.0.0.1
MONGO_PORT=27017
MONGO_DB_NAME=phoneBookDB
MONGO_INITDB_ROOT_USERNAME=phoneBookUser
MONGO_INITDB_ROOT_PASSWORD=supersecretpassword
NODE_ENV=development
```

## Installation

for ease you can use docker to run get up and running with everything
just use the below command.
NOTE: make sure you are on the root project

```
docker-compose up -d
```

This will open a mongo instance , and a node instance in which it will be on `http://localhost:3000`

## Testing 

to be able to run the tests you will also use docker.

first run the build command to build the container for the test stage

```
docker build --target test -t phone-book .
```

then run the command of which runs this docker container we have just built.

```
docker run phone-book
```

this will run the container and then run the tests and then it will exit.

## API documentation

```
POST /contact
```
this is the create api
body should look like this 

```
{
    "name": "Abdallah gamal1  ",
    "phoneNumbers": {
        "home":"01100894094"
    },
    "email": "abdoolly@gmail.com",
    "mailingAddress": "This is my mailingAddress"
}
```

response will be something like this

```
{
    "_id": "60041e8764fb91a83b956620",
    "name": "Abdallah gamal1",
    "phoneNumbers": {
        "home": "01100894094"
    },
    "email": "abdoolly@gmail.com",
    "mailingAddress": "This is my mailingAddress",
    "__v": 0
}
```

------------------------------------

```
PATCH /contact/:contactId
```

This is the update api.

**NOTE all field in update are optional so, you can send one field**
```
{
    "name": "Abdallah gamal1",
    "phoneNumbers": {
        "home": "01100894094"
    },
    "email": "abdoolly@gmail.com",
    "mailingAddress": "This is my mailingAddress"
}
```

response is like 
same object with the updated values
```
{
    "_id": "60041e8764fb91a83b956620",
    "name": "Abdallah gamal1",
    "phoneNumbers": {
        "home": "01100894094"
    },
    "email": "abdoolly@gmail.com",
    "mailingAddress": "This is my mailingAddress",
    "__v": 0
}
```

-----------------------------------------

```
GET /contacts
```

Api to get many contacts

page: is the page number
perPage: is how many items in a single page

```
/contacts?page=1&perPage=10
```

response would be like

it will give the pages information
all data sorted by name
```
{
    "contacts": [
        {
            "_id": "60041e7964fb91a83b95661e",
            "name": "Abdallah gamal",
            "phoneNumbers": {
                "home": "01100894094"
            },
            "email": "abdoolly@gmail.com",
            "mailingAddress": "This is my mailingAddress",
            "__v": 0
        },
        {
            "_id": "60041e8464fb91a83b95661f",
            "name": "Abdallah gamal  123",
            "phoneNumbers": {
                "home": "01100894094"
            },
            "email": "abdoolly@gmail.com",
            "mailingAddress": "This is my mailingAddress",
            "__v": 0
        },
        {
            "_id": "60041e8764fb91a83b956620",
            "name": "Abdallah gamal1",
            "phoneNumbers": {
                "home": "01100894094"
            },
            "email": "abdoolly@gmail.com",
            "mailingAddress": "This is my mailingAddress",
            "__v": 0
        }
    ],
    "totalPages": 2,
    "nextPage": 2,
    "prevPage": null
}
```

----------------------------------------------

```
DELETE /contact/:contactId
```
this deletes a contact

```
/contact/6004160ecc162e9c9632f3d7
```

response

```
{
    message: 'deleted successfully'
}
```

## Boilerplate description

In this project I have started with a basic boiler plate which you can see in the first commit [here](https://github.com/abdoolly/phonebook/commit/8554f454b4a87e64e3d8cb8c8866ae27ca3e4c6e).
- This is basically a simple starting point in which it has a database connection in `config/database.js` also it handles making an in memory database for mongo.
- it has a docker-compose file to run a mongo instance
- and a docker file to run the node instance with two stages test and run.
- the app.js has some security middlewares like helmet and cors.
- also the app.js has a global error handler using a library called [express-async-errors](https://www.npmjs.com/package/express-async-errors)
- it's also configured to use Jest
- in testing folder there is just one folder which is a test utility that has a function which allow the tests to wait for the in memory database to initialize.

## Technical talk

### What technologies I used and why

here I will explain which technologies I used and why I used them.

### Express js
Express framework very easy and if I am in a team people would always know it.

#### MongoDB
For database choice I have used mongodb as I see it as a very suitable database for the type of data we are using in this sytem specially the part where may need to input multiple phones in the contact in sql databases this is bit complex in which we have to make multiple tables but,in mongo we can just do that easily in one document.

### Mongoose 
I choose mongoose as the ODM as it’s very simple and popular .Also, if I am in a team most people would be familiar with it.

### Jest
I have also used jest in testing as it’s one of the best tools also it have spies and mocks built in it.

## Things I would have made if I have more time 

- better documentation specially in the APIs part.
- If the system will receive alot of requests I can make multiple instances and put a load balancer instance count will depend on a performance test and according to the expected number of incoming requests.
- I would have used Oauth in authentication
- I would have used redis to save the API tokens for faster retrieval
- I definitely would have made much much more detailed tests as I have added tests for success scenarios only.



