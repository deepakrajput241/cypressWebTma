import { faker } from "@faker-js/faker";

describe("Create Work Element Group", () => {
  const data = {
    capitalSetup: "District",
    type: "Group1",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/CPProjectRequest/Create");
  });

  // TODO: Work Element Entry is not capable of being selected

  it.skip(
    "should not create work element group without required fields",
    { tags: "@smoke" },
    () => {
      // no 'Title'
      cy.fillCombobox("Capital Setup", data.capitalSetup);
      cy.fillCombobox("Type", data.type);
      cy.contains("Add Work Element").click();

      cy.clickAndCheckAlert("Save", "Title is required\r\n");

      cy.EditInputElement("Title", faker.name.jobTitle());
      cy.get("input[aria-label='Type']").eq(0).clear();
      cy.clickSaveAndCheckAlert("Type is required\r\n");

      cy.EditInputElement("Title", faker.name.jobTitle());
      cy.get("input[aria-label='Type']").eq(0).clear();
      cy.clickSaveAndCheckAlert("Type is required\r\n");

      cy.get("#toolbarAddWorkElement").should("be.visible").click();
      cy.get("#itemSelection")
        .find("tr")
        .then((row) =>
          cy
            .xpath(
              `//*[@id="itemSelection"]/div[2]/table/tbody/tr[${Cypress._.random(
                1,
                row.length - 0
              )}]/td[1]`
            )
            .click()
        );
      cy.getButtonWithText("Add Selected").click();
      cy.get("input[name='Title']").clear();
      cy.clickAndCheckAlert("Save", "Title is required\r\n");

      cy.fillInput("Title", "");
      cy.fillCombobox("Capital Setup", data.capitalSetup);
      cy.openFlyoutAndSelectRandomValue("Type");
      cy.clickSaveAndCheckAlert(
        "At least 1 record is required for CP WorkElement Grid\r\n"
      );
    }
  );

  it.skip(
    "should create Work Element Group with required fields",
    { tags: "@smoke" },
    () => {
      cy.EditInputElement("Title", faker.name.jobTitle());
      cy.fillCombobox("Capital Setup", data.capitalSetup);
      cy.fillCombobox("Type", data.type);
      cy.contains("Add Work Element").click();

      cy.get("#itemSelection")
        .find("tr")
        .then((row) =>
          cy
            .xpath(
              `//*[@id="itemSelection"]/div[2]/table/tbody/tr[${Cypress._.random(
                1,
                row.length - 0
              )}]/td[1]`
            )
            .click()
        );
      cy.getButtonWithText("Add Selected").click();
      cy.clickSaveAndCheckResponse();
      cy.clickDeleteAndCheckResponse();
    }
  );

  it.skip("should create Work Element Group with all fields", () => {
    cy.EditInputElement("Title", faker.name.jobTitle());
    cy.fillCombobox("Capital Setup", data.capitalSetup);
    cy.fillCombobox("Type", data.type);
    cy.fillInput("ReferenceNumber", faker.datatype.number(2022));
    cy.fillNumericTextBox(0, faker.datatype.number(10000));
    cy.contains("Add Work Element").click();

    cy.get("#itemSelection")
      .find("tr")
      .then((row) =>
        cy
          .xpath(
            `//*[@id="itemSelection"]/div[2]/table/tbody/tr[${Cypress._.random(
              1,
              row.length - 0
            )}]/td[1]`
          )
          .click()
      );
    cy.clickSaveAndCheckResponse();
    cy.clickDeleteAndCheckResponse();
  });
});
