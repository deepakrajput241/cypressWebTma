import { faker } from "@faker-js/faker";

describe("Create Zone", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Zone/Create");
  });

  it("Zone - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.clickAndCheckAlert("Save", "Description is required\r\n");

    cy.EditInputElement("Name", faker.random.words(2));
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");
  });

  it("Create Zone with Required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(99999)).wait(1000);
    cy.EditInputElement("Name", faker.random.words(2));
    cy.clickSaveAndCheckResponse();
  });

  it("Create Zone with All fields", () => {
    cy.EditInputElement("Code", `Auto_${faker.datatype.number(99999)}`).wait(
      1000
    );
    cy.EditInputElement("Name", faker.random.words(2));
    cy.EditInputElement("ManagerName", faker.random.words(1));
    cy.EditInputElement("ManagerPhone", faker.phone.phoneNumber());
    cy.EditInputElement("ManagerEmail", faker.internet.email());
    cy.EditInputElement("CustomerName", faker.random.words(1));
    cy.EditInputElement("CustomerPhone", faker.phone.phoneNumber());
    cy.EditInputElement("CustomerEmail", faker.internet.email());
    cy.editTextarea("Location", faker.random.words(5));
    cy.editTextarea("Boundary", faker.random.words(5));
    cy.editTextarea("Comment", faker.random.words(5));

    cy.contains("Personnel").click();
    cy.get("#toolbarAddTechnician").click();
    cy.selectRandomCheckBoxFromGrid(
      1,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div[3]/div/div/div/tma-data-grid/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.get("a[ng-click='customSave()']").click();

    cy.contains("Items").click();
    cy.get("#toolbarAddItem").click();
    cy.selectRandomCheckBoxFromGrid(
      1,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div[3]/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.get("a[ng-click='customSave()']").click();

    cy.clickSaveAndCheckResponse();
  });
});
