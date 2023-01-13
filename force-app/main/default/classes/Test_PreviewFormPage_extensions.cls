@isTest
public with sharing class Test_PreviewFormPage_extensions {

    // @isTest
    // public static formname {get; set;}

    @isTest
    public static void getAccount() {

        Folder__c fldr = new Folder__c();
            fldr.name = 'test';
        insert fldr;

        Form__c form = new Form__c();
            form.Title__c = 'Test form';
            form.FolderId__c = fldr.id;
        insert form;

        Form_Submission__c fs = new Form_Submission__c();
            fs.Form_Fields_Value__c = '{"0":{"pn":"New Page","pst":"Page Subtitle","temp_mappp":{"a0454000004koYDAAY":{"key":"Signature","value":"https://saas-business-8452-dev-ed--c.documentforce.com/sfc/dist/version/download/?oid=00D54000000l3v1&ids=06854000001hswy&d=%2Fa%2F540000009nOZ%2FC4Y6Zc54j64Pn2WZhqsuLQcosrDrSPhVhIELm1FE5lY&asPdf=false"},"a0454000004kmioAAA":{"key":"Email-Id","value":"tets@hf.com"},"a0454000004klT8AAI":{"key":"Name","value":"wergw"},"a0454000004tv08AAA":{"key":"Name","value":"wfvgwerg"},"a0454000004kmo2AAA":{"key":"RichText","value":""},"a0454000004koYNAAY":{"key":"Signature","value":"https://saas-business-8452-dev-ed--c.documentforce.com/sfc/dist/version/download/?oid=00D54000000l3v1&ids=06854000001hsx3&d=%2Fa%2F540000009nOe%2Fa5cszfrvepgnOc93SXCjl_agVOkrX8vHH6SIDV7fo4w&asPdf=false"},"a0454000004klT3AAI":{"key":"Email-Id","value":"wewerf@wd.com"}}}}';
            fs.Form__c = form.id;
        insert fs;

        // PreviewFormPage_extensions.getAccount();
		pageReference pager = page.PDFGenerator;
        Test.setCurrentPage(pager);
        apexPages.Currentpage().getParameters().put('Id',fs.id);
        PreviewFormPage_extensions f = new PreviewFormPage_extensions();
            f.getAccount();
    }
}