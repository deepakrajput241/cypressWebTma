import { faker } from "@faker-js/faker";

describe("Copy And Edit Equipment Record", () => {
  let equipmentId;
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Equipment", () => {
    cy.visit("/#!/Equipment/4260/Meter");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("TagNumber", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/Equipment/Create?copyId=?*",
      200
    ).then((id) => {
      equipmentId = id;
    });
  });

  it("Edit Equipment", () => {
    cy.visit(`/#!/Equipment/${equipmentId}`);
    cy.contains("a", "Identity").click();
    cy.wait(1000);
    cy.getButton("Edit").click();
    cy.EditInputElement("TagNumber", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.openFlyoutAndSelectRandomValue("Facility");
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
