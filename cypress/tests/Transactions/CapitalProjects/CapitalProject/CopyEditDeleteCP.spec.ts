import { faker } from "@faker-js/faker";

describe("Search, Copy, Edit and Delete a Capital Project Record", () => {
  let projectId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Search for a record on Action menu and Copy", () => {
    cy.visit("/#!/CJProject/1022/Identity");

    cy.getButton("Copy").click();
    cy.EditInputElement("Title", faker.datatype.number(99999));
    cy.openFlyoutAndSelectRandomValue("Repair Center Code");
    cy.openFlyoutAndSelectRandomValue("Project Type");
    cy.EditInputElement("TransactionNumber", faker.datatype.number(99999));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "CJProject/Create?copyId=?*",
      200
    ).then((id) => {
      projectId = id;
    });
  });

  it("Edit Capital Project", () => {
    cy.visit(`/#!/CJProject/${projectId}/Identity`);
    cy.getButton("Edit").click();
    cy.EditInputElement("Title", faker.datatype.number(99999));
    cy.openFlyoutAndSelectRandomValue("Repair Center Code");
    cy.openFlyoutAndSelectRandomValue("Project Type");
    cy.EditInputElement("TransactionNumber", faker.datatype.number(99999));
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Delete Capital Project", () => {
    cy.visit(`/#!/CJProject/${projectId}/Identity`);
    cy.clickDeleteAndCheckResponse();
  });
});
