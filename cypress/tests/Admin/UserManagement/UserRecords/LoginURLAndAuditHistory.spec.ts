import { faker } from "@faker-js/faker";

describe("Validate Login URL And Show Audit History", () => {
  let userId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Create User record", () => {
    cy.visit("/#!/UserManagement/Create");
    cy.EditInputElement("FirstName", faker.name.firstName());
    cy.EditInputElement("LastName", faker.name.lastName());
    cy.EditInputElement("Initials", faker.name.suffix());
    cy.EditInputElement("LoginName", faker.datatype.number(9999999));
    cy.EditInputElement("Email", faker.internet.email());
    cy.EditInputElement("Fax", faker.phone.number("###-###-####"));
    cy.EditInputElement("LoginPassword", "1234567");
    cy.EditInputElement("LoginPasswordConfirm", "1234567");
    cy.fillCheckbox("URL Login");
    cy.contains("Repair Centers").click();
    cy.get("a[class='k-grid-ToolBar']:contains('Add Repair Center')").click();
    cy.selectRandomCheckBoxFromGrid(
      1,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();
    cy.contains("a", "Identity").click();
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/UserManagement/Create*",
      200
    ).then((id) => {
      userId = id;
    });
  });

  it("Validate Login URL", () => {
    cy.visit(`/#!/UserManagement/${userId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('User Management')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.get("div[ng-bind='actionItem.Langstring']")
      .should("be.visible")
      .contains("LoginURL")
      .click();
    cy.get("input[value='Copy to Clipboard']").click();
    cy.get("input[value='Cancel']").click();
  });

  it("Validate Audit History", () => {
    cy.visit(`/#!/UserManagement/${userId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('User Management')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.getButton("Edit").click();
    cy.EditInputElement("FirstName", faker.name.firstName());
    cy.EditInputElement("LastName", faker.name.lastName());
    cy.EditInputElement("Initials", faker.name.suffix());
    cy.clickAndCheckResponse("Save", "POST", "/UserManagement/Edit?*", 200);

    cy.wait(1000);
    cy.get("div[ng-bind='actionItem.Langstring']")
      .should("be.visible")
      .contains("Show Audit History")
      .click();
  });
});
