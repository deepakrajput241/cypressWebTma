import { faker } from "@faker-js/faker";

describe("Validate Training Request Browse", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/TrainingRequestBrowse/Create/Identity");
  });

  it("Verify The default criteria in Query of Training Request Browse.", () => {
    cy.getButtonWithText("Cancel").click();
    cy.get("[ng-bind='WindowTitle']")
      .should("be.visible")
      .and("contain", "Training Request Browse");
    cy.get(
      "span[ng-bind='WindowTitle']:contains('Training Request Browse')"
    ).should("be.visible");
    cy.xpath("//*[text()='New Browse Selection']").click();
    cy.getButtonWithText("Reset Criteria").click();
    cy.wait(2000); //Without wait it will throw error
    cy.get("ul[class='k-group k-treeview-lines']")
      .find("li")
      .then((listing) => {
        const listingCount = Cypress.$(listing).length;
        const defaultCriteriaQuote = [
          "Required Date",
          "Work Order #",
          "Task Code",
          "Task Type Code",
          "Task Type Description",
          "Program ID",
          "Class ID",
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

  it("Verify Save Query criteria in Query of Training Request Browse works successfully.", () => {
    cy.getButtonWithText("Cancel").click();
    cy.get("[ng-bind='WindowTitle']")
      .should("be.visible")
      .and("contain", "Training Request Browse");
    cy.xpath("//*[text()='New Browse Selection']").click();
    cy.xpath(
      "//div[@class='psContentDiv']//div[@class='col-md-8'] //select"
    ).select("No Query Selected");
    cy.getButtonWithText("Save Query").click();
    const temp = faker.random.alphaNumeric(10);
    cy.fillInput("Query Name", `${temp}`);
    cy.fillComboboxAndClick("Repair Center Code", "Auto-01");
    cy.get("a[aria-label='Save']").should("be.visible").click();
    cy.on("window:alert", (str) => {
      expect(str).to.contains("Query saved successfully.");
      cy.get("button").contains("OK").click();
    });
  });

  it("Verify the results after click on List Results in Training Request Browse works successfully.", () => {
    cy.getButtonWithText("Cancel").click();
    cy.xpath("//*[text()='New Browse Selection']").click();
    cy.getButtonWithText("Reset Criteria").click();
    cy.wait(2000); //Without wait it will throw error
    const indexDelete = [1, 1, 1, 1, 1, 1];
    for (var i = 0; i < indexDelete.length; i++) {
      cy.xpath(
        `//ul[@class='k-group k-treeview-lines']//li[${indexDelete[i]}]//a[@title='Delete']`
      ).click();
    }
    cy.xpath(
      `//validation//span[@tabindex='-1']//input[@aria-label='undefined']`
    )
      .click()
      .type("TMA Program-0000")
      .wait(1500)
      .type("{enter}")
      .eq(0);
    cy.get(`[class='tab-content']`).click();

    cy.getButtonWithText("List Results").click();
    cy.wait(1000); //Without wait it will throw error
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
            .xpath(`//tbody[@role='rowgroup']//tr[${i}]//td[4]`)
            .should("have.text", `${"TMA Program-0000"}`)
        ) {
          cy.log(`Record #${i} is corrected.`);
        } else {
          cy.log(`Record #${i} is not corrected.`);
        }
      }
    });
  });

  it("Verify Action Remove Selected in Training Request Browse works successfully.", () => {
    cy.getButtonWithText("Cancel").click();
    cy.xpath("//*[text()='New Browse Selection']").click();
    cy.getButtonWithText("Reset Criteria").click();
    cy.wait(2000); //Without wait it will throw error
    const indexDelete = [1, 1, 1, 1, 1, 1];
    for (var i = 0; i < indexDelete.length; i++) {
      cy.xpath(
        `//ul[@class='k-group k-treeview-lines']//li[${indexDelete[i]}]//a[@title='Delete']`
      ).click();
    }
    cy.xpath(
      `//validation//span[@tabindex='-1']//input[@aria-label='undefined']`
    )
      .click()
      .type("0017")
      .wait(1500)
      .type("{enter}")
      .eq(0);
    cy.get(`[class='tab-content']`).click();

    cy.getButtonWithText("List Results").click();
    cy.wait(1000); //Without wait it will throw error
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
            .xpath(`//tbody[@role='rowgroup']//tr[${i}]//td[4]`)
            .should("have.text", `${"0017"}`)
        ) {
          cy.log(`Record #${i} is corrected.`);
        } else {
          cy.log(`Record #${i} is not corrected.`);
        }
      }
    });
    cy.wait(1000); //Without wait it will throw error
    cy.get("tbody[role='rowgroup']")
      .find("tr")
      .then((listing) => {
        var listingCount = Cypress.$(listing).length;
        cy.wrap(listingCount).as(`${"savedData"}`);
      });

    cy.get(`@savedData`).then((totalDataLoaded) => {
      const randomRecordIndex = faker.datatype.number({
        min: 1,
        max: totalDataLoaded,
      });
      cy.xpath(
        `//tbody[@role='rowgroup']//tr[${randomRecordIndex}]//td[1]`
      ).click();
    });
    cy.get("[name='RemovedSelectedBtn']").should("be.visible").click();

    cy.wait(1000); //Without wait it will throw error
    cy.get("tbody[role='rowgroup']")
      .find("tr")
      .then((listing) => {
        var listingCount = Cypress.$(listing).length;
        cy.wrap(listingCount).as(`${"afterRemoved"}`);
      });
    cy.get("@afterRemoved").then((afterRemove) => {
      cy.get("@savedData").then((beforeRemove) => {
        if (afterRemove < beforeRemove) {
          cy.log(`Remove Selected from list successfully!`);
        } else {
          cy.log(`:${afterRemove} vs ${beforeRemove - 1}`);
        }
      });
    });
  });
});
