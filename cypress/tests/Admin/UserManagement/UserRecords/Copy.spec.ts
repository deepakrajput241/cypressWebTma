import { faker } from "@faker-js/faker";

describe("Copy And Edit User Management record", () => {
  let ID;
  const data = {
    department: "Auto-01",
    requestor: "D Bran",
    technician: "Auto_868",
    contractor: "Auto_9679",
    group: "1234",
    repairCenter: "Auto-01",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy User records with required fields", () => {
    cy.visit("/#!/UserManagement");
    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("FirstName", faker.name.firstName()[2]);
    cy.EditInputElement("LastName", faker.name.lastName());
    cy.EditInputElement("Initials", faker.name.suffix());
    cy.EditInputElement("LoginName", faker.datatype.number(9999999));
    cy.EditInputElement("Fax", faker.phone.number("###-###-####"));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/UserManagement/Create?copyId=?*",
      200
    ).then((id) => {
      ID = id;
    });
  });

  it("Edit User Record with Required Fields", () => {
    cy.visit(`/#!/UserManagement/${ID}`);
    cy.get("span[ng-bind='WindowTitle']:contains('User Management')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("FirstName", faker.name.firstName()[2]);
    cy.EditInputElement("LastName", faker.name.lastName());
    cy.EditInputElement("Initials", faker.name.suffix());
    cy.EditInputElement("LoginName", faker.datatype.number(9999999));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
