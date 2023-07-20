import { faker } from "@faker-js/faker";

describe("Validate Capital Planning Browse with All Options", () => {
  const data = {
    facility: "FC04",
    buildingCode: "Administrative",
    weType: "Plant Adaption",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/CPWindowBrowse/Create/Identity");
  });

  it("Validate Renewal Program", () => {
    cy.getButtonWithText("Reset Criteria").click();
    cy.wait(2000);
    cy.getButtonWithText("List Results").click();
    cy.selectCheckBoxFromGrid(
      "//*[@id='browseGrid']/div[3]/table/tbody/tr[1]/td[1]/input"
    );
  });

  it("Validate Audit", () => {
    cy.getButtonWithText("Reset Criteria").click();
    cy.wait(2000);
    cy.get("#CPWindowItemSelection-CPAuditBrowse").should("be.visible").check();
    cy.wait(1000);
    cy.get("input[k-options='dateCtrl.dateOptions']").eq(1).type("07/10/2022");
    cy.get("input[k-options='dateCtrl.dateOptions']")
      .eq(0)
      .clear()
      .type("12/31/2022");
    cy.xpath("//li[4]//input[@class='k-input']")
      .should("be.visible")
      .clear()
      .click()
      .type("FC04")
      .wait(1000)
      .type("{downArrow}")
      .type("{enter}");
    cy.xpath("//li[5]//input[@class='k-input']")
      .clear()
      .click()
      .type("FACILITY 04")
      .wait(1000)
      .type("{downArrow}")
      .type("{enter}");
    cy.getButtonWithText("List Results").click();
    cy.selectCheckBoxFromGrid(
      '//*[@id="browseGrid"]/div[3]/table/tbody/tr[5]/td[1]/input'
    );
    cy.selectCheckBoxFromGrid(
      "/html/body/div[1]/div[3]/div/ui-view/div/form/div/div/div[1]/div/div[2]/div/div/div/div[1]/tma-browse-grid/div/div[3]/table/tbody/tr[1]/td[1]/input"
    );
    cy.get("input[name='CreateElement']").click();
    cy.get("input[name='Title']").type("Title 1");
    cy.fillCombobox("Justification", "DP");
    cy.fillCombobox("Priority", "Auto_125");
    cy.fillCombobox("Uni. 1", "Auto_251");
    cy.fillCombobox("WE Type", "Auto_168");
    cy.get("input[aria-label='Scheduled Date']").type("08/31/2022");
    cy.get("select[name='LocationTypeId']").select(2);
    cy.get(".entryTitle").text().should("eq", "Validate");
    cy.getButtonWithText("Save").click();
  });

  it("Validate Work Element", () => {
    cy.get("#CPWindowItemSelection-CPWorkElementBrowse")
      .should("be.visible")
      .check();
    cy.getButtonWithText("Reset Criteria").click();
    cy.wait(2000);
    const indexDelete = [1, 1, 1, 1, 1, 2, 2, 2, 2];
    for (var i = 0; i < indexDelete.length; i++) {
      cy.xpath(
        `//ul[@class='k-group k-treeview-lines']//li[${indexDelete[i]}]//a[@title='Delete']`
      ).click();
    }
    cy.xpath("//li[1]//input[@class='k-input']")
      .clear()
      .type("Plant Adaption")
      .wait(1000)
      .type("{downArrow}")
      .type("{enter}");
    cy.getButtonWithText("List Results").click();
  });

  it("Validate Deferred Work Order", () => {
    cy.get("#CPWindowItemSelection-CPDeferredWorkOrderBrowse").check();
    cy.getButtonWithText("Reset Criteria").click();
    cy.wait(2000);
    cy.get("input[k-options='dateCtrl.dateOptions']").eq(1).type("01/01/2019");
    cy.get("input[k-options='dateCtrl.dateOptions']")
      .eq(0)
      .type(faker.date.recent().toLocaleDateString("en-US"));
    cy.xpath("//li[2]//input[@class='k-input']").should("be.visible");
    cy.xpath("//li[2]//input[@class='k-input']")
      .click()
      .clear()
      .type("Administrative")
      .wait(1500)
      .type("{downArrow}")
      .type("{enter}");
    cy.xpath("//li[3]//input[@class='k-input']")
      .click()
      .clear()
      .type("FAC")
      .wait(1500)
      .type("{downArrow}")
      .type("{enter}");
    cy.getButtonWithText("List Results").click();
    cy.selectCheckBoxFromGrid(
      "//*[@id='browseGrid']/div[3]/table/tbody/tr[1]/td[1]/input"
    );
    cy.selectCheckBoxFromGrid(
      "/html/body/div[1]/div[3]/div/ui-view/div/form/div/div/div[1]/div/div[2]/div/div/div/div[1]/tma-browse-grid/div/div[3]/table/tbody/tr[1]/td[1]/input"
    );
    cy.get("input[name='CreateElement']").click();
    cy.get("input[name='Title']").type("Title 1");
    cy.fillCombobox("Justification", "DP");
    cy.fillCombobox("Priority", "Auto_125");
    cy.fillCombobox("Uni. 1", "Auto_251");
    cy.fillCombobox("WE Type", "Auto_168");
    cy.get("input[aria-label='Scheduled Date']").type("08/31/2022");
    cy.get("select[name='LocationTypeId']").select(2);
    cy.get(".entryTitle").text().should("eq", "Validate");
    cy.getButtonWithText("Save").click();
  });
});
