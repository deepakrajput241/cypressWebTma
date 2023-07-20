import { faker } from "@faker-js/faker";

function verifyTheDateReturnwhenClickOnShowWorkTimeAndNonWorkTime(timeType) {
  cy.wait(1000);
  if (timeType == "worktime") {
    cy.get("tbody[role='rowgroup']")
      .find("tr")
      .then((listing) => {
        var listingCount = Cypress.$(listing).length;
        cy.wrap(listingCount).as("totalDataReturn");
      });
    cy.get("@totalDataReturn").then((totalDataReturn) => {
      for (var i = 1; i < totalDataReturn + 1; i++) {
        cy.xpath(`//tbody[@role='rowgroup']//tr[${i}]//td[7]`).then(
          ($timetype1) => {
            if ($timetype1.text().includes("REG")) {
              cy.log(`The Time Type of #${i} is corrected.`);
            } else {
              cy.log(`The Time Type  #${i} is not corrected.`);
            }
          }
        );
      }
    });
  } else {
    cy.wait(1000);
    cy.get("tbody[role='rowgroup']")
      .find("tr")
      .then((listing) => {
        var listingCount = Cypress.$(listing).length;
        cy.wrap(listingCount).as("totalDataReturn");
      });
    cy.get("@totalDataReturn").then((totalDataReturn) => {
      for (var i = 1; i < totalDataReturn + 1; i++) {
        cy.xpath(`//tbody[@role='rowgroup']//tr[${i}]//td[7]`).then(
          ($timetype2) => {
            if ($timetype2.text().includes("REG")) {
              cy.log(`The Time Type of #${i} is corrected.`);
            } else {
              cy.log(`The Time Type  #${i} is not corrected.`);
            }
          }
        );
      }
    });
  }
}
describe("Validate Time And Attendance", () => {
  const data = {
    technicianId: "101",
    trade: "Admin",
    timeType: "PTO",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/TimeAndAttendance/Create/Identity");
  });

  it("Verify the Data is returned correctly. ", () => {
    cy.get("select[name='TimeFrame']").select(7);
    cy.fillComboboxAndClick("Technician ID", "520820");
    verifyTheDateReturnwhenClickOnShowWorkTimeAndNonWorkTime("nonworktime");
    cy.clickCheckbox("ShowNonWorkTime");
    verifyTheDateReturnwhenClickOnShowWorkTimeAndNonWorkTime("worktime");
    cy.clickCheckbox("ShowNonWorkTime");
    cy.fillComboboxAndClick("Trade", "Admin");
    cy.get("tbody[role='rowgroup']")
      .find("tr")
      .then((listing) => {
        var listingCount = Cypress.$(listing).length;
        cy.wrap(listingCount).as("totalDataReturn");
      });
    cy.get("@totalDataReturn").then((totalDataReturn) => {
      for (var i = 1; i < totalDataReturn + 1; i++) {
        cy.xpath(`//tbody[@role='rowgroup']//tr[${i}]//td[6]`).then(
          ($value) => {
            if ($value.text().includes("Admin")) {
              cy.log(`The Trade of #${i} is corrected.`);
            } else {
              cy.log(`The Trade  #${i} is not corrected.`);
            }
          }
        );
      }
    });
  });

  it("Add Labor Line", () => {
    cy.get("input[aria-label='Technician ID']")
      .eq(0)
      .click()
      .type("101")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.get("select[aria-label='Time Frame']").eq(0).select("This Year");
    cy.get("input[ng-model='dataItem.selected']").eq(0).click();
    cy.get("div[ng-bind='actionItem.Langstring']")
      .contains("Add Labor Line")
      .click();
    cy.fillCombobox("Technician Code", 1);
    cy.fillNumericTextBox(0, faker.datatype.number(24));
    cy.fillCombobox("Time Type Code", 1);
    cy.getButtonWithText("Save").click();
  });

  it("Export All", () => {
    cy.get("input[aria-label='Technician ID']")
      .eq(0)
      .click()
      .type("101")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.get("select[aria-label='Time Frame']").eq(0).select("This Year");
    cy.get("input[ng-click='exportAll()']").click();
  });

  it("Approve Time Entries", () => {
    cy.get("input[aria-label='Technician ID']")
      .eq(0)
      .click()
      .type("101")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.get("select[aria-label='Time Frame']").eq(0).select("This Year");
    cy.get("input[ng-model='dataItem.selected']").eq(0).click();
    cy.get("div[ng-bind='actionItem.Langstring']")
      .contains("Approve Time Entries")
      .click();
    cy.getButtonWithText("Save").click();
  });

  it("Revoke Approval", () => {
    cy.get("input[aria-label='Technician ID']")
      .eq(0)
      .click()
      .type("101")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.get("select[aria-label='Time Frame']").eq(0).select("This Year");
    cy.get("input[ng-model='dataItem.selected']").eq(0).click();
    cy.get("div[ng-bind='actionItem.Langstring']")
      .contains("Revoke Approval")
      .click();
  });
});
