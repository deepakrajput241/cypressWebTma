import { faker } from "@faker-js/faker";
describe("Create Return and Repair - negative scenarios, Create and Delete", () => {
  let ID;
  const data = {
    vendorName: "ABLFNC",
    type: "D",
    requestor:
      "5th Health Glendale mesh Analy Mouse Borders male Northwest Frozen",
    repairCenterCode: "FAC",
    assetTag: "4",
    biomedTag: "368645",
    entityTag: "Fountain",
    equipmentTag: "Fountain",
    itEquipmentTag: "DELL1",
    partTag: "022592431147",
    vehicleTag: "158940A",
  };

  beforeEach("Login to the portal", () => {
    cy.login(Cypress.env("user1"));
  });

  it("Returns and Repairs - Negative Cases", { tags: "@smoke" }, () => {
    cy.visit("/#!/ReturnAndRepair/Create");
    cy.openFlyoutAndSelectRandomValue("Vendor Name");
    cy.clickAndCheckAlert("Save", "Type is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Type");
    cy.get("input[aria-label='Vendor Name']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Vendor Name is required\r\n");
  });

  it(
    "Create Returns And Repairs with Required Fields. ",
    { tags: "@smoke" },
    () => {
      cy.visit("/#!/ReturnAndRepair/Create/Identity");
      cy.openFlyoutAndSelectRandomValue("Vendor Name");
      cy.openFlyoutAndSelectRandomValue("Type");
      cy.clickSaveAndCheckResponse();
    }
  );

  it("Create Returns And Repairs with All Fields. ", () => {
    cy.visit("/#!/ReturnAndRepair/Create/Identity");
    cy.openFlyoutAndSelectRandomValue("Vendor Name");
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.openFlyoutAndSelectRandomValue("Requestor");
    cy.get("input[aria-label='Shipping Info']").type(faker.random.words(3));
    cy.get("input[aria-label='Ship Via']").type(faker.random.words(3));
    cy.openFlyoutAndSelectRandomValue("Status");
    cy.get("input[aria-label='Status Note']").type(faker.random.words(3));
    cy.openFlyoutAndSelectRandomValue("Repair Center Code");
    cy.get("input[aria-label='Phone #']")
      .should("be.visible")
      .type(faker.phone.number("###-###-####"));
    cy.get("input[aria-label='Ship Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Attention']").type(faker.random.words(3));
    cy.get("input[aria-label='RMA #']").type(
      `Auto${faker.datatype.number(1000)}`
    );
    cy.get("input[aria-label='Tracking #']").type(
      `Auto${faker.datatype.number(1000)}`
    );
    cy.get("textarea[aria-label='Return Reason']").type(faker.random.words(5));
    cy.get("#toolbarAddItem").should("be.visible").click();
    cy.openFlyoutAndSelectRandomValue("Tag #");
    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.fillNumericTextBox(1, faker.datatype.number(1000));
    cy.fillNumericTextBox(2, faker.datatype.number(1000));
    cy.get("input[aria-label='Invoice #']").type(
      `Invoice${faker.datatype.number(1000)}`
    );
    cy.get("input[aria-label='Invoice Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Closed Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("textarea[aria-label='Reason']").type(faker.random.words(5));
    cy.get("textarea[aria-label='Status']").type(faker.random.words(5));
    cy.get("textarea[aria-label='Comments']").type(faker.random.words(5));
    cy.getButtonWithText("Save").click();
    cy.xpath("//*[@role='tab' and text()='Attachment']")
      .should("be.visible")
      .click();
    cy.get("#toolbarAddContact").click();
    cy.EditInputElement("Title", faker.random.words(1));
    cy.EditInputElement("First Name", faker.name.firstName());
    cy.EditInputElement("Last Name", faker.name.lastName());
    cy.EditInputElement("Middle Name", faker.name.middleName());
    cy.EditInputElement("Address 1", faker.address.buildingNumber());
    cy.EditInputElement("Address 2", faker.address.secondaryAddress());
    cy.EditInputElement("City", faker.address.city());
    cy.EditInputElement("State", faker.address.stateAbbr());
    cy.EditInputElement("Zip", faker.address.zipCode());
    cy.EditInputElement("Suffix", faker.name.suffix());
    cy.EditInputElement("Nick Name", faker.name.firstName());
    cy.EditInputElement("Spouse's Name", faker.name.firstName());
    cy.EditInputElement("Job Title", faker.name.jobTitle());
    cy.EditInputElement("Department", faker.commerce.department());
    cy.EditInputElement("Office", faker.random.words(1));
    cy.EditInputElement("Profession", faker.name.jobTitle());

    cy.EditInputElement("Company", faker.company.companySuffix());
    cy.EditInputElement("Business Phone", faker.phone.number("###-###-####"));
    cy.EditInputElement("Business Fax", faker.phone.number("###-###-####"));
    cy.EditInputElement("Manager Name", faker.name.firstName());
    cy.EditInputElement("Assistant Name", faker.name.firstName());
    cy.EditInputElement("Email", faker.internet.email());
    cy.EditInputElement("Home Phone", faker.phone.number("###-###-####"));
    cy.EditInputElement("Mobile Phone", faker.phone.number("###-###-####"));
    cy.EditInputElement("URL", faker.internet.url());
    cy.get("input[aria-label='Birthday']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Anniversary']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("button[ng-click='saveRecord()']").should("be.visible").click();

    //Add Note
    cy.get("#toolbarAddNote").should("be.visible").click();
    cy.EditInputElement("Subject", faker.random.words(2));
    cy.fillTextarea("Note", faker.random.words(5));
    cy.EditInputElement("Owner", faker.random.words(1));
    cy.get("button[ng-click='saveRecord()']").should("be.visible").click();

    //Add Task
    cy.get("#toolbarAddTask").should("be.visible").click();
    cy.EditInputElement("Task", faker.random.words(1));
    cy.get("input[aria-label='Due Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Start Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Completed']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.EditInputElement("Billing Info", faker.random.words(1));
    cy.fillCombobox("Status", 3);
    cy.EditInputElement("Status Note", faker.random.words(1));
    cy.EditInputElement("Priority", faker.random.words(1));
    cy.EditInputElement("Owner", faker.random.words(1));
    cy.EditInputElement("Email", faker.internet.email());
    cy.get("button[ng-click='saveRecord()']").should("be.visible").click();
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/ReturnAndRepair/Create?*",
      200
    ).then((id) => {
      ID = id;
    });
  });

  it("Verify Delete Returns And Repairs function. ", () => {
    cy.visit(`/#!/ReturnAndRepair/${ID}`);
    cy.clickDeleteAndCheckResponse();
  });
});
