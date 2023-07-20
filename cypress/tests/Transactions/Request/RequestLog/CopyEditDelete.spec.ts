import { faker } from "@faker-js/faker";

function checkEditRequest() {
  cy.wait(1000); // Without wait it will throw error
  cy.get("#divTabContent").then(($body) => {
    if ($body.text().includes("Accept/Reject/Hold")) {
      cy.getButton("Edit").click();
      cy.wait(1000); //added wait because test was faiing
      cy.EditInputElement("StatusNote", faker.random.words(3));
      cy.openFlyoutAndSelectRandomValue("Facility Name");
      cy.openFlyoutAndSelectRandomValue("Request Type");
      cy.editTextarea("Action Requested", faker.random.words(5));
    } else {
      checkEditRequest();
    }
  });
}

describe("Copy, Edit and Delete a Request Log", () => {
  let requestId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Search for a record on Action menu and Edit", () => {
    cy.visit("/#!/RequestLog/1009/Identity");

    checkEditRequest();
    cy.clickAndCheckResponse("Save", "POST", "RequestLog/Edit?*", 200).then(
      (id) => {
        requestId = id;
      }
    );
  });

  it("Copy Request Log with All Fields", () => {
    cy.visit(`/#!/RequestLog/${requestId}/Identity`);
    cy.wait(500);
    cy.getButton("Copy").click();
    cy.wait(2000); //added wait because test was faiing
    cy.EditInputElement("StatusNote", faker.random.words(3));
    cy.editTextarea("Action Requested", faker.random.words(5));
    cy.editTextarea("Additional Comments", faker.random.words(5));
    cy.get("select[aria-label='Item Type']").select(4);
    cy.openFlyoutAndSelectRandomValue("Item Tag#");
    cy.get("select[aria-label='Select Task']").select(1);
    cy.openFlyoutAndSelectRandomValue("Task Type/Task Code");
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "RequestLog/Create?copyId=?*",
      200
    ).then((id) => {
      requestId = id;
    });
  });

  it("Delete Request Log", () => {
    cy.visit(`/#!/RequestLog/${requestId}/Identity`);
    cy.clickDeleteAndCheckResponse();
  });
});
