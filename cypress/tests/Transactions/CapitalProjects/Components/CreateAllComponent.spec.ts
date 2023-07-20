import { faker } from "@faker-js/faker";

describe("Create Component - negative scenarios, Create and Delete", () => {
  let compId;

  const data = {
    typeCode: "1",
    code: faker.datatype.number(99999),
    description: faker.random.words(2),
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Component - Negative Cases", { tags: "@smoke" }, () => {
    cy.visit("/#!/CJComponent/Create");
    cy.wait(500);
    cy.EditInputElement("Code", data.code);
    cy.EditInputElement("Description", data.description);
    cy.clickAndCheckAlert(
      "Save",
      "Type Code is required\r\nType is required\r\n"
    );

    cy.openFlyoutAndSelectRandomValue("Type Code");
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", data.code);
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Crate Component Record With Required fields", { tags: "@smoke" }, () => {
    cy.visit("/#!/CJComponent/Create");
    cy.EditInputElement("Code", data.code);
    cy.openFlyoutAndSelectRandomValue("Type Code");
    cy.EditInputElement("Description", data.description);
    cy.selectRepairCenter();
    cy.clickAndCheckResponse("Save", "POST", "CJComponent/Create*", 200);
    cy.get("#UserToolBarCollapse > ul > li:nth-child(4) > a").click();
  });

  it("Create new Component Record With All Fields", () => {
    cy.visit("/#!/CJComponent/Create/Identity");
    cy.EditInputElement("Code", data.code);
    cy.openFlyoutAndSelectRandomValue("Type Code");
    cy.EditInputElement("Description", data.description);
    cy.openFlyoutAndSelectRandomValue("Budget Category");
    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.selectRepairCenter();
    cy.clickAndCheckResponse("Save", "POST", "CJComponent/Create*", 200).then(
      (id) => {
        compId = id;
      }
    );
  });

  it("Delete Component", () => {
    cy.visit(`/#!/CJComponent/${compId}/Identity`);
    cy.clickDeleteAndCheckResponse();
  });
});
