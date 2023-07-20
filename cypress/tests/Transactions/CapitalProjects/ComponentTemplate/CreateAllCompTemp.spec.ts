import { faker } from "@faker-js/faker";

describe("Component Template - negative scenarios, Create and Delete", () => {
  const data = {
    code: faker.datatype.number(9999),
    description: faker.random.words(2),
  };

  let tempId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Component Template - Negative Cases", { tags: "@smoke" }, () => {
    cy.visit("/#!/CJComponentTemplate/Create");
    cy.EditInputElement("Description", data.description);
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", data.code);
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it(
    "Create Component Template with Required Fields",
    { tags: "@smoke" },
    () => {
      cy.visit("/#!/CJComponentTemplate/Create");
      cy.EditInputElement("Code", faker.datatype.number(9999));
      cy.EditInputElement("Description", faker.random.words(2));
      cy.clickAndCheckResponse(
        "Save",
        "POST",
        "CJComponentTemplate/Create*",
        200
      );

      cy.clickDeleteAndCheckResponse();
    }
  );

  it("Create new Component Template With All Fields", () => {
    cy.visit("/#!/CJComponentTemplate/Create");
    cy.EditInputElement("Code", faker.datatype.number(9999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.get("#toolbarAddComponent").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]"
    );
    cy.get("a[ng-click='saveSelection()']").click();
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "CJComponentTemplate/Create*",
      200
    ).then((id) => {
      tempId = id;
    });
  });

  it("Delete Component Template", () => {
    cy.visit(`/#!/CJComponentTemplate/${tempId}/Identity`);
    cy.clickDeleteAndCheckResponse();
  });
});
