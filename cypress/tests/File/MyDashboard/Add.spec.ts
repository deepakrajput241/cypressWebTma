import { faker } from "@faker-js/faker";

// ordinarily faker data goes inline but here we need to track it
const data = {
  tabName: faker.random.words(2),
};

it("should add MyPage Tab with all fields, then delete it", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/");
  // this page needs time to load
  cy.wait(2000);
  cy.contains("Add").click();
  cy.fillInput("Tab Name", data.tabName);
  cy.fillInput("Description", faker.random.words(3));
  cy.contains("button", "Save").click();
  // check if tab is created and click it
  cy.contains(data.tabName).click();

  cy.clickAndCheckResponse("Delete", "POST", "/MyPage/DeleteTab/*", 200);
});
