import { faker } from "@faker-js/faker";

const data = {
  escalateToPriority: "Auto-11",
  priority: "Auto-100",
  repairCenter: "13979",
  taskCode: "109",
  woType: "INSP",
};

function addTime() {
  cy.contains("Add Time").click();
  cy.fillTimeInput("Start Time", "08:00");
  cy.fillTimeInput("End Time", "17:00");
  cy.fillCheckbox("Monday");
  cy.contains("button", "Save").click();
}

function fillRequiredFields() {
  cy.fillCombobox("Repair Center", data.repairCenter);
  cy.fillNumericTextBoxInput("Expiration", faker.random.numeric(2));
}

describe("add Notification And Escalation for Individual of type Work Order", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("#!/Notification/Create");
  });

  it("should not add Notification and Escalation for Individual of type Work Order without required fields", () => {
    // missing Repair Center
    fillRequiredFields();
    cy.clearCombobox("Repair Center");
    cy.clickSaveAndCheckAlert("Repair Center is required\r\n");

    // missing Expiration
    cy.reload();
    // we break from our usual pattern here because the Expiration field behaves differently
    cy.fillCombobox("Repair Center", data.repairCenter);
    cy.clickSaveAndCheckAlert("Expiration is required\r\n");
  });

  it(
    "should add Notification and Escalation for Individual of type Work Order with required fields, and then delete it",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();

      cy.clickDeleteAndCheckResponse();
    }
  );

  it("should add Notification and Escalation for Individual of type Work Order with all fields, and then delete it", () => {
    cy.fillCombobox("Repair Center", data.repairCenter);
    cy.fillCombobox("Priority", data.priority);
    cy.fillCombobox("WO Type", data.woType);
    cy.fillSelect("Task Selection", "Task Code");
    cy.fillCombobox("Task Code", data.taskCode);
    cy.fillNumericTextBoxInput("Expiration", faker.random.numeric(2));
    cy.fillCombobox("Escalate to Priority", data.escalateToPriority);
    cy.fillCheckbox("Time Sensitive");
    cy.fillInput("CC...", faker.internet.email());
    cy.fillTextarea("Append to Email", faker.lorem.words(10));
    addTime();
    cy.fillTextarea("Comment", faker.lorem.sentences(2));
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });
});
