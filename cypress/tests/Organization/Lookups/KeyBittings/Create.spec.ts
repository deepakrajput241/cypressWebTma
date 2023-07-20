import { faker } from "@faker-js/faker";

describe("Create Key Bitting record", () => {
  const data = {
    keySystem: "MC-KS",
    lockShopDesc: "JB LOCKSHOP",
    keySystemdescription: "Architect",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/KeyBitting/Create");
  });

  it("Key Bitting - Negative Cases", { tags: "@smoke" }, () => {
    cy.get("span[ng-bind='WindowTitle']:contains('Key Bittings')")
      .should("be.visible")
      .wait(500);
    cy.clickAndCheckAlert("Save", "Bitting # is required\r\n");
  });

  it("Create a Key Bitting with Required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Bitting", faker.datatype.number(9999999));
    cy.clickSaveAndCheckResponse();
  });
});
