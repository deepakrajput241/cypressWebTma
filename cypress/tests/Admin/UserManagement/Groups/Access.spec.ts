import { faker } from "@faker-js/faker";

it("Create User and Upload an Image", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("#!/UserGroup/Create");
  cy.EditInputElement("Name", faker.datatype.number(99999));
  cy.EditInputElement("Description", faker.random.words(4));
  cy.get("a[id='toolbarAddUser']").click();
  cy.get(".k-grid-content.k-auto-scrollable")
    .find("tr")
    .then((row) =>
      cy
        .xpath(
          `/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[${Cypress._.random(
            2,
            row.length
          )}]/td[1]/input`
        )
        .click()
    );
  cy.getButtonWithText("Add Selected").click();
  cy.get("a[id='toolbarAddLdapGroup']").click();
  cy.EditInputElement("LdapGroupName", "Auto test");
  cy.getButtonWithText("Save").click();
  cy.selectRepairCenter();

  //Preferences Tab
  cy.contains("Preferences").click();
  cy.wait(1000);
  cy.get("select[ng-change='dataItem.ObjectState=2']")
    .eq(0)
    .select("Not Determined");
  cy.get("select[ng-change='dataItem.ObjectState=2']").eq(1).select("Granted");
  cy.get("select[ng-change='dataItem.ObjectState=2']").eq(2).select("Granted");
  cy.get("select[ng-change='dataItem.ObjectState=2']").eq(3).select("Granted");
  cy.get("select[ng-change='dataItem.ObjectState=2']").eq(4).select("Granted");
  cy.get("select[ng-change='dataItem.ObjectState=2']").eq(5).select("Granted");

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
