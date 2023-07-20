import { faker } from "@faker-js/faker";

describe("Search, Copy, Edit and Delete a Component", () => {
  let compId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Search for a record on Action menu and Copy", () => {
    cy.visit("/#!/CJComponent/1001/Identity");

    cy.getButton("Copy").click();
    cy.EditInputElement("Description", faker.random.words(2));
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.openFlyoutAndSelectRandomValue("Type Code");
    cy.EditRepairCenter();
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "CJComponent/Create?copyId=?*",
      200
    ).then((id) => {
      compId = id;
    });
  });

  it("Edit Component", () => {
    cy.visit(`/#!/CJComponent/${compId}/Identity`);
    cy.getButton("Edit").click();
    cy.EditInputElement("Description", faker.random.words(2));
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.openFlyoutAndSelectRandomValue("Type Code");
    cy.EditRepairCenter();
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Delete Component", () => {
    cy.visit(`/#!/CJComponent/${compId}/Identity`);
    cy.clickDeleteAndCheckResponse();
  });
});
