# QA Framework for VOM project

# Overview 

This repository contains automated tests for VOM project. The tests are developed using Cypress tool and written in Java Script language. To ensure a scalable, maintainable, and efficient structure, the framework follows Test-Driven Development(TDD) practices and the Page Object Model(POM) design pattern. 

# Installation
1. Clone the repository locally
2. Ensure that Node.js is installed on your local machine
4. To install all the dependencies run the following command: 
   ```bash
   npm install
5. All the scripts can be observed in:
   ```bash
   package.json file 
6. For running all the tests in headless mode run the following command:
   ```bash
   npm run test 
6. To open the cypress console run the following command:
    ```bash
    npm run cy:open
   
# Tests 
| Type       | Location      |
|----------------|----------------|
| Api  | cypress/tests/beTests.js  | 
| UI  | cypress/tests/feTests.js  | 



