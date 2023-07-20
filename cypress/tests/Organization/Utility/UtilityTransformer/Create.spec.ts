import { faker } from "@faker-js/faker";

describe("Create Utility Transformer", () => {
  const data = { repairCenter: "SGQ2EL" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/UtilityTransformer/Create");
  });

  it("Utility Transformer - Negative Cases", () => {
    //Without Capacity
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.fillNumericTextBox(1, faker.datatype.number(1000));
    cy.EditInputElement("Location", faker.address.city());
    cy.clickAndCheckAlert("Save", "Capacity is required\r\n");

    //Without Load Factor
    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.get(".k-formatted-value.k-input.ng-scope").eq(1).clear();
    cy.clickAndCheckAlert("Save", "Load Factor is required\r\n");

    //Without Location
    cy.get("input[name='Location']").clear();
    cy.fillNumericTextBox(1, faker.datatype.number(1000));
    cy.clickAndCheckAlert("Save", "Location is required\r\n");

    //Without Description
    cy.EditInputElement("Location", faker.address.city());
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");

    //Without Code
    cy.EditInputElement("Description", faker.random.words(2));
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");
  });

  it(
    "Create Utility Transformer record with required fields",
    { tags: "@smoke" },
    () => {
      cy.EditInputElement("Code", faker.datatype.number(99999999));
      cy.EditInputElement("Description", faker.random.words(2));
      cy.fillNumericTextBox(0, faker.datatype.number(1000));
      cy.fillNumericTextBox(1, faker.datatype.number(1000));
      cy.EditInputElement("Location", faker.address.city());
      cy.editTextarea("Comment", faker.random.words(5));
      cy.clickSaveAndCheckResponse();
    }
  );

  it("Create Utility Transformer record with All fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.fillNumericTextBox(1, faker.datatype.number(1000));
    cy.EditInputElement("Location", faker.address.city());
    cy.editTextarea("Comment", faker.random.words(5));
    cy.openFlyoutAndSelectRandomValue("Repair Center");
    cy.editTextarea("Comment", faker.random.words(5));
    cy.clickSaveAndCheckResponse();
  });
});
