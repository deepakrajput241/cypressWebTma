import { faker } from "@faker-js/faker";
describe("Copy and Edit Biomed Make Model record", () => {
  let biomedId;
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Biomed Make/Model", () => {
    cy.visit("/#!/CeEquipmentMakeModel");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("MakeName", faker.random.words(1));
    cy.EditInputElement("ModelNumber", faker.datatype.number(99999999));
    cy.fillCombobox("Device Type", "Auto_47");
    cy.fillCombobox("Manufacturer", "3M");
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/CeEquipmentMakeModel/Create?copyId=?*",
      200
    ).then((id) => {
      biomedId = id;
    });
  });

  it("Edit Biomed Make/Model", () => {
    cy.visit(`/#!/CeEquipmentMakeModel/${biomedId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Biomed Make/Model')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.fillCombobox("Device Type", "Auto_47");
    cy.fillCombobox("Manufacturer", "3M");
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
