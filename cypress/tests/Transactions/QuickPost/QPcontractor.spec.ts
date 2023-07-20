import { faker } from "@faker-js/faker";
describe("Create Quick Post Contractor", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/QPContractor/Create/Identity");
  });

  it(
    "Create Quick post Contractor with Required fields",
    { tags: "@smoke" },
    () => {
      cy.fillCombobox("Work Order #", "SGQ2EL-2000");
      cy.fillInput("Description", "Auto Test");
      cy.fillInput("Quantity", "12");
      cy.fillInput("ContractorRate", "2");
      cy.openFlyoutAndSelectRandomValue("Account");
      cy.getButtonWithText("Save").click();
      cy.getButton("Save").click();
    }
  );

  it("Create Quick Post Contractor with All fields", () => {
    cy.wait(1000);
    cy.fillCombobox("Work Order #", "SGQ2EL-2000");
    cy.fillInput("Description", "Auto Test");
    cy.fillInput("Quantity", "12");
    cy.fillInput("Contractor Rate", "2");
    cy.openFlyoutAndSelectRandomValue("Account");
    cy.get(
      "input[aria-label='Arrival'][k-options='dateTimeCtrl.dateOptions']"
    ).type(faker.date.future().toLocaleDateString("en-US"));
    cy.get(
      "input[aria-label='Departure'][k-options='dateTimeCtrl.dateOptions']"
    ).type(faker.date.future().toLocaleDateString("en-US"));
    cy.fillCheckbox("No Charge");
    cy.fillCheckbox("Taxable");
    cy.get(
      "input[aria-label='Finish Date'][k-options='dateTimeCtrl.dateOptions']"
    ).type(faker.date.future().toLocaleDateString("en-US"));
    cy.get(
      "input[aria-label='Completion Date'][k-options='dateTimeCtrl.dateOptions']"
    ).type(faker.date.future().toLocaleDateString("en-US"));
    cy.fillCheckbox("Work Not Done");
    cy.fillCheckbox("Not Located");
    cy.fillCheckbox("Failed PM");
    cy.editTextarea("Comment", faker.random.words(5));
    cy.editTextarea("General Comment", faker.random.words(5));
    cy.getButtonWithText("Save").click();
    cy.getButton("Save").click();
  });
});
