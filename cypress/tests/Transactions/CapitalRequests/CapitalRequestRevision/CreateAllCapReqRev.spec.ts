import { faker } from "@faker-js/faker";

describe("Create New Record And Negative Cases for Capital Request Revision", () => {
  let revisionId;
  const data = {
    capitalReq: "1",
    projectManager: "101",
    title: faker.datatype.number(9999),
    notes: faker.random.words(1),
    statusDescription: faker.random.word(1),
    reference: faker.datatype.number(1000),
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Capital Request Revision - Negative Cases", { tags: "@smoke" }, () => {
    cy.visit("#!/CPRequestRevision/Create");
    cy.get("span[aria-label='select']").should("be.visible").eq(0).click();
    cy.EditInputElement("StatusNote", data.notes);
    cy.EditInputElement("Title", data.title);
    cy.clickAndCheckAlert("Save", "Capital Req # is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Capital Req #");
    cy.get("input[name='Title']").clear();
    cy.clickAndCheckAlert("Save", "Title is required\r\n");
  });

  it(
    "Create Cpaital Request Revision with Required Fields",
    { tags: "@smoke" },
    () => {
      cy.visit("#!/CPRequestRevision/Create");
      cy.openFlyoutAndSelectRandomValue("Capital Req #");
      cy.EditInputElement("Title", data.title);
      cy.get("select[name='ddlWorkFlow']").select(1);
      cy.clickAndCheckResponse(
        "Save",
        "POST",
        "CPRequestRevision/Create*",
        200
      );

      cy.clickDeleteAndCheckResponse();
    }
  );

  it("Create new Capital Request Revision with All Fields", () => {
    cy.visit("#!/CPRequestRevision/Create");
    cy.openFlyoutAndSelectRandomValue("Capital Req #");
    cy.EditInputElement("Title", data.title);
    cy.get("select[name='ddlWorkFlow']").select(1);
    cy.EditInputElement("StatusDescription", data.statusDescription);
    cy.EditInputElement("StatusNote", data.notes);
    cy.openFlyoutAndSelectRandomValue("Project Manager");
    cy.EditInputElement("ReferenceNumber", data.reference);
    cy.editTextarea("Comments", faker.random.words(5));
    cy.editTextarea("Description", faker.random.words(5));
    cy.contains("Details").click();
    cy.get("#toolbarAddWorkElement").should("be.visible").click();
    cy.selectRandomCheckBoxFromGrid(
      1,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div[3]/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "CPRequestRevision/Create*",
      200
    ).then((id) => {
      revisionId = id;
    });
  });

  it("Delete Capital Request Revision Reord", () => {
    cy.visit(`/#!/CPRequestRevision/${revisionId}`);
    cy.clickDeleteAndCheckResponse();
  });
});
