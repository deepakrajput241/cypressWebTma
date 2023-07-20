import { faker } from "@faker-js/faker";

describe("Copy And Edit Trade record", () => {
  let tradeId;
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Trade with Required Fields", () => {
    cy.visit("/#!/Trade");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(100000));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/Trade/Create?copyId=?*",
      200
    ).then((id) => {
      tradeId = id;
    });
  });

  it("Edit Trade with Required Fields", () => {
    cy.visit(`/#!/Trade/${tradeId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Trade')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(100000));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
