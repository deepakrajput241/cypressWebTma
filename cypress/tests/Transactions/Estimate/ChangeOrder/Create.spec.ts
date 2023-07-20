import { faker } from "@faker-js/faker";

describe("Create Change Order", () => {
  let ID;
  const data = {
    estimator: "Adam Hanson",
    estimateNumber: "1",
    trade: "ADMIN",
    estimateType: "Labor",
    technician: "101",
    budgetCost: faker.datatype.number(100),
    comment: faker.random.words(5),
    detail: faker.random.words(5),
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Change Order - Negative Cases", { tags: "@smoke" }, () => {
    cy.visit("/#!/ChangeOrder/Create");
    cy.openFlyoutAndSelectRandomValue("Estimator");
    cy.openFlyoutAndSelectRandomValue("Estimate #");
    cy.get("input[aria-label='Change Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.clickAndCheckAlert(
      "Save",
      " At least 1 record is required for Change Order Item Grid\r\n"
    );

    cy.get("#toolbarAddChangeOrderItem").should("be.visible").click();
    cy.fillNumericTextBox(0, data.budgetCost);
    cy.fillNumericTextBox(1, data.budgetCost);
    cy.getButtonWithText("Save").click();
    cy.get("input[aria-label='Estimator']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Estimator is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Estimator");
    cy.get("input[aria-label='Estimate #']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Estimate # is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Estimate #");
    cy.get("input[aria-label='Change Date']").clear();
    cy.clickAndCheckAlert("Save", "Change Date is required\r\n");
  });

  it("Create new Change Order With Required Fields", { tags: "@smoke" }, () => {
    cy.visit("/#!/ChangeOrder/Create");
    cy.openFlyoutAndSelectRandomValue("Estimator");
    cy.openFlyoutAndSelectRandomValue("Estimate #");
    cy.get("input[aria-label='Change Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("#toolbarAddChangeOrderItem").should("be.visible").click();
    cy.fillNumericTextBox(0, data.budgetCost);
    cy.fillNumericTextBox(1, data.budgetCost);
    cy.getButtonWithText("Save").click();
    cy.clickSaveAndCheckResponse();
  });

  it("Create new Change Order With All Fields", () => {
    cy.visit("/#!/ChangeOrder/Create");
    cy.openFlyoutAndSelectRandomValue("Estimator");
    cy.openFlyoutAndSelectRandomValue("Estimate #");
    cy.get("input[aria-label='Estimate Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Change Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("#toolbarAddChangeOrderItem").should("be.visible").click();
    cy.openFlyoutAndSelectRandomValue("Trade");
    cy.openFlyoutAndSelectRandomValue("Estimate Type");
    cy.openFlyoutAndSelectRandomValue("Technician");
    cy.fillNumericTextBox(0, data.budgetCost);
    cy.fillNumericTextBox(1, data.budgetCost);
    cy.fillNumericTextBox(2, data.budgetCost);
    cy.get("textarea[aria-label='Comments']").eq(1).type(data.comment);
    cy.getButtonWithText("Save").click();
    cy.editTextarea("Comments", data.comment);
    cy.get("textarea[aria-label='Details']").type(data.detail);
    cy.clickAndCheckResponse("Save", "POST", "/ChangeOrder/Create*", 200).then(
      (id) => {
        ID = id;
      }
    );
  });

  it("Delete Change Order", () => {
    cy.visit(`/#!/ChangeOrder/${ID}`);
    cy.clickDeleteAndCheckResponse();
  });
});
