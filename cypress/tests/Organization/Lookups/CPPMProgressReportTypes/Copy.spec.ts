import { faker } from "@faker-js/faker";

describe("Copy And Edit CPPM Progress Report record", () => {
  let ID;
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Search and Copy Progress Report", () => {
    cy.visit("/#!/Lookup/CJProgressReportType");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/CJProgressReportType/Create?copyId=?*",
      200
    ).then((id) => {
      ID = id;
    });
  });

  it("Edit CPPM Progress Report record", () => {
    cy.visit(`/#!/Lookup/CJProgressReportType/${ID}`);
    cy.get(
      "span[ng-bind='WindowTitle']:contains('CPPM Progress Report Types')"
    ).should("be.visible");
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
