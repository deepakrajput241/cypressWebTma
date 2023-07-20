import { faker } from "@faker-js/faker";
describe("Create Training Class", () => {
  let ID;
  const data = {
    description: faker.random.words(1),
    enrollmentStart: faker.date.past().toLocaleDateString("en-US"),
    enrollmentEnd: faker.date.past().toLocaleDateString("en-US"),
    capacityDuration: faker.datatype.number(100).toString(),
    location: faker.random.words(5),
    additionalInfo: faker.random.words(5),
  };

  beforeEach("Login to the portal", () => {
    cy.login(Cypress.env("user1"));
  });

  it("Class - Negative Cases", { tags: "@smoke" }, () => {
    cy.visit("/#!/TrainingClass/Create");
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickAndCheckAlert("Save", "Repair Center is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Repair Center");
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Class Description is required\r\n");
  });

  it("Create Class Record With Required Fields", { tags: "@smoke" }, () => {
    cy.visit("/#!/TrainingClass/Create");
    cy.EditInputElement("Description", faker.random.words(1));
    cy.openFlyoutAndSelectRandomValue("Repair Center");
    cy.clickSaveAndCheckResponse();
  });

  it("Create Class With All Fields.", () => {
    cy.visit("/#!/TrainingClass/Create");
    cy.EditInputElement("Description", data.description);
    cy.openFlyoutAndSelectRandomValue("Program ID");
    cy.openFlyoutAndSelectRandomValue("Training Course");
    cy.fillInput("Enrollment Start", data.enrollmentStart);
    cy.fillInput("Enrollment End", data.enrollmentEnd);
    cy.fillNumericTextBox(0, data.capacityDuration);
    cy.fillNumericTextBox(1, data.capacityDuration);
    cy.fillNumericTextBox(2, data.capacityDuration);
    cy.fillSelect("Valid For Interval", "Days");
    cy.get(".k-formatted-value.k-input.ng-scope")
      .eq(3)
      .type(data.capacityDuration);
    cy.editTextarea("Location", data.location);
    cy.get("#toolbarAddTrainer").should("be.visible").click();
    cy.openFlyoutAndSelectRandomValue("Trainer Code");
    cy.get("a[ng-click='saveRecord()']").should("be.visible").click();
    cy.editTextarea("Additional Info", data.additionalInfo);

    cy.contains("Survey").click();
    cy.get("#toolbarAddSection").should("be.visible").click();
    cy.EditInputElement("Description", data.description);
    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.getButtonWithText("Save").click();
    cy.clickAndCheckResponse("Save", "POST", "TrainingClass/Create*", 200).then(
      (id) => {
        ID = id;
      }
    );
  });

  it("Delete Rental Record", () => {
    cy.visit(`/#!/TrainingClass/${ID}`);
    cy.clickDeleteAndCheckResponse();
  });
});
