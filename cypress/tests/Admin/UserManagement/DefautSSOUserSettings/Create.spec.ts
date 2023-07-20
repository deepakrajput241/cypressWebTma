import { faker } from "@faker-js/faker";

describe("Create Batch SSO Default With All Fields", () => {
  const data = {
    behavior: "Connect As",
    user: "Automation",
    repairCenter: "Auto-01",
  };

  function selectRepairCenter() {
    cy.get("#toolbarAddRepairCenter").click();
    cy.selectRandomCheckBoxFromGrid(
      2,
      "/html/body/pageslide[2]/div/div/div/div[2]/form/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.get("a[ng-click='saveSelection()']").click();
  }

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/SSOGroupSetting/Create");
  });

  it("Create SSO with all required fields", () => {
    cy.get("a[id='toolbarAddColumn']").click();
    cy.EditInputElement("Description", faker.random.words(5));
    cy.openFlyoutAndSelectRandomValue("User");
    cy.getButtonWithText("Save").click();
  });

  it("Add Repair center for Batch Management RC - Connect As", () => {
    cy.get("a[id='toolbarAddColumn']").click();
    cy.EditInputElement("Description", faker.random.words(5));
    cy.EditInputElement("GroupName", faker.random.words(5));
    cy.openFlyoutAndSelectRandomValue("User");
    cy.getButtonWithText("Save").click();
  });

  it("Add Repair center for Batch Management RC - Requestor", () => {
    cy.get("a[id='toolbarAddColumn']").click();
    cy.EditInputElement("Description", faker.random.words(5));
    cy.EditInputElement("GroupName", faker.random.words(5));
    cy.get("select[name='Behavior']").select("Create Requestor");
    selectRepairCenter();
    cy.getButtonWithText("Save").click();
  });

  it("Add Repair center for Batch Management RC - User", () => {
    cy.get("a[id='toolbarAddColumn']").click();
    cy.EditInputElement("Description", faker.random.words(5));
    cy.EditInputElement("GroupName", faker.random.words(5));
    cy.get("select[name='Behavior']").select("Create User");
    selectRepairCenter();
    cy.getButtonWithText("Save").click();
  });
});
