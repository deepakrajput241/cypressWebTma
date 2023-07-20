import { faker } from "@faker-js/faker";

const data = {
  escalateToPriority: "Auto-11",
  locationCode: "12755279-7",
  taskCode: "109",
};

function fillRequiredFields() {
  cy.fillRadio("IsGroup", "1");
  cy.fillSelect("GroupingOperator", "=");
  cy.fillInput("Number", faker.random.numeric(2));
  cy.addFirstItemFromSlideOverTable("Add Priority", "Add Selected");
}

describe("add Notification And Escalation for Group", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("#!/Notification/Create");
  });

  it("should not add Notification and Escalation for Group without required fields", () => {
    // missing Grouping Operator
    fillRequiredFields();
    cy.clearSelect("GroupingOperator");
    cy.clickSaveAndCheckAlert("GroupingOperator is required\r\n");

    // missing Number
    cy.reload();
    fillRequiredFields();
    cy.clearInput("Number");
    cy.clickSaveAndCheckAlert("Number is required\r\n");

    // missing Priority
    cy.reload();
    fillRequiredFields();
    // delete Priority Item
    cy.get("tbody a:first").click();
    cy.clickSaveAndCheckAlert(
      "Please add at least 1 Priority Item to proceed."
    );
  });

  it(
    "should add Notification and Escalation for Group with required fields, and then delete it",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();

      cy.clickDeleteAndCheckResponse();
    }
  );

  it.only("should add Notification and Escalation for Group with all fields, and then delete it", () => {
    cy.fillRadio("IsGroup", "1");
    cy.fillSelect("Grouping Location Type", "Area");
    cy.fillCombobox("Location Code", data.locationCode);
    cy.fillCombobox("Task Code", data.taskCode);
    cy.fillSelect("GroupingOperator", "=");
    cy.fillInput("Number", faker.random.numeric(2));
    cy.fillCombobox("Escalate to Priority", data.escalateToPriority);
    cy.fillInput("CC...", faker.internet.email());
    cy.fillTextarea("Append to Email", faker.random.words(10));
    cy.addFirstItemFromSlideOverTable("Add Priority", "Add Selected");
    cy.fillTextarea("Comment", faker.lorem.sentences(2));
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });
});
