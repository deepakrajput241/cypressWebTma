import { faker } from "@faker-js/faker";

describe("Copy And Edit Utility Meter Record", () => {
  let meterId;
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Utility Meter Record", () => {
    cy.visit("/#!/UtilityMeter/");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Service Type");
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/UtilityMeter/Create?copyId=?*",
      200
    ).then((id) => {
      meterId = id;
    });
  });

  it("Edit Utility Meter record", () => {
    cy.visit(`/#!/UtilityMeter/${meterId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Utility Meter')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
