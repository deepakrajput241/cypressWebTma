import { faker } from "@faker-js/faker";

describe("Create Utility Route record", () => {
  const data = { repairCenter: "TMA RC" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/UtilityRoute/Create");
  });

  it("Utility Route - Negative Cases", () => {
    //Without Description
    cy.EditInputElement("Code", faker.datatype.number(999999999));
    cy.clickAndCheckAlert("Save", "Description is required\r\n");

    //Withput Code
    cy.get("input[name='Code']").clear();
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckAlert("Save", "Code is required\r\n");
  });

  it(
    "Create Utility Route record with required fields",
    { tags: "@smoke" },
    () => {
      cy.EditInputElement("Code", faker.datatype.number(999999999));
      cy.EditInputElement("Description", faker.random.words(2));
      cy.clickSaveAndCheckResponse();
    }
  );

  it("Create Utility Route record with All fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(999999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.fillCombobox("Repair Center", 1);
    cy.get("#toolbarAddMeter").click();
    cy.selectRandomCheckBoxFromGrid(
      1,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/tma-data-grid/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Save").click();
    cy.clickSaveAndCheckResponse();
  });
});
