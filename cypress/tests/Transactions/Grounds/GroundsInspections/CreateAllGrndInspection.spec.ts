import { faker } from "@faker-js/faker";

describe("Create Grounds Inspection", () => {
  let inspecID;
  const data = {
    formCode: "u1",
    resultTypeCode: "test",
    repairCenterCode: "FAC",
    supervisorName: "Account Central Supervisor Specialist",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Ground Inspection - Negative Cases", { tags: "@smoke" }, () => {
    cy.visit("#!/GRNInspection/Create");
    cy.openFlyoutAndSelectRandomValue("Form Code");
    cy.openFlyoutAndSelectRandomValue("Repair Center Code");
    cy.openFlyoutAndSelectRandomValue("Result Type Code");
    cy.clickAndCheckAlert("Save", "Description is required\r\n");

    cy.EditInputElement("Description", faker.random.words(3));
    cy.get("input[aria-label='Form Code']").eq(0).clear();
    cy.clickAndCheckAlert(
      "Save",
      "Form Code is required\r\nForm Description is required\r\n"
    );

    cy.openFlyoutAndSelectRandomValue("Form Code");
    cy.get("input[aria-label='Result Type Code']").eq(0).clear();
    cy.clickAndCheckAlert(
      "Save",
      "Result Type Code is required\r\nResult Type Description is required\r\n"
    );

    cy.openFlyoutAndSelectRandomValue("Result Type Code");
    cy.get("input[aria-label='Repair Center Code']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Repair Center Code is required\r\n");
  });

  it(
    "Create Ground Inspection with Required fields",
    { tags: "@smoke" },
    () => {
      cy.visit("#!/GRNInspection/Create");
      cy.EditInputElement("Description", faker.random.words(2));
      cy.openFlyoutAndSelectRandomValue("Form Code");
      cy.openFlyoutAndSelectRandomValue("Repair Center Code");
      cy.openFlyoutAndSelectRandomValue("Result Type Code");
      cy.clickAndCheckResponse("Save", "POST", "GRNInspection/Create*", 200);
    }
  );

  it("Create Ground Inspection with All fields", () => {
    cy.visit("#!/GRNInspection/Create");
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Form Code");
    cy.openFlyoutAndSelectRandomValue("Repair Center Code");
    cy.openFlyoutAndSelectRandomValue("Result Type Code");
    cy.openFlyoutAndSelectRandomValue("Supervisor Name");
    cy.get("input[aria-label='Close Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.wait(500);
    cy.get("#toolbarAddArea").should("be.visible").click().wait(1000);
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div[3]/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();

    cy.contains("Inspector").click();
    cy.get("#toolbarAddInspector").should("be.visible").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();
    cy.clickAndCheckResponse("Save", "POST", "GRNInspection/Create*", 200).then(
      (id) => {
        inspecID = id;
      }
    );
  });

  it("Delete Ground Inspection", () => {
    cy.visit(`/#!/GRNInspection/${inspecID}`, { timeout: 30000 });
    cy.clickDeleteAndCheckResponse();
  });
});
