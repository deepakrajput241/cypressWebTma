import { faker } from "@faker-js/faker";

describe("Create CP Work Element Types", () => {
  let workElementTypeId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("CP Work Element Types- Negative Cases", { tags: "@smoke" }, () => {
    cy.visit("/#!/Lookup/CPWorkElementType/Create");
    cy.EditInputElement("Description", faker.random.words(2));
    cy.EditInputElement("Code", faker.datatype.number(100));
    cy.clickAndCheckAlert("Save", "Designation is required\r\n");

    cy.get("select[name='Designation']").select("2");
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(100));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it(
    "Create CP Work Element Type with Required fields",
    { tags: "@smoke" },
    () => {
      cy.visit("/#!/Lookup/CPWorkElementType/Create");
      cy.EditInputElement("Code", faker.datatype.number(9999));
      cy.EditInputElement("Description", faker.random.words(2));
      cy.get("select[name='Designation']").select("2");
      cy.clickSaveAndCheckResponse();
    }
  );

  it("Create CP Work Element Types with All Fields", () => {
    cy.visit("/#!/Lookup/CPWorkElementType/Create");
    cy.EditInputElement("Code", faker.datatype.number(9999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.get("select[name='Designation']").select("2");
    cy.get("#toolbarAddSubType").should("be.visible").click();
    cy.get("input[name='Code']").eq(1).type(faker.datatype.number(9999999));
    cy.get("input[name='Description']").eq(1).type(faker.random.words(2));
    cy.getButtonWithText("Save").click();
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/CPWorkElementType/Create?*",
      200
    ).then((id) => {
      workElementTypeId = id;
    });
  });

  it("Edit CP Work Element Type", () => {
    cy.visit(`/#!/Lookup/CPWorkElementType/${workElementTypeId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Work Element Types')").should(
      "be.visible"
    );
    cy.wait(500);
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(9999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.get("select[name='Designation']").select("Plant Adaption");
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Copy CP Work Element Type", () => {
    cy.visit(`/#!/Lookup/CPWorkElementType/${workElementTypeId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Work Element Types')").should(
      "be.visible"
    );
    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(9999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.get("select[name='Designation']").select("Plant Adaption");
    cy.clickSaveAndCheckResponse();
  });

  it("Delete CP Work Element Type", () => {
    cy.visit(`/#!/Lookup/CPWorkElementType/${workElementTypeId}`);
    cy.clickDeleteAndCheckResponse();
  });
});
