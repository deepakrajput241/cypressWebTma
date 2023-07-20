import { faker } from "@faker-js/faker";

describe("Copy And Edit Vehicle record", () => {
  let vehicleId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Vehicle record", () => {
    cy.visit("/#!/Vehicle");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("TagNumber", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/Vehicle/Create?copyId=?*",
      200
    ).then((id) => {
      vehicleId = id;
    });
  });

  it("Edit Vehicle record", () => {
    cy.visit(`/#!/Vehicle/${vehicleId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Vehicle')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("TagNumber", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
