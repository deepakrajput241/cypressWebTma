import { faker } from "@faker-js/faker";
describe("Copy and Edit IT Equipment Record", () => {
  let equipemntId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy IT Equipment", () => {
    cy.visit("/#!/ITEquipment");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("TagNumber", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/ITEquipment/Create?copyId=?*",
      200
    ).then((id) => {
      equipemntId = id;
    });
  });

  it("Edit IT Equipment", () => {
    cy.visit(`/#!/ITEquipment/${equipemntId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('IT Equipment')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("TagNumber", faker.datatype.number(99999)).wait(1500);
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
