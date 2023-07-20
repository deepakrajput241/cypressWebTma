import { faker } from "@faker-js/faker";

it("Edit Client info record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("#!/Client/1000");

  cy.get("span[ng-bind='WindowTitle']:contains('Client Info')").should(
    "be.visible"
  );
  cy.wait(500);
  cy.getButton("Edit").click();
  cy.EditInputElement("ContactPerson", faker.name.firstName());
  cy.EditInputElement("Url", faker.internet.url());
  cy.EditInputElement("ContactPersonDescription", faker.random.words(2));
  cy.EditInputElement("Phone", faker.phone.number("###-###-####"));
  cy.EditInputElement("Fax", faker.phone.number("###-###-####"));
  cy.EditInputElement("Address1", faker.address.streetAddress());
  cy.EditInputElement("Address2", faker.address.secondaryAddress());
  cy.EditInputElement("City", faker.address.city());
  cy.EditInputElement("State", faker.address.stateAbbr());
  cy.EditInputElement("Zip", faker.address.zipCode());
  cy.getButton("Save").click();
});
