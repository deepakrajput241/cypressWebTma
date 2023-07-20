import { faker } from "@faker-js/faker";

describe("Create, Edit, Copy, Delete and Negative Script- 'CP UniFormat' ", () => {
  let uniFormatId;

  const data = {
    parentLevel1: "Auto desc Omnigender till GB white Incredible",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("CP UniFormat - Negative Cases", { tags: "@smoke" }, () => {
    cy.visit("/#!/Lookup/CPElement/Create");
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(9999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create new CP UniFormat with Required fields", { tags: "@smoke" }, () => {
    cy.visit("#!/Lookup/CPElement/Create");
    cy.EditInputElement("Code", faker.datatype.number(9999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAndCheckResponse();
  });

  it("Create CP UniFormat record with Full Information", () => {
    cy.visit("#!/Lookup/CPElement/Create");
    cy.EditInputElement("Code", faker.datatype.number(9999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.fillCombobox("Parent Level 1", "SUBSTRUCTURE");
    cy.fillCombobox("Parent Level 2", "FOUNDATIONS");
    cy.openFlyoutAndSelectRandomValue("Parent Level 3");
    cy.clickAndCheckResponse("Save", "POST", "/CPElement/Create?*", 200).then(
      (id) => {
        uniFormatId = id;
      }
    );
  });

  it("Edit CP UniFormat record", () => {
    cy.visit(`/#!/Lookup/CPElement/${uniFormatId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('UniFormat')").should(
      "be.visible"
    );
    cy.wait(500);
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(9999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Copy CP UniFormat record", () => {
    cy.visit(`/#!/Lookup/CPElement/${uniFormatId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('UniFormat')").should(
      "be.visible"
    );
    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(9999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAndCheckResponse();
  });

  it("Delete CP UniFormat record", () => {
    cy.visit(`/#!/Lookup/CPElement/${uniFormatId}`);
    cy.clickDeleteAndCheckResponse();
  });
});
