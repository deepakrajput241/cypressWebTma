import { faker } from "@faker-js/faker";

describe("Create Device Type", () => {
  let deviceID;
  const data = { riskFormula: "Default 2" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Device Type - Negative Cases", { tags: "@smoke" }, () => {
    cy.visit("/#!/Lookup/DeviceType/Create");
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create New Device Type data", { tags: "@smoke" }, () => {
    cy.visit("/#!/Lookup/DeviceType/Create");
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickAndCheckResponse("Save", "POST", "/DeviceType/Create?*", 200).then(
      (id) => {
        deviceID = id;
      }
    );
  });

  it("Create New Device Type data", () => {
    cy.visit("/#!/Lookup/DeviceType/Create");
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.openFlyoutAndSelectRandomValue("Risk Formula");
    cy.fillNumericTextBox(0, faker.datatype.number(10));
    cy.fillNumericTextBox(1, faker.datatype.number(10));
    cy.fillNumericTextBox(2, faker.datatype.number(10));
    cy.EditInputElement("UsageUnit", faker.datatype.number(99));
    //Rates Tab
    cy.contains("Rates").click();
    cy.openFlyoutAndSelectRandomValue("Account");
    cy.fillNumericTextBox(0, faker.datatype.number(10));
    cy.fillNumericTextBox(1, faker.datatype.number(10));
    cy.fillNumericTextBox(2, faker.datatype.number(999));
    cy.fillNumericTextBox(3, faker.datatype.number(9999));
    cy.fillNumericTextBox(4, faker.datatype.number(99999));
    cy.fillNumericTextBox(5, faker.datatype.number(99));
    cy.fillNumericTextBox(6, faker.datatype.number(99));
    cy.fillNumericTextBox(7, faker.datatype.number(99));
    cy.fillNumericTextBox(8, faker.datatype.number(99));
    cy.fillCheckbox("Rentable");
    cy.fillCheckbox("Smoking");
    cy.clickSaveAndCheckResponse();
  });

  it("Edit New Device Type data", () => {
    cy.visit(`/#!/Lookup/DeviceType/${deviceID}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Device Types')").should(
      "be.visible"
    );
    cy.wait(500);
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Copy New Device Type data", () => {
    cy.visit(`/#!/Lookup/DeviceType/${deviceID}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Device Types')").should(
      "be.visible"
    );
    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickSaveAndCheckResponse();
  });

  it("Delete New Device Type data", () => {
    cy.visit(`/#!/Lookup/DeviceType/${deviceID}`);
    cy.clickDeleteAndCheckResponse();
  });
});
