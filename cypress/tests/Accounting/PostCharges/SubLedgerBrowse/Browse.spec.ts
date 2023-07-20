// TODO: check for export to Excel working

function addSelection() {
  cy.contains("New Browse Selection").click();
  // remove query filter
  cy.get("a[title='Delete']").click();
  cy.get("input[value='Load Batches']").click();
  // select the first value in the list
  cy.get("tbody input:first").check();
  cy.contains("List Sub-Ledgers").click();
}

it("should display Sub-Ledgers, and Remove Selected and Reverse Selected should work", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/SubledgerBrowse/Create");

  // check that display Sub-Ledgers works
  addSelection();
  cy.get("tbody:first").children().should("have.length.greaterThan", 0);

  // check that Remove Selected works
  cy.get("tbody").eq(1).find("input:first").check();
  cy.get("input[value='Remove Selected']").click();
  cy.get("tbody:first").children().should("not.exist");

  // check that Reverse Selected works
  addSelection();
  cy.get("tbody").eq(1).find("input:first").check();
  // what we wanted here was cy.clickAndCheckResponse but the "Reverse Selected" button caused issues so we reproduced the command below
  cy.intercept("POST", "SubledgerBrowse/ReserveTransaction").as("request");
  cy.get("[name='ReverseSelectedBtn']").click();
  cy.wait("@request").then(({ response }) => {
    expect(response.statusCode).to.eq(200);
    // if the selected item has been posted to GL, then the reverse should fail
    if (response.body == "PostedToGL") {
      cy.get("tbody:first").children().should("have.length.greaterThan", 0);
    } else {
      expect(response.body).to.eq("Good");
      cy.get("tbody:first").children().should("not.exist");
    }
  });
});
