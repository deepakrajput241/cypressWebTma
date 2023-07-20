import { faker } from "@faker-js/faker";

describe("Create a Quick Post Training Request", () => {
  const data = {
    workOrder: "123-123",
    technicianCode: "101",
    classCode: "0000",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/QPTrainingRequest/Create/Identity");
  });

  it(
    "Create Quick Post Training Request with Required fields",
    { tags: "@smoke" },
    () => {
      cy.fillCombobox("Technician Code", "1");
      cy.fillTextarea("Comments", "Auto test");
      cy.getButtonWithText("Save").click();
      cy.intercept("POST", "/QPTrainingRequest/Create?*").as("createNewRecord");
      cy.getButton("Save").click();
      cy.wait("@createNewRecord").its("response.statusCode").should("eq", 200);
    }
  );

  it("Create Quick Post Training Request with All fields", () => {
    cy.fillCombobox("Work Order #", "1");
    cy.fillCombobox("Technician Code", "1");
    cy.fillCombobox("Program ID", "1");
    cy.get("select[aria-label='Item Dropdown List']").select(1);
    cy.fillCombobox("Task Type Code", "1");
    cy.EditInputElement("Email", faker.internet.email());
    cy.editTextarea("Comments", faker.random.words(5));
    cy.getButtonWithText("Save").click();
    cy.intercept("POST", "/QPTrainingRequest/Create?*").as("createNewRecord");
    cy.getButton("Save").click();
    cy.wait("@createNewRecord").its("response.statusCode").should("eq", 200);
  });
});
