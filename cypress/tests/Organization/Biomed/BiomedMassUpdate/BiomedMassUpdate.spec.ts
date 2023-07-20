import { faker } from "@faker-js/faker";

const data = {
  displayDataToExist: "Control ID",
  queryToModify: "CEEquipment Mass Update",
};

describe("Create Biomed Mass Update", { tags: ["@smoke"] }, () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/CEEquipmentMassUpdate");
  });

  it("should create query, query should display data, and then delete query", () => {
    const newQueryName = faker.random.words(3);
    // save
    cy.get("select[ng-model='Settings.SelectedQueryId']")
      .select(data.queryToModify)
      .wait(500);
    cy.contains("button", "Save Query As").click();
    cy.get("input[aria-label='Query Name']").type(newQueryName);
    cy.intercept("POST", "/SearchBrowse/SaveQuery").as("request");
    cy.get("button[ng-click='customSave()']").click();
    cy.wait("@request").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body.Id).exist;
    });
    // display
    cy.contains("List Results").click();
    cy.contains(data.displayDataToExist);
    // delete
    cy.contains("New Browse Selection").click();
    cy.get("select[ng-model='Settings.SelectedQueryId']").select(newQueryName);
    cy.get("a[name='DeleteQueryBtn']").click();
  });
});
