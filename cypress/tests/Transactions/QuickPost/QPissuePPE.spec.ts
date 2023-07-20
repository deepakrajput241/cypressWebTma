import { faker } from "@faker-js/faker";

describe("Create a Quick Post Issue PPE", { tags: "@smoke" }, () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/QPIssuePPE/Create/Identity");
  });

  it("Create Quick Post Issue PPE with option PPE", () => {
    cy.selectRadioBtnById("ItemTypeId-68");
    cy.fillCombobox("Technician ID", 1);
    cy.fillCombobox("Issuer", 1);
    cy.fillCombobox("Part/Material", 1);
    cy.fillInputTextBox("Quantity", "1");
    cy.get("input[aria-label='Issued']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.EditInputElement("Size", faker.datatype.number(1000));
    cy.editTextarea("Comment", faker.random.words(5));
    cy.getButtonWithText("Save").click();
    cy.getButton("Save").click();
  });

  it("Create Quick Post Issue PPE with option Part", () => {
    cy.selectRadioBtnById("ItemTypeId-119");
    cy.fillCombobox("Technician ID", 1);
    cy.fillCombobox("PPE Item", 1);
    cy.fillInputTextBox("Quantity", "1");
    cy.get("input[aria-label='Issued']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.EditInputElement("Size", faker.datatype.number(1000));
    cy.editTextarea("Comment", faker.random.words(5));
    cy.getButtonWithText("Save").click();
    cy.getButton("Save").click();
  });
});
