import { faker } from "@faker-js/faker";

describe("Edit Asset Record", () => {
  let assetId;
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Create Asset with required fields", () => {
    cy.visit("/#!/Asset/Create");
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Facility Name");
    cy.openFlyoutAndSelectRandomValue("Type Description");
    cy.selectRepairCenter();
    cy.clickAndCheckResponse("Save", "POST", "/Asset/Create*", 200).then(
      (id) => {
        assetId = id;
      }
    );
  });

  it("Edit Asset Record", () => {
    cy.visit(`/#!/Asset/${assetId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Asset')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.getButton("Edit").click();
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
