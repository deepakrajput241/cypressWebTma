import { faker } from "@faker-js/faker";

describe("Create, Edit, Copy, Delete and Negative Script- 'Account Groups'", () => {
  let accountgroupId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it(
    "Create Account Group record without Code- Negative Scenario",
    { tags: "@smoke" },
    () => {
      cy.visit("/#!/Lookup/AccountGroup/Create");
      cy.EditInputElement("Description", faker.random.words(1));
      cy.clickAndCheckAlert("Save", "Code is required\r\n");
    }
  );

  it("Create Account Group record without Description- Negative Scenario", () => {
    cy.visit("#!/Lookup/AccountGroup/Create");
    cy.EditInputElement("Code", faker.datatype.number(100));
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create Account Group record", { tags: "@smoke" }, () => {
    cy.visit("#!/Lookup/AccountGroup/Create");
    cy.get("span[ng-bind='WindowTitle']:contains('Account Groups')").should(
      "be.visible"
    );
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/AccountGroup/Create?*",
      200
    ).then((id) => {
      accountgroupId = id;
    });
  });

  it("Edit Account Group record", () => {
    cy.visit(`/#!/Lookup/AccountGroup/${accountgroupId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Account Groups')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(9999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Copy Account Group record", () => {
    cy.visit(`/#!/Lookup/AccountGroup/${accountgroupId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Account Groups')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(9999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAndCheckResponse();
  });

  it("Delete Account Group record", () => {
    cy.visit(`/#!/Lookup/AccountGroup/${accountgroupId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Account Groups')").should(
      "be.visible"
    );
    cy.clickDeleteAndCheckResponse();
  });
});
