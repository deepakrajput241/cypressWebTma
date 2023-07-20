import { faker } from "@faker-js/faker";

it("Create Material Request", () => {
  cy.login(Cypress.env("userRequestor"));
  cy.visit("/#!/MaterialRequest/Create");
  cy.fillCombobox("Department Name", 1);
  cy.fillCombobox("Sales Type Description", 1);
  cy.fillCombobox("Repair Center Name", 1);
  cy.fillCombobox("Status Description", 1);
  cy.EditInputElement("StatusNote", faker.random.words(1));
  cy.fillCombobox("Account #", 1);
  cy.fillCombobox("Requestor", 1);
  cy.EditInputElement("Email", faker.internet.email());
  cy.EditInputElement("RequestorPhone", faker.phone.number("###-###-####"));
  cy.EditInputElement("ReferenceNumber", faker.datatype.number(999999));
  cy.EditInputElement("ShipMethod", faker.random.words(1));
  cy.get("input[aria-label='Required Date']").type(
    new Date().toLocaleDateString("en-US")
  );
  cy.get("#toolbarAddMaterialRequestLine").click();
  cy.fillCombobox("Part Code", 1);
  cy.fillNumericTextBox(0, faker.datatype.number(10));
  cy.wait(1000);
  cy.getButtonWithText("Save").click();
  cy.get("select[aria-label='Ship To Location']").select("Area");
  cy.fillCombobox("Location Code", 1);
  cy.editTextarea("Delivery Notes", faker.random.words(5));
  cy.editTextarea("Comment", faker.random.words(5));
  cy.get("input[name='Save']").click();
});
