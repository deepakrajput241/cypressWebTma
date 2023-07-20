import { faker } from "@faker-js/faker";
const data = {
  description: faker.random.words(5),
  code: faker.datatype.number(1000),
};

describe("Copy, Edit and Delete Program Record", () => {
  let ID;

  beforeEach("Login to the portal", () => {
    cy.login(Cypress.env("user1"));
  });

  it("Search for a record on Action menu and Copy", () => {
    cy.visit("/#!/TrainingProgram");

    cy.getButton("Copy").click();
    cy.EditInputElement("Code", data.code);
    cy.editTextarea("Description", data.description);
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "TrainingProgram/Create?copyId=?*",
      200
    ).then((id) => {
      ID = id;
    });
    cy.clickDeleteAndCheckResponse();
  });

  it("Edit Program With Required Fields", () => {
    cy.visit(`/#!/TrainingProgram`);
    cy.getButton("Edit").click();
    cy.wait(1000);
    cy.EditInputElement("Code", data.code);
    cy.editTextarea("Description", data.description);
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Delete Program", () => {
    cy.visit(`/#!/TrainingProgram`);
    cy.clickDeleteAndCheckResponse();
  });
});
