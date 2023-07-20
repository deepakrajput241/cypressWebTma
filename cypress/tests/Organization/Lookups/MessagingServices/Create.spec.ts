import { faker } from "@faker-js/faker";

describe("Create Messaging Service record", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/MessageServices/Create");
  });

  it("Messaging Service - Negative Cases", { tags: "@smoke" }, () => {
    cy.get("span[ng-bind='WindowTitle']:contains('Messaging Services')")
      .should("be.visible")
      .wait(500);
    cy.clickAndCheckAlert("Save", "Carrier is required\r\n");
  });

  it(
    "Create a Messaging Service with Required fields",
    { tags: "@smoke" },
    () => {
      cy.EditInputElement("Carrier", faker.datatype.number(99999999));
      cy.clickSaveAndCheckResponse();
    }
  );
});
