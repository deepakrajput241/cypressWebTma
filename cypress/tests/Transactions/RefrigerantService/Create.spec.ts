import { faker } from "@faker-js/faker";

describe("Create Refrigerant Service - negative scenarios, Create and Delete", () => {
  let ID;
  const data = {
    technicianCode: "101",
    equipmentTagNumber: "111",
    cylinderTagNumber: "02dl",
  };

  beforeEach("Login to Web app", () => {
    cy.login(Cypress.env("user1"));
  });

  it("Refrigerant service - Negative Cases", { tags: "@smoke" }, () => {
    cy.visit("/#!/RefrigerantService/Create/Identity");
    cy.openFlyoutAndSelectRandomValue("Equipment Tag Number");
    cy.openFlyoutAndSelectRandomValue("Cylinder Tag");
    cy.clickAndCheckAlert(
      "Save",
      "Technician Code is required\r\nTechnician Name is required\r\n"
    );

    cy.openFlyoutAndSelectRandomValue("Technician Code");
    cy.get("input[aria-label='Equipment Tag Number']").eq(0).clear();
    cy.clickAndCheckAlert(
      "Save",
      "Equipment Tag Number is required\r\nEquipment Name is required\r\n"
    );

    cy.openFlyoutAndSelectRandomValue("Equipment Tag Number");
    cy.get("input[aria-label='Cylinder Tag']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Cylinder Tag is required\r\n");
  });

  it(
    "Create Refrigerant service with Required fields",
    { tags: "@smoke" },
    () => {
      cy.visit("/#!/RefrigerantService/Create/Identity");
      cy.fillCombobox("Technician Code", "Auto_01");
      cy.fillCombobox("Equipment Tag Number", "Auto");
      cy.fillCombobox("Refrigerant Tag Number", "R-101");
      cy.clickSaveAndCheckResponse();
    }
  );

  it("Create Refrigerant service with All Fields", () => {
    cy.visit("/#!/RefrigerantService/Create/Identity");
    cy.openFlyoutAndSelectRandomValue("Technician Code");
    cy.openFlyoutAndSelectRandomValue("Equipment Tag Number");
    cy.openFlyoutAndSelectRandomValue("Cylinder Tag");
    cy.EditInputElement("ReferenceNumber", faker.datatype.number(99999));
    cy.fillNumericTextBox(0, faker.datatype.number(100));
    cy.fillNumericTextBox(1, faker.datatype.number(100));
    cy.fillNumericTextBox(2, faker.datatype.number(100));
    cy.editTextarea("Venting Note", faker.random.words(5));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "RefrigerantService/Create?*",
      200
    ).then((id) => {
      ID = id;
    });
  });

  it("Delete Refrigerant service", () => {
    cy.visit(`/#!/RefrigerantService/${ID}/Identity`);
    cy.clickDeleteAndCheckResponse();
  });
});
