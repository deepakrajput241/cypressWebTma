import { faker } from "@faker-js/faker";

describe("Copy And Edit Custodial Deficiency record", () => {
  let custodialId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Search and Copy Custodial Deficiency record", () => {
    cy.visit("/#!/Lookup/CDDeficiency");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/CDDeficiency/Create?copyId=?*",
      200
    ).then((id) => {
      custodialId = id;
    });
  });

  it("Edit Custodial Deficiency record", () => {
    cy.visit(`/#!/Lookup/CDDeficiency/${custodialId}`);
    cy.get(
      "span[ng-bind='WindowTitle']:contains('Custodial Deficiency')"
    ).should("be.visible");
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
