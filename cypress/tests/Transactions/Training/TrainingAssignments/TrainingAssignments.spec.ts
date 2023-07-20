import { faker } from "@faker-js/faker";

describe("Transaction - Training - Assignment", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/TrainingAssignment/Create/Identity");
  });

  it("Verify The default criteria in Query of Training Assignments.", () => {
    cy.get(".entryTitle").text().should("eq", "Query");
    cy.get("a[aria-label='Cancel']").should("be.visible").click();
    cy.get("[ng-bind='WindowTitle']")
      .should("be.visible")
      .and("contain", "Training Assignments");
    cy.xpath("//*[text()='New Browse Selection']").should("be.visible").click();
    cy.getButtonWithText("Reset Criteria").click();
    cy.get("ul[class='k-group k-treeview-lines']")
      .find("li")
      .then((listing) => {
        const listingCount = Cypress.$(listing).length;
        const defaultCriteriaQuote = [
          "Required Date",
          "WO Number",
          "Task Type Code",
          "Task Description",
          "Program ID",
          "Class Description",
          "Technician Name",
          "Equipment Type",
          "Asset Type",
          "Vehicle Type",
          "Tool Type",
          "Entity Type",
          "Biomed Type",
          "Linear Asset Type",
        ];
        for (var i = 1; i < listingCount; i++) {
          cy.xpath(
            `//div[@id='divCriteria']//li[${i}]//option[text()='${
              defaultCriteriaQuote[i - 1]
            }']`
          )
            .should("have.attr", "selected")
            .and("match", /selected/);
        }
      });
  });

  it("Verify Save Query criteria in Query of Training Assignments works successfully.", () => {
    cy.get(".entryTitle").text().should("eq", "Query");
    cy.get("a[aria-label='Cancel']").should("be.visible").click();
    cy.get("[ng-bind='WindowTitle']")
      .should("be.visible")
      .and("contain", "Training Assignments");
    cy.xpath("//*[text()='New Browse Selection']").should("be.visible").click();
    cy.xpath(
      "//div[@class='psContentDiv']//div[@class='col-md-8'] //select"
    ).select("No Query Selected");
    cy.getButtonWithText("Save Query").click();
    cy.fillInput("Query Name", "TrainingAssignment1");
    cy.fillComboboxAndClick("Repair Center Code", "Auto-01");
    cy.intercept("POST", "**/SearchBrowse/SaveQuery").as("createNewRecord");
    cy.get("a[aria-label='Save']").click();
    cy.on("window:alert", (str) => {
      expect(str).to.contains("Query saved successfully.");
      cy.get("button").contains("OK").click().blur();
      cy.wait("@createNewRecord").its("response.statusCode").should("eq", 200);
    });
  });

  it("Verify the results after click on List Results in Training Assignments works successfully.", () => {
    cy.get("a[aria-label='Cancel']").should("be.visible").click();
    cy.xpath("//*[text()='New Browse Selection']").should("be.visible").click();
    cy.wait(2000);
    cy.getButtonWithText("Reset Criteria").click();
    cy.get(".entryTitle").text().should("eq", "Query");
    cy.xpath(
      "//ul[@class='k-group k-treeview-lines']//li[1]//a[@title='Delete']"
    ).should("exist");
    cy.wait(1000);
    const indexDelete = [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2];
    for (var i = 0; i < indexDelete.length; i++) {
      cy.xpath(
        `//ul[@class='k-group k-treeview-lines']//li[${indexDelete[i]}]//a[@title='Delete']`
      ).click();
    }
    cy.get("[display-field='Name'] .k-input")
      .should("be.visible")
      .clear()
      .click()
      .type("James Aasland")
      .wait(1000)
      .type("{enter}");
    cy.get("[display-field='Name'] span.k-state-hover").focus().click();
    cy.getButtonWithText("List Results").click();
    cy.wait(1500);
    cy.get("tbody[role='rowgroup']")
      .find("tr")
      .then((listing) => {
        var listingCount = Cypress.$(listing).length;
        cy.wrap(listingCount).as(`${"totalDataReturn"}`);
      });

    cy.get("@totalDataReturn").then((totalDataReturn) => {
      for (var i = 1; i < totalDataReturn + 1; i++) {
        if (
          cy
            .xpath(`//tbody[@role='rowgroup']//tr[${i}]//td[5]`)
            .should("have.text", `${value}`)
        ) {
          cy.log(`Record #${i} is corrected.`);
        } else {
          cy.log(`Record #${i} is not corrected.`);
        }
      }
    });
  });

  it("Verify Assign Action is working correctly in Training Assignments.", () => {
    cy.get("a[aria-label='Cancel']").should("be.visible").click();
    cy.get("a[aria-label='Cancel']").should("be.visible").click();
    cy.xpath("//*[text()='New Browse Selection']").should("be.visible").click();
    cy.wait(2000);
    cy.getButtonWithText("Reset Criteria").click();
    cy.get(".entryTitle").text().should("eq", "Query");
    cy.xpath(
      "//ul[@class='k-group k-treeview-lines']//li[1]//a[@title='Delete']"
    ).should("exist");
    cy.wait(1000);
    const indexDelete = [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2];
    for (var i = 0; i < indexDelete.length; i++) {
      cy.xpath(
        `//ul[@class='k-group k-treeview-lines']//li[${indexDelete[i]}]//a[@title='Delete']`
      ).click();
    }
    cy.get("[display-field='Name'] .k-input")
      .should("be.visible")
      .clear()
      .click()
      .type("James Aasland")
      .wait(1000)
      .type("{enter}");
    cy.get("[display-field='Name'] span.k-state-hover").focus().click();
    cy.getButtonWithText("List Results").click();
    cy.wait(1500);
    cy.get("tbody[role='rowgroup']")
      .find("tr")
      .then((listing) => {
        var listingCount = Cypress.$(listing).length;
        cy.wrap(listingCount).as(`${"totalDataReturn"}`);
      });

    cy.get("@totalDataReturn").then((totalDataReturn) => {
      for (var i = 1; i < totalDataReturn + 1; i++) {
        if (
          cy
            .xpath(`//tbody[@role='rowgroup']//tr[${i}]//td[5]`)
            .should("have.text", `${value}`)
        ) {
          cy.log(`Record #${i} is corrected.`);
        } else {
          cy.log(`Record #${i} is not corrected.`);
        }
      }
    });
    cy.wait(1500);
    cy.get("tbody[role='rowgroup']")
      .find("tr")
      .then((listing) => {
        var listingCount = Cypress.$(listing).length;
        cy.wrap(listingCount).as(`${"assignIndex"}`);
      });
    cy.get(`@${"assignIndex"}`).then((totalDataLoaded) => {
      const randomRecordIndex = faker.datatype.number({
        min: 1,
        max: totalDataLoaded,
      });
      cy.xpath(
        `//tbody[@role='rowgroup']//tr[${randomRecordIndex}]//td[1]//input`
      ).check();
      cy.xpath(
        `//tbody[@role='rowgroup']//tr[${randomRecordIndex}]//td[3]//a`
      ).click();
    });
    cy.fillCombobox("Program Code", "3zt3k5b0");
    cy.fillCombobox("Class Code", "0005");
    new Date().toLocaleDateString("en-us");
    cy.intercept("POST", "**/TrainingAssignment/Create/").as("assignAPI");
    cy.get("a[aria-label='Save']").should("be.visible").click();
    cy.wait("@assignAPI").its("response.statusCode").should("eq", 200);
  });

  it("Verify Reject Action is working correctly in Training Assignments.", () => {
    cy.get("a[aria-label='Cancel']").should("be.visible").click();
    cy.xpath("//*[text()='New Browse Selection']").should("be.visible").click();
    cy.wait(2000);
    cy.getButtonWithText("Reset Criteria").click();
    cy.get(".entryTitle").text().should("eq", "Query");
    cy.xpath(
      "//ul[@class='k-group k-treeview-lines']//li[1]//a[@title='Delete']"
    ).should("exist");
    cy.wait(1000);
    const indexDelete = [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2];
    for (var i = 0; i < indexDelete.length; i++) {
      cy.xpath(
        `//ul[@class='k-group k-treeview-lines']//li[${indexDelete[i]}]//a[@title='Delete']`
      ).click();
    }
    cy.get("[display-field='Name'] .k-input")
      .should("be.visible")
      .clear()
      .click()
      .type("James Aasland")
      .wait(1000)
      .type("{enter}");
    cy.get("[display-field='Name'] span.k-state-hover").focus().click();
    cy.getButtonWithText("List Results").click();
    cy.wait(1500);
    cy.get("tbody[role='rowgroup']")
      .find("tr")
      .then((listing) => {
        var listingCount = Cypress.$(listing).length;
        cy.wrap(listingCount).as(`${"totalDataReturn"}`);
      });

    cy.get("@totalDataReturn").then((totalDataReturn) => {
      for (var i = 1; i < totalDataReturn + 1; i++) {
        if (
          cy
            .xpath(`//tbody[@role='rowgroup']//tr[${i}]//td[5]`)
            .should("have.text", `${"James Aasland"}`)
        ) {
          cy.log(`Record #${i} is corrected.`);
        } else {
          cy.log(`Record #${i} is not corrected.`);
        }
      }
    });
    cy.wait(1500);
    cy.get("tbody[role='rowgroup']")
      .find("tr")
      .then((listing) => {
        var listingCount = Cypress.$(listing).length;
        cy.wrap(listingCount).as(`${"rejectIndex"}`);
      });
    cy.get(`@${"rejectIndex"}`).then((totalDataLoaded) => {
      const randomRecordIndex = faker.datatype.number({
        min: 1,
        max: totalDataLoaded,
      });
      cy.wrap(randomRecordIndex).as("rejectIndex");
      cy.xpath(
        `//tbody[@role='rowgroup']//tr[${randomRecordIndex}]//td[1]//input`
      ).check();
      cy.xpath(
        `//tbody[@role='rowgroup']//tr[${randomRecordIndex}]//td[4]//a`
      ).click();
    });
    cy.fillTextarea("Rejected Reason", "No Valid Record.");
    cy.get("a[aria-label='Save']").should("be.visible").click();

    //this.getErrorMessageOf("rejectMessage");
    cy.get("@rejectIndex").then((rejectIndex) => {
      cy.xpath(
        `//tbody[@role='rowgroup']//tr[${rejectIndex}]//td[2]//span`
      ).should("have.css", "background-color", "rgb(255, 0, 0)");
    });
  });
});
