import { faker } from "@faker-js/faker";

describe("Create Weather record", () => {
  const data = { stationCode: "Auto-77" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Weather/Create");
  });

  it("Weather - Negative Cases", () => {
    //Without Month
    cy.openFlyoutAndSelectRandomValue("Station Code");
    cy.fillNumericTextBox(0, new Date().getFullYear());
    cy.fillNumericTextBox(1, faker.datatype.number(99999));
    cy.clickAndCheckAlert("Save", "Month is required\r\n");

    //Without Year
    cy.get("select[aria-label='Month']").select(
      new Date().toLocaleString("default", { month: "long" })
    );
    cy.get(".k-formatted-value.k-input.ng-scope").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Year is required\r\n");

    // Without Base Temp
    cy.get(".k-formatted-value.k-input.ng-scope").eq(1).clear();
    cy.fillNumericTextBox(0, new Date().getFullYear());
    cy.clickAndCheckAlert("Save", "Base Temp is required\r\n");

    //Without Station Code
    cy.fillNumericTextBox(1, faker.datatype.number(99999));
    cy.get("input[aria-label='Station Code']").eq(0).clear();
    cy.clickAndCheckAlert(
      "Save",
      "Station Code is required\r\nStation Description is required\r\n"
    );
  });

  it("Create Weather record with required fields", { tags: "@smoke" }, () => {
    cy.openFlyoutAndSelectRandomValue("Station Code");
    cy.fillNumericTextBox(0, new Date().getFullYear());
    cy.fillNumericTextBox(1, faker.datatype.number(99999));
    cy.get("select[aria-label='Month']").select(
      new Date().toLocaleString("default", { month: "long" })
    );
    cy.getButton("Save").click();

    cy.clickDeleteAndCheckResponse();
  });

  it("create Weather record with All fields", () => {
    cy.openFlyoutAndSelectRandomValue("Station Code");
    cy.fillNumericTextBox(0, new Date().getFullYear());
    cy.fillNumericTextBox(1, faker.datatype.number(99999));
    cy.get("select[aria-label='Month']").select(
      new Date().toLocaleString("default", { month: "long" })
    );
    cy.get("#toolbarAddReading").click();
    cy.fillNumericTextBox(2, faker.datatype.number(7));
    cy.fillNumericTextBox(3, faker.datatype.number({ min: 25, max: 40 }));
    cy.fillNumericTextBox(4, faker.datatype.number({ min: 10, max: 24 }));
    cy.fillNumericTextBox(5, faker.datatype.number({ min: 15, max: 30 }));
    cy.fillNumericTextBox(6, faker.datatype.number({ min: 15, max: 30 }));
    cy.fillNumericTextBox(7, faker.datatype.number({ min: 15, max: 30 }));
    cy.fillNumericTextBox(8, faker.datatype.number(99999));
    cy.fillNumericTextBox(9, faker.datatype.number({ min: 15, max: 30 }));
    cy.fillNumericTextBox(10, faker.datatype.number({ min: 15, max: 30 }));
    cy.getButtonWithText("Save").click();
    cy.getButton("Save").click();

    cy.clickDeleteAndCheckResponse();
  });
});
