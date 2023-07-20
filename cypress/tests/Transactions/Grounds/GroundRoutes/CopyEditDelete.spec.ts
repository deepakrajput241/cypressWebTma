import { faker } from "@faker-js/faker";

describe("Copy, Edit and Delete a Ground Routes", () => {
  let routeId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Search for a record on Action menu and Copy", () => {
    cy.visit("/#!/GRNRoute/1200/Identity");

    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.openFlyoutAndSelectRandomValue("Supervisor Name");
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "GRNRoute/Create?copyId=?*",
      200
    ).then((id) => {
      routeId = id;
    });
  });

  it("Edit Ground Routes", () => {
    cy.visit(`/#!/GRNRoute/${routeId}/Identity`);
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.openFlyoutAndSelectRandomValue("Supervisor Name");
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Delete Ground Routes", () => {
    cy.visit(`/#!/GRNRoute/${routeId}/Identity`);
    cy.clickDeleteAndCheckResponse();
  });
});
