import { faker } from "@faker-js/faker";

const data = { locationID: "Auto-BD-01-Automation-Area1" };

it("Edit cabinet record", { tags: ["@smoke"] }, () => {
  cy.login(Cypress.env("user1"));
  cy.visit("#!/KeyCabinet/Create");
  cy.EditInputElement("TagNumber", faker.datatype.number(999999999));
  cy.fillCombobox("Location ID", 2);
  cy.EditInputElement("Description", faker.random.words(5));
  cy.clickSaveAndCheckResponse();

  cy.getButton("Edit").click();
  cy.EditInputElement("TagNumber", faker.datatype.number(999999999));
  cy.EditInputElement("Description", faker.random.words(5));
  cy.clickSaveAfterEditAndCheckResponse();

  cy.clickDeleteAndCheckResponse();
});
