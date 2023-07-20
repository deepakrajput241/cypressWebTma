import { faker } from "@faker-js/faker";

// ordinarily faker data goes inline but here we need to track it
const data = {
  tabName: faker.random.words(2),
};

// see ticket E2E-446
it.skip("should edit MyPage Tab", { tags: "@mark" }, () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/");
  // this page needs time to load
  cy.wait(2000);
  cy.contains("Edit").click();
  // not finished
});
