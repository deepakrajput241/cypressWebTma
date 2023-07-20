import { faker } from "@faker-js/faker";
describe("Copy, Edit and Delete Disposal", () => {
  let ID;

  beforeEach("Login to the portal", () => {
    cy.login(Cypress.env("user1"));
  });

  it("Verify Copy Disposal function. ", () => {
    cy.visit("/#!/Disposal/1285/Identity");

    cy.getButton("Copy").click();
    cy.get("select[aria-label = 'Item Type']").select("Equipment");
    cy.openFlyoutAndSelectRandomValue("Item Code");
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.openFlyoutAndSelectRandomValue("Technician Code");
    cy.fillDateInput(
      "Disposal Date",
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.wait(1000);
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "Disposal/Create?copyId=?*",
      200
    ).then((id) => {
      ID = id;
    });
  });

  it("Verify Edit Disposal function.", () => {
    cy.visit(`/#!/Disposal/${ID}/Identity`);
    cy.getButton("Edit").click();
    cy.openFlyoutAndSelectRandomValue("Item Code");
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.openFlyoutAndSelectRandomValue("Technician Code");
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Verify Delete Disposal function. ", () => {
    cy.visit(`/#!/Disposal/${ID}/Identity`);
    cy.clickDeleteAndCheckResponse();
  });
});
