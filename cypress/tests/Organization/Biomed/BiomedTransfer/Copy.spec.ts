import { faker } from "@faker-js/faker";

it("Copy Biomed Transfer", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/CEEquipmentTransfer/1009/Identity");

  cy.wait(500);
  cy.getButton("Copy").click();
  cy.openFlyoutAndSelectRandomValue("Technician ID");
  cy.openFlyoutAndSelectRandomValue("Repair Center");
  cy.editTextarea("Comments", faker.random.words(5));
  cy.get("a[name='Search']").click();
  cy.selectCheckBoxFromGrid(
    "/html/body/div[1]/div[3]/div/ui-view/div/form/div/div/div[1]/div/div[6]/div/div/div/tma-data-grid/div/div[2]/table/tbody/tr[1]/td[1]/input"
  );
  cy.clickSaveAndCheckResponse();
});
