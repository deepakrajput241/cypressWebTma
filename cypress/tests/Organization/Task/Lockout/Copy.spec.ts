import { faker } from "@faker-js/faker";

describe("Copy And Edit Lockout Record", () => {
  let lockoutId;
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Lockout", () => {
    cy.visit("/#!/Lockout");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Name", faker.random.words(1));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/Lockout/Create?copyId=?*",
      200
    ).then((id) => {
      lockoutId = id;
    });
  });

  it("Edit Lockout", () => {
    cy.visit(`/#!/Lockout/${lockoutId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Lockout')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Name", faker.random.words(1));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
