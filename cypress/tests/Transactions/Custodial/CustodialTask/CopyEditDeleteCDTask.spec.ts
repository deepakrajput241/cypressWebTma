import { faker } from "@faker-js/faker";

describe("Search, Copy, Edit and Delete a Custodial Task Record", () => {
  let ID;

  beforeEach("Login to Web app", () => {
    cy.login(Cypress.env("user1"));
  });

  it("Search for a record on Action menu and Copy", () => {
    cy.visit("/#!/CDTask");

    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.openFlyoutAndSelectRandomValue("Custodial Item");
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "CDTask/Create?copyId=?*",
      200
    ).then((id) => {
      ID = id;
    });
  });

  it("Edit Custodial Task", () => {
    cy.visit(`/#!/CDTask/${ID}/Identity`);
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.openFlyoutAndSelectRandomValue("Custodial Item");
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Delete Custodial Task", () => {
    cy.visit(`/#!/CDTask/${ID}/Identity`);
    cy.clickDeleteAndCheckResponse();
  });
});
