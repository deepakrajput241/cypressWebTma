import { faker } from "@faker-js/faker";

describe("Copy, Edit and Delete Ground Inspection Form", () => {
  let InspId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Search for a record on Action menu and Copy", () => {
    cy.visit("/#!/GRNInspectionForm/1002/Identity");

    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.wait(1500);
    cy.EditInputElement("Description", faker.random.words(1));
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.openFlyoutAndSelectRandomValue("Repair Center Code");
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "GRNInspectionForm/Create?copyId=?*",
      200
    ).then((id) => {
      InspId = id;
    });
  });

  it("Edit Ground Inspection Form", () => {
    cy.visit(`/#!/GRNInspectionForm/${InspId}/Identity`);
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.wait(1500);
    cy.EditInputElement("Description", faker.random.words(1));
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.openFlyoutAndSelectRandomValue("Repair Center Code");
    cy.clickAndCheckResponse("Save", "POST", "GRNInspectionForm/Edit?*", 200);
  });

  it("Delete Ground Inspection Form", () => {
    cy.visit(`/#!/GRNInspectionForm/${InspId}/Identity`);
    cy.clickDeleteAndCheckResponse();
  });
});
