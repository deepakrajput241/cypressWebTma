import { faker } from "@faker-js/faker";

describe("Create Vehicle Transfer record", () => {
  const data = {
    technicianId: "1391",
    repairCenter: "SGQ2EL",
    tag: "0000",
    tagNumber: "294842",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/VehicleTransfer/Create");
  });

  it("Vehicle Transfer - Negative Cases", () => {
    cy.fillCombobox("Technician ID", 1);
    cy.clickAndCheckAlert("Save", "At Least One Item is Required");

    cy.get("a[name='Search']").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/div[1]/div[3]/div/ui-view/div/form/div/div/div[1]/div/div[6]/div/div/div/tma-data-grid/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.clickAndCheckAlert("Save", "Facility is required\r\n");

    cy.fillCombobox("Facility", 1);
    cy.get("input[aria-label='Technician ID']").eq(0).clear();
    cy.clickAndCheckAlert(
      "Save",
      "Technician ID is required\r\nTechnician Name is required\r\n"
    );
  });

  it(
    "Create Vehicle Transfer record with required fields",
    { tags: "@smoke" },
    () => {
      cy.fillCombobox("Technician ID", 1);
      cy.get("a[name='Search']").click();
      cy.selectCheckBoxFromGrid(
        "/html/body/div[1]/div[3]/div/ui-view/div/form/div/div/div[1]/div/div[6]/div/div/div/tma-data-grid/div/div[2]/table/tbody/tr[1]/td[1]/input"
      );
      cy.fillCombobox("Facility", 1);
      cy.clickSaveAndCheckResponse();
    }
  );

  it("Create Vehicle Transfer record with All fields", () => {
    cy.fillCombobox("Technician ID", 1);
    cy.fillCombobox("Repair Center", 1);
    cy.editTextarea("Comments", faker.random.words(5));
    cy.get("a[name='Search']").click().wait(1000);
    cy.selectCheckBoxFromGrid(
      "/html/body/div[1]/div[3]/div/ui-view/div/form/div/div/div[1]/div/div[6]/div/div/div/tma-data-grid/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.fillCombobox("Location ID", 1);
    cy.fillCombobox("Facility", 1);
    cy.fillCombobox("Department", 1);
    cy.fillCombobox("Account", 1);
    cy.fillCombobox("Assigned Tech", 1);
    cy.clickSaveAndCheckResponse();
  });
});
