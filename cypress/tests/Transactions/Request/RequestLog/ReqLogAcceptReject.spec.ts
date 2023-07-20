import { faker } from "@faker-js/faker";

function checkAcceptReject() {
  cy.wait(2000); // Without wait it will throw error
  cy.get("#divTabContent").then(($body) => {
    if ($body.text().includes("Accept/Reject/Hold")) {
      cy.editTextarea("Reject/Hold Reason", faker.random.words(2));
    } else {
      checkAcceptReject();
    }
  });
}

describe("Accept And Reject Request Log", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/RequestLog/2100/Identity");
  });

  it("Search for a record and Accept Request", () => {
    cy.get("span[ng-bind='WindowTitle']:contains('Request Log')").should(
      "be.visible"
    );

    checkAcceptReject();
    cy.get("input[name='AcceptBtn']").click();
    cy.fillCombobox("Trade DESC", "Admin");
    cy.getButtonWithText("Save").click();
    cy.get("button[ng-click='cancel()']").eq(0).click({ force: true });
  });

  it("Search for a record and Reject Request", () => {
    cy.get("span[ng-bind='WindowTitle']:contains('Request Log')").should(
      "be.visible"
    );

    checkAcceptReject();
    cy.get("input[name='RejectBtn']").click();
  });
});
