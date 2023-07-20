import { faker } from "@faker-js/faker";

describe(
  "Create System Request Form with Custom Text Editor",
  { tags: "@spreadsheet" },
  () => {
    let ID;

    beforeEach(() => {
      cy.login(Cypress.env("user1"));
    });

    it("Create System Request Form with Custom Text Editor", () => {
      cy.visit("/#!/RequestPortal/Create");
      cy.EditInputElement("Name", faker.random.words(2));
      cy.get("select[aria-label='Form Type']").select("Menu Form");
      cy.selectRepairCenter();
      cy.get("div[ng-bind='actionItem.Langstring']").click();
      cy.get("input[ng-change='gridCtrl.AddSelectedPK(dataItem)']")
        .eq(17)
        .click();
      cy.getButtonWithText("Save").click();
      cy.clickAndCheckResponse(
        "Save",
        "POST",
        "/RequestPortal/Create*",
        200
      ).then((id) => {
        ID = id;
      });
    });

    it("Edit System Request Form And Add data into Custom Text Editor", () => {
      cy.visit(`/#!/RequestPortal/Edit/${ID}/Identity`);
      cy.contains("Layout").click();
      cy.get(".glyphicons.glyphicons-cogwheel").eq(1).click();
      cy.get("iframe[title='Editable area. Press F10 for toolbar.']")
        .its("0.contentDocument.body")
        .wait(1000)
        .type(faker.random.words(5));
      cy.getButtonWithText("Save").click();
      cy.clickSaveAfterEditAndCheckResponse();
    });
  }
);
