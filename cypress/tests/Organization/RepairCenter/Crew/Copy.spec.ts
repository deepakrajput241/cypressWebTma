import { faker } from "@faker-js/faker";

describe("Copy And Edit Crew record", () => {
  let crewId;
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Crew Record With Required Fields", () => {
    cy.visit("/#!/Crew");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/Crew/Create?copyId=?*",
      200
    ).then((id) => {
      crewId = id;
    });
  });

  it("Edit Crew Record With Required Fields", () => {
    cy.visit(`/#!/Crew/${crewId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Crew')").should("be.visible");
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.getButton("Save").click();
  });
});
