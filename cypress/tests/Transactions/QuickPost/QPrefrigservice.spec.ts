import { faker } from "@faker-js/faker";

describe("Create a Quick Post Refrigerant Service record", () => {
  const data = {
    technicianCode: "101",
    equipmentTagNo: "111",
    cylinderTag: "02dl",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/QPRefrigerantService/Create/Identity");
  });

  it(
    "Create Quick post Refrigerant Service with Required fields",
    { tags: "@smoke" },
    () => {
      cy.getButtonWithText("Cancel").click();
      cy.get("#toolbarAddRefrigerantService").should("be.visible").click();
      cy.openFlyoutAndSelectRandomValue("Technician Code");
      cy.openFlyoutAndSelectRandomValue("Equipment Tag Number");
      cy.openFlyoutAndSelectRandomValue("Cylinder Tag");
      cy.getButtonWithText("Save").click();
      cy.getButton("Save").click();
    }
  );

  it("Create Quick post Refrigerant Service with All fields", () => {
    cy.getButtonWithText("Cancel").click();
    cy.get("#toolbarAddRefrigerantService").should("be.visible").click();
    cy.openFlyoutAndSelectRandomValue("Technician Code");
    cy.openFlyoutAndSelectRandomValue("Equipment Tag Number");
    cy.openFlyoutAndSelectRandomValue("Cylinder Tag");
    cy.EditInputElement("ReferenceNumber", faker.datatype.number(1000));
    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.fillNumericTextBox(1, faker.datatype.number(1000));
    cy.fillNumericTextBox(2, faker.datatype.number(1000));
    cy.editTextarea("Comments", faker.random.words(5));
    cy.getButtonWithText("Save").click();
    cy.getButton("Save").click();
  });
});
