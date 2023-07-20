import { faker } from "@faker-js/faker";

describe("Copy And Edit Service Request Form", () => {
  let ID;

  const data = {
    formType: "Menu Form",
    dataAccessUser: "tech101",
    repairCenter: "AUX",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Service Request record", () => {
    cy.visit("/#!/RequestPortal");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Name", faker.random.numeric(6));
    cy.get("select[ng-model='Data.RequestPortalFormTypeId']").select(
      "Menu Form"
    );
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/RequestPortal/Create?copyId=?*",
      200
    ).then((id) => {
      ID = id;
    });
  });

  it("Edit Service Request record", () => {
    cy.visit(`/#!/RequestPortal/${ID}`);
    cy.get(
      "span[ng-bind='WindowTitle']:contains('Service Request Form')"
    ).should("be.visible");
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Name", faker.random.numeric(6));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
