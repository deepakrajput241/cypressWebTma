describe("Part browse", () => {
  const data = {
    queryName: "Part Query Test Automation",
    queryNameUpdate: "Part Query Automation Update",
    queryNameCustomAnd: "Part Query Custom And condition Automation",
    queryNameCustomOR: "Part Query Custom OR condition Automation",
    warehouseCode: "0225920311",
    binLabel: "B01",
    warehouseName: "Test",
    repairCenterCode: "Auto-01",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/PartBrowse/Create");
  });

  it("Verify Part browse criteria default", () => {
    cy.wait(1000);
    cy.getCriteriaDropdown("Part Code").should("be.visible");
    cy.getCriteriaDropdown("Part Description").should("be.visible");
    cy.getCriteriaDropdown("Type").should("be.visible");
    cy.getCriteriaDropdown("Part Description").should("be.visible");
    cy.getCriteriaDropdown("Subtype").should("be.visible");
    cy.getCriteriaDropdown("Qty On Hand").should("be.visible");
    cy.getCriteriaDropdown("Bin Location").should("be.visible");
    cy.getCriteriaDropdown("Warehouse Code").should("be.visible");
    cy.getCriteriaDropdown("Warehouse Name").should("be.visible");
  });

  it("Verify Filer Part Browse", () => {
    cy.get(".entryTitle:contains('Query')").should("be.visible").wait(1000);
    cy.getButtonWithText("Reset Criteria").click();
    cy.wait(1000);
    cy.fillCombobox("Bin Location", data.binLabel);
    cy.getButtonWithText("List Results").click();
    cy.wait(100);
    cy.getColumnOnBrowse("Bin Location")
      .invoke("attr", "data-index")
      .then((index) => {
        cy.get("td[role='gridcell']")
          .eq(index)
          .should("have.text", data.binLabel);
      });

    cy.wait(500);
    cy.get(".k-toolbar.k-grid-toolbar.ng-scope")
      .contains("New Browse Selection")
      .click();
    cy.get(".entryTitle:contains('Query')").should("be.visible").wait(1000);
    cy.getButtonWithText("Reset Criteria").click();
    cy.getCriteria3DotMenu("Warehouse Code").click();
    cy.wait(1000);
    cy.get("input[placeholder='Search']").type(data.warehouseCode);
    cy.get("button[title='Search']").click();
    cy.get("a[class*='k-grid-SelectValue']").eq(0).click();
    cy.get("a[data-target='#ColumnTab']").click({
      force: true,
    });
    cy.get("div[id='ColumnTab'] table[class='k-selectable']")
      .find("tr")
      .its("length")
      .then((length) => {
        if (length <= 11) {
          cy.get("#toolbarAddDisplayColumn").click({ force: true });
          cy.get("a[title='Go to the next page']").eq(2).click();
          cy.xpath(
            "//span[normalize-space()='Warehouse Code']/../preceding-sibling::td/input"
          ).click();
          cy.getButtonWithText("Save").click();
          cy.wait(500);
        }
      });
    cy.getButtonWithText("List Results").click();
    cy.wait(100);
    cy.getColumnOnBrowse("Warehouse Code")
      .invoke("attr", "data-index")
      .then((index) => {
        cy.get("td[role='gridcell']").eq(index);
      });

    cy.wait(500);
    cy.get(".k-toolbar.k-grid-toolbar.ng-scope")
      .contains("New Browse Selection")
      .click();
    cy.get(".entryTitle:contains('Query')").should("be.visible").wait(1000);
    cy.getButtonWithText("Reset Criteria").click();
    cy.wait(100);
    cy.getCriteria3DotMenu("Warehouse Name").click();
    cy.wait(1000);
    cy.get("input[placeholder='Search']").type(data.warehouseCode);
    cy.get("button[title='Search']").click();
    cy.get("a[class*='k-grid-SelectValue']").eq(0).click();
    cy.get("a[data-target='#ColumnTab']").click({
      force: true,
    });
    cy.get("div[id='ColumnTab'] table[class='k-selectable']")
      .find("tr")
      .its("length")
      .then((length) => {
        if (length <= 11) {
          cy.get("#toolbarAddDisplayColumn").click({ force: true });
          cy.wait(100);
          cy.get("a[title='Go to the next page']").eq(2).click();
          cy.xpath(
            "//span[normalize-space()='Warehouse Code']/../preceding-sibling::td/input"
          ).click();
          cy.getButtonWithText("Save").click();
          cy.wait(500);
        }
      });
    cy.getButtonWithText("List Results").click();
    cy.getColumnOnBrowse("Warehouse Code")
      .invoke("attr", "data-index")
      .then((index) => {
        cy.get("td[role='gridcell']").eq(index);
      });
  });

  it("Save Query And save as query", () => {
    cy.get(".entryTitle:contains('Query')").should("be.visible").wait(1000);
    cy.getButtonWithText("Reset Criteria").click();
    cy.get("select[ng-model='Settings.SelectedQueryId']").select(
      "No Query Selected"
    );
    cy.wait(1000);
    cy.fillCombobox("Bin Location", data.binLabel);
    cy.getCriteria3DotMenu("Warehouse Code").click();
    cy.wait(1000);
    cy.get("input[placeholder='Search']").type(data.warehouseCode);
    cy.get("button[title='Search']").click();
    cy.get("a[class*='k-grid-SelectValue']").eq(0).click();
    cy.get("select[ng-model='Settings.SelectedQueryId']")
      .select("No Query Selected")
      .wait(500);
    cy.getButtonWithText("Save Query").click();
    cy.EditInputElement("Name", data.queryName);
    cy.fillCombobox("Repair Center Code", 2);
    cy.getButtonWithText("Save").eq(0).should("be.visible").click().wait(1000);
    cy.getCriteriaDropdown(data.queryName).should("be.visible");
    cy.wait(1000);
    cy.fillCombobox("Bin Location", data.binLabel);
    cy.getCriteria3DotMenu("Warehouse Code").click();
    cy.wait(1000);
    cy.get("input[placeholder='Search']").type(data.warehouseCode);
    cy.get("button[title='Search']").click();
    cy.get("a[class*='k-grid-SelectValue']").eq(0).click();
    cy.getButtonWithText("Save Query As").click();
    cy.EditInputElement("Name", data.queryNameUpdate);
    cy.fillCombobox("Repair Center Code", 2);
    cy.getButtonWithText("Save").click();
    cy.wait(500);
    cy.getCriteriaDropdown(data.queryNameUpdate).should("be.visible");
    cy.getButtonWithText("Reset Criteria").click();
  });

  it("Delete the saved query", () => {
    cy.get(".entryTitle:contains('Query')").should("be.visible").wait(1000);
    cy.getButtonWithText("Reset Criteria").click();
    cy.wait(500);
    cy.get("select[ng-model='Settings.SelectedQueryId']")
      .wait(200)
      .select(data.queryName);
    cy.get("a[name='DeleteQueryBtn']").click().wait(100);
    cy.get("select[ng-model='Settings.SelectedQueryId']").select(
      data.queryNameUpdate
    );
    cy.get("a[name='DeleteQueryBtn']").click().wait(100);
  });

  it("Part Browse with Custom AND criteria", () => {
    cy.get(".entryTitle:contains('Query')").should("be.visible").wait(1000);
    cy.getButtonWithText("Reset Criteria").click();
    cy.get("#lnkAddGroup").click();
    cy.wait(1000);
    cy.fillCombobox("Bin Location", data.binLabel);
    cy.getCriteria3DotMenu("Warehouse Code").click();
    cy.wait(1000);
    cy.get("input[placeholder='Search']").type(data.warehouseCode);
    cy.get("button[title='Search']").click();
    cy.get("a[class*='k-grid-SelectValue']").eq(0).click();
    cy.getCriteriaCheckbox("Bin Location").check({ force: true });
    cy.getCriteriaCheckbox("Warehouse Code").check({ force: true });
    cy.wait(500);
    cy.get("#lnkAddAnd").click();
    cy.get("a[data-target='#ColumnTab']").click({
      force: true,
    });
    cy.get("div[id='ColumnTab'] table[class='k-selectable']")
      .find("tr")
      .its("length")
      .then((length) => {
        if (length <= 11) {
          cy.get("#toolbarAddDisplayColumn").click({ force: true });
          cy.wait(100);
          cy.get("a[title='Go to the next page']").eq(2).click();
          cy.xpath(
            "//span[normalize-space()='Warehouse Code']/../preceding-sibling::td/input"
          ).click();
          cy.getButtonWithText("Save").click();
          cy.wait(500);
        }
      });
    cy.get("select[ng-model='Settings.SelectedQueryId']").select(
      "No Query Selected"
    );
    cy.getButtonWithText("Save Query").click();
    cy.EditInputElement("Name", data.queryNameCustomAnd);
    cy.fillCombobox("Repair Center Code", 2);
    cy.getButtonWithText("Save").click();
    cy.wait(500);
    cy.getCriteriaDropdown(data.queryNameCustomAnd).should("be.visible");
    cy.wait(500);
    cy.getButtonWithText("List Results").click();
    cy.getColumnOnBrowse("Bin Location")
      .invoke("attr", "data-index")
      .then((index) => {
        cy.log(index);
        cy.get("td[role='gridcell']")
          .eq(index)
          .should("have.text", data.binLabel);
      });
    cy.getColumnOnBrowse("Warehouse Code")
      .invoke("attr", "data-index")
      .then((index) => {
        index = parseInt(index) + 1;
        cy.get("input[ng-model='dataItem.selected']").eq(index);
      });
  });

  it("Part Browse with Custom OR criteria", () => {
    cy.get(".entryTitle:contains('Query')").should("be.visible").wait(1000);
    cy.getButtonWithText("Reset Criteria").click();
    cy.get("#lnkAddGroup").click();
    cy.wait(1000);
    cy.fillCombobox("Bin Location", data.binLabel);
    cy.getCriteria3DotMenu("Warehouse Code").click();
    cy.wait(1000);
    cy.get("input[placeholder='Search']").type(data.warehouseCode);
    cy.get("button[title='Search']").click();
    cy.get("a[class*='k-grid-SelectValue']").eq(0).click();
    cy.getCriteriaCheckbox("Bin Location").check({ force: true });
    cy.getCriteriaCheckbox("Warehouse Code").check({ force: true });
    cy.get("#lnkAddOr").click({
      force: true,
    });
    cy.get("a[data-target='#ColumnTab']").click({
      force: true,
    });
    cy.get("div[id='ColumnTab'] table[class='k-selectable']")
      .find("tr")
      .its("length")
      .then((length) => {
        if (length <= 11) {
          cy.get("#toolbarAddDisplayColumn").click({ force: true });
          cy.wait(100);
          cy.get("a[title='Go to the next page']").eq(2).click();
          cy.xpath(
            "//span[normalize-space()='Warehouse Code']/../preceding-sibling::td/input"
          ).click();
          cy.getButtonWithText("Save").click();
          cy.wait(500);
        }
      });
    cy.get("select[ng-model='Settings.SelectedQueryId']").select(
      "No Query Selected"
    );
    cy.getButtonWithText("Save Query").click();
    cy.EditInputElement("Name", data.queryNameCustomOR);
    cy.fillCombobox("Repair Center Code", 2);
    cy.getButtonWithText("Save").click();
    cy.wait(500);
    cy.getCriteriaDropdown(data.queryNameCustomOR).should("be.visible");
    cy.wait(500);
    cy.getButtonWithText("List Results").click();
    cy.getColumnOnBrowse("Bin Location")
      .invoke("attr", "data-index")
      .then((index) => {
        cy.log(index);
        cy.get("td[role='gridcell']")
          .eq(index)
          .should("have.text", data.binLabel);
      });
    cy.getColumnOnBrowse("Warehouse Code")
      .invoke("attr", "data-index")
      .then((index) => {
        cy.get("td[role='gridcell']").eq(index);
      });
  });

  it("Delete custom criteria", () => {
    cy.get(".entryTitle:contains('Query')").should("be.visible").wait(1000);
    cy.getButtonWithText("Reset Criteria").click();
    cy.get("select[ng-model='Settings.SelectedQueryId']").select(
      data.queryNameCustomAnd
    );
    cy.get("a[name='DeleteQueryBtn']").click().wait(500);
    cy.get("select[ng-model='Settings.SelectedQueryId']").select(
      data.queryNameCustomOR
    );
    cy.get("a[name='DeleteQueryBtn']").click();
  });
});
