import { faker } from "@faker-js/faker";

describe("Create Custodial Inspection form - negative scenarios, Create and Delete", () => {
  let ID;
  const data = {
    typeCode: "148264",
    subtypeCode: "400217",
    resultTypeCode: "001",
    requestTypeCode: "BAS",
    repairCenterCode: "FAC",
    route: "444",
    area: "TRAN-1101",
    repairCenter: "FAC",
    rating: "2",
    inspector: "101",
  };

  beforeEach("Login to Web app", () => {
    cy.login(Cypress.env("user1"));
  });

  it("Custodial Inspection Form -Negative Cases", { tags: "@smoke" }, () => {
    cy.visit("/#!/CDInspectionForm/Create");
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.wait(1000);
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Type Code");
    cy.clickAndCheckAlert(
      "Save",
      "Repair Center Code is required\r\nRepair Center Name is required\r\n"
    );

    cy.openFlyoutAndSelectRandomValue("Repair Center Code");
    cy.get("input[aria-label='Type Code']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Type Code is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Type Code");
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");

    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/CDInspectionForm/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for CD Inspection Form Repair Center Grid\r\n"
    );
  });

  it(
    "Create Custodial Inspection Form with Required fields",
    { tags: "@smoke" },
    () => {
      cy.visit("/#!/CDInspectionForm/Create");
      cy.EditInputElement("Code", faker.datatype.number(99999));
      cy.EditInputElement("Description", faker.random.words(2));
      cy.openFlyoutAndSelectRandomValue("Type Code");
      cy.openFlyoutAndSelectRandomValue("Repair Center Code");
      cy.selectRepairCenter();
      cy.clickSaveAndCheckResponse();

      cy.clickDeleteAndCheckResponse();
    }
  );

  it("Create Custodial Inspection Form with All fields", () => {
    cy.visit("/#!/CDInspectionForm/Create");
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Type Code");
    cy.openFlyoutAndSelectRandomValue("Result Type Code");
    cy.openFlyoutAndSelectRandomValue("Request Type Code");
    cy.get("input[aria-label='Next Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.openFlyoutAndSelectRandomValue("Repair Center Code");
    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.get("select[aria-label='Due Every']").select(
      Math.floor(Math.random() * 5)
    );
    cy.fillNumericTextBox(1, faker.datatype.number(1000));
    cy.get("#toolbarAddRoute").should("be.visible").click();
    cy.wait(1500);
    cy.get(".k-grid-content.k-auto-scrollable")
      .find("tr")
      .then((row) =>
        cy
          .get("input[ng-model='dataItem.selected']")
          .eq(Cypress._.random(0, row.length))
          .click()
      );
    cy.get("a[ng-click='saveSelection()']").should("be.visible").click();
    cy.get("#toolbarAddArea").should("be.visible").click();
    cy.wait(1500);
    cy.get(".k-grid-content.k-auto-scrollable")
      .find("tr")
      .then((row) =>
        cy
          .get("input[ng-model='dataItem.selected']")
          .eq(Cypress._.random(0, row.length))
          .click()
      );
    cy.get("a[ng-click='customSave()']").should("be.visible").click();
    cy.selectRepairCenter();
    cy.contains("Rating").click();
    cy.get("#toolbarAddRating").should("be.visible").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.get("a[ng-click='saveSelection()']").should("be.visible").click();
    cy.contains("Inspector").click();
    cy.get("#toolbarAddInspector").should("be.visible").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.get("a[ng-click='saveSelection()']").should("be.visible").click();
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "CDInspectionForm/Create*",
      200
    ).then((id) => {
      ID = id;
    });
  });

  it("Delete Custodial Inspection Form", () => {
    cy.visit(`/#!/CDInspectionForm/${ID}`);
    cy.clickDeleteAndCheckResponse();
  });
});
