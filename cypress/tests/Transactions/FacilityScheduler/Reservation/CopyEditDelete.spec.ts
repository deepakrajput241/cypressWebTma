import { faker } from "@faker-js/faker";

describe("Copy, Edit and Delete a Reservation", () => {
  let ID;

  beforeEach("Login to Web app", () => {
    cy.login(Cypress.env("user1"));
  });

  it("Search for a record on Action menu and Copy", () => {
    cy.visit("/#!/Reservation/1009/Identity");
    cy.getButton("Copy").click();
    cy.openFlyoutAndSelectRandomValue("Requestor");
    cy.get("input[aria-label='Date']")
      .clear()
      .type(faker.date.recent().toLocaleDateString("en-US"));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "Reservation/Create?copyId=?*",
      200
    ).then((id) => {
      ID = id;
    });
  });

  it("Edit Reservation Record", () => {
    cy.visit(`/#!/Reservation/${ID}/Identity`);
    cy.getButton("Edit").click();
    cy.openFlyoutAndSelectRandomValue("Requestor");
    cy.get("input[aria-label='Date']")
      .clear()
      .type(faker.date.recent().toLocaleDateString("en-US"));
    cy.clickAndCheckResponse("Save", "POST", "/Reservation/Edit?*", 200);
  });

  it("Delete Reservation Record", () => {
    cy.visit(`/#!/Reservation/${ID}/Identity`);
    cy.clickDeleteAndCheckResponse();
  });
});
