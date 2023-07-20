import { faker } from "@faker-js/faker";

describe("Copy And Edit Group record", () => {
  let ID;
  const data = {
    user: "Automation",
    repairCenter: "Auto-01",
    department: "Auto-01",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Group for User", () => {
    cy.visit("/#!/UserGroup");
    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Name", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(6));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/UserGroup/Create?copyId=?*",
      200
    ).then((id) => {
      ID = id;
    });
  });

  it("Edit Group for User", () => {
    cy.visit(`/#!/UserGroup/${ID}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Groups')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Name", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(4));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
