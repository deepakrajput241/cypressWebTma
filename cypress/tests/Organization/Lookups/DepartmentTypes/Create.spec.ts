import { faker } from "@faker-js/faker";

describe("Create,Edit,Copy,Delete and Negative a Department Types", () => {
  let departmentID;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Department Type - Negative Cases", { tags: "@smoke" }, () => {
    cy.visit("/#!/Lookup/DepartmentType/Create");
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(9999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create New Department Type record", { tags: "@smoke" }, () => {
    cy.visit("/#!/Lookup/DepartmentType/Create");
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/DepartmentType/Create?*",
      200
    ).then((id) => {
      departmentID = id;
    });
  });

  it("Edit Department Type record", () => {
    cy.visit(`/#!/Lookup/DepartmentType/${departmentID}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Department Types')").should(
      "be.visible"
    );
    cy.wait(500);
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Copy Department Type record", () => {
    cy.visit(`/#!/Lookup/DepartmentType/${departmentID}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Department Types')").should(
      "be.visible"
    );
    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickSaveAndCheckResponse();
  });

  it("Delete Department Type record", () => {
    cy.visit(`/#!/Lookup/DepartmentType/${departmentID}`);
    cy.clickDeleteAndCheckResponse();
  });
});
