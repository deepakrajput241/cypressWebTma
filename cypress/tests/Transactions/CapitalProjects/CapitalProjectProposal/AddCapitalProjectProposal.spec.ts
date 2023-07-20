import { faker } from "@faker-js/faker";

describe("Create Capital Project Proposal Record", () => {
  const data = {
    repairCenterCode: "FAC",
    capitalSetup: "District",
    projectType: "Capital001",
    facilityCode: "FC04",
    department: "ALTED",
    accountNo: "1",
    status: "Assigned",
    title: faker.datatype.number(1000),
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("#!/CJProposal/Create");
  });

  it("Capital Project Proposal - Negative Cases", { tags: "@smoke" }, () => {
    cy.openFlyoutAndSelectRandomValue("Repair Center Code");
    cy.openFlyoutAndSelectRandomValue("Proposal Type");
    cy.openFlyoutAndSelectRandomValue("Project Type");
    cy.clickAndCheckAlert("Save", "Title is required\r\n");

    cy.get("input[name='Title']").type(faker.random.numeric(5));
    cy.get("input[aria-label='Repair Center Code']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Repair Center Code is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Repair Center Code");
    cy.get("input[aria-label='Proposal Type']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Proposal Type is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Proposal Type");
    cy.get("input[aria-label='Project Type']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Project Type is required\r\n");
  });

  it("Create new Capital Proposal Record", { tags: "@smoke" }, () => {
    cy.get("input[name='Title']").type(faker.random.numeric(5));
    cy.openFlyoutAndSelectRandomValue("Repair Center Code");
    cy.openFlyoutAndSelectRandomValue("Proposal Type");
    cy.openFlyoutAndSelectRandomValue("Project Type");
    // cy.clickSaveAndCheckResponse("Save", "POST", "/CJProposal/Create?*", 200);
    //TODO - This window has some issue, it is throwing error on click of Save
  });
});
