describe("create keys", () => {
  const data = {
    technicianCode: "Auto_01",
    technicianName: "Auto Test Technician",
    traceCode: "Auto",
    keyNumber: "Auto-Key",
    value: "4",
    typeCode: "4-Create Key",
    quantity: "1",
    cabinetCode: "Auto_Test",
    keyRing: "Auto-Key",
    keyHolder: "Auto-01",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("#!/KeyAdjustment/Create");
  });

  it("Create Key with Create Key", () => {
    cy.fillCombobox("Technician", 1);
    cy.get("a[id='toolbarAddKeyAdjustment']").click();
    cy.get("select[name='KeyAdjustmentTypeCode']")
      .should("be.visible")
      .select("4", { force: true });
    cy.fillCombobox("Key Code", data.keyNumber);
    cy.fillInputTextBox("Quantity", data.quantity);
    cy.getButtonWithText("Save").click();
  });

  it("Create Key with Issue Key", () => {
    cy.fillCombobox("Technician", 1);
    cy.get("a[id='toolbarAddKeyAdjustment']").click();
    cy.get("select[name='KeyAdjustmentTypeCode']")
      .should("be.visible")
      .select("8", { force: true });
    cy.fillCombobox("Key Code", data.keyNumber);
    cy.fillCombobox("Key Holder ID", data.keyHolder);
    cy.fillInputTextBox("Quantity", data.quantity);
    cy.getButtonWithText("Save").click();
  });

  it("Create Key with Lose Key", () => {
    cy.fillCombobox("Technician", 1);
    cy.get("a[id='toolbarAddKeyAdjustment']").click();
    cy.get("select[name='KeyAdjustmentTypeCode']")
      .should("be.visible")
      .select("6", { force: true });
    cy.fillCombobox("Key Code", data.keyNumber);
    cy.fillInputTextBox("Quantity", data.quantity);
    cy.getButtonWithText("Save").click();
  });

  it("Create Key with Return Key", () => {
    cy.fillCombobox("Technician", 1);
    cy.get("a[id='toolbarAddKeyAdjustment']").click();
    cy.get("select[name='KeyAdjustmentTypeCode']")
      .should("be.visible")
      .select("9", { force: true });
    cy.fillCombobox("Key Code", data.keyNumber);
    cy.fillCombobox("Key Holder ID", data.keyHolder);
    cy.fillInputTextBox("Quantity", data.quantity);
    cy.getButtonWithText("Save").click();
  });

  it("Create Key with Destroy Key", () => {
    cy.fillCombobox("Technician", 1);
    cy.get("a[id='toolbarAddKeyAdjustment']").click();
    cy.get("select[name='KeyAdjustmentTypeCode']").select("5");
    cy.fillCombobox("Key Code", data.keyNumber);
    cy.wait(2000);
    cy.fillInputTextBox("Quantity", data.quantity);
    cy.getButtonWithText("Save").click();
  });

  it("Create Key with Add Key To Cabinet", () => {
    cy.fillCombobox("Technician", 1);
    cy.get("a[id='toolbarAddKeyAdjustment']").click();
    cy.get("select[name='KeyAdjustmentTypeCode']")
      .should("be.visible")
      .select("3", { force: true });
    cy.fillCombobox("Key Code", data.keyNumber);
    cy.fillCombobox("Cabinet Code", data.cabinetCode);
    cy.fillInputTextBox("Quantity", data.quantity).should("be.visible");
    cy.getButtonWithText("Save").click();
  });

  it("Create Key with Remove Key from Cabinet", () => {
    cy.fillCombobox("Technician", 1);
    cy.get("a[id='toolbarAddKeyAdjustment']").click();
    cy.get("select[name='KeyAdjustmentTypeCode']")
      .should("be.visible")
      .select("2", { force: true });
    cy.fillCombobox("Key Code", data.keyNumber);
    cy.fillCombobox("Cabinet Code", data.cabinetCode);
    cy.fillInputTextBox("Quantity", data.quantity);
    cy.getButtonWithText("Save").click();
  });

  it("Create Key with Add key to Ring", () => {
    cy.fillCombobox("Technician", 1);
    cy.get("a[id='toolbarAddKeyAdjustment']").click();
    cy.get("select[name='KeyAdjustmentTypeCode']")
      .should("be.visible")
      .select("10", { force: true });
    cy.fillCombobox("Key Code", data.keyNumber);
    cy.fillCombobox("Cabinet Code", data.cabinetCode);
    cy.fillCombobox("Key Ring", data.keyRing);
    cy.fillInputTextBox("Quantity", data.quantity);
    cy.getButtonWithText("Save").click();
  });

  it("Create Key with Remove Key from Ring", () => {
    cy.fillCombobox("Technician", 1);
    cy.get("a[id='toolbarAddKeyAdjustment']").click();
    cy.get("select[name='KeyAdjustmentTypeCode']")
      .should("be.visible")
      .select("11", { force: true });
    cy.fillCombobox("Key Code", data.keyNumber);
    cy.fillCombobox("Cabinet Code", data.cabinetCode);
    cy.fillCombobox("Key Ring", data.keyRing);

    cy.fillInputTextBox("Quantity", data.quantity).should("be.visible");
    cy.getButtonWithText("Save").click();
  });

  it("Create Key with Add Ring to Cabinet", () => {
    cy.fillCombobox("Technician", 1);
    cy.get("a[id='toolbarAddKeyAdjustment']").click();
    cy.get("select[name='KeyAdjustmentTypeCode']")
      .should("be.visible")
      .select("15", { force: true });
    cy.fillCombobox("Cabinet Code", data.cabinetCode);
    cy.openFlyoutAndSelectRandomValue("Key Ring");
    cy.getButtonWithText("Save").click();
  });

  it("Create Key with remove Ring from Cabinet", () => {
    cy.fillCombobox("Technician", 1);
    cy.get("a[id='toolbarAddKeyAdjustment']").click();
    cy.get("select[name='KeyAdjustmentTypeCode']")
      .should("be.visible")
      .select("14", { force: true });
    cy.fillCombobox("Cabinet Code", data.cabinetCode);
    cy.openFlyoutAndSelectRandomValue("Key Ring");
    cy.getButtonWithText("Save").click();
  });

  it("Create Key with Update Due/ pick up Date", () => {
    cy.fillCombobox("Technician", 1);
    cy.get("a[id='toolbarAddKeyAdjustment']").click();
    cy.get("select[name='KeyAdjustmentTypeCode']")
      .should("be.visible")
      .select("1", { force: true });
    cy.fillCombobox("Key Code", data.keyNumber);
    cy.fillCombobox("Key Holder ID", data.keyHolder);
    cy.getButtonWithText("Save").click();
  });

  it("Create Key with Find Key", () => {
    cy.fillCombobox("Technician", 1);
    cy.get("a[id='toolbarAddKeyAdjustment']").click();
    cy.get("select[name='KeyAdjustmentTypeCode']")
      .should("be.visible")
      .select("7", { force: true });
    cy.fillCombobox("Key Code", data.keyNumber);
    cy.fillInputTextBox("Quantity", data.quantity);
    cy.getButtonWithText("Save").click();
  });

  it("Create Key with Issue Key Ring", () => {
    cy.fillCombobox("Technician", 1);
    cy.get("a[id='toolbarAddKeyAdjustment']").click();
    cy.get("select[name='KeyAdjustmentTypeCode']")
      .should("be.visible")
      .select("12", { force: true });
    cy.fillCombobox("Cabinet Code", data.cabinetCode);
    cy.openFlyoutAndSelectRandomValue("Key Ring");
    cy.openFlyoutAndSelectRandomValue("Key Holder ID");
    cy.getButtonWithText("Save").click();
  });

  it("Create Key with Return Key Ring", () => {
    cy.fillCombobox("Technician", 1);
    cy.get("a[id='toolbarAddKeyAdjustment']").click();
    cy.get("select[name='KeyAdjustmentTypeCode']")
      .should("be.visible")
      .select("13", { force: true });
    cy.fillCombobox("Cabinet Code", data.cabinetCode);
    cy.openFlyoutAndSelectRandomValue("Key Ring");
    cy.getButtonWithText("Save").click();
  });
});
