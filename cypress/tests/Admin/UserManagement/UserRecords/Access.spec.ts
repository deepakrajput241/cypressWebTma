import { faker } from "@faker-js/faker";

it("Create User and Upload an Image", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/UserManagement/Create");
  cy.EditInputElement("FirstName", faker.name.firstName());
  cy.EditInputElement("LastName", faker.name.lastName());
  cy.EditInputElement("Initials", faker.name.suffix());
  cy.EditInputElement("LoginName", faker.datatype.number(99999));
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

  //Preferences Tab
  cy.contains("Preferences").click();
  cy.wait(1000);
  cy.get("input[value='Grant All']").click();

  //Window Access Tab
  cy.contains("Window Access").click();
  cy.wait(1500);
  cy.get("input[value='Full']").eq(0).should("be.visible").click();
  cy.get("input[value='Full']").eq(1).should("be.visible").click();

  //Data Access Tab
  cy.contains("Data Access").click();

  //Add Repair Center
  cy.wait(1000);
  cy.get("#toolbarAddRCItem").click();
  for (var i = 1; i <= 4; i++) {
    cy.xpath(
      `/html/body/pageslide[1]/div/div/div/div[2]/form/div/div[2]/table/tbody/tr[${i}]/td[1]/input`
    ).click();
  }
  cy.getButtonWithText("Add Selected").click();
  cy.get("input[value='Grant All']").eq(1).click();

  //Add Warehouse
  cy.get("#toolbarAddWHItem").click();
  for (var i = 1; i <= 4; i++) {
    cy.xpath(
      `/html/body/pageslide[1]/div/div/div/div[2]/form/div/div[2]/table/tbody/tr[${i}]/td[1]/input`
    ).click();
  }
  cy.getButtonWithText("Add Selected").click();
  cy.get("input[value='Grant All']").eq(2).click();

  //Report Categories
  cy.get("input[value='Grant All']").eq(3).click();

  //Organization Access
  cy.get("input[value='Grant All']").eq(0).click();

  //Mobile Access Tab
  cy.contains("Mobile Access").click();
  cy.wait(1000);
  cy.get("input[value='Full']").eq(0).click();
  cy.get("input[value='Full']").eq(1).click();

  //Default Tab
  cy.contains("Defaults").click();
  cy.get("#toolbarAddDefault").click();
  cy.get("select[ng-model='selectedWindow']").select("Project");
  cy.get("select[ng-model='selectedPage']").select("Identity");
  cy.get("select[ng-model='selectedField']").select("Active");
  cy.getButtonWithText("Save").click();

  cy.clickSaveAndCheckResponse();
});
