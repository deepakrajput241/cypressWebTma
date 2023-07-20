import { faker } from "@faker-js/faker";

it("Delete RI Form", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/RoomInspectionForm/Create");
  cy.EditInputElement("Code", faker.datatype.number(99999999));
  cy.EditInputElement("Description", faker.datatype.number(99999999));
  cy.fillCombobox("Type Code", 1);
  cy.selectRepairCenter();
  cy.clickSaveAndCheckResponse();

  cy.wait(1000); // Save is taking time to save record so added wait so it will delete the record properly.
  cy.contains("a", "Identity").click();
  cy.clickDeleteAndCheckResponse();
});
