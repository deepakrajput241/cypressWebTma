import { faker } from "@faker-js/faker";

describe("Copy And Edit Vendor record", () => {
  let vendorId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Vendor record", () => {
    cy.visit("/#!/Vendor");

    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("Name", faker.random.words(2));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/Vendor/Create?copyId=?*",
      200
    ).then((id) => {
      vendorId = id;
    });
  });

  it("Edit Vendor with required fields", () => {
    cy.visit(`/#!/Vendor/${vendorId}`);

    cy.get("span[ng-bind='WindowTitle']:contains('Vendors')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("Name", faker.random.words(2));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
