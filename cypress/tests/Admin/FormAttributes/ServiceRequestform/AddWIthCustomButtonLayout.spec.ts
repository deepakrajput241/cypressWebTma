import { faker } from "@faker-js/faker";

it(
  "Create System Request Form with Custom Button",
  { tags: "@spreadsheet" },
  () => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/RequestPortal/Create");
    cy.EditInputElement("Name", faker.random.words(1));
    cy.get("select[aria-label='Form Type']").select("Menu Form");
    cy.get("div[ng-bind='actionItem.Langstring']").click();
    cy.get("input[ng-change='gridCtrl.AddSelectedPK(dataItem)']")
      .eq(13)
      .click();
    cy.getButtonWithText("Save").click();
    cy.contains("Layout").click();
    cy.get(".glyphicons.glyphicons-cogwheel").eq(1).click();
    cy.EditInputElement("CustomText", faker.random.words(1));
    cy.EditInputElement("CustomButtonURL", "www.google.com");
    cy.getButtonWithText("Save").click();
    cy.selectRepairCenter();
    cy.getButton("Save").click();
    cy.wait(500);
    cy.get("div[ng-bind='actionItem.Langstring']")
      .contains("Generate Request URL")
      .click()
      .wait(500);
    cy.get("input[name='GoToURL']").click();
  }
);
