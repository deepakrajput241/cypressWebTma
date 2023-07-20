import { faker } from "@faker-js/faker";
const data = {
  budgetCost: faker.datatype.number(100),
  comment: faker.random.words(5),
  detail: faker.random.words(5),
};

describe("Copy, Edit, Delete Change Order", () => {
  let ID;

  beforeEach("Login to Web app", () => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Change Order With Required Fields", () => {
    cy.visit("/#!/ChangeOrder/1000/Identity");

    cy.getButton("Copy").click();
    cy.openFlyoutAndSelectRandomValue("Estimator");
    cy.openFlyoutAndSelectRandomValue("Estimate #");
    cy.get(".glyphicons.glyphicons-edit").should("be.visible").click();
    cy.get(".k-formatted-value.k-input.ng-scope").eq(0).clear();
    cy.get(".k-formatted-value.k-input.ng-scope").eq(1).clear();
    cy.fillNumericTextBox(0, data.budgetCost);
    cy.fillNumericTextBox(1, data.budgetCost);
    cy.getButtonWithText("Save").click();
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "ChangeOrder/Create?copyId=?*",
      200
    ).then((id) => {
      ID = id;
    });
  });

  it("Edit Change Order With Required Fields", () => {
    cy.visit(`/#!/ChangeOrder/${ID}/Identity`);
    cy.getButton("Edit").click();
    cy.openFlyoutAndSelectRandomValue("Estimator");
    cy.openFlyoutAndSelectRandomValue("Estimate #");
    cy.get(".glyphicons.glyphicons-edit").should("be.visible").click();
    cy.get(".k-formatted-value.k-input.ng-scope").eq(0).clear();
    cy.get(".k-formatted-value.k-input.ng-scope").eq(1).clear();
    cy.fillNumericTextBox(0, data.budgetCost);
    cy.fillNumericTextBox(1, data.budgetCost);
    cy.getButtonWithText("Save").click();
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Delete Change Order", () => {
    cy.visit(`/#!/ChangeOrder/${ID}/Identity`);
    cy.clickDeleteAndCheckResponse();
  });
});
