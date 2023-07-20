import { faker } from "@faker-js/faker";

describe("Copy And Edit Biomed Records", () => {
  let biomedId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Biomed Record", () => {
    cy.visit("/#!/CEEquipment");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Name", faker.datatype.number(9999999));
    cy.openFlyoutAndSelectRandomValue("Device Type");
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/CEEquipment/Create?copyId=?*",
      200
    ).then((id) => {
      biomedId = id;
    });
  });

  it("Edit Biomed Record", () => {
    cy.visit(`/#!/CEEquipment/${biomedId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Biomed')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Name", faker.datatype.number(9999999));
    cy.openFlyoutAndSelectRandomValue("Device Type");
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
