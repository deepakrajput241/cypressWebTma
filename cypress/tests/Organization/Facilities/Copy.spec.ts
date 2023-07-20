import { faker } from "@faker-js/faker";

describe("Copy And Edit Facility Record", () => {
  let facilityId;
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Facility with Required fields", () => {
    cy.visit("/#!/Facility/Create");

    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("Name", faker.datatype.number(99999999));
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/Facility/Create?copyId=?*",
      200
    ).then((id) => {
      facilityId = id;
    });
  });

  it("Edit Facility Record", () => {
    cy.visit(`/#!/Facility/${facilityId}`);
    cy.contains("a", "Identity").click();
    cy.wait(1000);
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Name", faker.datatype.number(9999999));
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
