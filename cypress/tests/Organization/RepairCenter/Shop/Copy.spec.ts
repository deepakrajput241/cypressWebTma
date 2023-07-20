import { faker } from "@faker-js/faker";

describe("Copy And Edit Shop Record", () => {
  let shopId;
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Shop Record", () => {
    cy.visit("/#!/Shop");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Name", faker.datatype.number(99999));
    cy.EditRepairCenter();
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/Shop/Create?copyId=?*",
      200
    ).then((id) => {
      shopId = id;
    });
  });

  it("Edit Shop Record", () => {
    cy.visit(`/#!/Shop/${shopId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Shop')").should("be.visible");
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Name", faker.datatype.number(99999));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
