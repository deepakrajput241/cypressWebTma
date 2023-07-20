import { faker } from "@faker-js/faker";

const data = {
  fileType: "Fixed Length",
  templateCode: "133",
  transactionType: "Encumbrance",
};

function fillRequiredFields() {
  cy.fillSelect("Transaction Type", "Encumbrance");
  cy.fillCombobox("Template Code", data.templateCode);
}

describe("add UFI Template Assignment", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/UFITemplateAssignment/Create");
  });

  it("should not add UFI Template Assignment without required fields", () => {
    // missing Transaction Type
    fillRequiredFields();
    cy.clearSelect("Transaction Type");
    cy.clickSaveAndCheckAlert("Transaction Type is required\r\n");

    // missing Template Code
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("Template Code");
    cy.clickSaveAndCheckAlert(
      "Template Code is required\r\nTemplate Description is required\r\n"
    );
  });

  it(
    "should add UFI Template Assignment with required fields, and then delete it",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();

      cy.clickDeleteAndCheckResponse();
    }
  );

  it("should add UFI Template Assignment (Save as File), and then delete it", () => {
    cy.fillSelect("Transaction Type", data.transactionType);
    cy.fillCombobox("Template Code", data.templateCode);
    cy.fillSelect("File Type", data.fileType);
    cy.fillInput("File Name Format", faker.random.words(3));
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });

  it("should add UFI Template Assignment (Insert In table), and then delete it", () => {
    cy.fillSelect("Transaction Type", data.transactionType);
    cy.fillCombobox("Template Code", data.templateCode);
    cy.fillRadio("OutputType", "1");
    cy.fillInput("File Name Format", faker.random.words(3));
    cy.fillTextarea("Insert Statement", faker.lorem.sentence());
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });
});
