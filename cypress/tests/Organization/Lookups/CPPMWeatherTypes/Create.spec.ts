import { faker } from "@faker-js/faker";

describe("Create, Edit, Copy, Delete and Negative Scenarios- 'CPPM Weather Types'", () => {
  let weathertypesId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("CPPM Weather Types - Negative Cases", { tags: "@smoke" }, () => {
    cy.visit("/#!/Lookup/CJWeatherType/Create");
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");

    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/CJWeatherType/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for CJ Weather Type Repair Center\r\n"
    );
  });

  it("Create CPPM Weather Type", { tags: "@smoke" }, () => {
    cy.visit("/#!/Lookup/CJWeatherType/Create");
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.get("#toolbarAddSubType").should("be.visible").click();
    cy.get("input[name='Code']").eq(1).type(faker.random.numeric(5));
    cy.get("input[name='Description']").eq(1).type(faker.random.words(2));
    cy.getButtonWithText("Save").click();
    cy.selectRepairCenter();
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/CJWeatherType/Create?*",
      200
    ).then((id) => {
      weathertypesId = id;
    });
  });

  it("Edit CPPM Weather Types record", () => {
    cy.visit(`/#!/Lookup/CJWeatherType/${weathertypesId}`);
    cy.get(
      "span[ng-bind='WindowTitle']:contains('CPPM  Weather Types')"
    ).should("be.visible");
    cy.wait(500);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Copy CPPM Weather Types record", () => {
    cy.visit(`/#!/Lookup/CJWeatherType/${weathertypesId}`);
    cy.get(
      "span[ng-bind='WindowTitle']:contains('CPPM  Weather Types')"
    ).should("be.visible");
    cy.wait(500);
    cy.contains("a", "Identity").click();
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAndCheckResponse();
  });

  it("Delete CPPM Weather Types record", () => {
    cy.visit(`/#!/Lookup/CJWeatherType/${weathertypesId}`);
    cy.wait(500);
    cy.clickDeleteAndCheckResponse();
  });
});
