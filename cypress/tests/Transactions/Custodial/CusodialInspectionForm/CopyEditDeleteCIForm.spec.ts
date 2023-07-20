import { faker } from "@faker-js/faker";

describe("Search, Create, Edit and Delete Custodial Inspection Form", () => {
  let ID;

  beforeEach("Login to Web app", () => {
    cy.login(Cypress.env("user1"));
  });

  it("Search for a record on Action menu and Copy", () => {
    cy.visit("/#!/CDInspectionForm");

    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.wait(1000);
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "CDInspectionForm/Create?copyId=?*",
      200
    ).then((id) => {
      ID = id;
    });
  });

  it("Edit Custodial Inspection Form", () => {
    cy.visit(`/#!/CDInspectionForm/${ID}`);
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.wait(1000);
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Delete Custodial Inspection Form", () => {
    cy.visit(`/#!/CDInspectionForm/${ID}`);
    cy.clickDeleteAndCheckResponse();
  });
});
