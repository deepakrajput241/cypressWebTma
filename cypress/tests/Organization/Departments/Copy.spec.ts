import { faker } from "@faker-js/faker";

describe("Copy And Edit Department Reccord", () => {
  let departmentId;
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Department Record", () => {
    cy.visit("/#!/Department");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(999999999));
    cy.EditInputElement("Name", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.EditRepairCenter();
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/Department/Create?copyId=?*",
      200
    ).then((id) => {
      departmentId = id;
    });
  });

  it("Edit Department Record", () => {
    cy.visit(`/#!/Department/${departmentId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Department')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(999999999));
    cy.EditInputElement("Name", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
