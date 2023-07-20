# README

## Build and Test

1. The test command is store in package.json file
2. Execute npx cypress open
   To open cypress UI
3. npx cypress run
   To run all test run
4. npx cypress run --browser chrome
   To Run on specific browser
5. npx cypress run --env grepTags="@test"
   To run all the suite have the tag @test

## Environmental Variables

Environmental variables go in `cypress.env.json` and are accessed using `Cypress.env` (ex. `Cypress.env("[variable name]")`). Variables can be nested (ex. `{ user: { username: "", password: ""} }`) and accessed using the syntax `Cypress.env("user").username`.
