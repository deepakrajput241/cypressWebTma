import { faker } from "@faker-js/faker";

describe("Search, Copy, Edit and Delete a Event", () => {
  let ID;

  beforeEach("Login to Web app", () => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Event record", () => {
    cy.visit("/#!/Event/1253/Identity");

    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.openFlyoutAndSelectRandomValue("Type Description");
    cy.get("tmadatetime[name='StartDate'] input")
      .eq(0)
      .type(faker.date.recent().toLocaleDateString("en-US"));
    cy.EditInputElement("Name", faker.name.firstName());
    cy.get("tmadatetime[name='EndDate'] input")
      .eq(0)
      .clear()
      .type(faker.date.future().toLocaleDateString("en-US"));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/Event/Create?copyId=?*",
      200
    ).then((id) => {
      ID = id;
    });
  });

  it("Edit Event record", () => {
    cy.visit(`/#!/Event/${ID}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Events')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.openFlyoutAndSelectRandomValue("Type Description");
    cy.get("tmadatetime[name='StartDate'] input")
      .eq(0)
      .type(faker.date.recent().toLocaleDateString("en-US"));
    cy.EditInputElement("Name", faker.name.firstName());
    cy.get("tmadatetime[name='EndDate'] input")
      .eq(0)
      .clear()
      .type(faker.date.future().toLocaleDateString("en-US"));
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Delete Event Record", () => {
    cy.visit(`/#!/Event/${ID}`);
    cy.clickDeleteAndCheckResponse();
  });
});
