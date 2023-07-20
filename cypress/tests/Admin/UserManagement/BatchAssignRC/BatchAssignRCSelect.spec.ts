describe("Create Batch Management", () => {
  const data = { repairCenter: "Auto-01", user: "test_user" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/BatchAssignRC/Create/Identity");
  });

  it("Add Repair center for Batch Management Repair Center - Grant Selected", () => {
    cy.get("a[id='toolbarAddRepairCenter']").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div[3]/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.get("a[ng-click='customSave()']").click();
    cy.get("a[id='toolbarAddUser']").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div[3]/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();
    cy.wait(1000);
    cy.get("input[name='GrantSelectedBtn']").click();
  });

  it("Add User for Batch Management Repair Center - Deny Selected", () => {
    cy.get("a[id='toolbarAddRepairCenter']").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div[3]/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.get("a[ng-click='customSave()']").click();
    cy.get("a[id='toolbarAddUser']").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div[3]/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();
    cy.wait(1000);
    cy.get("input[name='DenySelectedBtn']").click();
  });

  it("Add User for Batch Management Repair Center - Deny Selected", () => {
    cy.get("a[id='toolbarAddRepairCenter']").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div[3]/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();
    cy.get("a[id='toolbarAddUser']").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div[3]/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();
    cy.wait(1000);
    cy.get("input[name='ApplyNotDeterminedBtn']").click();
  });
});
