import { faker } from "@faker-js/faker";

describe("Craete Biomed Transfer", () => {
  const data = {
    technicianId: "101",
    locationId: "ADMIN-110",
    department: "Wellness",
    account: "1111 2222 3333 4444",
    assignedTech: "101",
    ownerDept: "Account Centers",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/CEEquipmentTransfer/Create");
  });

  it("Biomed Transfer - Negative Cases", () => {
    cy.openFlyoutAndSelectRandomValue("Repair Center");
    cy.clickAndCheckAlert("Save", "At Least One Item is Required");

    cy.openFlyoutAndSelectRandomValue("Technician ID");
    cy.get("a[name='Search']").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/div[1]/div[3]/div/ui-view/div/form/div/div/div[1]/div/div[6]/div/div/div/tma-data-grid/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.clickAndCheckAlert("Save", "Facility is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Facility");
    cy.get("input[aria-label='Technician ID']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Technician ID is required\r\n");
  });

  it("Create Biomed Transfer with required fields", { tags: "@smoke" }, () => {
    cy.openFlyoutAndSelectRandomValue("Technician ID");
    cy.get("a[name='Search']").click();
    cy.fillCombobox("Facility", "Automation Facility");
    cy.get("[ng-change='gridCtrl.AddSelectedPK(dataItem)']").eq(0).click();
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/CEEquipmentTransfer/Create*",
      200
    );
  });

  it("Create Biomed Transfer with All fields", () => {
    cy.fillCombobox("Technician ID", 1);
    cy.fillCombobox("Repair Center", 1);
    cy.editTextarea("Comments", faker.random.words(5));
    cy.get("a[name='Search']").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/div[1]/div[3]/div/ui-view/div/form/div/div/div[1]/div/div[6]/div/div/div/tma-data-grid/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.fillCombobox("Location ID", 1);
    cy.fillCombobox("Account", 1);
    cy.fillCombobox("Assigned Tech", 1);
    cy.clickSaveAndCheckResponse();
  });
});
