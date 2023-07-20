import { faker } from "@faker-js/faker";
describe("Transaction - Training - Batch Request", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/TrainingBatchRequest/Create/TrainingBatchRequestPage1");
  });

  it("Verify Search Function In Training Batch Request.", () => {
    cy.get("input[ng-model='dataItem.searchCriteriaValue']")
      .click()
      .type("0017")
      .wait(500);
    cy.get("[name='btnFilter']").click();
    cy.get("span[ng-bind='dataItem.Code']")
      .eq(0)
      .should("contain.text", "0017");
  });

  it("Verify Negative Request In Training Batch Request.", () => {
    cy.get("[name='Next']").click();
    cy.get("tbody[role='rowgroup']")
      .find("tr")
      .then((listing) => {
        var listingCount = Cypress.$(listing).length;
        cy.wrap(listingCount).as(`${"SelectClass"}`);
      });
    cy.get(`@${"SelectClass"}`).then((totalDataLoaded) => {
      const randomRecordIndex = faker.datatype.number({
        min: 0,
        max: totalDataLoaded,
      });
      cy.wait(1000);
      cy.get("input[ng-model='dataItem.selected']")
        .eq(randomRecordIndex)
        .check();
    });
    cy.get("[name='Next']").click();
    cy.get("[name='Previous']").click();
    cy.get("[name='Next']").click();
    cy.get("[name='CreateRequest']").click();
  });

  it("Verify Create New Request In Training Batch Request.", () => {
    cy.get("tbody[role='rowgroup']")
      .find("tr")
      .then((listing) => {
        var listingCount = Cypress.$(listing).length;
        cy.wrap(listingCount).as(`${"SelectClass"}`);
      });
    cy.get(`@${"SelectClass"}`).then((totalDataLoaded) => {
      const randomRecordIndex = faker.datatype.number({
        min: 0,
        max: totalDataLoaded,
      });
      cy.wait(1000);
      cy.get("input[ng-model='dataItem.selected']")
        .eq(randomRecordIndex)
        .check();
    });
    cy.get("[name='Next']").click();
    cy.get("[name='Previous']").click();
    cy.get("[name='Next']").click();
    cy.get("tbody[role='rowgroup']")
      .find("tr")
      .then((listing) => {
        var listingCount = Cypress.$(listing).length;
        cy.wrap(listingCount).as(`${"TechnicianSelection"}`);
      });
    cy.get(`@${"TechnicianSelection"}`).then((totalDataLoaded) => {
      const randomRecordIndex = faker.datatype.number({
        min: 0,
        max: totalDataLoaded,
      });
      cy.wait(1000);
      cy.get("input[ng-model='dataItem.selected']")
        .eq(randomRecordIndex)
        .check();
    });
    cy.intercept("POST", "**/TrainingBatchRequest/SaveId*").as(
      "createNewRecord"
    );
    cy.get("[name='CreateRequest']").click();
    cy.wait("@createNewRecord").its("response.statusCode").should("eq", 200);
  });
});
