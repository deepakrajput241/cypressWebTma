import { faker } from "@faker-js/faker";

describe("Create,Edit,Copy,Delete and Negative a Budget Codes", () => {
  let budgetID;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Budget Code - Negative Cases", { tags: "@smoke" }, () => {
    cy.visit("/#!/Lookup/BudgetCode/Create");
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create New Budget Code", { tags: "@smoke" }, () => {
    cy.visit("/#!/Lookup/BudgetCode/Create");
    cy.EditInputElement("Code", faker.datatype.number(9999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickAndCheckResponse("Save", "POST", "/BudgetCode/Create?*", 200).then(
      (id) => {
        budgetID = id;
      }
    );
  });

  it("Edit Budget Codes data", () => {
    cy.visit(`/#!/Lookup/BudgetCode/${budgetID}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Budget Codes')").should(
      "be.visible"
    );
    cy.wait(500);
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(9999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Copy Budget Codes data", () => {
    cy.visit(`/#!/Lookup/BudgetCode/${budgetID}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Budget Codes')").should(
      "be.visible"
    );
    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(9999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickSaveAndCheckResponse();
  });

  it("Delete Budget Codes data", () => {
    cy.visit(`/#!/Lookup/BudgetCode/${budgetID}`);
    cy.clickDeleteAndCheckResponse();
  });
});
