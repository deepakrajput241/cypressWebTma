import { faker } from "@faker-js/faker";

it(
  "Create Purchase Order With Purchse Order Item Details",
  { tags: "@spreadsheet" },
  () => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/PurchaseOrder/Create");

    //Add Purchse Order Line
    cy.get("span[ng-bind='WindowTitle']:contains('Purchase Orders')").should(
      "be.visible"
    );
    cy.openFlyoutAndSelectRandomValue("Vendor Code");
    cy.openFlyoutAndSelectRandomValue("Type Code");
    cy.get("#toolbarAddPurchaseOrderItem").click();
    cy.fillCombobox("Part", 1);
    cy.fillNumericTextBox(2, faker.datatype.number({ min: 1, max: 5 }));
    cy.wait(500);
    cy.getButtonWithText("Save").click();

    // Select Purchase Requisition
    cy.get("#toolbarAddPRPart").click();
    cy.wait(1000);
    cy.selectRandomCheckBoxFromGrid(
      1,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/tma-data-grid/div/div[2]/table/tbody/tr[1]/td[2]/input"
    );
    cy.getButtonWithText("Save").click();

    // Add Understocked Part
    /*
    cy.get("#toolbarAddUnderStocked").click();
    cy.selectRandomCheckBoxFromGrid(
      1,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Save").click();
    */

    // Add Distribution
    cy.get("a[aria-label='Expand']").eq(0).click();
    cy.get("#toolbarAddPurchaseDistrib").click();
    cy.fillCombobox("Distrib Work Order #", 2);
    cy.fillNumericTextBox(2, faker.datatype.number({ min: 1, max: 5 }));
    cy.wait(500);
    cy.getButtonWithText("Save").click();

    cy.clickSaveAndCheckResponse();

    //Click On Receive from Action menu
    cy.wait(500);
    cy.get("div[ng-bind='actionItem.Langstring']").contains("Receive").click();
    cy.fillCombobox("Technician Code", 2);
    cy.fillCombobox("Warehouse Code", 2);
    cy.get("input[ng-model='dataItem.Received']").eq(0).type("1");
    cy.getButtonWithText("Save").click();
  }
);
