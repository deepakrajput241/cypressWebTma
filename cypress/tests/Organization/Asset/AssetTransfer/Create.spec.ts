import { faker } from "@faker-js/faker";

const data = {
  account: "1111 2222 3333 4444",
  assignedTech: "101",
  department: "Data Center",
  facility: "12735",
  locationId: "ADMIN-100A",
  technicianId: "101",
};

function fillRequiredFields() {
  cy.fillCombobox("Technician ID", data.technicianId);
  cy.get("a[ng-click='executeSearch()']").click();
  cy.get("tbody input").first().check();
  cy.fillCombobox("Facility", data.facility);
}

// TODO: add reversion of transfer
describe("create Asset Transfer", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/AssetTransfer/Create");
  });

  it("should not create Asset Transfer without required fields", () => {
    // without Technician ID
    fillRequiredFields();
    cy.clearCombobox("Technician ID");
    cy.clickSaveAndCheckAlert(
      "Technician ID is required\r\nTechnician Name is required\r\n"
    );

    // without Asset
    cy.reload();
    cy.fillCombobox("Technician ID", data.technicianId);
    cy.fillCombobox("Facility", data.facility);
    cy.clickSaveAndCheckAlert("At Least One Item is Required");

    // without Facility
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("Facility");
    cy.clickSaveAndCheckAlert("Facility is required\r\n");
  });

  it(
    "should create Asset Transfer with required fields",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();
    }
  );

  it.skip("Create Asset Transfer Record with All fields", () => {
    cy.fillCombobox("Technician ID", 1);
    cy.openFlyoutAndSelectRandomValue("Repair Center");
    cy.editTextarea("Comments", faker.random.words(5));
    cy.get("a[name='Search']").should("be.visible").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/div[1]/div[3]/div/ui-view/div/form/div/div/div[1]/div/div[6]/div/div/div/tma-data-grid/div/div[2]/table/tbody/tr[7]/td[1]/input"
    );
    cy.fillCombobox("Location ID", 1);
    cy.fillCombobox("Facility", 1);
    cy.fillCombobox("Department", 1);
    cy.fillCombobox("Account", 1);
    cy.fillCombobox("Assigned Tech", 1);
    cy.clickSaveAndCheckResponse();
  });
});
