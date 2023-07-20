import { faker } from "@faker-js/faker";

describe("Search, Copy, Edit and Delete a Component Template", () => {
  let tempId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Search for a record on Action menu and Copy", () => {
    cy.visit("/#!/CJComponentTemplate");

    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(9999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "CJComponentTemplate/Create?copyId=?*",
      200
    ).then((id) => {
      tempId = id;
    });
  });

  it("Edit Component Template", () => {
    cy.visit(`/#!/CJComponentTemplate/${tempId}/Identity`);
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(9999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Delete Component Template", () => {
    cy.visit(`/#!/CJComponentTemplate/${tempId}/Identity`);
    cy.clickDeleteAndCheckResponse();
  });
});
