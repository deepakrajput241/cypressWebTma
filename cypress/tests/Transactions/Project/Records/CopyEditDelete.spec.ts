import { faker } from "@faker-js/faker";

describe("Copy, Edit and Delete Project", { tags: "@spreadsheet" }, () => {
  let projectID;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Project Record", () => {
    cy.visit("/#!/Project/1008/Identity");

    cy.getButton("Copy").click();
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.EditInputElement("Name", faker.datatype.number(99999));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "Project/Create?copyId=?*",
      200
    ).then((id) => {
      projectID = id;
    });
  });

  it("Edit Project Record", () => {
    cy.visit(`/#!/Project/${projectID}/Identity`);
    cy.getButton("Edit").click();
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.EditInputElement("Name", faker.datatype.number(99999));
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Delete project Record", () => {
    cy.visit(`/#!/Project/${projectID}/Identity`);
    cy.clickDeleteAndCheckResponse();
  });
});

//TODO - Skipped cases, due to continuous alert of "An item with the same key has already been added. Key: 2023".
