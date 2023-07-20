import { faker } from "@faker-js/faker";

describe("Copy And Edit Meeting Minute Type record", () => {
  let meetingId;
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Search and Copy Meeting Minute Type", () => {
    cy.visit("/#!/Lookup/CJMeetingType");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/CJMeetingType/Create?copyId=?*",
      200
    ).then((id) => {
      meetingId = id;
    });
  });

  it("Create and Edit Meeting Minute Type", () => {
    cy.visit(`/#!/Lookup/CJMeetingType/${meetingId}`);
    cy.get(
      "span[ng-bind='WindowTitle']:contains('CPPM Meeting Minute Types')"
    ).should("be.visible");
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
