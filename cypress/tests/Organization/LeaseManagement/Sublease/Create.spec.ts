import { faker } from "@faker-js/faker";

describe("Create Sublease", () => {
  const data = { lease: "112121" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/SubLease/Create");
  });

  it("Sublease - Negative Cases", () => {
    cy.openFlyoutAndSelectRandomValue("Status");
    cy.clickAndCheckAlert("Save", "Lease # is required\r\n");
  });

  it("Create Sublease with required fields", { tags: "@smoke" }, () => {
    cy.openFlyoutAndSelectRandomValue("Lease #");
    cy.wait(500);
    cy.clickSaveAndCheckResponse();
  });

  it("Create Sublease with All fields", () => {
    cy.openFlyoutAndSelectRandomValue("Lease #");
    cy.fillCheckbox("Payable");
    cy.fillCheckbox("Receivable");
    cy.get("textarea[aria-label='Description']").clear();
    cy.editTextarea("Description", faker.random.words(5));
    cy.openFlyoutAndSelectRandomValue("Status");
    cy.EditInputElement("StatusNote", faker.random.words(1));
    cy.get("input[aria-label='Start Date']").type(
      faker.date.recent().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Rent Due Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Early Termination Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Review Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Close Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Expiration Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Occupied Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );

    cy.contains("Lease Location").click();
    cy.get("#toolbarAddLocation").click();
    cy.selectRandomCheckBoxFromGrid(
      1,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div[3]/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();

    cy.clickSaveAndCheckResponse();
  });
});
