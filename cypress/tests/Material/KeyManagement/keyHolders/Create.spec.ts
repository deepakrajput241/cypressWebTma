import { faker } from "@faker-js/faker";

describe("Create Key Holder record", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("#!/KeyHolder/Create");
  });

  it("Create Key Holder record with required fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("FirstName", faker.name.firstName());
    cy.EditInputElement("LastName", faker.name.lastName());
    cy.clickSaveAndCheckResponse();
  });

  it("Create Key Holder record with required fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("FirstName", faker.name.firstName());
    cy.EditInputElement("LastName", faker.name.lastName());
    cy.EditInputElement("Position", faker.random.words(2));
    cy.EditInputElement("Phone", faker.phone.number("###-###-####"));
    cy.openFlyoutAndSelectRandomValue("Department Name");
    cy.EditInputElement("Email", faker.internet.email());
    cy.editTextarea("Comments", faker.random.words(10));
    cy.openFlyoutAndSelectRandomValue("Technician ID");
    cy.openFlyoutAndSelectRandomValue("Repair Center");
    cy.get('input[aria-label="Key Holder SSN"]').type("faker.random.words(10)");
    cy.get('input[aria-label="Pre-Authorized"]').check();
    cy.clickSaveAndCheckResponse();
  });
});
