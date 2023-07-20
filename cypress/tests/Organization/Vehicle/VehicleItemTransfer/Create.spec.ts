import { faker } from "@faker-js/faker";

const data = {
  account: "1111 2222 3333 4444",
  assignedTech: "101",
  currentVehicleTagNumber: "102759",
  department: "Data Center",
  locationId: "ADMIN-100A",
  newVehicleTagNumber: "294842",
  repairCenter: "Account Concrete",
  technicianId: "1012",
};

function fillRequiredFields() {
  cy.fillCombobox("Technician ID", data.technicianId);
  cy.fillCombobox("Repair Center", data.repairCenter);
  // the aria-label 'Tag #" is not unique, so we need to use the index
  cy.get(`input[aria-label='Tag #'][type='text']`)
    .eq(0)
    .as("currentVehicleCombobox")
    .type(data.currentVehicleTagNumber);
  cy.get("li")
    .contains(`${data.currentVehicleTagNumber}`)
    .click({ force: true });
  cy.get("@currentVehicleCombobox").should(
    "have.value",
    data.currentVehicleTagNumber
  );
  // click search button to get list of items
  cy.get("a[ng-click='executeSearch()']").click();
  // click first item in the list
  cy.get("tbody input").check();
  // the aria-label 'Tag #" is not unique, so we need to use the index
  cy.get(`input[aria-label='Tag #'][type='text']`)
    .eq(1)
    .as("newVehicleCombobox")
    .type(data.newVehicleTagNumber);
  cy.get("li").contains(`${data.newVehicleTagNumber}`).click({ force: true });
  cy.get("@newVehicleCombobox").should("have.value", data.newVehicleTagNumber);
}
// TODO: come back to this
describe.skip("Create Vehicle Item Transfer", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/VehicleItemTransfer/Create");
  });

  it(
    "should not create Vehicle Item Tranfer without required fields",
    { tags: ["@smoke"] },
    () => {
      // missing Date
      fillRequiredFields();
      cy.clearDateInput("Date");
      cy.clickSaveAndCheckAlert("Date is required\r\n");
      // missing Technician ID
      cy.reload();
      fillRequiredFields();
      cy.wait(500);
      cy.clearCombobox("Technician ID");
      cy.pause();
      cy.clickSaveAndCheckAlert(
        "Technician ID is required\r\nTechnician Name is required\r\n"
      );
      // missing Tranfer Number Repair Center
      // cy.reload();
      // fillRequiredFields();
      // cy.clickSaveAndCheckAlert("Repair Center is required\r\n");
      // missing (Current Vehicle) Tag #
      // cy.reload();
      // fillRequiredFields();
      // cy.clickSaveAndCheckAlert(
      //   "Tag # is required\r\nDescription is required\r\n"
      // );
      // missing Item
      // cy.reload();
      // fillRequiredFields();
      // cy.clickSaveAndCheckAlert("At Least One Item Must Be Selected");
      // missing (New Vehicle) Tag #
      // cy.reload();
      // fillRequiredFields();
    }
  );

  it.skip("create vehicle item transfer record", { tags: "@smoke" }, () => {
    cy.openFlyoutAndSelectRandomValue("Technician ID");
    cy.openFlyoutAndSelectRandomValue("Repair Center");
    cy.get("validation[aria-label='Tag #'] .input-group-btn")
      .eq(0)
      .click()
      .wait(500);
    cy.get("div[validation-panel-filter='ValidationPanelFilter']")
      .find("tr")
      .then((row) =>
        cy
          .get(".k-button.k-button-icontext.k-grid-SelectValue")
          .eq(Cypress._.random(0, row.length - 2))
          .click()
      );
    cy.get("a[name='SetQueryBtn']").click();
    cy.get("validation[aria-label='Tag #'] .input-group-btn")
      .eq(1)
      .click()
      .wait(500);
    cy.get("div[validation-panel-filter='ValidationPanelFilter']")
      .find("tr")
      .then((row) =>
        cy
          .get(".k-button.k-button-icontext.k-grid-SelectValue")
          .eq(Cypress._.random(0, row.length - 2))
          .click()
      );
    cy.clickSaveAndCheckResponse();
  });

  it.skip("reverse vehicle item transfer record", { tags: "@smoke" }, () => {
    cy.openFlyoutAndSelectRandomValue("Technician ID");
    cy.openFlyoutAndSelectRandomValue("Repair Center");
    cy.get("validation[aria-label='Tag #'] .input-group-btn")
      .eq(0)
      .click()
      .wait(500);
    cy.get("div[validation-panel-filter='ValidationPanelFilter']")
      .find("tr")
      .then((row) =>
        cy
          .get(".k-button.k-button-icontext.k-grid-SelectValue")
          .eq(Cypress._.random(0, row.length - 2))
          .click()
      );
    cy.get("a[name='SetQueryBtn']").click();
    cy.get("validation[aria-label='Tag #'] .input-group-btn")
      .eq(1)
      .click()
      .wait(500);
    cy.get("div[validation-panel-filter='ValidationPanelFilter']")
      .find("tr")
      .then((row) =>
        cy
          .get(".k-button.k-button-icontext.k-grid-SelectValue")
          .eq(Cypress._.random(0, row.length - 2))
          .click()
      );
    cy.clickSaveAndCheckResponse();
  });
});
