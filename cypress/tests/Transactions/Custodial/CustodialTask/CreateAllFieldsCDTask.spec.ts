import { faker } from "@faker-js/faker";

describe("Create Custodial Task record - negative scenarios, Create and Delete", () => {
  let ID;

  const data = {
    type: "APPA",
    subType: "01",
    pmTaskCode: "2424",
    custodialItem: "APPA - Area's Square Footage",
    associatedTask: "01-31",
  };

  beforeEach("Login to Web app", () => {
    cy.login(Cypress.env("user1"));
  });

  it("Custodial Task - Negative Cases", { tags: "@smoke" }, () => {
    cy.visit("/#!/CDTask/Create");
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Custodial Item");
    cy.clickAndCheckAlert(
      "Save",
      "Type is required\r\nType Description is required\r\n"
    );

    cy.openFlyoutAndSelectRandomValue("Type");
    cy.get("input[aria-label='Custodial Item']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Custodial Item is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Custodial Item");
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");

    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/CDTask/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for CDTask Repair Center Grid\r\n"
    );
  });

  it("Create Custodial Task with Required fields", { tags: "@smoke" }, () => {
    cy.visit("/#!/CDTask/Create");
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.openFlyoutAndSelectRandomValue("Custodial Item");
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });

  it("Create Custodial Task with All fields", () => {
    cy.visit("/#!/CDTask/Create");
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.openFlyoutAndSelectRandomValue("PM Task Code");
    cy.fillNumericTextBox(0, faker.datatype.number(100));
    cy.get("select[aria-label='Frequency']").eq(0).select(2);
    cy.fillNumericTextBox(1, faker.datatype.number(100));
    cy.get("select[aria-label='Frequency']").eq(1).select(2);
    cy.fillNumericTextBox(2, faker.datatype.number(100));
    cy.get("select[aria-label='Frequency']").eq(2).select(2);
    cy.fillNumericTextBox(3, faker.datatype.number(100));
    cy.get("select[aria-label='Frequency']").eq(3).select(2);
    cy.fillNumericTextBox(4, faker.datatype.number(100));
    cy.get("select[aria-label='Frequency']").eq(4).select(2);
    cy.fillNumericTextBox(5, faker.datatype.number(100));
    cy.fillNumericTextBox(6, faker.datatype.number(100));
    cy.openFlyoutAndSelectRandomValue("Custodial Item");
    cy.openFlyoutAndSelectRandomValue("Associated Task");
    cy.get("textarea[aria-label='Additional Instructions']").type(
      faker.random.words(5)
    );
    cy.selectRepairCenter();
    cy.clickAndCheckResponse("Save", "POST", "/CDTask/Create*", 200).then(
      (id) => {
        ID = id;
      }
    );
  });

  it("Delete Custodial Task", () => {
    cy.visit(`/#!/CDTask/${ID}`);
    cy.clickDeleteAndCheckResponse();
  });
});
