import { faker } from "@faker-js/faker";
describe("Copy, Edit and Delete a Grounds Inspection", () => {
  let inspecID;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Search for a record on Action menu and Copy", () => {
    cy.visit("/#!/GRNInspection/1003/Identity");
    cy.getButton("Copy").click();
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Form Code");
    cy.openFlyoutAndSelectRandomValue("Repair Center Code");
    cy.openFlyoutAndSelectRandomValue("Result Type Code");
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "GRNInspection/Create?copyId=?*",
      200
    ).then((id) => {
      inspecID = id;
    });
  });

  it("Edit Ground Inspection", () => {
    cy.visit(`/#!/GRNInspection/${inspecID}/Identity`);
    cy.getButton("Edit").click();
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Form Code");
    cy.openFlyoutAndSelectRandomValue("Repair Center Code");
    cy.openFlyoutAndSelectRandomValue("Result Type Code");
    cy.clickAndCheckResponse("Save", "POST", "GRNInspection/Edit?*", 200);
  });

  it("Delete Ground Inspection", () => {
    cy.visit(`/#!/GRNInspection/${inspecID}/Identity`);
    cy.clickDeleteAndCheckResponse();
  });
});
