import { faker } from "@faker-js/faker";

const data = {
  routeType: "Repair Center",
  userCode: "2147736973",
};

function fillRequiredFields() {
  cy.fillInput("Code", faker.random.numeric(7));
  cy.setWait();
  cy.fillInput("Description", faker.random.words(5));
}

// Authorizer is not a required field
function addAuthorizer() {
  cy.contains("Add Authorizer").click();
  cy.fillNumericTextBoxInput("Order", faker.random.numeric(3));
  cy.fillSelect("ddlRouteType", data.routeType);
  cy.fillCombobox("User Code", data.userCode);
  cy.contains("button", "Save").click();
}

describe("add Authorization Route", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/AuthorizationRoutes/Create");
  });

  it("should not add Authorization Route without required fields", () => {
    // missing Code
    fillRequiredFields();
    cy.clearInput("Code");
    cy.clickSaveAndCheckAlert("Code is required\r\n");

    // missing Description
    cy.reload();
    fillRequiredFields();
    cy.clearInput("Description");
    cy.clickSaveAndCheckAlert("Description is required\r\n");
  });

  it(
    "should add Authorization Route with required fields, and then delete it",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();

      cy.clickDeleteAndCheckResponse();
    }
  );

  it("should add Authorization Route with all fields, and then delete it", () => {
    cy.fillInput("Code", faker.random.numeric(7));
    cy.setWait();
    cy.fillNumericTextBoxInput(
      "Lower Limit",
      faker.datatype.number({ min: 10, max: 100, precision: 0.01 }).toString()
    );
    cy.fillInput("Description", faker.random.words(5));
    cy.fillNumericTextBoxInput(
      "Upper Limit",
      faker.datatype.number({ min: 100, max: 1000, precision: 0.01 }).toString()
    );
    addAuthorizer();
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });
});
