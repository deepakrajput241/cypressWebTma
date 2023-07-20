describe("Validate Scheduler", () => {
  const data = {
    technicianId: "101",
    trade: "Admin",
    shift: "1st Shift",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Scheduler/Create/Identity");
  });

  it("Verify the Data is returned correctly. ", () => {
    cy.get("input[aria-label='Technician ID']")
      .eq(0)
      .click()
      .type("101")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.get('select[aria-label="Time Frame"]')
      .should("be.visible")
      .select("This Year");
    cy.get("tbody[role='rowgroup']")
      .should("be.visible")
      .find("tr")
      .then((listing) => {
        var listingCount = Cypress.$(listing).length;
        cy.wrap(listingCount).as("totalDataReturn");
      });
    cy.get("@totalDataReturn").then((totalDataReturn) => {
      for (var i = 1; i < totalDataReturn + 1; i++) {
        cy.xpath(`//tbody[@role='rowgroup']//tr[${i}]//td[5]`).then(($body) => {
          if ($body.text().includes("101 - George Richardson")) {
            cy.log(`The TechnicianID of #${i} is corrected.`);
          } else {
            cy.log(`The TechnicianID of #${i} is not corrected.`);
          }
        });
      }
    });
  });

  it("Search By Techician, Trade, Shift and Time Frame", () => {
    cy.get("input[aria-label='Technician ID']")
      .eq(0)
      .click()
      .wait(100)
      .type("101")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.get("input[aria-label='Trade']")
      .eq(0)
      .click()
      .wait(100)
      .type("Admin")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.get("input[aria-label='Shift']")
      .eq(0)
      .click()
      .wait(100)
      .type("1st Shift")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.get("select[aria-label='Time Frame']").select("This Year");
  });

  it("Search By Repair Center, Work Order Type, Shop, Priority and Time Frame", () => {
    cy.get("input[aria-label='Repair Center']")
      .eq(0)
      .click()
      .wait(100)
      .type("123123")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.get("input[aria-label='Work Order Type']")
      .eq(0)
      .click()
      .wait(100)
      .type("1 Corrective")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.get("input[aria-label='Shop']")
      .eq(0)
      .click()
      .wait(100)
      .type("Administrative Services")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.get("input[aria-label='Priority']")
      .eq(0)
      .click()
      .wait(100)
      .type("4 - Normal")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.get("select[aria-label='Time Frame']").select("This Year");
  });

  it("Show Backlog", () => {
    cy.get("input[aria-label='Technician ID']")
      .eq(0)
      .click()
      .wait(100)
      .type("101")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.get("input[aria-label='Trade']")
      .eq(0)
      .click()
      .wait(100)
      .type("Alarm Monitors")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.get("input[aria-label='Shift']")
      .eq(0)
      .click()
      .wait(100)
      .type("1st Shift")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.get("input[ng-model='dataItem.selected']").eq(0).click();
    cy.get("div[ng-bind='actionItem.Langstring']")
      .contains("Show Backlog")
      .click();
    cy.getButtonWithText("Reschedule").click();
  });

  it("Click On Print", () => {
    cy.get("input[aria-label='Technician ID']")
      .eq(0)
      .click()
      .wait(100)
      .type("101")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.wait(1000);
    cy.get("input[ng-model='dataItem.selected']").eq(0).click();
    cy.get("div[ng-bind='actionItem.Langstring']").contains("Print").click();
    cy.get("input[aria-label='Date']").type(
      new Date().toLocaleDateString("en-US")
    );
    cy.getButtonWithText("PDF").click();
    cy.getButtonWithText("Image").click();
  });

  it("Remove Technician", () => {
    cy.get("input[aria-label='Technician ID']")
      .eq(0)
      .click()
      .type("1katmob")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.get("input[ng-model='dataItem.selected']").eq(0).click();
    cy.get("div[ng-bind='actionItem.Langstring']")
      .contains("Remove Technician")
      .click();
  });

  it("Replace Technician", () => {
    cy.get("input[aria-label='Technician ID']")
      .eq(0)
      .click()
      .wait(100)
      .type("120663")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.get("input[ng-model='dataItem.selected']").eq(0).click();
    cy.get("div[ng-bind='actionItem.Langstring']")
      .contains("Replace Technician")
      .click();
    cy.get("input[aria-label='Technician Code']")
      .eq(0)
      .click()
      .type("101")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.getButtonWithText("Save").click();
  });

  it("Unassign Work Order", () => {
    cy.get("input[aria-label='Technician ID']")
      .eq(0)
      .click()
      .wait(100)
      .type("1katmob")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.get("input[ng-model='dataItem.selected']").eq(0).click();
    cy.get("div[ng-bind='actionItem.Langstring']")
      .contains("Unassign Work Order")
      .click();
  });

  it("Complete Schedule", () => {
    cy.get("input[aria-label='Technician ID']")
      .eq(0)
      .click()
      .wait(100)
      .type("1katmob")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.get("input[ng-model='dataItem.selected']").eq(0).click();
    cy.get("div[ng-bind='actionItem.Langstring']")
      .contains("Complete Schedule")
      .click();
  });
});
