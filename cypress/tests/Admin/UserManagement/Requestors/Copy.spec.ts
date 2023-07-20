import { faker } from "@faker-js/faker";
describe("Copy and Edit Requestoe record", () => {
  let ID;
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Requestor for User Mgt", () => {
    cy.visit("/#!/Requestor");
    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("FirstName", faker.name.firstName());
    cy.EditInputElement("LastName", faker.name.lastName());
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/Requestor/Create?copyId=?*",
      200
    ).then((id) => {
      ID = id;
    });
  });

  it("Edit Requestor for User Mgt", () => {
    cy.visit(`/#!/Requestor/${ID}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Requestors')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("FirstName", faker.name.firstName());
    cy.EditInputElement("LastName", faker.name.lastName());
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
