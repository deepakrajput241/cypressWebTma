import { faker } from "@faker-js/faker";

describe("Create Reservation", () => {
  let ID;
  const data = {
    contactperson: faker.name.fullName(),
    organization: faker.company.name(),
    address1: faker.address.streetAddress(),
    address2: faker.address.secondaryAddress(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    zip: faker.address.zipCode(),
    phone: faker.phone.number("###-###-####"),
    fax: faker.phone.number("###-###-####"),
    email: faker.internet.email(),
    destination: faker.address.city(),
    quantity: faker.datatype.number(100),
    cost: faker.commerce.price(),
  };

  beforeEach("Login to Web app", () => {
    cy.login(Cypress.env("user1"));
  });

  it("Reservation - Negative Cases", { tags: "@smoke" }, () => {
    cy.visit("/#!/Reservation/Create");
    cy.get("span[ng-bind='WindowTitle']:contains('Reservation')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.getButton("Save").click();
    cy.clickAndCheckAlert(
      "Save",
      " At least 1 record is required for Reservation Resources Grid\r\n"
    );
  });

  it("Create Reservation with Required Fields", { tags: "@smoke" }, () => {
    cy.visit("/#!/Reservation/Create");
    cy.openFlyoutAndSelectRandomValue("Requestor");
    cy.get("#toolbarAddResource").should("be.visible").click();
    cy.get("input[aria-label='End Date'][k-options='dateTimeCtrl.dateOptions']")
      .click()
      .eq(0)
      .type(new Date().toLocaleDateString("en-US"));
    cy.get("select[aria-label='Type DDL']").select(2);
    cy.get("div[name='GenericTypeDescBtnContainer']").click();
    cy.wait(3000);
    cy.get("div[k-options='gridCtrl.gridOptions']")
      .should("be.visible")
      .find("tr")
      .then((row) =>
        cy
          .get(".k-button.k-button-icontext")
          .eq(Cypress._.random(0, row.length - 3))
          .click()
      );
    cy.fillNumericTextBox(0, "1");
    cy.getButtonWithText("Save").click();
    cy.editTextarea("Comments", faker.random.words(3));
    cy.clickAndCheckResponse("Save", "POST", "/Reservation/Create*", 200);

    cy.clickDeleteAndCheckResponse();
  });

  it("Create Reservation With All Fields", () => {
    cy.visit("/#!/Reservation/Create");
    cy.openFlyoutAndSelectRandomValue("Requestor");
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.openFlyoutAndSelectRandomValue("Subtype");
    cy.EditInputElement("ContactPerson", data.contactperson);
    cy.EditInputElement("Organization", data.organization);
    cy.openFlyoutAndSelectRandomValue("Department");
    cy.EditInputElement("Address1", data.address1);
    cy.EditInputElement("Address2", data.address2);
    cy.EditInputElement("City", data.city);
    cy.EditInputElement("State", data.state);
    cy.EditInputElement("Zip", data.zip);
    cy.EditInputElement("PhoneNumber", data.phone);
    cy.EditInputElement("FaxNumber", data.fax);
    cy.EditInputElement("Email", data.email);
    cy.openFlyoutAndSelectRandomValue("Agent");
    cy.openFlyoutAndSelectRandomValue("Repair Center");
    cy.openFlyoutAndSelectRandomValue("Charge Account");
    cy.get("input[aria-label='Date']")
      .clear()
      .type(faker.date.recent().toLocaleDateString("en-US"));
    cy.openFlyoutAndSelectRandomValue("Driver");
    cy.EditInputElement("Destination", data.destination);
    cy.get("#toolbarAddResource").should("be.visible").click();
    cy.xpath(
      "//*[@id='divResource']/div[2]/dl/dd[1]/tmadatetime/span[1]/span/input"
    )
      .should("be.visible")
      .clear()
      .type(new Date().toLocaleDateString("en-US"));
    cy.get("input[aria-label='End Date'][k-options='dateTimeCtrl.dateOptions']")
      .click()
      .eq(0)
      .type(new Date().toLocaleDateString("en-US"));
    cy.get("select[aria-label='Type DDL']").select(2);
    cy.get("div[name='GenericTypeDescBtnContainer']").click();
    cy.wait(3000);
    cy.get("div[k-options='gridCtrl.gridOptions']")
      .should("be.visible")
      .find("tr")
      .then((row) =>
        cy
          .get(".k-button.k-button-icontext")
          .eq(Cypress._.random(0, row.length - 3))
          .click()
      );
    cy.fillNumericTextBox(0, "1");
    cy.getButtonWithText("Save").click();
    cy.editTextarea("Comments", faker.random.words(3));
    cy.clickAndCheckResponse("Save", "POST", "/Reservation/Create*", 200).then(
      (id) => {
        ID = id;
      }
    );
  });

  it("Delete Reservation Record", () => {
    cy.visit(`/#!/Reservation/${ID}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Reservation')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.clickDeleteAndCheckResponse();
  });
});
