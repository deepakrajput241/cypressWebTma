import { faker } from "@faker-js/faker";

describe("Validate Audit History And Attach Linked Documents", () => {
  const fileName = "images.png";
  let userGrpId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/UserGroup/Create");
  });

  it("Attach Linked Documents", () => {
    cy.EditInputElement("Name", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(4));
    cy.get("a[id='toolbarAddUser']").click();
    cy.get(".k-grid-content.k-auto-scrollable")
      .find("tr")
      .then((row) =>
        cy
          .xpath(
            `/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[${Cypress._.random(
              2,
              row.length
            )}]/td[1]/input`
          )
          .click()
      );
    cy.getButtonWithText("Add Selected").click();
    cy.get("a[id='toolbarAddLdapGroup']").click();
    cy.EditInputElement("LdapGroupName", "Auto test");
    cy.getButtonWithText("Save").click();
    cy.selectRepairCenter();
    cy.clickAndCheckResponse("Save", "POST", "/UserGroup/Create*", 200).then(
      (id) => {
        userGrpId = id;
      }
    );

    cy.get("a[ng-click='panelCtrl.setPane(5)']").click();
    cy.get(".glyphicons.glyphicons-plus").eq(0).click();
    cy.get("#btnCancel").click();
    cy.wait(1000);
    cy.get(".glyphicons.glyphicons-plus").eq(0).click();
    cy.EditInputElement("Remarks", faker.random.words(1));
    cy.get("select[aria-label='Document Category']").select("Image");
    cy.get("#fileUpload").attachFile(fileName);
    cy.get("#btnSave").click();
  });

  it("Validate Audit History", () => {
    cy.visit(`/#!/UserGroup/${userGrpId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Groups')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.getButton("Edit").click();
    cy.EditInputElement("Name", faker.name.firstName());
    cy.EditInputElement("Description", faker.name.lastName());
    cy.clickAndCheckResponse("Save", "POST", "/UserGroup/Edit?*", 200);

    cy.wait(1000);
    cy.get("div[ng-bind='actionItem.Langstring']")
      .should("be.visible")
      .contains("Show Audit History")
      .click();
  });
});
