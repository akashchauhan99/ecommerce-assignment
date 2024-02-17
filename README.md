# ecommerce-assignment

It is an assignment which is similar to an E-commerce Application. In which, I covered These functionalities:- product management, user accounts, and order processing.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Installation](#installation)
3. [Usage](#usage)
4. [API Endpoints](#api-endpoints)

## Project Overview

```bash
It is an assignment which is similar to an E-commerce Application. In which, I covered These functionalities:- product management, user accounts, and order processing.

This project is based on monolithic architecture. In which we have created api for auth, user, product, and order
In a monolithic architecture:

1. Simplicity: It is easier to develop, deploy, and manage a single application rather than multiple microservices.
2. Development Speed: Development can be faster since you do not have to deal with inter-service communication complexities.
3. Debugging: Debugging is simpler as the entire application runs in a single process.
4. Testing: Easier to write comprehensive end-to-end tests as everything is within a single codebase.
5. Deployment: Deployment is simpler as you deploy the entire application at once.
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/akashchauhan99/ecommerce-assignment

2. npm i

3. create .env File with
        PORT=
        MONGO_URI=
        ACCESS_TOKEN_PRIVATE_KEY=
        ACCESS_TOKEN_PUBLIC_KEY=
        ACCESS_TOKEN_EXPIRES_IN=

4. npm start to run the project
```

## Usage

## API Endpoints

```bash
1. /user/profile
2. /user/edit
3. /auth/login
4. /auth/logout
5. /auth/register
6. /product/create
7. /product/get-all
8. /product/update
9. /product/delete
10. /order/place-order
11. /order/order-history
12. /order/update-order
```