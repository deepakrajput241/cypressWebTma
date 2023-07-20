// TODO: remove page object
import MaterialBrowse from "@pageObjects/Material/materialbrowse/materialbrowse";

describe("MaterialBrowse Creation", () => {
  const materialBrowse = new MaterialBrowse();

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("#!/MaterialBrowse/Create");
  });

  it("Material Browse: Click and Verify Update Status and Remove Button", () => {
    materialBrowse.ClickOnCancel();
    materialBrowse.updateSingleRowMaterialBrowse();
    materialBrowse.checkUpdatedRowWithRandomIndex();
    materialBrowse.removeSingleRowMaterialBrowse();
    materialBrowse.checkRemovedRowWithRandomIndex();
  });

  it("Material Browse checking default values of QUOTE, SALES ORDER, MATERIAL REQUEST, PURCHASE ORDER, PURCHASE REQUISITION", () => {
    materialBrowse.ClickOnCancel();
    materialBrowse.verifyDefaultCriteriaValueForAllOptionsRadioBtn();
  });

  it("Enter criteria for QUOTE and verify the results", () => {
    materialBrowse.ClickOnCancel();
    materialBrowse.enterCriteriasForQuoteAndVerifyResults();
  });

  it("Enter criteria for SALES ORDER and verify the results", () => {
    materialBrowse.ClickOnCancel();
    materialBrowse.enterCriteriaForSalesOrderAndVerifyResults();
  });

  it("Enter criteria for MATERIAL REQUEST and verify the results", () => {
    materialBrowse.ClickOnCancel();
    materialBrowse.enterCriteriaForMaterialRequestAndVerifyResults();
  });

  it("Enter criteria for PURCHASE ORDER and verify the results", () => {
    materialBrowse.ClickOnCancel();
    materialBrowse.enterCriteriaForPurchaseOrderAndVerifyResults();
  });

  it("Enter criteria for PURCHASE REQUISITION and verify the results", () => {
    materialBrowse.ClickOnCancel();
    materialBrowse.enterCriteriaForPurchaseRequisitionAndVerifyResults();
  });
});
