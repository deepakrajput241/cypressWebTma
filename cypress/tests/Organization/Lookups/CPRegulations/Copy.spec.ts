import { faker } from "@faker-js/faker";

describe("Copy And Edit CP Regulation Record", () => {
  let ID;
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Search and Copy CP Regulation Data", () => {
    cy.visit("/#!/Lookup/CPRegulation");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.editTextarea("Description", faker.random.words(4));
    cy.openFlyoutAndSelectRandomValue("Regulatory Category Code");
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/CPRegulation/Create?copyId=?*",
      200
    ).then((id) => {
      ID = id;
    });
  });

  it("Create and Edit CP Regulation Data", () => {
    cy.visit(`/#!/Lookup/CPRegulation/${ID}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Regulations')").should(
      "be.visible"
    );
    cy.wait(500);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.editTextarea("Description", faker.random.words(4));
    cy.openFlyoutAndSelectRandomValue("Regulatory Category Code");
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
