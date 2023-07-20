import { faker } from "@faker-js/faker";

describe("Create Requestor ", () => {
  const data = {
    position: "Auto-0",
    department: "Auto-01",
    requestorType: "Auto-Avon",
    locationId: "ADMIN-101",
    repairCenter: "Auto-01",
    item: "ADMIN-AHU-01",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Requestor/Create");
  });

  it("Test Negative cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("LastName", faker.name.lastName());
    cy.clickAndCheckAlert("Save", "First Name is required\r\n");

    cy.get("input[aria-label='Last Name']").clear();
    cy.EditInputElement("FirstName", faker.name.firstName());
    cy.clickAndCheckAlert("Save", "Last Name is required\r\n");
  });

  it("Create Requestor with Required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("FirstName", faker.random.words(1));
    cy.EditInputElement("LastName", faker.random.words(1));
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });

  it("Create Requestor for User Mgt with all fields", () => {
    cy.EditInputElement("FirstName", faker.random.words(1));
    cy.EditInputElement("LastName", faker.random.words(1));
    cy.EditInputElement("Code", faker.datatype.number(100000));
    cy.EditInputElement("Title", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Position");
    cy.EditInputElement("Email", faker.internet.email());
    cy.openFlyoutAndSelectRandomValue("Department");
    cy.EditInputElement("Organization", faker.random.words(1));
    cy.EditInputElement("Address1", faker.address.buildingNumber());
    cy.EditInputElement("Address2", faker.address.streetAddress());
    cy.EditInputElement("City", faker.address.cityName());
    cy.EditInputElement("State", faker.address.stateAbbr());
    cy.EditInputElement("Zip", faker.address.zipCode());
    cy.EditInputElement("JobClass", faker.name.jobType());
    cy.EditInputElement("BadgeNumber", faker.random.words(1));
    cy.EditInputElement(
      "LicenseNumber",
      `${faker.random.words(1)}${faker.datatype.number(100000)}`
    );
    cy.openFlyoutAndSelectRandomValue("Location ID");
    cy.EditInputElement("Phone", faker.phone.number("###-###-####"));
    cy.EditInputElement("PhoneExtension", faker.address.stateAbbr());
    cy.EditInputElement("CellNumber", faker.phone.number("###-###-####"));
    cy.EditInputElement("PagerNumber", faker.datatype.number());
    cy.EditInputElement("Fax", faker.datatype.number());
    cy.EditInputElement("MailStop", faker.random.words(1));
    cy.EditInputElement("HomePhone", faker.phone.number("###-###-####"));
    cy.EditInputElement("HomeCell", faker.phone.number("###-###-####"));
    cy.EditInputElement("BirthCountry", faker.address.country());
    cy.EditInputElement("Gender", "M");
    cy.EditInputElement("MaritalStatus", "S");
    cy.fillDateInput("Birth Date", new Date().toLocaleDateString("en-US"));
    cy.EditInputElement("EmergencyContact", faker.random.words(1));
    cy.EditInputElement("Relationship", faker.random.words(1));
    cy.EditInputElement(
      "EmergencyNumber",
      faker.phone.phoneNumber("###-###-###")
    );

    cy.selectRepairCenter();

    cy.contains("Assigned Items").click();
    cy.wait(2000);
    cy.get("#toolbarAddItem").click();
    cy.wait(3000);
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div[3]/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();
    cy.clickSaveAndCheckResponse();
  });
});
