import { faker } from "@faker-js/faker";
const data = {
  description: faker.random.words(5),
  repairCenter: "Agent Bike",
};

describe("Copy, Edit and Delete a Training Class record", () => {
  beforeEach("Login to the portal", () => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/TrainingClass/Create");
  });

  it("Search for a record on Action menu and Copy", () => {
    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Description", data.description);
    cy.openFlyoutAndSelectRandomValue("Repair Center");
    cy.getButton("Save").click();
    cy.clickDeleteAndCheckResponse();
  });

  it("Edit Class Record", () => {
    cy.EditInputElement("Description", data.description);
    cy.openFlyoutAndSelectRandomValue("Repair Center");
    cy.clickSaveAndCheckResponse();
    cy.getButton("Edit").click();
    cy.EditInputElement("Description", data.description);
    cy.openFlyoutAndSelectRandomValue("Repair Center");
    cy.getButton("Save").click();
    cy.clickDeleteAndCheckResponse();
  });

  it("Delete Class Record", () => {
    cy.EditInputElement("Description", data.description);
    cy.openFlyoutAndSelectRandomValue("Repair Center");
    cy.clickSaveAndCheckResponse();
    cy.clickDeleteAndCheckResponse();
  });
});
