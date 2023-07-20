import { faker } from "@faker-js/faker";

describe("Create, Edit, Copy, Delete and Negative Script- 'Actions'", () => {
  let ActionId;

  const data = { taskTpeCode: "ADMIN" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Actions record- Negative Scenarios", { tags: "@smoke" }, () => {
    cy.visit("/#!/Lookup/Action/Create");
    cy.openFlyoutAndSelectRandomValue("Task Type Code");
    cy.getButton("Save").click();
    cy.clickAndCheckAlert("Save", "Action is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Task Type Code");
    cy.editTextarea("Action", faker.random.words(2));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/Action/Create?*",
      200,
      "Repair Centers\r\n\r\nAt least 1 record is required for Repair Center\r\n"
    );
  });

  it("Create Actions Record", { tags: "@smoke" }, () => {
    cy.visit("/#!/Lookup/Action/Create");
    cy.openFlyoutAndSelectRandomValue("Task Type Code");
    cy.editTextarea("Action", faker.random.words(2));
    cy.selectRepairCenter();
    cy.clickAndCheckResponse("Save", "POST", "/Action/Create?*", 200).then(
      (id) => {
        ActionId = id;
      }
    );
  });

  it("Edit Actions record", () => {
    cy.visit(`/#!/Lookup/Action/${ActionId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Actions')").should(
      "be.visible"
    );
    cy.wait(500);
    cy.getButton("Edit").click();
    cy.openFlyoutAndSelectRandomValue("Task Type Code");
    cy.editTextarea("Action", faker.random.words(2));
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Copy Actions record", () => {
    cy.visit(`/#!/Lookup/Action/${ActionId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Actions')").should(
      "be.visible"
    );
    cy.wait(500);
    cy.getButton("Copy").click();
    cy.openFlyoutAndSelectRandomValue("Task Type Code");
    cy.editTextarea("Action", faker.random.words(2));
    cy.clickSaveAndCheckResponse();
  });

  it("Delete Actions record", () => {
    cy.visit(`/#!/Lookup/Action/${ActionId}`);
    cy.clickDeleteAndCheckResponse();
  });
});
