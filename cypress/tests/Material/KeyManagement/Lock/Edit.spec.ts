import { faker } from "@faker-js/faker";

it("Edit Lock record", { tags: ["@smoke"] }, () => {
  cy.login(Cypress.env("user1"));
  cy.visit("#!/Lock/Create");
  cy.fillCombobox("Key #", 1);
  cy.EditInputElement("Number", faker.datatype.number(999999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.clickSaveAndCheckResponse();

  cy.getButton("Edit").click();
  cy.fillCombobox("Key #", 1);
  cy.EditInputElement("Description", faker.random.words(2));
  cy.EditInputElement("Number", faker.datatype.number(999999));
  cy.clickSaveAfterEditAndCheckResponse();
});
