# Expense Tracker
Expense tracker built by Express.js and Mongoose. Track your expense at ease.

## ScreenShots
### Login view
![Login page screenshot](https://github.com/hsinyi8997/expense-tracker/blob/main/public/image/login-page.jpg)

### User's index view
![Index page screenshot](https://github.com/hsinyi8997/expense-tracker/blob/main/public/image/idnex-page.jpg)

## Feature
* User can create its own account
* User can create account via facebook or google account
* User can view all expense records and total amount in list
* User can filter or sort expense records by month or category
* User can click edit expense record
* User can create a new expense record
* User can delete a expense record

## Prerequisites
* Node.js (v14.16.0)
* Express
* Express-handlebars
* MongoDB
* Passport
* Moment
* Bcrypt

## Installation
1. Open terminal and clone the repo to local
```
git clone https://github.com/hsinyi8997/expense-tracker.git
```
2. Move to repo file
```
cd expense-tracker
```
3. Start dependencies installation
```
npm install
```
4. Add seed to the project
```
npm run seed
```

## Execution
1. Start Express server in Node.js
```
npm run start
```
or

2. Start Express server in dev mode (By Nodemon)
```
npm run dev
```

3. Enter [http://localhost:3000](http://localhost:3000) in the browser to enter the website

4. Login with test account
### user1:
* Email: user1@example.com
* Password: 12345678

### user2:
* Email: user2@example.com
* Password: 12345678
