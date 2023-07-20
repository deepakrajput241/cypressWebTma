import { faker } from "@faker-js/faker";

describe("Create,Edit,Copy,Delete and Negative a Area functions", () => {
  let areaID;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Area function - negative scenarios", { tags: "@smoke" }, () => {
    cy.visit("/#!/Lookup/AreaFunction/Create");
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create New Area function", { tags: "@smoke" }, () => {
    cy.visit("/#!/Lookup/AreaFunction/Create");
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/AreaFunction/Create?*",
      200
    ).then((id) => {
      areaID = id;
    });
  });

  it("Edit New Area function", () => {
    cy.visit(`/#!/Lookup/AreaFunction/${areaID}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Area Functions')").should(
      "be.visible"
    );
    cy.wait(500);
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Copy Area function", () => {
    cy.visit(`/#!/Lookup/AreaFunction/${areaID}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Area Functions')").should(
      "be.visible"
    );
    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAndCheckResponse();
  });

  it("Delete Area function", () => {
    cy.visit(`/#!/Lookup/AreaFunction/${areaID}`);
    cy.clickDeleteAndCheckResponse();
  });
});
