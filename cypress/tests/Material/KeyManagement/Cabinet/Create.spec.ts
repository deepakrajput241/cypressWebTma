import { faker } from "@faker-js/faker";

const data = {
  locationId: "Auto-BD-01-Automation-Area1",
};

describe("should create cabinets", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("#!/KeyCabinet/Create");
  });

  it(
    "should not create record without required fields",
    { tags: "@smoke" },
    () => {
      cy.EditInputElement("TagNumber", faker.datatype.number(999999999));
      cy.EditInputElement("Description", faker.random.words(5));
      cy.clickAndCheckAlert("Save", "Location ID is required\r\n");

      cy.fillCombobox("Location ID", 2);
      cy.get("input[name='TagNumber']").clear();
      cy.clickAndCheckAlert("Save", "Tag # is required\r\n");

      cy.EditInputElement("TagNumber", faker.datatype.number(999999999));
      cy.get("input[name='Description']").clear();
      cy.clickAndCheckAlert("Save", "Description is required\r\n");
    }
  );

  it(
    "should create record with required fields",
    { tags: ["@smoke", "@test"] },
    () => {
      cy.EditInputElement("TagNumber", faker.datatype.number(999999999));
      cy.fillCombobox("Area Location Code", data.locationId);
      cy.fillInput("Description", faker.random.words(5));
      cy.clickSaveAndCheckResponse();
    }
  );

  it("should create record with all fields", () => {
    cy.EditInputElement("TagNumber", faker.datatype.number(999999999));
    cy.fillCombobox("Location ID", data.locationId);
    cy.EditInputElement("Description", faker.random.words(5));
    cy.openFlyoutAndSelectRandomValue("Floor Code");
    cy.openFlyoutAndSelectRandomValue("Lock Shop");
    cy.clickSaveAndCheckResponse();
  });
});
