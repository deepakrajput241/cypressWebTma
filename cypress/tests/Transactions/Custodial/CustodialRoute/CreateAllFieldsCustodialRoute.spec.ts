import { faker } from "@faker-js/faker";

describe("Create Custodial Route - negative scenarios, Create and Delete", () => {
  let ID;

  const data = {
    facilityName: "Normandy Facility",
    buildingName: "Bergundy Building",
    floorDescription: "Basement",
    supervisorName: "Adam Hanson",
    custodian: "Anthony Cable",
    shiftDesc: "1st Shift",
  };

  beforeEach("Login to Web app", () => {
    cy.login(Cypress.env("user1"));
  });

  it("Custodial Route - Negative Cases", { tags: "@smoke" }, () => {
    cy.visit("/#!/CDRoute/Create");
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckAlert("Save", "Supervisor Name is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Supervisor Name");
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create Custodial Route with Required fields", { tags: "@smoke" }, () => {
    cy.visit("/#!/CDRoute/Create");
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Supervisor Name");
    cy.clickAndCheckResponse("Save", "POST", "CDRoute/Create*", 200);

    cy.clickDeleteAndCheckResponse("Delete", "/CDRoute/Delete/*");
  });

  it("Create Custodial Route with All fields", () => {
    cy.visit("/#!/CDRoute/Create");
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.get("input[aria-label='Facility Name']")
      .eq(0)
      .click()
      .wait(500)
      .type("123")
      .type("{downArrow}{enter}");
    cy.openFlyoutAndSelectRandomValue("Supervisor Name");
    cy.get("select[aria-label='Item Type Dropdown List']").select(1);
    cy.openFlyoutAndSelectRandomValue("Item Description");
    cy.openFlyoutAndSelectRandomValue("Shift Description");
    cy.get("input[name='Reviewed']").check();
    cy.fillInput("Indirect Minutes", faker.datatype.number(100));
    cy.editTextarea("Details", faker.random.words(5));
    cy.xpath("//*[@role='tab' and text()='Routine']")
      .should("be.visible")
      .click();
    cy.get("#toolbarAddRouteArea").should("be.visible").click();
    cy.wait(1500);
    cy.get(
      "#divContentEntryPanel1 > div > div.psContentDiv > form > div:nth-child(3) > div > div > dl > dd > select"
    ).select(2);
    cy.get(".k-grid-content.k-auto-scrollable");
    cy.selectRandomCheckBoxFromGrid(
      "1",
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div[2]/div[3]/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.get("a[ng-click='customSave()']").click();
    cy.xpath("//*[@role='tab' and text()='Project']")
      .should("be.visible")
      .click();
    cy.get("#toolbarAddProjectArea").should("be.visible").click();
    cy.wait(1500);
    cy.get(
      "#divContentEntryPanel1 > div > div.psContentDiv > form > div:nth-child(3) > div > div > dl > dd > select"
    ).select(2);
    cy.xpath(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div[2]/div[3]/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    )
      .should("be.visible")
      .click();
    cy.get("a[ng-click='customSave()']").click();

    cy.clickAndCheckResponse("Save", "POST", "CDRoute/Create*", 200).then(
      (id) => {
        ID = id;
      }
    );
  });

  it("Delete Custodial Route", () => {
    cy.visit(`/#!/CDRoute/${ID}/Identity`);
    cy.clickDeleteAndCheckResponse("Delete", "/CDRoute/Delete/*");
  });
});
