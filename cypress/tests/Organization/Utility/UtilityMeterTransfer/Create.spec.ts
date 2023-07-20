import { faker } from "@faker-js/faker";

const data = { facility: "12735", technicianId: "101" };

function fillRequiredFields() {
  cy.fillCombobox("Technician ID", data.technicianId);
  cy.get("a[ng-click='executeSearch()']").click();
  cy.get("tbody input").first().check();
  cy.fillCombobox("Facility", data.facility);
}

describe("create Utility Meter Transfer", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/UtilityMeterTransfer/Create");
  });

  it("should not create Utility Meter Transfer without required fields", () => {
    // without Technician ID
    fillRequiredFields();
    cy.clearCombobox("Technician ID");
    cy.clickSaveAndCheckAlert(
      "Technician ID is required\r\nTechnician Name is required\r\n"
    );

    // without Meter
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
    "should create Utility Meter Transfer with required fields, and then delete it",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();

      cy.clickDeleteAndCheckResponse();
    }
  );

  it.skip("Create Utility Meter Transfer record with All fields", () => {
    cy.fillCombobox("Technician ID", 1);
    cy.fillCombobox("Repair Center", 1);
    cy.editTextarea("Comments", faker.random.words(5));
    cy.get("a[name='Search']").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/div[1]/div[3]/div/ui-view/div/form/div/div/div[1]/div/div[6]/div/div/div/tma-data-grid/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.fillCombobox("Location ID", 1);
    cy.fillCombobox("Facility", 1);
    cy.clickSaveAndCheckResponse();
  });
});
