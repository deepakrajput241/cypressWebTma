import { faker } from "@faker-js/faker";

const data = {
  title: faker.datatype.number(9999),
  notes: faker.random.words(1),
  reference: faker.datatype.number(1000),
  statusDescription: faker.random.word(1),
};

describe("Capital Request Revision - Copy, Edit, Delete Record", () => {
  let revisionId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Capital Request Revision Record", () => {
    cy.visit("/#!/CPRequestRevision");

    cy.getButton("Copy").click();
    cy.openFlyoutAndSelectRandomValue("Capital Req #");
    cy.EditInputElement("Title", data.title);
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "CPRequestRevision/Create?copyId=?*",
      200
    ).then((id) => {
      revisionId = id;
    });
  });

  it("Edit Capital Request Revision Record", () => {
    cy.visit(`/#!/CPRequestRevision/${revisionId}/Identity`);

    cy.getButton("Edit").click();
    cy.openFlyoutAndSelectRandomValue("Capital Req #");
    cy.EditInputElement("Title", data.title);
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Delete Capital Request Revision Record", () => {
    cy.visit(`/#!/CPRequestRevision/${revisionId}/Identity`);
    cy.clickDeleteAndCheckResponse();
  });
});
