import { faker } from "@faker-js/faker";

describe("Copy And Edit Custodial Inspection Rating", () => {
  let ratingId;
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Custodial Inspection Rating Data", () => {
    cy.visit("/#!/Lookup/CDInspectionRating");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/CDInspectionRating/Create?copyId=?*",
      200
    ).then((id) => {
      ratingId = id;
    });
  });

  it("Edit Custodial Inspection Rating Data", () => {
    cy.visit(`/#!/Lookup/CDInspectionRating/${ratingId}`);
    cy.get(
      "span[ng-bind='WindowTitle']:contains('Custodial Inspection Rating')"
    ).should("be.visible");
    cy.wait(500);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
