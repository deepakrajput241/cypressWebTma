import { faker } from "@faker-js/faker";

const data = {
  rental: faker.datatype.number(999999),
};

describe("Copy, Edit and Delete Rental", () => {
  let ID;

  beforeEach("Login to Web app", () => {
    cy.login(Cypress.env("user1"));
  });

  it("Search for a record on Action menu and Copy Or Create New record", () => {
    cy.visit("/#!/Rental/Create/Identity"); // Here creating new Record as sometime it is throwing error if we used exisitng record
    cy.fillNumericTextBox(0, faker.datatype.number(999999));
    cy.fillCombobox("Agent", 1);
    cy.fillCombobox("Repair Center", 1);
    cy.fillCombobox("Requestor", 1);
    cy.get("#toolbarAddRentalResource").should("be.visible").click().wait(1000);
    cy.get(
      "input[aria-label='Rental End'][k-options='dateTimeCtrl.dateOptions']"
    ).type(new Date().toLocaleDateString("en-US"));
    cy.get("select[name='ItemTypeId']").select(2);
    cy.get("div[name='ItemCodeBtnContainer']").should("be.visible").click();
    cy.get(".k-grid-content.k-auto-scrollable")
      .eq(1)
      .should("be.visible")
      .find("tr")
      .then((row) =>
        cy
          .get(".k-button.k-button-icontext")
          .eq(Cypress._.random(0, row.length - 1))
          .click()
      );
    cy.getButtonWithText("Save").click();
    cy.clickAndCheckResponse("Save", "POST", "Rental/Create?*", 200).then(
      (id) => {
        ID = id;
      }
    );
  });

  it("Edit Rental with Required Fields", () => {
    cy.visit(`/#!/Rental/${ID}/Identity`);
    cy.getButton("Edit").click();
    cy.fillNumericTextBox(0, faker.datatype.number(999999));
    cy.fillCombobox("Agent", 1);
    cy.getButton("Save").click();
    //cy.clickAndCheckResponse("Save", "POST", "/Rental/Edit?*", 200);
  });

  it("Delete Rental Record", () => {
    cy.visit(`/#!/Rental/${ID}/Identity`);
    cy.clickDeleteAndCheckResponse();
  });
});
