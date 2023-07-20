import { faker } from "@faker-js/faker";

describe("Search, Copy, Edit and Delete a Custodial Template", () => {
  let ID;

  beforeEach("Login to Web app", () => {
    cy.login(Cypress.env("user1"));
  });

  it("Search for a record on Action menu and Copy", () => {
    cy.visit("/#!/CDTemplate/1003/Identity");

    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(9999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.fillCombobox("Type", 2);
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "CDTemplate/Create?copyId=?*",
      200
    ).then((id) => {
      ID = id;
    });
  });

  it("Edit Custodial Template", () => {
    //cy.visit(`/#!/CDTemplate/${ID}/Identity`);
    cy.visit("/#!/CDTemplate");

    cy.wait(500);
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.fillCombobox("CD Template Type Code", "20");
    cy.selectRepairCenter();
    cy.clickAndCheckResponse("Save", "POST", "/CDTemplate/Edit?*", 200).then(
      (id) => {
        ID = id;
      }
    );
  });

  it("Delete Custodial Template", () => {
    cy.visit(`/#!/CDTemplate/${ID}`);
    cy.clickDeleteAndCheckResponse();
  });
});
