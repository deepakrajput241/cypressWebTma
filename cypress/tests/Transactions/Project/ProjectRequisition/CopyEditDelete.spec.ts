import { faker } from "@faker-js/faker";
describe("Copy, Edit and Delete a Project Requisition", () => {
  let reqId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Project Requisition", () => {
    cy.visit("/#!/ProjectRequisition/1009/Identity");

    cy.getButton("Copy").click();
    cy.openFlyoutAndSelectRandomValue("Vendor Name");
    cy.openFlyoutAndSelectRandomValue("Requisition Type");
    cy.openFlyoutAndSelectRandomValue("Repair Center");
    cy.openFlyoutAndSelectRandomValue("Project #");
    cy.get("a[id='toolbarAddProjectRequisitionItem']").click();
    cy.editTextarea("Item Description", faker.commerce.productDescription());
    cy.openFlyoutAndSelectRandomValue("Credit Account");
    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.fillNumericTextBox(1, faker.datatype.number(1000));
    cy.get("input[aria-label='Delivery Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.getButtonWithText("Save").click();
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "ProjectRequisition/Create?copyId=?*",
      200
    ).then((id) => {
      reqId = id;
    });
  });

  it("Edit Project Requisition", () => {
    cy.visit(`/#!/ProjectRequisition/${reqId}/Identity`);

    cy.getButton("Edit").click();
    cy.openFlyoutAndSelectRandomValue("Vendor Name");
    cy.openFlyoutAndSelectRandomValue("Requisition Type");
    cy.openFlyoutAndSelectRandomValue("Repair Center");
    cy.openFlyoutAndSelectRandomValue("Project #");
    cy.get("a[id='toolbarAddProjectRequisitionItem']").click();
    cy.editTextarea("Item Description", faker.commerce.productDescription());
    cy.openFlyoutAndSelectRandomValue("Credit Account");
    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.fillNumericTextBox(1, faker.datatype.number(1000));
    cy.get("input[aria-label='Delivery Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.getButtonWithText("Save").click();
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Delete Project Requisition", () => {
    cy.visit(`/#!/ProjectRequisition/${reqId}/Identity`);
    cy.clickDeleteAndCheckResponse();
  });
});
