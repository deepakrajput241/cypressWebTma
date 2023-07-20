import { faker } from "@faker-js/faker";

describe("Create New Record And Negative Cases for Capital Request", () => {
  let creqId;
  const data = {
    capitalSetup: "District",
    repairCenter: "FAC",
    department: "AIED",
    budgetManager: "101",
    title: faker.datatype.number(1000),
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Create Capital Request Without Title", { tags: "@smoke" }, () => {
    cy.visit("#!/CPFundingRequest/Create");
    cy.EditInputElement("Title", data.title);
    cy.fillNumericTextBox(0, "2022");
    cy.clickAndCheckAlert(
      "Save",
      "Capital Setup is required\r\nCapital Setup Description is required\r\n"
    );

    cy.openFlyoutAndSelectRandomValue("Capital Setup");
    cy.get("input[name='Title']").clear();
    cy.clickAndCheckAlert("Save", "Title is required\r\n");

    cy.EditInputElement("Title", data.title);
    cy.get(".k-formatted-value.k-input.ng-scope").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Budget Year is required\r\n");
  });

  it("Create Capital Request with Required Fields", { tags: "@smoke" }, () => {
    cy.visit("#!/CPFundingRequest/Create");
    cy.EditInputElement("Title", data.title);
    cy.openFlyoutAndSelectRandomValue("Capital Setup");
    cy.fillNumericTextBox(0, "2022");
    cy.clickAndCheckResponse("Save", "POST", "CPFundingRequest/Create*", 200);

    cy.clickDeleteAndCheckResponse();
  });

  it("Create new Capital Request With All Fields", () => {
    cy.visit("#!/CPFundingRequest/Create");

    cy.EditInputElement("Title", data.title);
    cy.openFlyoutAndSelectRandomValue("Capital Setup");
    cy.fillNumericTextBox(0, "2022");
    cy.openFlyoutAndSelectRandomValue("Repair Center");
    cy.openFlyoutAndSelectRandomValue("Department");
    cy.openFlyoutAndSelectRandomValue("Status");
    cy.EditInputElement("Reference #", faker.datatype.number(1000));
    cy.fillNumericTextBox(1, faker.datatype.number(1000));
    cy.fillNumericTextBox(2, faker.datatype.number(1000));
    cy.openFlyoutAndSelectRandomValue("Budget Manager");
    cy.editTextarea("Description", faker.random.words(3));
    cy.editTextarea("Comments", faker.random.words(3));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "CPFundingRequest/Create*",
      200
    ).then((id) => {
      creqId = id;
    });
  });

  it("Delete Capital Request Revision Reord", () => {
    cy.visit(`/#!/CPFundingRequest/${creqId}`);
    cy.clickDeleteAndCheckResponse();
  });
});
