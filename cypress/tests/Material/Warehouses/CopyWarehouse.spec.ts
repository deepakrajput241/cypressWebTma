// TODO: remove page object

import { faker } from "@faker-js/faker";

describe("Copy And Edit Warehouse record", () => {
  let ID;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Verify User can Copy Warehouse record", () => {
    cy.visit("/#!/Warehouse/Create");
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Name", faker.random.words(2));
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();

    cy.get("span[ng-bind='WindowTitle']:contains('Warehouses')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Name", faker.random.words(2));
    cy.clickSaveAndCheckResponse().then((id) => {
      ID = id;
    });
  });

  it("Verify User can Edit WareHouse record", () => {
    cy.visit(`/#!/Warehouse/${ID}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Warehouses')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Name", faker.random.words(2));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
