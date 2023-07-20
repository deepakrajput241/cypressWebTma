import { faker } from "@faker-js/faker";

describe("Create Grounds Item record", () => {
  const data = { unitOfMeasureCode: "BOX" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/GRNItem/Create");
  });

  it("Grounds Item - Negative Cases", { tags: "@smoke" }, () => {
    cy.get("span[ng-bind='WindowTitle']:contains('Grounds Items')")
      .should("be.visible")
      .wait(500);
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create a Grounds Item with Required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAndCheckResponse();
  });
});
