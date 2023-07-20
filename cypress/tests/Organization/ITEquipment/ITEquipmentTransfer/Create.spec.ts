import { faker } from "@faker-js/faker";

function selectSearchItem() {
  cy.wait(2000);
  cy.get("div[k-options='gridCtrl.gridOptions']")
    .find("tr")
    .then((row) =>
      cy
        .xpath(
          `/html/body/div[1]/div[3]/div/ui-view/div/form/div/div/div[1]/div/div[6]/div/div/div/tma-data-grid/div/div[2]/table/tbody/tr[${Cypress._.random(
            1,
            row.length - 1
          )}]/td[1]`
        )
        .click()
    );
}

describe("Create New IT Equipment Transfer", () => {
  const data = {
    techId: "101",
    locationId: "ADMIN-100A",
    department: "Data Center",
    accounts: "1111 2222 3333 4444",
    assignedTech: "101",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/ITEquipmentTransfer/Create");
  });

  it("IT Equipment Transfer - Negative Cases", { tags: "@smoke" }, () => {
    cy.fillCombobox("Technician ID", 1);
    cy.fillCombobox("Facility", 1);
    cy.clickAndCheckAlert("Save", "At Least One Item is Required");

    cy.get("a[name='Search']").should("be.visible").click();
    selectSearchItem();
    cy.get("input[aria-label='Technician ID']").eq(0).clear();
    cy.clickAndCheckAlert(
      "Save",
      "Technician ID is required\r\nTechnician Name is required\r\n"
    );

    cy.fillCombobox("Technician ID", 1);
    cy.get("input[aria-label='Facility']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Facility is required\r\n");
  });

  it(
    "Create New IT Equipment Transfer Record with Required fields",
    { tags: "@smoke" },
    () => {
      cy.fillCombobox("Technician ID", 1);
      cy.fillCombobox("Facility", 1);
      cy.get("a[name='Search']").should("be.visible").click();
      selectSearchItem();
      cy.fillCombobox("Facility", 1);
      cy.clickSaveAndCheckResponse();
    }
  );

  it("Create New IT Equipment Transfer with All fields", () => {
    cy.openFlyoutAndSelectRandomValue("Technician ID");
    cy.openFlyoutAndSelectRandomValue("Repair Center");
    cy.editTextarea("Comments", faker.random.words(5));
    cy.get("a[name='Search']").should("be.visible").click();
    selectSearchItem();
    cy.fillCombobox("Location ID", 1);
    cy.fillCombobox("Facility", 1);
    cy.fillCombobox("Department", 1);
    cy.fillCombobox("Account", 1);
    cy.fillCombobox("Assigned Tech", 1);
    cy.clickSaveAndCheckResponse();
  });
});
