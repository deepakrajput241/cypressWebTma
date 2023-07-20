import { faker } from "@faker-js/faker";

describe("Copy And Edit Lock Shop record", () => {
  let ID;
  const data = {
    repairCenter: "Auto-01",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Create and copy Lock Shop with require field", () => {
    cy.visit("/#!/LockShop");
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/LockShop/Create?copyId=?*",
      200
    ).then((id) => {
      ID = id;
    });
  });

  it("Edit Lock Shop", () => {
    cy.visit(`/#!/LockShop/${ID}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Lock Shop')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
