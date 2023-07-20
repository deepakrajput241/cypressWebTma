import { faker } from "@faker-js/faker";

const data = { copiedFrom: "Accounts" };

describe("Create Custom form attribute record", () => {
  const data = { copiedFrom: "Accounts" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/CustomFormAttribute/Create");
  });

  it("Test Negative cases", { tags: "@smoke" }, () => {
    cy.openFlyoutAndSelectRandomValue("Copied From");
    cy.clickAndCheckAlert("Save", "Custom Form Name is required\r\n");

    cy.get("input[aria-label='Copied From'][type='text']").clear();
    cy.EditInputElement("WindowName", faker.random.words(5));
    cy.clickAndCheckAlert("Save", "Copied From is required\r\n");
  });

  it("Create Custom Form Attribute record", { tags: "@smoke" }, () => {
    cy.openFlyoutAndSelectRandomValue("Copied From");
    cy.EditInputElement("WindowName", faker.random.words(2));
    cy.get("input[name='GetData']").click();
    cy.clickSaveAndCheckResponse();
  });
});
