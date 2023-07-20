describe("Create And Validate Gantt", () => {
  const data = { query: "Gantt Query" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/ProjectGantt/Create/Identity");
  });

  it("Create New Query", () => {
    cy.wait(1000);
    cy.getButtonWithText("Reset Criteria").click();
    cy.wait(1000);
    const indexDelete = [0, 0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i < indexDelete.length; i++) {
      cy.get(".glyphicons.glyphicons-bin")
        .eq(indexDelete[i])
        .click({ force: true });
    }
    cy.get("span[name='ColumnTab']").click();
    cy.get("#toolbarAddDisplayColumn").click();
    for (var k = 0; k <= 5; k++) {
      cy.get("input[ng-model='dataItem.selected']").eq(k).click();
    }
    cy.getButtonWithText("Save").click();
    cy.get("span[name='CriteriaTab']").click();
    cy.getButtonWithText("Save Query").click();
    cy.EditInputElement("Name", data.query);
    cy.getButtonWithText("Save").click();
    cy.wait(1000);
    cy.getButtonWithText("List Results").click();
  });

  it("Delete Query", () => {
    cy.getButtonWithText("Reset Criteria").click();
    cy.wait(1000);
    cy.get("select[ng-model='Settings.SelectedQueryId']")
      .select(data.query)
      .wait(500);
    cy.get("a[name='DeleteQueryBtn']").click();
  });
});
