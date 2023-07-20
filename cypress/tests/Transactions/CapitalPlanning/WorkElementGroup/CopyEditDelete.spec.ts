import { faker } from "@faker-js/faker";

describe("Work Element Group - Copy, Edit, Delete Records", () => {
  const data = {
    capitalSetup: "District",
    type: "Group1",
  };
  let groupdId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Work Element Group", () => {
    cy.visit("/#!/CPProjectRequest/1008/Identity");

    cy.getButton("Copy").click();
    cy.EditInputElement("Title", faker.name.jobTitle());
    cy.fillCombobox("Type", data.type);
    cy.contains("Add Work Element").click();

    cy.get("#itemSelection")
      .find("tr")
      .then((row) =>
        cy
          .xpath(
            `//*[@id="itemSelection"]/div[2]/table/tbody/tr[${Cypress._.random(
              1,
              row.length - 0
            )}]/td[1]`
          )
          .click()
      );
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "CPProjectRequest/Create?copyId=?*",
      200
    ).then((id) => {
      groupdId = id;
    });
  });

  it("Edit Work Element Group", () => {
    cy.visit(`/#!/CPProjectRequest/${groupdId}/Identity`);
    cy.getButton("Edit").click();
    cy.EditInputElement("Title", faker.name.jobTitle());
    cy.fillCombobox("Type", data.type);
    cy.get(".k-button.k-button-icontext.k-grid-Delete").click();
    cy.contains("Add Work Element").click();

    cy.get("#itemSelection")
      .find("tr")
      .then((row) =>
        cy
          .xpath(
            `//*[@id="itemSelection"]/div[2]/table/tbody/tr[${Cypress._.random(
              1,
              row.length - 0
            )}]/td[1]`
          )
          .click()
      );
    cy.clickAndCheckResponse("Save", "POST", "CPProjectRequest/Edit?*", 200);
  });

  it("Delete Work Element Group", () => {
    cy.visit(`/#!/CPProjectRequest/${groupdId}/Identity`);
    cy.clickDeleteAndCheckResponse();
  });
});
