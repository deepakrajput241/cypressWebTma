import { faker } from "@faker-js/faker";

describe("Create User Record", () => {
  const data = {
    department: "Auto-01",
    requestor: "D Bran",
    technician: "Auto_868",
    contractor: "Auto_9679",
    group: "1234",
    repairCenter: "Auto-01",
  };
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/UserManagement/Create");
  });

  it("Create User Records Without first name", { tags: "@smoke" }, () => {
    cy.EditInputElement("LoginName", faker.datatype.number(9999999));
    cy.EditInputElement("Initials", faker.name.firstName().slice(0, 2));
    cy.EditInputElement("LastName", faker.name.lastName());
    cy.EditInputElement("Email", faker.internet.email());
    cy.EditInputElement("Fax", faker.phone.number("###-###-####"));
    cy.clickAndCheckAlert("Save", "First Name is required\r\n");

    cy.EditInputElement("FirstName", faker.name.firstName());
    cy.get("input[name='LastName']").clear();
    cy.clickAndCheckAlert("Save", "Last Name is required\r\n");

    cy.EditInputElement("LastName", faker.name.lastName());
    cy.get("input[name='Initials']").clear();
    cy.clickAndCheckAlert("Save", "Initials is required\r\n");

    cy.EditInputElement("Initials", faker.name.firstName().slice(0, 2));
    cy.get("input[name='LoginName']").clear();
    cy.clickAndCheckAlert("Save", "Login ID is required\r\n");
  });

  it("Create User Records With Required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("FirstName", faker.name.firstName());
    cy.EditInputElement("LastName", faker.name.lastName());
    cy.EditInputElement("Initials", faker.name.suffix());
    cy.EditInputElement("LoginName", faker.datatype.number(9999999));
    cy.EditInputElement("Email", faker.internet.email());
    cy.EditInputElement("Fax", faker.phone.number("###-###-####"));
    cy.EditInputElement("LoginPassword", "1234567");
    cy.EditInputElement("LoginPasswordConfirm", "1234567");
    cy.contains("Repair Centers").click();
    cy.get("a[class='k-grid-ToolBar']:contains('Add Repair Center')").click();
    cy.selectRandomCheckBoxFromGrid(
      1,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();
    cy.contains("a", "Identity").click();
    cy.clickSaveAndCheckResponse();
  });

  it("Create User Records With All Fields", () => {
    let random = Math.floor(Math.random() * 4);
    cy.EditInputElement("FirstName", faker.name.firstName());
    cy.EditInputElement("LastName", faker.name.lastName());
    cy.EditInputElement("Initials", faker.name.suffix());
    cy.EditInputElement("LoginName", faker.datatype.number(9999999));
    cy.EditInputElement("Email", faker.internet.email());
    cy.EditInputElement("Fax", faker.phone.number("###-###-####"));
    cy.EditInputElement("LoginPassword", "1234567");
    cy.EditInputElement("LoginPasswordConfirm", "1234567");
    cy.EditInputElement("Phone", faker.phone.number("###-###-####"));
    cy.openFlyoutAndSelectRandomValue("Department");
    cy.get("select[aria-label='Role']").select(random);
    if (random == 1) {
      cy.openFlyoutAndSelectRandomValue("Contractor");
    } else if (random == 2) {
      cy.openFlyoutAndSelectRandomValue("Requestor");
    } else if (random == 3) {
      cy.openFlyoutAndSelectRandomValue("Technician");
    } else {
      cy.openFlyoutAndSelectRandomValue("Requestor");
      cy.openFlyoutAndSelectRandomValue("Technician");
      cy.openFlyoutAndSelectRandomValue("Contractor");
      cy.contains("Repair Centers").click();
      cy.get("a[class='k-grid-ToolBar']:contains('Add Repair Center')").click();
      cy.selectRandomCheckBoxFromGrid(
        1,
        "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
      );
      cy.getButtonWithText("Add Selected").click();
    }
    cy.contains("a", "Identity").click();
    cy.clickCheckbox("Projects");
    cy.EditInputElement("ProjectAuthLimit", faker.random.words(2));
    cy.clickCheckbox("ProjectRequisitions");
    cy.EditInputElement("ProjectReqAuthLimit", faker.random.words(2));
    cy.clickCheckbox("PurchaseOrders");
    cy.EditInputElement("PurchaseOrderAuthLimit", faker.random.words(2));
    cy.clickCheckbox("POChangeOrders");
    cy.EditInputElement("POChangeOrderAuthLimit", faker.random.words(2));
    cy.clickCheckbox("PurchaseRequisitions");
    cy.EditInputElement("PurchaseReqAuthLimit", faker.random.words(2));
    cy.clickCheckbox("MaterialRequests");
    cy.EditInputElement("MaterialReqAuthLimit", faker.random.words(2));
    cy.clickCheckbox("Estimates");
    cy.EditInputElement("EstimateAuthLimit", faker.random.words(2));
    cy.clickCheckbox("ChangeOrders");
    cy.EditInputElement("ChangeOrderAuthLimit", faker.random.words(2));
    cy.clickCheckbox("Reservations");
    cy.EditInputElement("ReservationAuthLimit", faker.random.words(2));
    cy.EditInputElement("ApprovalLevel", faker.random.words(2));
    cy.get("select[name='LanguageId']").select("English");
    cy.contains("Groups").click();
    cy.get("#toolbarAddUserGroup").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();
    cy.contains("Managed Resources").click();
    cy.get("#toolbarAddManagedDepartment").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();
    cy.contains("Defaults").click();
    cy.get("#toolbarAddDefault").click();
    cy.get('select[ng-model="selectedWindow"]').select("Area");
    cy.get('select[ng-model="selectedPage"]').select(5);
    cy.getButtonWithText("Save").click();
    cy.contains("My Dashboard").click();
    cy.get("#toolbarAddTab").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();
    cy.contains("API Roles").click();
    cy.get("#toolbarAddRole").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();
    cy.contains("a", "Identity").click();
    cy.clickSaveAndCheckResponse();
  });
});
