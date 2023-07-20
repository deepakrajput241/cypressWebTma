import { faker } from "@faker-js/faker";

const data = {
  endTime: "11:00 AM",
  startTime: "09:00 AM",
};

function addRepairCenter() {
  cy.contains("Repair Centers").click();
  cy.addRepairCenter();
}

function addTask() {
  cy.contains("Add Task").click();
  cy.get("tbody input:first").check();
  cy.contains("button", "Add Selected").click();
}

function addTechnician() {
  cy.contains("Add Technician to Selected Non-Zone Related Tasks").click();
  cy.get("tbody input:first").check();
  cy.contains("button", "Save").click();
}

function fillRequiredFields() {
  addTask();
  addRepairCenter();
}

describe("add Auto-Schedule Rule", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("#!/AutoScheduleRule/Create");
  });

  it("should not add Auto-Schedule Rule without required fields", () => {
    // missing Task
    fillRequiredFields();
    cy.contains("Identity").click();
    // delete Task
    cy.get("tbody a").eq(3).click();
    cy.clickSaveAndCheckAlert(
      " At least 1 record is required for Task Grid\r\n"
    );

    // missing Repair Center
    cy.reload();
    fillRequiredFields();
    // delete Repair Center
    cy.get("tbody a:first").click();
    cy.clickSaveAndCheckAlert(
      " At least 1 record is required for Auto Schedule Rule RC Grid\r\n"
    );
  });

  it(
    "should add Auto-Schedule Rule with required fields, and then delete it",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();

      cy.setWait();
      cy.clickDeleteAndCheckResponse();
    }
  );

  it("should add Auto-Schedule Rule with all fields, and then delete it", () => {
    cy.fillInput("Description", faker.random.words(3));
    cy.clickCheckbox("TimeBased");
    cy.fillTimeInput("Start Time", data.startTime);
    cy.fillTimeInput("End Time", data.endTime);
    cy.fillCheckbox("Sunday");
    cy.fillCheckbox("Monday");
    cy.fillCheckbox("Tuesday");
    cy.fillCheckbox("Wednesday");
    cy.fillCheckbox("Thursday");
    cy.fillCheckbox("Friday");
    cy.fillCheckbox("Saturday");
    addTask();
    cy.get("tbody input:first").check();
    addTechnician();
    addRepairCenter();
    cy.clickSaveAndCheckResponse();

    cy.setWait();
    cy.clickDeleteAndCheckResponse();
  });
});
