import { faker } from "@faker-js/faker";

describe("Search, Copy, Edit and Delete a Work Element", () => {
  let workId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Search for a record on Action menu and Copy", () => {
    cy.visit("/#!/CPWorkElement/1/Identity");

    cy.getButton("Copy").click();
    cy.EditInputElement("Title", faker.datatype.number(99999));
    cy.fillCombobox("Capital Setup", "District");
    cy.openFlyoutAndSelectRandomValue("WE Type Description");
    cy.openFlyoutAndSelectRandomValue("Justification");
    cy.openFlyoutAndSelectRandomValue("Impact Priority");
    cy.openFlyoutAndSelectRandomValue("UniFormat 1");
    cy.get("select[aria-label='LocationTypeDDL']")
      .should("be.visible")
      .select(1);
    cy.openFlyoutAndSelectRandomValue("Location");
    cy.get("select[aria-label='Item Type']").should("be.visible").select(1);
    cy.openFlyoutAndSelectRandomValue("Item Code");
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "CPWorkElement/Create?copyId=?*",
      200
    ).then((id) => {
      workId = id;
    });
  });

  it("Edit Work Element", () => {
    cy.visit(`/#!/CPWorkElement/${workId}/Identity`);
    cy.getButton("Edit").click();
    cy.EditInputElement("Title", faker.datatype.number(99999));
    cy.fillCombobox("Capital Setup", "District");
    cy.openFlyoutAndSelectRandomValue("WE Type Description");
    cy.openFlyoutAndSelectRandomValue("Justification");
    cy.openFlyoutAndSelectRandomValue("Impact Priority");
    cy.openFlyoutAndSelectRandomValue("UniFormat 1");
    cy.clickAndCheckResponse("Save", "POST", "CPWorkElement/Edit?*", 200);
  });

  it("Delete Work Element", () => {
    cy.visit(`/#!/CPWorkElement/${workId}/Identity`);
    cy.clickDeleteAndCheckResponse("Delete", "/CPWorkElement/Delete/*");
  });
});
