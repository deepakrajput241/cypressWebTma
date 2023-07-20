import { faker } from "@faker-js/faker";

const data = {
  approvalRouteCode: "Auto105",
  code: "Auto-01",
  criteriaType: "Department",
  endTime: "11:00 AM",
  startTime: "09:00 AM",
  transactionType: "Disposal",
};

function addCriteria() {
  cy.contains("Add Criteria").click();
  cy.get("select[name='AvailableCriteriaLangString']").select(
    data.criteriaType
  );
  cy.fillCombobox("Code", data.code);
  cy.contains("button", "Save").click();
}
function addTimeRange() {
  cy.contains("Add Line").click();
  cy.fillTimeInput("Start Time", data.startTime);
  cy.fillTimeInput("End Time", data.endTime);
  // we need to click twice due to form validation bug
  cy.contains("button", "Save").click();
  cy.contains("button", "Save").click();
}

function fillRequiredFields() {
  cy.fillInput("Name", faker.random.words(2));
  cy.setWait();
  cy.fillCombobox("Approval Route Code", data.approvalRouteCode);
  addCriteria();
}

describe("add Approval Routing Criteria", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/ApprovalRoutingCriteria/Create");
  });

  it("should not add Approval Routing Criteria without required fields", () => {
    // missing Name
    fillRequiredFields();
    cy.clearInput("Name");
    cy.clickSaveAndCheckAlert("Name is required\r\n");

    // missing Approval Route Code/Approval Route Description
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("Approval Route Code");
    cy.clickSaveAndCheckAlert(
      "Approval Route Code is required\r\nApproval Route Description is required\r\n"
    );

    // missing Add Criteria
    cy.reload();
    cy.fillInput("Name", faker.random.words(2));
    cy.setWait();
    cy.fillCombobox("Approval Route Code", data.approvalRouteCode);
    cy.clickSaveAndCheckAlert(
      " At least 1 record is required for Criteria Grid\r\n"
    );
  });
  it(
    "should add Approval Routing Criteria with required fields, and then delete it",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();

      cy.clickDeleteAndCheckResponse();
    }
  );

  it("should add Approval Routing Criteria with all fields, and then delete it", () => {
    cy.fillInput("Name", faker.random.words(2));
    cy.fillSelect("Transaction Type", data.transactionType);
    cy.fillCombobox("Approval Route Code", data.approvalRouteCode);
    addCriteria();
    addTimeRange();
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });
});
