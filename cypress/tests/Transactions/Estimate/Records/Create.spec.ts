import { faker } from "@faker-js/faker";

const data = {
  estimator: "10273383",
  requestor:
    "5th Health Glendale mesh Analy Mouse Borders male Northwest Frozen",
  project: "4523",
  department: "AIED",
  trade: "10813",
  estimateType: "Labor",
  technician: "101",
  budgetCost: faker.datatype.number(100),
  comments: faker.random.words(5),
  details: faker.random.words(5),
  email: faker.internet.email(),
  approvedby: faker.random.words(1),
  phone: faker.phone.number("###-###-####"),
  projectNumber: "4375",
};

function addEstimateEntry() {
  cy.contains("Add Item").click();
  cy.fillCombobox("Trade", data.trade);
  cy.get("[aria-label='Quantity'] input").first().type(faker.random.numeric());
  cy.get("[aria-label='Unit Cost'] input").first().type(faker.random.numeric());
  cy.contains("button", "Save").click();
}

function fillRequiredFields() {
  cy.fillCombobox("Estimator", data.estimator);
  cy.fillSelect("Reference Type", "Project");
  cy.fillCombobox("Reference #", data.projectNumber);
  addEstimateEntry();
}

describe("create Estimate", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("#!/Estimate/Create");
  });

  it("should not create Estimate without required fields", () => {
    // missing Estimator
    fillRequiredFields();
    cy.clearCombobox("Estimator");
    cy.clickSaveAndCheckAlert(
      "Estimator is required\r\nEstimator Name is required\r\n"
    );

    // missing Reference #
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("Reference #");
    cy.clickSaveAndCheckAlert("Reference # is required\r\n");

    // missing Estimate Entry
    cy.reload();
    cy.fillCombobox("Estimator", data.estimator);
    cy.fillSelect("Reference Type", "Project");
    cy.fillCombobox("Reference #", data.projectNumber);
    cy.clickSaveAndCheckAlert(
      " At least 1 record is required for Estimate Items Grid\r\n"
    );
  });

  it(
    "should create Estimate with required fields, and then delete it",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();

      cy.clickDeleteAndCheckResponse();
    }
  );

  it.skip("Create new Estimate Record Data With All Fields", () => {
    cy.openFlyoutAndSelectRandomValue("Estimator");
    cy.openFlyoutAndSelectRandomValue("Requestor Name");
    cy.EditInputElement("RequestorPhone", data.phone);
    cy.EditInputElement("Email", data.email);
    cy.get("select[aria-label='Reference Type']").select(0);
    cy.openFlyoutAndSelectRandomValue("Reference #");
    cy.openFlyoutAndSelectRandomValue("Department");
    cy.get("input[aria-label='Approved Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.EditInputElement("ApprovedBy", data.approvedby);
    cy.get("input[aria-label='Estimate Start']")
      .eq(0)
      .type(new Date().toLocaleDateString("en-US"));
    cy.get(
      "input[aria-label='Estimate End'][k-options='dateTimeCtrl.dateOptions']"
    ).type(faker.date.future().toLocaleDateString("en-US"));
    cy.get("input[aria-label='Actual Start']")
      .eq(0)
      .type(new Date().toLocaleDateString("en-US"));
    cy.get(
      "input[aria-label='Actual End'][k-options='dateTimeCtrl.dateOptions']"
    ).type(faker.date.future().toLocaleDateString("en-US"));
    cy.openFlyoutAndSelectRandomValue("Status");
    cy.EditInputElement("StatusNote", faker.random.word(2));
    cy.wait(1000);
    cy.get("#toolbarAddEstimateItem").should("be.visible").click();
    cy.openFlyoutAndSelectRandomValue("Trade");
    cy.openFlyoutAndSelectRandomValue("Estimate Type");
    cy.openFlyoutAndSelectRandomValue("Technician");
    cy.fillNumericTextBox(0, data.budgetCost);
    cy.fillNumericTextBox(2, data.budgetCost);
    cy.get("textarea[aria-label='Comments']").eq(1).type(faker.random.words(5));
    cy.getButtonWithText("Save").click();
    cy.editTextarea("Comments", data.comments);
    cy.editTextarea("Details", data.details);
    cy.clickAndCheckResponse("Save", "POST", "/Estimate/Create*", 200);
  });
});
