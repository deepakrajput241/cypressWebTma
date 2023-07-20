import { faker } from "@faker-js/faker";

it("Create new Requestor Record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/UserManagement/Create");
  cy.EditInputElement("FirstName", faker.name.firstName());
  cy.EditInputElement("LastName", faker.name.lastName());
  cy.EditInputElement("Initials", faker.name.suffix());
  cy.EditInputElement("LoginName", faker.datatype.number(9999999));
  cy.EditInputElement("Email", faker.internet.email());
  cy.EditInputElement("Fax", faker.phone.number("###-###-####"));
  cy.EditInputElement("LoginPassword", "1234567");
  cy.EditInputElement("LoginPasswordConfirm", "1234567");
  cy.get("select[aria-label='Role']").select("Requestor");
  cy.openFlyoutAndSelectRandomValue("Requestor");
  cy.clickSaveAndCheckResponse();
});
