# Expense Tracking API

## Overview

This Expense Tracking API allows users to manage their expenses by creating, retrieving, updating, and deleting expense records. Built with Express and MongoDB, it offers a RESTful interface for easy expense management.

## Features
- Create new expense records
- Retrieve all expenses
- Retrieve a single expense by ID
- Update existing expenses by ID
- Delete expenses by ID

## Setup

## Prerequisites

- Node.js
- npm or yarn
- MongoDB

## Installation

1. Clone the repository:
```
 git clone <repository-url>
```

2. Navigate to the project directory:
```
Navigate to the project directory:
```

3. Install dependencies:
```
npm install
```


# API Endpoints

## Create Expense
- POST `/expenses`
- Body:
  ```
  {
  "description": "Groceries",
  "amount": 100,
  "date": "2021-07-01",
  "category": "Food"
  }
  ```

## Get All Expenses
- GET `/expenses`
## Get Single Expense by ID
- GET `/expenses/:id`
## Update Expense by ID
- PUT `/expenses/:id`
- Body:
```
{
  "description": "Utilities",
  "amount": 150,
  "date": "2021-07-15",
  "category": "Bills"
}
```
## Delete Expense by ID
- DELETE `/expenses/:id`

## Contributing
- Contributions to improve the Expense Tracking API are welcome. Please follow these steps to contribute:
  1.  Fork the repository
  2.  Create your feature branch (git checkout -b feature/AmazingFeature)
  3.  Commit your changes (git commit -am 'Add some AmazingFeature')
  4.  Push to the branch (git push origin feature/AmazingFeature)
  5.  Open a pull request



