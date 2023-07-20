import { faker } from "@faker-js/faker";

describe("Create New Asset Type", () => {
  let assetId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Asset Type - Negative Cases", { tags: "@smoke" }, () => {
    cy.visit("/#!/Lookup/AssetType/Create");
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");

    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/AssetType/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for Asset Type Repair Center Grid\r\n"
    );
  });

  it("Create New Asset Type with Required Fields", { tags: "@smoke" }, () => {
    cy.visit("/#!/Lookup/AssetType/Create");
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });

  it("Create New Asset Type with All Fields", () => {
    cy.visit("/#!/Lookup/AssetType/Create");
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.get("#toolbarAddSubType").should("be.visible").click();
    cy.get("input[name='Code']").eq(1).type(faker.datatype.number(9999999));
    cy.get("input[name='Description']").eq(1).type(faker.random.words(2));
    cy.getButtonWithText("Save").click();
    cy.openFlyoutAndSelectRandomValue("UniFormat Description");
    cy.fillNumericTextBox(0, faker.datatype.number(99));
    cy.fillNumericTextBox(1, faker.datatype.number(10));
    cy.EditInputElement("UsageUnit", faker.datatype.number(99));

    cy.selectRepairCenter();

    cy.contains("Rates").click();
    cy.fillNumericTextBox(0, faker.datatype.number(99));
    cy.fillNumericTextBox(1, faker.datatype.number(10));
    cy.fillNumericTextBox(2, faker.datatype.number(999));
    cy.fillNumericTextBox(3, faker.datatype.number(9999));
    cy.fillNumericTextBox(4, faker.datatype.number(99999));
    cy.fillNumericTextBox(5, faker.datatype.number(99));
    cy.fillNumericTextBox(6, faker.datatype.number(99));
    cy.fillNumericTextBox(7, faker.datatype.number(99));
    cy.fillNumericTextBox(8, faker.datatype.number(99));
    cy.openFlyoutAndSelectRandomValue("Account");
    cy.fillCheckbox("Rentable");
    cy.fillCheckbox("Smoking");

    cy.clickAndCheckResponse("Save", "POST", "/AssetType/Create?*", 200).then(
      (id) => {
        assetId = id;
      }
    );
  });

  it("Edit Asset Type Data", () => {
    cy.visit(`/#!/Lookup/AssetType/${assetId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Asset Type')").should(
      "be.visible"
    );
    cy.wait(500);
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Copy Asset Type Data", () => {
    cy.visit(`/#!/Lookup/AssetType/${assetId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Asset Type')").should(
      "be.visible"
    );
    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAndCheckResponse();
  });

  it("Delete Asset Type Data", () => {
    cy.visit(`/#!/Lookup/AssetType/${assetId}`);
    cy.clickDeleteAndCheckResponse();
  });
});
