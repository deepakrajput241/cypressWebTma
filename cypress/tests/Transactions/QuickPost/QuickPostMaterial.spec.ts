const testData = {
  accountNo: "1013 1013 1013 1013 1013 1013",
  partMaterial: "011001-C",
  technicianCode: "101",
  workOrderNo: "1001-1001",
  quantity: "1",
};

it(
  "should create Quick Post Material with required fields",
  { tags: ["@smoke"] },
  () => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/QPMaterial/Create");
    cy.fillCombobox("Work Order #", testData.workOrderNo);
    cy.fillCombobox("Technician Code", testData.technicianCode);
    cy.fillCombobox("Part/Material", testData.partMaterial);
    cy.fillNumericTextBox(0, testData.quantity);
    cy.fillCombobox("Account #", testData.accountNo);
    cy.get("button[ng-click='saveRecord()']").click();
    cy.getButton("Save").click();
  }
);
