import { faker } from "@faker-js/faker";

it("Create  Service Request Form", () => {
  cy.login(Cypress.env("userRequestor"));
  cy.visit("/#!/RequestorHome/Create");
  cy.get("select[aria-label='Location Type']").select("Facility");
  cy.get("input[aria-label='Location Type']")
    .eq(0)
    .click()
    .type("School District")
    .wait(500)
    .type("{downArrow}{enter}");
  cy.editTextarea("Action Requested", faker.random.words(5));
  cy.get("input[ng-click='Submit()']").click();
});
