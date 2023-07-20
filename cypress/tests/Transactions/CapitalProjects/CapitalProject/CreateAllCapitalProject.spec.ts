import { faker } from "@faker-js/faker";

describe("Create Capital Project - negative scenarios, Create and Delete", () => {
  let projectId;
  const data = {
    repairCenterCode: "FAC",
    projectType: "12",
    facilityCode: "Norm",
    buildingCode: "ACA-BOYD",
    departmentCode: "ALTED",
    projectManager: "101",
    title: faker.datatype.number(999999),
    transactionNumber: faker.datatype.number(999999),
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Capital Project- Negative Case", { tags: "@smoke" }, () => {
    cy.visit("/#!/CJProject/Create");
    cy.openFlyoutAndSelectRandomValue("Repair Center Code");
    cy.openFlyoutAndSelectRandomValue("Project Type");
    cy.EditInputElement("TransactionNumber", data.transactionNumber);
    cy.openFlyoutAndSelectRandomValue("Workflow");
    cy.clickAndCheckAlert("Save", "Title is required\r\n");

    cy.EditInputElement("Title", data.title);
    cy.get("input[aria-label='Repair Center Code']").eq(0).clear();
    cy.clickAndCheckAlert(
      "Save",
      "Repair Center Code is required\r\nRepair Center Name is required\r\n"
    );

    cy.openFlyoutAndSelectRandomValue("Repair Center Code");
    cy.get("input[aria-label='Project Type']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Project Type is required\r\n");
  });

  it("Create Capital Project with Required fields", { tags: "@smoke" }, () => {
    cy.visit("/#!/CJProject/Create");
    cy.EditInputElement("Title", data.title);
    cy.openFlyoutAndSelectRandomValue("Repair Center Code");
    cy.openFlyoutAndSelectRandomValue("Project Type");
    cy.EditInputElement("TransactionNumber", data.transactionNumber);
    cy.openFlyoutAndSelectRandomValue("Workflow");
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });

  it("Verify Error Alert - Create new Capital Project With All Fields", () => {
    cy.visit("/#!/CJProject/Create");
    cy.EditInputElement("Title", data.title);
    cy.openFlyoutAndSelectRandomValue("Repair Center Code");
    cy.openFlyoutAndSelectRandomValue("Project Type");
    cy.EditInputElement("TransactionNumber", data.transactionNumber);
    cy.openFlyoutAndSelectRandomValue("Facility Code");
    cy.openFlyoutAndSelectRandomValue("Building Code");
    cy.openFlyoutAndSelectRandomValue("Department Code");
    cy.openFlyoutAndSelectRandomValue("Workflow");
    cy.openFlyoutAndSelectRandomValue("Account Code");
    cy.get("input[aria-label='Submit Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Close Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.EditInputElement("ReferenceNumber", faker.datatype.number(10000));
    cy.openFlyoutAndSelectRandomValue("Status");
    cy.openFlyoutAndSelectRandomValue("Rate Schedule");
    cy.openFlyoutAndSelectRandomValue("Project Manager");
    cy.fillNumericTextBox(0, faker.datatype.number(10000));
    cy.editTextarea("Comments", faker.random.words(3));
    cy.xpath("//*[@role='tab' and text()='Components']")
      .should("be.visible")
      .click();
    cy.get("#toolbarAddCJComponent").should("be.visible").click();
    cy.getButtonWithText("Save").click();
    cy.xpath("//*[@role='tab' and text()='Funding']")
      .should("be.visible")
      .click();
    cy.get("#toolbarAddCAFundingSource").should("be.visible").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/tma-data-grid/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Save").click();
    cy.xpath("//*[@role='tab' and text()='Billing Info ']")
      .should("be.visible")
      .click();
    cy.get("#toolbarAddTier").should("be.visible").click();
    cy.xpath("//*[@role='tab' and text()='X-Ref']")
      .should("be.visible")
      .click();
    cy.get("#toolbarAddTeamMember").should("be.visible").click();
    cy.wait(1000);
    cy.selectRandomCheckBoxFromGrid(
      2,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/tma-data-grid/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Save").click();

    cy.get("#toolbarAddItem").should("be.visible").click();
    cy.selectRandomCheckBoxFromGrid(
      2,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div[3]/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();
    cy.clickAndCheckResponse("Save", "POST", "CJProject/Create*", 200).then(
      (id) => {
        projectId = id;
      }
    );
  });

  it("Delete Capital Project", () => {
    cy.visit(`/#!/CJProject/${projectId}`);
    cy.clickDeleteAndCheckResponse();
  });
});
