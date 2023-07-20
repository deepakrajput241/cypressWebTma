import { faker } from "@faker-js/faker";
const data = {
  batchNumber: faker.datatype.number(1000).toString(),
  referenceNumber: faker.datatype.number(1000).toString(),
  requirement: faker.random.words(2),
  auditor: faker.name.firstName(),
  usageCode: faker.datatype.number(100).toString(),
  renewalDate: faker.date.past().toLocaleDateString("en-US"),
  csiCode: faker.datatype.number(1000).toString(),
  modelNumber: faker.datatype.number(100).toString(),
  serialNumber: faker.datatype.number(100).toString(),
  actionDate: faker.date.past().toLocaleDateString("en-US"),
  installDate: faker.date.past().toLocaleDateString("en-US"),
};
describe("Create Audits - negative scenarios, Create and Delete", () => {
  let auditId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Audits - Negative Cases", { tags: "@smoke" }, () => {
    cy.visit("/#!/CPAudit/Create");
    cy.get("span[ng-bind='WindowTitle']:contains('Audits')").should(
      "be.visible"
    );
    cy.openFlyoutAndSelectRandomValue("Facility");
    cy.clickAndCheckAlert("Save", "Condition is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Condition");
    cy.get("input[aria-label='Facility']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Facility is required\r\n");
  });

  it("Create new Audit With Required fields", { tags: "@smoke" }, () => {
    cy.visit("/#!/CPAudit/Create");
    cy.openFlyoutAndSelectRandomValue("Facility");
    cy.openFlyoutAndSelectRandomValue("Condition");
    cy.clickAndCheckResponse("Save", "POST", "CPAudit/Create*", 200);
  });

  it("Create new Audit With All Fields", () => {
    cy.visit("/#!/CPAudit/Create");
    cy.wait(500);
    cy.openFlyoutAndSelectRandomValue("Location ID");
    cy.fillSelect("Item Type", "Equipment");
    cy.openFlyoutAndSelectRandomValue("Item Code");
    cy.fillInput("Batch #", data.batchNumber);
    cy.fillInput("Reference #", data.referenceNumber);
    cy.openFlyoutAndSelectRandomValue("Condition");
    cy.fillInput("Requirement", data.requirement);
    cy.fillInput("Auditor", data.auditor);
    cy.openFlyoutAndSelectRandomValue("Audit Type");
    cy.openFlyoutAndSelectRandomValue("UniFormat 1");
    cy.openFlyoutAndSelectRandomValue("Impact Priority");
    cy.fillInput("Usage Code", data.usageCode);
    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.fillNumericTextBox(1, faker.datatype.number(1000));
    cy.fillNumericTextBox(2, faker.datatype.number(1000));
    cy.fillNumericTextBox(3, faker.datatype.number(1000));
    cy.fillInput("Renewal Date", data.renewalDate);
    cy.fillInput("CSI Code", data.csiCode);
    cy.fillNumericTextBox(4, faker.datatype.number(1000));
    cy.openFlyoutAndSelectRandomValue("Vendor");
    cy.fillInput("Model #", data.modelNumber);
    cy.fillInput("Serial #", data.serialNumber);
    cy.fillNumericTextBox(5, faker.datatype.number(1000));
    cy.fillNumericTextBox(6, faker.datatype.number(1000));
    cy.fillInput("Action Date", data.actionDate);
    cy.fillInput("Install Date", data.installDate);
    cy.fillNumericTextBox(6, faker.datatype.number(1000));
    cy.fillNumericTextBox(7, faker.datatype.number(1000));
    cy.openFlyoutAndSelectRandomValue("Unit");
    cy.fillTextarea("Description", faker.random.words(5));
    cy.fillTextarea("Comments", faker.random.words(5));
    cy.clickAndCheckResponse("Save", "POST", "CPAudit/Create*", 200).then(
      (id) => {
        auditId = id;
      }
    );
  });

  it("Delete Audit", () => {
    cy.visit(`/#!/CPAudit/${auditId}`);
    cy.clickDeleteAndCheckResponse();
  });
});
