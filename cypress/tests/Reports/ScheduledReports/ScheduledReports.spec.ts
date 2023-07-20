import { faker } from "@faker-js/faker";

describe("Create Scheduled Report", { tags: "@spreadsheet" }, () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/ReportScheduler/Create");
  });

  it("Scheduled Report - Send for PDF", () => {
    cy.get("a[id='toolbarAddScheduledReports']").click();
    cy.fillCombobox("Report Rpt Title", "Account Detail");
    cy.EditInputElement("Interval", "2");
    cy.get("select[aria-label='Interval DDL']").select("Month");
    cy.fillTimeInput("Time", "08:00 AM");
    cy.get("input[aria-label='Next Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("dd input[aria-label= 'Email To']").type(
      "mark.bickford@tmasystems.com"
    );
    cy.getButtonWithText("Save").click();
  });

  it("Scheduled Report - Send for Excel", () => {
    cy.get("a[id='toolbarAddScheduledReports']").click();
    cy.fillCombobox("Report Rpt Title", "Account Detail");
    cy.EditInputElement("Interval", "2");
    cy.get("select[aria-label='Interval DDL']").select("Month");
    cy.fillTimeInput("Time", "08:00 AM");
    cy.get("input[aria-label='Next Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.selectRadioBtnById("Format-1");
    cy.get("dd input[aria-label= 'Email To']").type(
      "mark.bickford@tmasystems.com"
    );
    cy.getButtonWithText("Save").click();
  });
});
