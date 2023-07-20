import { faker } from "@faker-js/faker";

describe("Create,Edit,Copy,Delete and Negative a Employment Types", () => {
  let employmentID;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Employment Types - Negative Cases", { tags: "@smoke" }, () => {
    cy.visit("#!/Lookup/EmploymentType/Create/Identity");
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create New Employment Types data", { tags: "@smoke" }, () => {
    cy.visit("#!/Lookup/EmploymentType/Create/Identity");
    cy.EditInputElement("Code", `Auto-${faker.datatype.number(9999)}`);
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/EmploymentType/Create?*",
      200
    ).then((id) => {
      employmentID = id;
    });
  });

  it("Edit New Employment Types data", () => {
    cy.visit(`/#!/Lookup/EmploymentType/${employmentID}/Identity`);
    cy.get("span[ng-bind='WindowTitle']:contains('Employment Types')").should(
      "be.visible"
    );
    cy.wait(500);
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", `Auto-${faker.datatype.number(9999)}`);
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Copy New Employment Types data", () => {
    cy.visit(`/#!/Lookup/EmploymentType/${employmentID}/Identity`);
    cy.get("span[ng-bind='WindowTitle']:contains('Employment Types')").should(
      "be.visible"
    );
    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", `Auto-${faker.datatype.number(9999)}`);
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickSaveAndCheckResponse();
  });

  it("Delete New Employment Types data", () => {
    cy.visit(`/#!/Lookup/EmploymentType/${employmentID}/Identity`);
    cy.get("span[ng-bind='WindowTitle']:contains('Employment Types')").should(
      "be.visible"
    );
    cy.clickDeleteAndCheckResponse();
  });
});
