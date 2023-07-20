import { faker } from "@faker-js/faker";

const data = {
  accountNumber: "1111 2222 3333 4444",
  partMaterial: "022592031147-1223343",
  technicianCode: "101",
  timeTypeCode: "PARTS",
  workOrderNumber: "1001-1001",
  workOrderNumber2: "123-124",
};

describe("Create a Quick Post Cost Record", { tags: "@smoke" }, () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/QPCost/Create");
  });

  it("should create Quick Post Cost record of type Labor", () => {
    cy.fillCombobox("Work Order #", data.workOrderNumber);
    cy.fillCombobox("Technician Code", data.technicianCode);
    cy.get("[aria-label='Hours'] input").first().type(faker.random.numeric());
    cy.fillCombobox("Account #", data.accountNumber);
    cy.contains("button", "Save").click();
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/QPCost/Create*",
      200,
      "Success",
      true
    );
  });

  it("should create Quick Post Cost record of type Part", () => {
    cy.fillSelect("Cost Type", "Part");

    // fill 'Work Order #' combobox
    cy.get("input[aria-label='Work Order #'][role='combobox'][type='text']")
      .first()
      .as("comboBox")
      .type(data.workOrderNumber);
    cy.wait(500);
    cy.get("@comboBox").should("have.value", data.workOrderNumber);

    cy.fillCombobox("Technician Code", data.technicianCode);
    cy.fillCombobox("Part/Material", data.partMaterial);

    // fill 'Quantity' input
    cy.get("[aria-label='Quantity'] input")
      .first()
      .type(faker.random.numeric(3));
    cy.contains("button", "Save").click();
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/QPCost/Create*",
      200,
      "Success",
      true
    );
  });

  it("should create Quick Post Cost record of type Other", () => {
    cy.fillSelect("Cost Type", "Other");

    // fill 'Work Order #' combobox
    cy.get("input[aria-label='Work Order #'][role='combobox'][type='text']")
      .first()
      .as("comboBox")
      .type(data.workOrderNumber);
    cy.wait(500);
    cy.get("@comboBox").should("have.value", data.workOrderNumber);

    cy.fillInput("Item description", faker.random.words(5));

    // fill 'Quantity' input
    cy.get("[aria-label='Quantity'] input")
      .first()
      .type(faker.random.numeric(3));

    // fill 'Unit Cost' input
    cy.get("[aria-label='Unit Cost'] input")
      .first()
      .type(faker.finance.amount());

    cy.fillCombobox("Account #", data.accountNumber);
    cy.contains("button", "Save").click();
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/QPCost/Create*",
      200,
      "Success",
      true
    );
  });

  // TODO: fix this test
  it.skip("should create Quick Post Cost of type Contractor with required fields", () => {
    cy.fillSelect("Cost Type", "Contractor");
    cy.fillCombobox("Work Order #", data.workOrderNumber2);
  });
});
