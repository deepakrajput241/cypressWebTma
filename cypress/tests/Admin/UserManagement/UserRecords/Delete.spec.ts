import { faker } from "@faker-js/faker";

const data = {
  department: "Auto-01",
  requestor: "D Bran",
  technician: "Auto_868",
  contractor: "Auto_9679",
  group: "1234",
  repairCenter: "Auto-01",
};

it("Delete User Record with Required Fields", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/UserManagement/Create");
  cy.EditInputElement("FirstName", faker.name.firstName());
  cy.EditInputElement("LastName", faker.name.lastName());
  cy.EditInputElement("Initials", faker.name.suffix());
  cy.EditInputElement("LoginName", faker.datatype.number(9999999));
  cy.EditInputElement("Email", faker.internet.email());
  cy.EditInputElement("Fax", faker.phone.number("###-###-####"));
  cy.EditInputElement("LoginPassword", "1234567");
  cy.EditInputElement("LoginPasswordConfirm", "1234567");
  cy.contains("Repair Centers").click();
  cy.get("a[class='k-grid-ToolBar']:contains('Add Repair Center')").click();
  cy.selectRandomCheckBoxFromGrid(
    1,
    "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
  );
  cy.getButtonWithText("Add Selected").click();
  cy.contains("a", "Identity").click();
  cy.clickSaveAndCheckResponse();

  cy.get("span[ng-bind='WindowTitle']:contains('User Management')").should(
    "be.visible"
  );
  cy.wait(2000);
  cy.contains("a", "Identity").click();
  cy.clickDeleteAndCheckResponse();
});
