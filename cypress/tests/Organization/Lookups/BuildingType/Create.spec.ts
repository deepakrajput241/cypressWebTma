import { faker } from "@faker-js/faker";

describe("Create new Building Types", () => {
  let ID;

  beforeEach("Login to Web app", () => {
    cy.login(Cypress.env("user1"));
  });

  it("Building Type - Negative Cases", { tags: "@smoke" }, () => {
    cy.visit("/#!/Lookup/BuildingType/Create/Identity");
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create Building Type with Required fields", { tags: "@smoke" }, () => {
    cy.visit("/#!/Lookup/BuildingType/Create");
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAndCheckResponse();
  });

  it("Create new Building Type Data with All fields", () => {
    cy.visit("/#!/Lookup/BuildingType/Create");
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.fillNumericTextBox(0, faker.datatype.number(10000));
    cy.get("#toolbarAddSubType").click().wait(1000);
    cy.get("input[name='Code']")
      .eq(1)
      .should("be.visible")
      .type(faker.datatype.number(1000000));
    cy.get("input[name='Description']")
      .eq(1)
      .should("be.visible")
      .type(faker.random.words(5));
    cy.getButtonWithText("Save").click();
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/BuildingType/Create?*",
      200
    ).then((id) => {
      ID = id;
    });
  });

  it("Copy Building Type Data", () => {
    cy.visit(`/#!/Lookup/BuildingType/${ID}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Building Types')").should(
      "be.visible"
    );
    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(10000000));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickSaveAndCheckResponse();
  });

  it("Edit Building Type Data", () => {
    cy.visit(`/#!/Lookup/BuildingType/${ID}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Building Types')").should(
      "be.visible"
    );
    cy.wait(500);
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(10000000));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Delete new Building Type Data", () => {
    cy.visit(`/#!/Lookup/BuildingType/${ID}/Identity`);
    cy.contains("a", "Identity").click();
    cy.clickDeleteAndCheckResponse();
  });
});
