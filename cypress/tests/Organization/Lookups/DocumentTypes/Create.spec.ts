import { faker } from "@faker-js/faker";

describe("Create Document Types", () => {
  let documentID;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Document Type - Negative Cases", { tags: "@smoke" }, () => {
    cy.visit("#!/Lookup/DocumentType/Create");
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create New Document Type data", { tags: "@smoke" }, () => {
    cy.visit("#!/Lookup/DocumentType/Create");
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.selectRepairCenter();
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/DocumentType/Create?*",
      200
    ).then((id) => {
      documentID = id;
    });
  });

  it("Edit  Document Type data", () => {
    cy.visit(`/#!/Lookup/DocumentType/${documentID}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Document Types')").should(
      "be.visible"
    );
    cy.wait(500);
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Copy  Document Type data", () => {
    cy.visit(`/#!/Lookup/DocumentType/${documentID}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Document Types')").should(
      "be.visible"
    );
    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAndCheckResponse();
  });

  it("Delete  Document Type data", () => {
    cy.visit(`/#!/Lookup/DocumentType/${documentID}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Document Types')").should(
      "be.visible"
    );
    cy.clickDeleteAndCheckResponse();
  });
});
