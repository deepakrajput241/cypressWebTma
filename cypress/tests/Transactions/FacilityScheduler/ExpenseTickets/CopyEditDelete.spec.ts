import { faker } from "@faker-js/faker";

const data = {
  ticket: faker.datatype.number(99999999),
  quantity: faker.datatype.number(100),
  unitcost: faker.commerce.price(),
  referenc_no: faker.datatype.number(10000),
  recipient: faker.name.fullName(),
  unitMeasure: faker.datatype.number(1000),
};
describe("Copy, Edit and Delete Expense ticket", () => {
  let ID;

  beforeEach("Login to Web app", () => {
    cy.login(Cypress.env("user1"));
  });

  it("Search for a record on Action menu and Copy", () => {
    cy.visit("#!/ExpenseTicket/1084/Identity");
    //cy.visit("/#!/ExpenseTicket/Create/Identity");
    // For existing record getting "Database Foreign Key" error so created new record here
    // expenseticket.fillRequiredFields();
    // cy.getButton("Save").click();
    // Actions.clickOnCopyBtn();

    cy.get("#UserToolBarCollapse > ul > li:nth-child(3) > a").click();
    cy.getButton("Copy").click();
    cy.EditInputElement("Number", data.ticket);
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/ExpenseTicket/Create?copyId=?*",
      200
    ).then((id) => {
      ID = id;
    });
  });

  it("Edit Expense Ticket Record With All Fields", () => {
    //cy.visit(`/#!/ExpenseTicket/${ID}/Identity`);
    cy.visit("/#!/ExpenseTicket/1084/Identity");
    cy.getButton("Edit").click();
    cy.EditInputElement("Number", data.ticket);
    cy.clickAndCheckResponse("Save", "POST", "/ExpenseTicket/Edit?*", 200).then(
      (id) => {
        ID = id;
      }
    );
  });

  it("Delete Expense Ticket Record", () => {
    cy.visit(`/#!/ExpenseTicket/${ID}/Identity`);
    cy.clickDeleteAndCheckResponse();
  });
});
