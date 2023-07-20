import { faker } from "@faker-js/faker";
const data = {
  moveNumber: "Move1001",
  date: new Date().toLocaleDateString("en-US"),
};

it("Create Move Manager Record with all Fields", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/MoveManager/Create/Identity");
  cy.EditInputElement("Number", data.moveNumber);
  cy.openFlyoutAndSelectRandomValue("Move Manager Code");
  cy.openFlyoutAndSelectRandomValue("Repair Center");
  cy.get("input[aria-label='Request Date']").eq(0).type(data.date);
  cy.get("input[aria-label='Target Date']").eq(0).type(data.date);
  cy.get("input[aria-label='Completion Date']").eq(0).type(data.date);
  cy.get("input[aria-label='Close Date']").eq(0).type(data.date);
  cy.get("input[aria-label='Date Executed']").eq(0).type(data.date);
  cy.openFlyoutAndSelectRandomValue("Requestor");
  cy.openFlyoutAndSelectRandomValue("Status");
  cy.fillInput("Address1", faker.address.streetAddress());
  cy.fillInput("Address2", faker.address.streetAddress());
  cy.fillInput("City", faker.address.city());
  cy.get("input[aria-label='State']").type(faker.random.words(2));
  cy.fillInput("Zip", faker.address.zipCode());
  cy.get("input[aria-label='Status Note']").type(faker.random.words(2));
  cy.get("input[aria-label='Phone #']").type(
    faker.phone.number("###-###-####")
  );
  cy.get("input[aria-label='Fax #']").type(faker.phone.number("###-###-####"));
  cy.fillInput("Email", faker.internet.email());
  cy.fillInput("Organization", faker.random.words(2));
  cy.openFlyoutAndSelectRandomValue("Department Code");
  cy.openFlyoutAndSelectRandomValue("Move Vendor Code");
  cy.openFlyoutAndSelectRandomValue("Account #");
  cy.openFlyoutAndSelectRandomValue("Department Name");
  cy.openFlyoutAndSelectRandomValue("Vendor Name");
  cy.get("textarea[aria-label='Comment']").type(faker.random.words(2));
  // click on Occupant Tab
  cy.get("#navPageTabs > li:nth-child(2)").click();
  cy.get("#toolbarAddMoveOccupant").click();
  cy.openFlyoutAndSelectRandomValue("Occupant");
  cy.get("input[aria-label='Schedule Date']").eq(0).type(data.date);
  cy.openFlyoutAndSelectRandomValue("Location ID");
  cy.openFlyoutAndSelectRandomValue("Position");
  cy.get("input[aria-label='New Title']").type(faker.random.words(2));
  cy.get("input[aria-label='New Job Class']").type(faker.random.words(2));
  cy.get("input[aria-label='New Phone']").type(
    faker.phone.number("###-###-####")
  );
  cy.get("input[aria-label='New Phone Ext']").type(faker.random.numeric(2));
  cy.get("input[aria-label='New Cellular']").type(faker.random.numeric(3));
  cy.get("input[aria-label='New Pager']").type(faker.random.numeric(3));
  cy.get("input[aria-label='New Badge']").type(faker.random.numeric(3));
  cy.get("input[aria-label='New Email']").type(faker.internet.email());
  cy.get("input[aria-label='New Mail Code']").type(faker.random.numeric(3));
  cy.get("input[aria-label='New Home Phone']").type(
    faker.phone.number("###-###-####")
  );
  cy.get("input[aria-label='New Home Cellular']").type(faker.random.numeric(3));
  cy.get(
    "#divContentEntryPanel1 > div > div.psContentDiv > div button:nth-child(1)"
  ).click();
  // click on Additional Assets Tab
  cy.get("#navPageTabs > li:nth-child(3)").click();
  cy.get("#toolbarAddAdditionalItem").click();
  cy.get(".k-grid-content.k-auto-scrollable")
    .find("tr")
    .then((row) =>
      cy
        .get("input[ng-model='dataItem.selected']")
        .eq(Cypress._.random(1, row.length))
    )
    .click();
  cy.get("a[aria-label='Add Selected']").click();
  cy.getButton("Save").click();
});
