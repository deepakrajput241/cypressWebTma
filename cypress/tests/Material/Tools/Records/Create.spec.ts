import { faker } from "@faker-js/faker";

const data = {
  facility: "14408",
  type: "Auto-adapter",
};

describe("should create tools", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("#!/Tool/Create");
  });

  // TODO: add negative tests
  it("should create tool with required fields", { tags: "@smoke" }, () => {
    cy.fillInput("Tag #", faker.random.numeric(5));
    cy.fillCombobox("Facility", data.facility);
    cy.fillInput("Description", faker.random.words(5));
    cy.fillCombobox("Type", data.type);
    // add Repair Center
    cy.contains("Repair Centers").click();
    cy.addRepairCenter();
    cy.clickSaveAndCheckResponse();
  });
});
