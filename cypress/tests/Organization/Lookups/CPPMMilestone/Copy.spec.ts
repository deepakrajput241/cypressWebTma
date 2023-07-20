import { faker } from "@faker-js/faker";

describe("Copy and Edit CPPM Milestone record", () => {
  let ID;
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Milestone record", () => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/CJMilestone");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/CJMilestone/Create?copyId=?*",
      200
    ).then((id) => {
      ID = id;
    });
  });

  it("Edit Milestone record", () => {
    cy.visit(`/#!/Lookup/CJMilestone/${ID}`);
    cy.get("span[ng-bind='WindowTitle']:contains('CPPM Milestones')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
