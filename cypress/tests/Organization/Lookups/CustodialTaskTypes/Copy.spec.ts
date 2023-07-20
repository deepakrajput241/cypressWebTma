import { faker } from "@faker-js/faker";

describe("Copy And Edit Custodial Task Type", () => {
  let taskId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Custodial Task Type Data", () => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/CDTaskType");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/CDTaskType/Create?copyId=?*",
      200
    ).then((id) => {
      taskId = id;
    });
  });

  it("Edit Custodial Task Type record", () => {
    cy.visit(`/#!/Lookup/CDTaskType/${taskId}`);
    cy.get(
      "span[ng-bind='WindowTitle']:contains('Custodial Task Types')"
    ).should("be.visible");
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
