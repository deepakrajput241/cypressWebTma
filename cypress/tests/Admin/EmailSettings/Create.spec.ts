const data = {
  repairCenter: "Auto-01",
  transactionType: "Approval Routing",
  event: "Change order pending Authorization",
  keyword: "Change Date",
};

it("Create new Email Settings", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("#!/EmailSetting/Create");

  cy.openFlyoutAndSelectRandomValue("Filter Repair Center");
  cy.get("#toolbarAddEmailSetting").click();
  cy.get(".entryTitle:contains('Email Template Entry')").should("be.visible");
  cy.wait(500);
  cy.getButtonWithText("Cancel").click();
  cy.get("#toolbarAddEmailSetting").click().wait(500);

  cy.get("select[name='ddlTransaction']").select("Training");
  cy.get("select[name='ddlEmailEvent']").select(2);
  cy.fillCombobox("Repair Center Name", 1);
  cy.get("select[name='ddlKeywords']").select(4);
  cy.getButtonWithText("Save").click();

  cy.get("#toolbarAddEmailSetting").click();
  cy.get("select[name='ddlTransaction']").select("Approval Routing");
  cy.get("select[name='ddlEmailEvent']").select(1);
  cy.get("select[name='ddlKeywords']").select(1);
  cy.getButtonWithText("Save").click();

  cy.get("#toolbarAddEmailSetting").click();
  cy.get("select[name='ddlTransaction']").select("Batch Job");
  cy.get("select[name='ddlEmailEvent']").select(1);
  cy.get("select[name='ddlKeywords']").select(1);
  cy.getButtonWithText("Save").click();

  cy.get("#toolbarAddEmailSetting").click();
  cy.get("select[name='ddlTransaction']").select("Event");
  cy.get("select[name='ddlEmailEvent']").select(1);
  cy.get("select[name='ddlKeywords']").select(1);
  cy.getButtonWithText("Save").click();

  cy.get("#toolbarAddEmailSetting").click();
  cy.get("select[name='ddlTransaction']").select("Material Request");
  cy.get("select[name='ddlEmailEvent']").select(1);
  cy.get("select[name='ddlKeywords']").select(1);
  cy.getButtonWithText("Save").click();

  cy.get("#toolbarAddEmailSetting").click();
  cy.get("select[name='ddlTransaction']").select("Mobile Email");
  cy.get("select[name='ddlEmailEvent']").select(1);
  cy.get("select[name='ddlKeywords']").select(1);
  cy.getButtonWithText("Save").click();

  cy.get("#toolbarAddEmailSetting").click();
  cy.get("select[name='ddlTransaction']").select("Pending Charges");
  cy.get("select[name='ddlEmailEvent']").select(1);
  cy.get("select[name='ddlKeywords']").select(1);
  cy.getButtonWithText("Save").click();

  cy.get("#toolbarAddEmailSetting").click();
  cy.get("select[name='ddlTransaction']").select("Project");
  cy.get("select[name='ddlEmailEvent']").select(1);
  cy.fillCombobox("Repair Center Name", 1);
  cy.get("select[name='ddlKeywords']").select(1);
  cy.getButtonWithText("Save").click();

  cy.get("#toolbarAddEmailSetting").click();
  cy.get("select[name='ddlTransaction']").select("Receiving");
  cy.get("select[name='ddlEmailEvent']").select(1);
  cy.get("select[name='ddlKeywords']").select(1);
  cy.getButtonWithText("Save").click();

  cy.get("#toolbarAddEmailSetting").click();
  cy.get("select[name='ddlTransaction']").select("Rental");
  cy.get("select[name='ddlEmailEvent']").select(1);
  cy.fillCombobox("Repair Center Name", 1);
  cy.get("select[name='ddlKeywords']").select(1);
  cy.get("a[ng-click='customSave()']").click();

  cy.get("#toolbarAddEmailSetting").click();
  cy.get("select[name='ddlTransaction']").select("Request Log");
  cy.get("select[name='ddlEmailEvent']").select(1);
  cy.fillCombobox("Repair Center Name", 1);
  cy.get("select[name='ddlKeywords']").select(1);
  cy.getButtonWithText("Save").click();

  cy.get("#toolbarAddEmailSetting").click();
  cy.get("select[name='ddlTransaction']").select("Requested Part");
  cy.get("select[name='ddlEmailEvent']").select(1);
  cy.get("select[name='ddlKeywords']").select(1);
  cy.getButtonWithText("Save").click();

  cy.get("#toolbarAddEmailSetting").click();
  cy.get("select[name='ddlTransaction']").select("Reservation");
  cy.get("select[name='ddlEmailEvent']").select(1);
  cy.get("select[name='ddlKeywords']").select(1);
  cy.getButtonWithText("Save").click();

  cy.get("#toolbarAddEmailSetting").click();
  cy.get("select[name='ddlTransaction']").select("Sales Order");
  cy.get("select[name='ddlEmailEvent']").select(1);
  cy.get("select[name='ddlKeywords']").select(1);
  cy.getButtonWithText("Save").click();

  cy.get("#toolbarAddEmailSetting").click();
  cy.get("select[name='ddlTransaction']").select("Survey Response");
  cy.get("select[name='ddlEmailEvent']").select(1);
  cy.get("select[name='ddlKeywords']").select(1);
  cy.getButtonWithText("Save").click();

  cy.get("#toolbarAddEmailSetting").click();
  cy.get("select[name='ddlTransaction']").select("Training");
  cy.get("select[name='ddlEmailEvent']").select(1);
  cy.fillCombobox("Repair Center Name", 1);
  cy.get("select[name='ddlKeywords']").select(1);
  cy.getButtonWithText("Save").click();

  cy.get("#toolbarAddEmailSetting").click();
  cy.get("select[name='ddlTransaction']").select("Work Order");
  cy.get("select[name='ddlEmailEvent']").select(1);
  cy.fillCombobox("Repair Center Name", 1);
  cy.get("select[name='ddlKeywords']").select(1);
  cy.getButtonWithText("Save").click();
});
