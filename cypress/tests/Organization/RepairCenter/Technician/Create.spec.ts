import { faker } from "@faker-js/faker";

describe("Create new Technician", () => {
  const data = {
    shift: "1",
    accounts: "1111 2222 3333 4444",
    supervisorId: "101",
  };

  beforeEach("Login to Web app", () => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Technician/Create");
  });

  it("Technician - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("FirstName", faker.name.firstName());
    cy.EditInputElement("LastName", faker.name.lastName());
    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.openFlyoutAndSelectRandomValue("Shift");
    cy.clickAndCheckAlert(
      "Save",
      " At least 1 record is required for Trade Grid\r\n"
    );

    cy.get("#toolbarAddTrade").should("be.visible").click();
    cy.selectRandomCheckBoxFromGrid(
      3,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.get(".k-button.ng-scope:nth-child(1)").click();
    cy.get("input[aria-label='Shift']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Shift is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Shift");
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "ID is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.get("input[name='FirstName']").clear();
    cy.clickAndCheckAlert("Save", "First Name is required\r\n");

    cy.EditInputElement("FirstName", faker.name.firstName());
    cy.get("input[name='LastName']").clear();
    cy.clickAndCheckAlert("Save", "Last Name is required\r\n");

    cy.EditInputElement("LastName", faker.name.lastName());
    cy.get(".k-formatted-value.k-input.ng-scope").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Charge Rate is required\r\n");

    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/Technician/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for Technician Repair Center Grid\r\n"
    );
  });

  it("Create new Technician with Required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("FirstName", faker.name.firstName());
    cy.EditInputElement("LastName", faker.name.lastName());
    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.openFlyoutAndSelectRandomValue("Shift");
    cy.wait(1000);
    cy.get("#toolbarAddTrade").should("be.visible").click();
    cy.selectRandomCheckBoxFromGrid(
      3,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.get(".k-button.ng-scope:nth-child(1)").click();
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });

  it("Create Technician with All fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("FirstName", faker.name.firstName());
    cy.EditInputElement("LastName", faker.name.lastName());
    cy.openFlyoutAndSelectRandomValue("Shift");
    cy.EditInputElement("Title", faker.random.words(3));
    cy.fillNumericTextBox(0, faker.datatype.number(100));
    cy.openFlyoutAndSelectRandomValue("Account #");
    cy.fillNumericTextBox(1, faker.datatype.number(100));
    cy.fillCheckbox("Driver");
    cy.fillCheckbox("Supervisor");
    cy.editTextarea("Comments", faker.random.words(10));
    cy.EditInputElement("PhoneWork", faker.phone.number("###-###-###"));
    cy.EditInputElement("WorkMobile", faker.phone.number("###-###-###"));
    cy.EditInputElement("PhonePager", faker.phone.number("###-###-###"));
    cy.EditInputElement("OrganizationUnit", faker.phone.number("###-###-###"));
    cy.EditInputElement("Email", faker.internet.email());
    cy.openFlyoutAndSelectRandomValue("Supervisor ID");
    cy.EditInputElement("CoatSize", faker.datatype.number(100));
    cy.EditInputElement("GloveSize", faker.datatype.number(100));
    cy.EditInputElement("BootSize", faker.datatype.number(100));
    cy.wait(1000);
    cy.get("#toolbarAddTrade").should("be.visible").click();
    cy.selectRandomCheckBoxFromGrid(
      3,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.get(".k-button.ng-scope:nth-child(1)").click();

    cy.selectRepairCenter();

    cy.contains("Checkout").click();
    cy.get("#toolbarAddItem").click();
    cy.get("select[aria-label='ddlItemType']").select("1");
    cy.openFlyoutAndSelectRandomValue("Item Tag Number");
    cy.EditInputElement("CurrentJob", faker.random.words(3));
    cy.get(
      "input[aria-label='Time Out'][k-options='dateTimeCtrl.dateOptions']"
    ).type(faker.date.future().toLocaleDateString("en-US"));
    cy.get(
      "input[aria-label='Time Due'][k-options='dateTimeCtrl.dateOptions']"
    ).type(faker.date.future().toLocaleDateString("en-US"));
    cy.get(
      "input[aria-label='Time In'][k-options='dateTimeCtrl.dateOptions']"
    ).type(faker.date.future().toLocaleDateString("en-US"));
    cy.getButtonWithText("Save").click();

    cy.contains("PPE").click();
    cy.get("#toolbarAddTechnicianPPEEntry").should("be.visible").click();
    cy.openFlyoutAndSelectRandomValue("PPE Item");
    cy.fillNumericTextBox(0, faker.datatype.number(100));
    cy.get("input[aria-label='Issue Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.EditInputElement("Size", faker.datatype.number(100));
    cy.editTextarea("Comment", faker.random.words(10));
    cy.getButtonWithText("Save").click();

    cy.contains("Facilities").click();
    cy.get("#toolbarAddFacility").should("be.visible").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();

    cy.contains("P-Card").click();
    cy.get("#toolbarAddTechnicianPCard").should("be.visible").click();
    cy.EditInputElement("Number", faker.datatype.number(1000));
    cy.EditInputElement("Type", faker.random.word());
    cy.get("input[aria-label='Expiration Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.EditInputElement("IssuingBank", faker.random.word());
    cy.EditInputElement("PrimaryName", faker.random.word());
    cy.EditInputElement("SecondaryName", faker.random.word());
    cy.openFlyoutAndSelectRandomValue("Account");
    cy.EditInputElement("LostPhone", faker.random.word());
    cy.fillNumericTextBox(0, faker.datatype.number(100));
    cy.fillNumericTextBox(1, faker.datatype.number(100));
    cy.fillNumericTextBox(2, faker.datatype.number(100));
    cy.fillNumericTextBox(3, faker.datatype.number(100));
    cy.EditInputElement("Approver1", faker.random.words(1));
    cy.EditInputElement("Approver2", faker.random.words(1));
    cy.editTextarea("Comments", faker.random.words(10));
    cy.getButtonWithText("Save").click();

    cy.clickSaveAndCheckResponse();
  });
});
