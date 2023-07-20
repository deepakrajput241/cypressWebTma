import { faker } from "@faker-js/faker";

describe("Copy And Edit Master Check record", () => {
  let masterCheckId;
  it("Copy Master Check", () => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/MasterCheck");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.editTextarea("Description", faker.random.words(5));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/MasterCheck/Create?copyId=?*",
      200
    ).then((id) => {
      masterCheckId = id;
    });
  });

  it("Edit Master Check", () => {
    cy.login(Cypress.env("user1"));
    cy.visit(`/#!/MasterCheck/${masterCheckId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Master Check')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.editTextarea("Description", faker.random.words(5));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
