import { faker } from "@faker-js/faker";

const data = { formName: "Text Management" };

it("Create Text Management record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/TextManagement/Create");
  cy.get("select[ng-model='Data.FormName']").select("Account Program");
  cy.get("input[name='Search']").click();
  cy.get("input[ng-model='dataItem.Select']").eq(1).click();
  cy.EditInputElement("DefaultText", faker.random.words(2));
  cy.get("input[name='ApplyCustomText']").click();
  cy.getButton("Save");
});
