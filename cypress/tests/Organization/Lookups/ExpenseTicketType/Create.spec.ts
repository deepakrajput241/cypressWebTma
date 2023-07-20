import { faker } from "@faker-js/faker";

describe("Create Expense Ticket Type record", () => {
  const data = { budgetCode: "Auto-7180" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/ExpenseTicketType/Create/Identity");
  });

  it("Expense Ticket Type - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.clickAndCheckAlert("Save", "Description is required\r\n");

    cy.EditInputElement("Description", faker.random.words(2));
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");
  });

  it(
    "Create Expense Ticket Type with Required fields",
    { tags: "@smoke" },
    () => {
      cy.EditInputElement("Code", `Auto-${faker.datatype.number(99999)}`);
      cy.EditInputElement("Description", faker.random.words(1));
      cy.clickSaveAndCheckResponse();
    }
  );
});
