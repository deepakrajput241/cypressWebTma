import { faker } from "@faker-js/faker";

describe("Search, Copy, Edit and Delete a Custodial Route", () => {
  let ID;

  beforeEach("Login to Web app", () => {
    cy.login(Cypress.env("user1"));
  });

  it("Search for a record on Action menu and Copy", () => {
    cy.visit("/#!/CDRoute/1209/Identity");

    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Supervisor Name");
    cy.contains("Routine").click();
    cy.get("#toolbarAddRouteArea").should("be.visible").click();
    cy.selectRandomCheckBoxFromGrid(
      "1",
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div[2]/div[3]/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.get("a[ng-click='customSave()']").click();
    cy.get(".glyphicons.glyphicons-bin").click();
    cy.get("#toolbarAddRouteArea").should("be.visible").click();
    cy.selectRandomCheckBoxFromGrid(
      "1",
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div[2]/div[3]/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.get("a[ng-click='customSave()']").click();
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "CDRoute/Create?copyId=?*",
      200
    ).then((id) => {
      ID = id;
    });
  });

  it("Edit Custodial Route Record", () => {
    cy.visit(`/#!/CDRoute/${ID}/Identity`);
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Supervisor Name");
    cy.clickAndCheckResponse("Save", "POST", "/CDRoute/Edit?*", 200);
  });

  it("Delete Custodial Route Record", () => {
    cy.visit(`/#!/CDRoute/${ID}/Identity`);
    cy.clickDeleteAndCheckResponse("Delete", "/CDRoute/Delete/*");
  });
});
