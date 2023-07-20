import { faker } from "@faker-js/faker";

describe(
  "Create Service Request Form with Layout",
  { tags: "@spreadsheet" },
  () => {
    let ID;
    const data = {
      formType: "Menu Form",
      dataAccessUser: "tech101",
      repairCenter: "AUX",
    };

    beforeEach(() => {
      cy.login(Cypress.env("user1"));
    });

    it("Create Service Request Form with Layout", { tags: "@smoke" }, () => {
      cy.visit("/#!/RequestPortal/Create");
      cy.EditInputElement("Name", faker.random.words(2));
      cy.get("select[aria-label='Form Type']").select("Request Form");
      cy.get("div[ng-bind='actionItem.Langstring']").click();
      for (var i = 1; i <= 3; i++) {
        cy.get("input[ng-change='gridCtrl.AddSelectedPK(dataItem)']")
          .eq(i)
          .click();
      }
      cy.getButtonWithText("Save").click();
      cy.contains("Layout").click();
      cy.selectRepairCenter();
      cy.clickAndCheckResponse(
        "Save",
        "POST",
        "/RequestPortal/Create?*",
        200
      ).then((id) => {
        ID = id;
      });
    });

    it("Edit Layout", () => {
      cy.visit(`/#!/RequestPortal/Edit/${ID}/Identity`);
      cy.contains("Layout").click();
      cy.get(".glyphicons.glyphicons-cogwheel").eq(6).click();
      cy.get("select[name='FieldDDL']").select("Custom Text Editor");
      cy.get("iframe[title='Editable area. Press F10 for toolbar.']")
        .its("0.contentDocument.body")
        .wait(1000)
        .type(faker.random.words(5));
      cy.wait(1000);
      cy.get("button[ng-click='customSave()']").click();

      cy.get(".glyphicons.glyphicons-cogwheel").eq(8).click();
      cy.get("select[name='FieldDDL']").select("Custom Button");
      cy.selectRadioBtnById("FormLinkType-1");
      cy.get("input[aria-label='Name']")
        .eq(0)
        .click()
        .type("Lenore Request Form")
        .wait(500)
        .type("{downArrow}{enter}");
      cy.get("button[ng-click='customSave()']").click();
      cy.clickSaveAfterEditAndCheckResponse();
    });
  }
);
