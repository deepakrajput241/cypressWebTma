import { faker } from "@faker-js/faker";

describe("Create Equipment Transfer", () => {
  const data = {
    technicianId: "101",
    locationId: "ADMIN-100A",
    account: "1111 2222 3333 4444",
    assignedTech: "126875",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/EquipmentTransfer/Create");
  });

  it("Equipment Transfer - Negative Cases", () => {
    cy.openFlyoutAndSelectRandomValue("Repair Center");
    cy.clickAndCheckAlert("Save", "At Least One Item is Required");

    cy.get("a[name='Search']").click().wait(1500);
    cy.selectCheckBoxFromGrid(
      "/html/body/div[1]/div[3]/div/ui-view/div/form/div/div/div[1]/div/div[6]/div/div/div/tma-data-grid/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.fillCombobox("To Facility Name", "Automation Facility");
    cy.clickAndCheckAlert(
      "Save",
      "Technician ID is required\r\nTechnician Name is required\r\n"
    );

    cy.openFlyoutAndSelectRandomValue("Technician ID");
    cy.get("input[aria-label='Facility']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Facility is required\r\n");
  });

  it(
    "Create Equipment Transfer with required fields",
    { tags: "@smoke" },
    () => {
      cy.openFlyoutAndSelectRandomValue("Technician ID");
      cy.EditInputElement("SearchCriteria", "Auto");
      cy.get("a[name='Search']").click();
      cy.selectCheckBoxFromGrid(
        "/html/body/div[1]/div[3]/div/ui-view/div/form/div/div/div[1]/div/div[6]/div/div/div/tma-data-grid/div/div[2]/table/tbody/tr[1]/td[1]/input"
      );
      cy.fillCombobox("To Facility Name", "Automation Facility");
      cy.clickSaveAndCheckResponse();
    }
  );

  it("Create Equipment Transfer with All fields", () => {
    cy.fillCombobox("Technician ID", 1);
    cy.fillCombobox("Repair Center", 1);
    cy.editTextarea("Comments", faker.random.words(5));
    cy.EditInputElement("SearchCriteria", "Auto");
    cy.get("a[name='Search']").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/div[1]/div[3]/div/ui-view/div/form/div/div/div[1]/div/div[6]/div/div/div/tma-data-grid/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.fillCombobox("Location ID", 1);
    cy.fillCombobox("Department", 1);
    cy.fillCombobox("Account", 1);
    cy.fillCombobox("Assigned Tech", 1);

    cy.clickSaveAndCheckResponse();
  });
});
