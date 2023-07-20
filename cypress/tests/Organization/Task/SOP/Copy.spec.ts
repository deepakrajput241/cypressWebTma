import { faker } from "@faker-js/faker";

describe("Copy And Edit SOP Record", () => {
  let sopId;
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy SOP", () => {
    cy.visit("/#!/SOP");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Name", faker.random.words(2));
    cy.clickAndCheckResponse("Save", "POST", "/SOP/Create?copyId=?*", 200).then(
      (id) => {
        sopId = id;
      }
    );
  });

  it("Edit SOP", () => {
    cy.visit(`/#!/SOP/${sopId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('SOP')").should("be.visible");
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Name", faker.random.words(2));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
