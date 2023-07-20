import { faker } from "@faker-js/faker";
const data = {
  budgetCost: faker.datatype.number(100),
  comments: faker.random.words(5),
  details: faker.random.words(5),
  email: faker.internet.email(),
  approvedby: faker.random.words(1),
  phone: faker.phone.number("###-###-####"),
};
describe("Copy, Edit, Delete Estimate", () => {
  let ID;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Estimate Record", () => {
    cy.visit("/#!/Estimate/1000/Identity");

    cy.getButton("Copy").click();
    cy.fillCombobox("Estimator", 1);
    cy.fillCombobox("Requestor Name", 1);
    cy.get("select[aria-label='Reference Type']").select(0);
    cy.fillCombobox("Reference #", 1);
    cy.get(".glyphicons.glyphicons-edit").eq(0).should("be.visible").click();
    cy.fillNumericTextBox(0, data.budgetCost);
    cy.fillNumericTextBox(1, data.budgetCost);
    cy.getButtonWithText("Save").click();
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "Estimate/Create?copyId=?*",
      200
    ).then((id) => {
      ID = id;
    });
  });

  it("Edit Estimate Record", () => {
    cy.visit(`/#!/Estimate/${ID}/Identity`);
    cy.getButton("Edit").click();
    cy.fillCombobox("Estimator", 1);
    cy.fillCombobox("Requestor Name", 1);
    cy.get("select[aria-label='Reference Type']").select(0);
    cy.fillCombobox("Reference #", 1);
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Delete Estimate Record", () => {
    cy.visit(`/#!/Estimate/${ID}/Identity`);
    cy.clickDeleteAndCheckResponse();
  });
});
