import { faker } from "@faker-js/faker";

function clickOnAddItem() {
  cy.get("#toolbarAddGroupItem").should("be.visible").click();
  cy.wait(1000);
  for (var i = 1; i <= 2; i++) {
    cy.get(".k-grid-content.k-auto-scrollable")
      .find("tr")
      .then((row) =>
        cy
          .xpath(
            `//*[@id="itemSelection"]/div[2]/table/tbody/tr[${Cypress._.random(
              0,
              row.length - 1
            )}]/td[1]`
          )
          .click()
      );
  }
  cy.getButtonWithText("Add Selected").click();
}

describe("Copy And Edit Group Record", () => {
  let groupId;
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Group Record", () => {
    cy.visit("/#!/Group");

    cy.getButton("Copy").click();
    cy.EditInputElement("TagNumber", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/Group/Create?copyId=?*",
      200
    ).then((id) => {
      groupId = id;
    });
  });

  it("Edit Group Record", () => {
    cy.visit(`/#!/Group/${groupId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Group')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("TagNumber", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
