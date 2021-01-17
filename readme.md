# Phone book system

This is a small system that allows a user to create, update, delete , and list phone contacts

## pre requisite

- docker
- docker-compose
- node.js

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

`will fill later after implementation`

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

