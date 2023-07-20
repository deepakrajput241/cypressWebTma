import { faker } from "@faker-js/faker";

describe("Copy And Edit Technician record", () => {
  let techId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Technician With Required Fields", () => {
    cy.visit("/#!/Technician");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("FirstName", faker.random.words(2));
    cy.EditInputElement("LastName", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Shift");
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/Technician/Create?copyId=?*",
      200
    ).then((id) => {
      techId = id;
    });
  });

  it("Edit Technician With Required Fields", () => {
    cy.visit(`/#!/Technician/${techId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Technician')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("FirstName", faker.random.words(2));
    cy.EditInputElement("LastName", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Shift");
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
