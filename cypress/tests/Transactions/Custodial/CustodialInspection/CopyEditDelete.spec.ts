import { faker } from "@faker-js/faker";

describe("Search, Copy, Edit and Delete a Custodial Inspection Record", () => {
  let ID;

  beforeEach("Login to Web app", () => {
    cy.login(Cypress.env("user1"));
  });

  it("Search for a record on Action menu and Copy", () => {
    cy.visit("/#!/CDInspection/1056/Identity");

    cy.getButton("Copy").click();
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Repair Center Code");
    cy.get("input[aria-label='Inspection Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.openFlyoutAndSelectRandomValue("Result Type Code");
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "CDInspection/Create?copyId=?*",
      200
    ).then((id) => {
      ID = id;
    });
  });

  it("Edit Custodial Inspection Record", () => {
    cy.visit(`/#!/CDInspection/${ID}/Identity`);
    cy.getButton("Edit").click();
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Repair Center Code");
    cy.get("input[aria-label='Inspection Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.openFlyoutAndSelectRandomValue("Result Type Code");
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Delete Custodial Inspection", () => {
    cy.visit(`/#!/CDInspection/${ID}/Identity`);
    cy.clickDeleteAndCheckResponse();
  });
});
