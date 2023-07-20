import { faker } from "@faker-js/faker";

describe("Create User Group", () => {
  const data = {
    user: "Automation",
    repairCenter: "Auto-01",
    department: "Auto-01",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/UserGroup/Create");
  });

  it("Create Group for User Mgt without name", { tags: "@smoke" }, () => {
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickAndCheckAlert("Save", "Name is required\r\n");

    cy.EditInputElement("Name", faker.random.words(1));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create Group for User Mgt", { tags: "@smoke" }, () => {
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
    cy.clickSaveAndCheckResponse();
  });

  it("Create Group for User Mgt", () => {
    cy.EditInputElement("Name", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(4));
    cy.get("a[id='toolbarAddUser']").click();
    cy.wait(1000);
    cy.get(".entryTitle:contains('Add User to Group Entry')").should(
      "be.visible"
    );
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
    cy.contains("Managed Resources").click();
    cy.get("#toolbarAddManagedDepartment").click();
    cy.wait(1000);
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();

    cy.contains("Defaults").click();
    cy.get("#toolbarAddDefault").click();
    cy.wait(500);
    cy.get('select[ng-model="selectedWindow"]').select("Area");
    cy.get('select[ng-model="selectedPage"]').select(5);
    cy.getButtonWithText("Save").click();

    cy.contains("My Dashboard").click();
    cy.get("#toolbarAddTab").click();
    cy.wait(1000);
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();

    cy.selectRepairCenter();

    cy.clickSaveAndCheckResponse();
  });
});
