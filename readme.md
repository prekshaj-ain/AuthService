### Auth service

project Setup
- Clone the project on your local
- execute `npm install` on the same path of root directory of the downloaded project
- create the  `.env` file in your root directory and create the fllowing variables
    -   `PORT = 3001`
    -   `JWT_SECRET = <YOUR_SECRET_TOKEN>`
- Inside the src/config folder create a new file config.json and then add the following json code
```
{
  "development": {
    "username": <YOUR_DB_LOGIN_NAME>,
    "password": <YOUR_DB_PASSWORD>,
    "database": "Auth_DB_DEV",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

- Once you've added the config.json then go to src folder from terminal and execute `npx sequelize db:create` and then execute `npx sequelize db:migrate`