import { faker } from "@faker-js/faker";

describe("Create New Record and Negative Cases for Disposal", () => {
  let ID;

  const data = {
    equipment: "111",
    asset: "5",
    entity: "Fountain",
    vehicle: "158940A",
    biomed: "368645",
    itEquipment: "DELL1",
    type: "DP01",
    technicianCode: "101",
    department: "AIED",
    requestor:
      "5th Health Glendale mesh Analy Mouse Borders male Northwest Frozen",
    building: "TRAN",
    site: "ire",
    vendor: "ABLFNC",
  };

  beforeEach("Login to the portal", () => {
    cy.login(Cypress.env("user1"));
  });

  it(
    "Verify Error Alert - Create Disposal Without Item Code",
    { tags: "@smoke" },
    () => {
      cy.visit("/#!/Disposal/Create");
      cy.openFlyoutAndSelectRandomValue("Type");
      cy.openFlyoutAndSelectRandomValue("Technician Code");
      cy.fillDateInput(
        "Disposal Date",
        faker.date.future().toLocaleDateString("en-US")
      );
      cy.clickAndCheckAlert(
        "Save",
        "Item Code is required\r\nItem Type is required\r\n"
      );

      cy.get("select[aria-label = 'Item Type']").select("Equipment");
      cy.openFlyoutAndSelectRandomValue("Item Code");
      cy.get("input[aria-label='Type']").eq(0).clear();
      cy.clickAndCheckAlert("Save", "Type is required\r\n");

      cy.openFlyoutAndSelectRandomValue("Type");
      cy.get("input[aria-label='Technician Code']").eq(0).clear();
      cy.clickAndCheckAlert("Save", "Technician Code is required\r\n");

      cy.openFlyoutAndSelectRandomValue("Technician Code");
      cy.get("input[aria-label='Disposal Date']").clear();
      cy.clickAndCheckAlert("Save", "Disposal Date is required\r\n");
    }
  );

  it("Create Disposal with Required fields. ", { tags: "@smoke" }, () => {
    cy.visit("/#!/Disposal/Create");
    cy.get("select[aria-label = 'Item Type']").select("Equipment");
    cy.openFlyoutAndSelectRandomValue("Item Code");
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.openFlyoutAndSelectRandomValue("Technician Code");
    cy.fillDateInput(
      "Disposal Date",
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.clickSaveAndCheckResponse();
  });

  it("Create Disposal function with All fields ", () => {
    cy.visit("/#!/Disposal/Create");
    cy.get("select[aria-label = 'Item Type']").select("Equipment");
    cy.openFlyoutAndSelectRandomValue("Item Code");
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.openFlyoutAndSelectRandomValue("Technician Code");
    cy.fillDateInput(
      "Disposal Date",
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.openFlyoutAndSelectRandomValue("Department");
    cy.openFlyoutAndSelectRandomValue("Requestor");
    cy.EditInputElement("Approver1", faker.name.firstName());
    cy.EditInputElement("Approver2", faker.name.firstName());
    cy.openFlyoutAndSelectRandomValue("Building");
    cy.openFlyoutAndSelectRandomValue("Site");
    cy.EditInputElement("DriversName", faker.name.firstName());
    cy.EditInputElement("BillOfLading", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Vendor");
    cy.openFlyoutAndSelectRandomValue("Credit Account");
    cy.EditInputElement("RequestorPhone", faker.phone.number("###-###-####"));
    cy.get("input[aria-label='Approval Date 1']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Approval Date 2']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.fillNumericTextBox(1, faker.datatype.number(1000));
    cy.EditInputElement("Recipient", faker.name.firstName(2));
    cy.editTextarea("Comment", faker.random.words(10));
    cy.clickAndCheckResponse("Save", "POST", "/Disposal/Create*", 200).then(
      (id) => {
        ID = id;
      }
    );
  });

  it("Delete Disposal function. ", () => {
    cy.visit(`/#!/Disposal/${ID}`);
    cy.clickDeleteAndCheckResponse();
  });
});
