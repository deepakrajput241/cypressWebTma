import { faker } from "@faker-js/faker";

describe("Copy And Edit CP Priorities / Impact record", () => {
  let ID;
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Search and Copy CP Priorities record", () => {
    cy.visit("/#!/Lookup/CPImpact");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(6));
    cy.get("select[name='Level']").select(2);
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/CPImpact/Create?copyId=?*",
      200
    ).then((id) => {
      ID = id;
    });
  });

  it("Edit CP Priorities record", () => {
    cy.visit(`/#!/Lookup/CPImpact/${ID}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Impact Priorities')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(6));
    cy.get("select[name='Level']").select(2);
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
