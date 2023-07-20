import { faker } from "@faker-js/faker";

describe("Copy And Edit Custodial Template Types", () => {
  let ID;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Custodial Template Type Data", () => {
    cy.visit("/#!/Lookup/CDTemplateType");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/CDTemplateType/Create?copyId=?*",
      200
    ).then((id) => {
      ID = id;
    });
  });

  it("Edit Custodial Template Type Data", () => {
    cy.visit(`/#!/Lookup/CDTemplateType/${ID}`);
    cy.get(
      "span[ng-bind='WindowTitle']:contains('Custodial Template Types')"
    ).should("be.visible");
    cy.wait(500);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
