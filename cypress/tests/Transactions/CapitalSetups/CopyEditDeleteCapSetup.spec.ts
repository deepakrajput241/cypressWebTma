import { faker } from "@faker-js/faker";

describe("Search, Copy, Edit and Delete a Capital Setup", () => {
  let setupId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Search for a record on Action menu and Copy", () => {
    cy.visit("/#!/CPSetup/1082/Identity");

    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "CPSetup/Create?copyId=?*",
      200
    ).then((id) => {
      setupId = id;
    });
  });

  it("Edit Capital Setup", () => {
    cy.visit(`/#!/CPSetup/${setupId}/Identity`);
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Delete Capital Setup", () => {
    cy.visit(`/#!/CPSetup/${setupId}/Identity`);
    cy.clickDeleteAndCheckResponse();
  });
});
