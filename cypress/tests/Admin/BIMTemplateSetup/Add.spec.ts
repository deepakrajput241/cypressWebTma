import { faker } from "@faker-js/faker";

const data = {
  category: "Level",
  defaultType: "Auto-Account",
  itemType: "Floor",
  repairCenter: "Auto-01",
};

function addCategoryMapping() {
  cy.contains("Add Category Mapping").click();
  cy.fillCombobox("Category", data.category);
  cy.fillSelect("Item Type", data.itemType);
  cy.fillInput("Tag Parameter", faker.random.words(2));
  cy.fillCombobox("Default Type", data.defaultType);
  cy.contains("button", "Save").click();
}

function addRepairCenter() {
  cy.contains("Repair Centers").click();
  cy.addRepairCenter();
}

function fillRequiredFields() {
  cy.fillInput("Name  ", faker.company.name());
  addRepairCenter();
}

describe("add BIM Template Setup", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("#!/BIMTemplateSetup/Create");
  });

  it("should not add BIM Template Setup without required fields", () => {
    // missing Name
    fillRequiredFields();
    cy.contains("Identity").click();
    cy.clearInput("Name  ");
    cy.clickSaveAndCheckAlert("Name   is required\r\n");

    // missing Repair Center
    cy.reload();
    fillRequiredFields();
    // delete Repair Center
    cy.get("tbody a:first").click();
    cy.clickSaveAndCheckAlert(" At least 1 record is required for RC Code\r\n");
  });

  it(
    "should add BIM Template Setup with required fields, and then delete it",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();

      cy.clickDeleteAndCheckResponse();
    }
  );

  it("should add BIM Template Setup with all fields, and then delete it", () => {
    cy.fillInput("Name  ", faker.company.name());
    cy.setWait();
    cy.editTextarea("Description", faker.random.words(10));
    addCategoryMapping();
    addRepairCenter();
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });
});
