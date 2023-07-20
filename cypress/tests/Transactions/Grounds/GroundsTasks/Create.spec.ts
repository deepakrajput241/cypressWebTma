import { faker } from "@faker-js/faker";
describe("Create Grounds Tasks", () => {
  let taskID;
  const data = {
    type: "test",
    pmTaskCode: "2424",
    groundsItem: "Account Administrator",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Ground Task - Negative Cases", { tags: "@smoke" }, () => {
    cy.visit("#!/GRNTask/Create");
    cy.get("span[ng-bind='WindowTitle']:contains('Grounds Tasks')").should(
      "be.visible"
    );
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.openFlyoutAndSelectRandomValue("Grounds Item");
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");

    cy.EditInputElement("Description", faker.random.words(2));
    cy.get("input[aria-label='Type']").eq(0).clear();
    cy.clickAndCheckAlert(
      "Save",
      "Type is required\r\nType Description is required\r\n"
    );

    cy.openFlyoutAndSelectRandomValue("Type");
    cy.get("input[aria-label='Grounds Item']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Grounds Item is required\r\n");
  });

  it("Create Ground Task with Required fields", { tags: "@smoke" }, () => {
    cy.visit("#!/GRNTask/Create");
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.openFlyoutAndSelectRandomValue("Grounds Item");
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });

  it("Create Ground Task with All fields", () => {
    cy.visit("#!/GRNTask/Create");
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.openFlyoutAndSelectRandomValue("Grounds Item");
    cy.fillNumericTextBox(0, faker.datatype.number(100));
    cy.get("select[aria-label='Frequency']")
      .eq(0)
      .select(Math.floor(Math.random() * 1));
    cy.fillNumericTextBox(1, faker.datatype.number(100));
    cy.get("select[aria-label='Frequency']")
      .eq(1)
      .should("be.visible")
      .select(Math.floor(Math.random() * 1));
    cy.fillNumericTextBox(2, faker.datatype.number(100));
    cy.get("select[aria-label='Frequency']")
      .eq(2)
      .should("be.visible")
      .select(Math.floor(Math.random() * 1));
    cy.fillNumericTextBox(3, faker.datatype.number(100));
    cy.get("select[aria-label='Frequency']")
      .eq(3)
      .should("be.visible")
      .select(Math.floor(Math.random() * 1));
    cy.fillNumericTextBox(4, faker.datatype.number(100));
    cy.get("select[aria-label='Frequency']")
      .eq(4)
      .should("be.visible")
      .select(Math.floor(Math.random() * 1));
    cy.fillNumericTextBox(5, faker.datatype.number(100));
    cy.fillNumericTextBox(6, faker.datatype.number(100));
    cy.openFlyoutAndSelectRandomValue("Grounds Item");
    cy.openFlyoutAndSelectRandomValue("Associated Task");
    cy.editTextarea("Additional Instructions", faker.random.words(5));
    cy.selectRepairCenter();
    cy.clickAndCheckResponse("Save", "POST", "GRNTask/Create*", 200).then(
      (id) => {
        taskID = id;
      }
    );
  });

  it("Delete Ground Task", () => {
    cy.visit(`/#!/GRNTask/${taskID}`);
    cy.clickDeleteAndCheckResponse();
  });
});
