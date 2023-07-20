import { faker } from "@faker-js/faker";
const data = {
  title: faker.datatype.number(1000),
};
describe("Capital Request - Copy, Edit, Delete Record", () => {
  let creqId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Capital Request", () => {
    cy.visit("/#!/CPFundingRequest");

    cy.getButton("Copy").click();
    cy.EditInputElement("Title", data.title);
    cy.openFlyoutAndSelectRandomValue("Capital Setup");
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "CPFundingRequest/Create?copyId=?*",
      200
    ).then((id) => {
      creqId = id;
    });
  });

  it("Edit Capital Request", () => {
    cy.visit(`/#!/CPFundingRequest/${creqId}/Identity`);

    cy.getButton("Edit").click();
    cy.EditInputElement("Title", data.title);
    cy.openFlyoutAndSelectRandomValue("Capital Setup");
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Delete Capital Request", () => {
    cy.visit(`/#!/CPFundingRequest/${creqId}/Identity`);
    cy.clickDeleteAndCheckResponse();
  });
});
