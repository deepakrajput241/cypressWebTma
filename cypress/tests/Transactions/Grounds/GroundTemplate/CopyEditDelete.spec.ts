import { faker } from "@faker-js/faker";
describe("Copy, Edit and Delete a Grounds Templates", () => {
  let tempId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Search for a record on Action menu and Copy", () => {
    cy.visit("/#!/GRNTemplate/1110/Identity");
    cy.get("#UserToolBarCollapse > ul > li:nth-child(3) > a").click();
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "GRNTemplate/Create?copyId=?*",
      200
    ).then((id) => {
      tempId = id;
    });
  });

  it("Edit Ground Template", () => {
    cy.visit(`/#!/GRNTemplate/${tempId}/Identity`, { timeout: 30000 });
    cy.get("#UserToolBarCollapse > ul > li:nth-child(2) > a").click();
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Delete Ground Template", () => {
    cy.visit(`/#!/GRNTemplate/${tempId}/Identity`, { timeout: 30000 });
    cy.clickDeleteAndCheckResponse();
  });
});
