import { faker } from "@faker-js/faker";

describe("Copy And Edit Entity Record", () => {
  let entityId;
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Entity", () => {
    cy.visit("/#!/Entity");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Name", faker.datatype.number(9999999));
    cy.openFlyoutAndSelectRandomValue("Facility Name");
    cy.openFlyoutAndSelectRandomValue("Type Description");
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/Entity/Create?copyId=?*",
      200
    ).then((id) => {
      entityId = id;
    });
  });

  it("Edit Entity", () => {
    cy.visit(`/#!/Entity/${entityId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Entity')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Name", faker.datatype.number(9999999));
    cy.openFlyoutAndSelectRandomValue("Facility Name");
    cy.openFlyoutAndSelectRandomValue("Type Description");
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
