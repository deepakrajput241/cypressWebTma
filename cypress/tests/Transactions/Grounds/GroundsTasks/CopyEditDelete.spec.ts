import { faker } from "@faker-js/faker";
describe("Copy, Edit and Delete a Ground Tasks", () => {
  let taskID;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Search for a record on Action menu and Copy", () => {
    cy.visit("/#!/GRNTask/1003/Identity");

    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.openFlyoutAndSelectRandomValue("Grounds Item");
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "GRNTask/Create?copyId=?*",
      200
    ).then((id) => {
      taskID = id;
    });
  });

  it("Edit Ground Task", () => {
    cy.visit(`/#!/GRNTask/${taskID}/Identity`);
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.openFlyoutAndSelectRandomValue("Grounds Item");
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Delete Ground Task", () => {
    cy.visit(`/#!/GRNTask/${taskID}/Identity`);
    cy.clickDeleteAndCheckResponse();
  });
});
