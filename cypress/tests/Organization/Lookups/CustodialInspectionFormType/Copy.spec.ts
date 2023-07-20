import { faker } from "@faker-js/faker";

describe("Copy And Edit Custodial Inspection Form Type", () => {
  let ID;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Custodial Inspection Form Type record", () => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/CDInspectionFormType");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/CDInspectionFormType/Create?copyId=?*",
      200
    ).then((id) => {
      ID = id;
    });
  });

  it("Edit Custodial Inspection Form Type record", () => {
    cy.visit(`/#!/Lookup/CDInspectionFormType/${ID}`);
    cy.get(
      "span[ng-bind='WindowTitle']:contains('Custodial Inspection Form Types')"
    ).should("be.visible");
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
