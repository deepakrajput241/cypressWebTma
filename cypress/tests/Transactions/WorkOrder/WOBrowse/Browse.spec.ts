import { faker } from "@faker-js/faker";

const data = {
  name: "School District",
  nameType: "Facility Name",
};

describe("Work Order Browse - List Result", { tags: ["@smoke"] }, () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/WorkOrderBrowse/Create");
  });

  it("should list data with Default Work Orders Browse Query", () => {
    cy.contains("Reset Criteria").click();
    // this wait makes the test run more reliably
    cy.wait(500);
    cy.contains("List Results").click();
    // this wait makes the test run more reliably
    cy.wait(500);
    // expect at least five results in the table
    cy.get(".k-grid-content tr").eq(4).should("exist");
  });
});
