import { faker } from "@faker-js/faker";

describe("Upload Image and Linked Documents to the User", () => {
  let userId;
  const fileName = "images.png";

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Create User and Upload an Image", () => {
    cy.visit("/#!/UserManagement/Create");
    cy.EditInputElement("FirstName", faker.name.firstName());
    cy.EditInputElement("LastName", faker.name.lastName());
    cy.EditInputElement("Initials", faker.name.suffix());
    cy.EditInputElement("LoginName", faker.datatype.number(9999999));
    cy.EditInputElement("Email", faker.internet.email());
    cy.EditInputElement("Fax", faker.phone.number("###-###-####"));
    cy.EditInputElement("LoginPassword", "1234567");
    cy.EditInputElement("LoginPasswordConfirm", "1234567");
    cy.get(".glyphicons.glyphicons-plus-sign").click();
    cy.get("input[accept='image/*']").attachFile(fileName);
    cy.get(".upload-result.btn.btn-default").click();
    cy.contains("Repair Centers").click();
    cy.get("a[class='k-grid-ToolBar']:contains('Add Repair Center')").click();
    cy.selectRandomCheckBoxFromGrid(
      1,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();
    cy.contains("a", "Identity").click();
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/UserManagement/Create*",
      200
    ).then((id) => {
      userId = id;
    });
  });

  it("Attach Linked Documents", () => {
    cy.visit(`/#!/UserManagement/${userId}`);
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
});
