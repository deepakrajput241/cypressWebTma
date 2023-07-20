import { faker } from "@faker-js/faker";

describe("Create,Edit,Copy,Delete and Negative a Biomed Equipment Types", () => {
  let biomedEquipmentID;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Biomed Equipment - Negative Cases", { tags: "@smoke" }, () => {
    cy.visit("/#!/Lookup/CEEquipmentType/Create");
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(9999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it(
    "Create Biomed Equipment Type with Required fields",
    { tags: "@smoke" },
    () => {
      cy.visit("/#!/Lookup/CEEquipmentType/Create");
      cy.EditInputElement("Code", faker.datatype.number(999999));
      cy.EditInputElement("Description", faker.random.words(2));
      cy.selectRepairCenter();
      cy.clickSaveAndCheckResponse();
    }
  );

  it("Create Biomed Equipment Type with All fields", () => {
    cy.visit("/#!/Lookup/CEEquipmentType/Create");
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.get("#toolbarAddSubType").click();
    cy.get("input[name='Code']").eq(1).clear().type(faker.random.numeric(5));
    cy.get("input[name='Description']")
      .eq(1)
      .clear()
      .type(faker.random.words(5));
    cy.getButtonWithText("Save").click();
    cy.selectRepairCenter();
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/CEEquipmentType/Create?*",
      200
    ).then((id) => {
      biomedEquipmentID = id;
    });
  });

  it("Edit Biomed Equipment Types data", () => {
    cy.visit(`/#!/Lookup/CEEquipmentType/${biomedEquipmentID}`);
    cy.get(
      "span[ng-bind='WindowTitle']:contains('Biomed Equipment Types')"
    ).should("be.visible");
    cy.wait(500);
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Copy Biomed Equipment Types data", () => {
    cy.visit(`/#!/Lookup/CEEquipmentType/${biomedEquipmentID}`);
    cy.get(
      "span[ng-bind='WindowTitle']:contains('Biomed Equipment Types')"
    ).should("be.visible");
    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAndCheckResponse();
  });

  it("Delete Biomed Equipment Types data", () => {
    cy.visit(`/#!/Lookup/CEEquipmentType/${biomedEquipmentID}`);
    cy.clickDeleteAndCheckResponse();
  });
});
