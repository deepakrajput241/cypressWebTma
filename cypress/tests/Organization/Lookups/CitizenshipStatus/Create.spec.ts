import { faker } from "@faker-js/faker";

describe("Create,Edit,Copy,Delete and Negative a Citizenship Statuses", () => {
  let citizenshipID;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Create new Citizenship Statuses without Code", { tags: "@smoke" }, () => {
    cy.visit("/#!/Lookup/CitizenStatus/Create");
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create New Citizenship Statuses data", { tags: "@smoke" }, () => {
    cy.visit("/#!/Lookup/CitizenStatus/Create");
    cy.EditInputElement("Code", faker.datatype.number(9999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/CitizenStatus/Create?*",
      200
    ).then((id) => {
      citizenshipID = id;
    });
  });

  it("Edit Citizenship Statuses Types data", () => {
    cy.visit(`/#!/Lookup/CitizenStatus/${citizenshipID}`);
    cy.get(
      "span[ng-bind='WindowTitle']:contains('Citizenship Statuses')"
    ).should("be.visible");
    cy.wait(500);
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(9999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Copy Citizenship Statuses data", () => {
    cy.visit(`/#!/Lookup/CitizenStatus/${citizenshipID}`);
    cy.get(
      "span[ng-bind='WindowTitle']:contains('Citizenship Statuses')"
    ).should("be.visible");
    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(9999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickSaveAndCheckResponse();
  });

  it("Delete Citizenship Statuses data", () => {
    cy.visit(`/#!/Lookup/CitizenStatus/${citizenshipID}`);
    cy.clickDeleteAndCheckResponse();
  });
});
