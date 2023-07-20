import { faker } from "@faker-js/faker";

function checkData() {
  cy.wait(2000);
  cy.get(
    `validation[aria-label='Sub-Report Primary Link'] .input-group-btn`
  ).click();
  cy.wait(2000);
  cy.get(".k-grid-content.k-auto-scrollable").then((data) => {
    if (data.find("tr").length > 0) {
      cy.wait(2000);
      cy.get("a[ng-click='cancel()']").eq(1).click();
      cy.openFlyoutAndSelectRandomValue("Sub-Report Primary Link");
      cy.openFlyoutAndSelectRandomValue("Report Primary Link");
      cy.get("a[ng-click='customSave()']").click();
    } else {
      cy.wait(2000);
      cy.get("a[ng-click='cancel()']").eq(1).click();
      cy.log("Nothing to display");
      cy.openFlyoutAndSelectRandomValue("Sub-report");
      checkData();
    }
  });
}

function selectFields() {
  cy.wait(1000);
  cy.get(".k-grid-content.k-auto-scrollable")
    .find("tr")
    .then((row) => {
      for (var i = 1; i <= 5; i++) {
        cy.wait(1000);
        cy.get("input[ng-model='dataItem.selected']").eq(i).click();
      }
    });
  cy.get("a[aria-label='Add Label']").click();
}

it("Create Custom Report", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Report/Create");
  cy.EditInputElement("RptTitle", faker.datatype.number(1000));
  cy.fillCombobox("Report Form", "Accounts");
  cy.openFlyoutAndSelectRandomValue("Access by Repair Center");
  cy.openFlyoutAndSelectRandomValue("Report Category");
  cy.fillCombobox("Window Toolbar", "Accounts");
  cy.fillTextarea("Comments", faker.random.words(25));
  cy.wait(2000);

  cy.contains("Options").click();
  cy.get("#toolbarReportGroupAdd").click();
  cy.selectRandomCheckBoxFromGrid(
    3,
    "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/tma-data-grid/div/div[2]/table/tbody/tr[1]/td[1]/input"
  );
  cy.get("a[ng-click='customSave()']").click();

  cy.wait(500);
  cy.get("#toolbarReportSortAdd").click();
  cy.selectRandomCheckBoxFromGrid(
    3,
    "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/tma-data-grid/div/div[2]/table/tbody/tr[1]/td[1]/input"
  );
  cy.get("a[ng-click='customSave()']").click();

  cy.wait(500);
  cy.get("#toolbarReportSummaryAdd").click();
  cy.EditInputElement("SummaryTitle", faker.random.words(2));
  cy.get("select[aria-label='Type']").select(5);
  cy.get("a[ng-click='saveRecord()']").click().wait(1000);

  cy.wait(1000);
  cy.contains("Layout").click();
  cy.fillNumericTextBox(0, "2");
  cy.get("input[name='btnReportProperties']").click().wait(2000);
  cy.get("select[aria-label='Page Format']").select(1);
  cy.fillCheckbox("Show Company Name");
  cy.fillCheckbox("Show Company Logo");
  cy.fillCheckbox("Default Report Title");
  cy.fillCheckbox("Hide Header and Footer");
  cy.fillCheckbox("Grid");
  cy.fillCheckbox("Default Template");
  cy.fillCheckbox("Center Alignment");
  cy.fillCheckbox("Row Line Separator");
  cy.fillCheckbox("Header Line Separator");
  cy.fillCheckbox("Footer Line Separator");
  cy.fillCheckbox("Group Header Line Separator");
  cy.fillCheckbox("Group Footer Line Separator");
  cy.get("a[ng-click='saveRecord()']").click();

  cy.wait(500);
  cy.get("input[name='btnSelectFields']").click();
  selectFields();

  cy.wait(500);
  cy.get("input[name='btnAddLabel']").click();
  cy.get('span[class="k-widget k-combobox k-combobox-clearable"]')
    .type("Repair Center")
    .click("bottomLeft", { force: true });
  cy.EditInputElement("Title", "Test Repair Center");
  cy.get("a[ng-click='customSave()']").click();

  cy.wait(500);
  cy.get("input[name='btnAddSubReport']").click().wait(2000);
  cy.selectRadioBtnById("UserSystem-1");
  cy.openFlyoutAndSelectRandomValue("Sub-report");
  checkData();
  cy.clickSaveAndCheckResponse();
});
