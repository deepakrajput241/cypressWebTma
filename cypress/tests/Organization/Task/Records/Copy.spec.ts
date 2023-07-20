import { faker } from "@faker-js/faker";

describe("Copy And Edit Task Record", () => {
  let taskId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Task Record", () => {
    cy.visit("/#!/Task");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/Task/Create?copyId=?*",
      200
    ).then((id) => {
      taskId = id;
    });
  });

  it("Edit Task Record", () => {
    cy.visit(`/#!/Task/${taskId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Task')").should("be.visible");
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
