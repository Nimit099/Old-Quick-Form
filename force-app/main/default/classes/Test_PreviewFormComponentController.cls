//This test class covers Apex class PreviewFormComponentController

@isTest
public with sharing class Test_PreviewFormComponentController {
    @isTest
    public static void testSetup(){

        Folder__c fldr =new Folder__c();
        fldr.Name = 'Test Folder';
        insert fldr;

        Form__c fm = new Form__c();
        fm.Title__c = 'Test Class Testing';
        fm.FolderId__c = fldr.Id;
        insert fm;

        Page__c pg = new Page__c();
        pg.Form__c = fm.Id;
        pg.Title__c = 'test page';
        insert pg;

        Form_Field__c ff = new Form_Field__c();
        ff.Form__c = fm.Id;
        ff.Page__c = pg.Id;
        ff.Data_Record_Id__c = 'rec122';
        ff.Label__c = 'First Name';
        insert ff;

        Form_Field__c ff1 = new Form_Field__c();
        ff1.Form__c = fm.Id;
        ff1.Page__c = pg.Id;
        ff1.Data_Record_Id__c = 'rec123';
        ff1.Label__c = 'Last Name';
        insert ff1;

        Form_Field__c ff3 = new Form_Field__c();
        ff3.Form__c = fm.Id;
        ff3.Page__c = pg.Id;
        ff3.Data_Record_Id__c = 'rec123';
        ff3.Label__c = 'Last Name';
        insert ff3;

        FieldAttribute__c fa = new FieldAttribute__c();
        fa.Form_Field__c = ff.Id;
        fa.Label__c = 'Test Atribute';
        insert fa;
        
        Field_Value__c fv = new Field_Value__c();
        fv.Form_Field__c = ff.Id;
        insert fv;
        
        Field_Value__c fv1 = new Field_Value__c();
        fv1.Form_Field__c = ff.Id;
        insert fv1;


        String allData = '{"0":{"pn":"New Page","pst":"Page Subtitle","temp_mappp":{"a0454000004koYxAAI":{"key":"First Name","value":"test First"}}';
        List<String> ffString1 = new List<String>();
        // ffString1.add(String.valueOf(ff.Id), ff.Label__c, 'Test First');
        ffString1.add(ff.Id);
        ffString1.add(ff.Label__c);
        ffString1.add('Test First');

        List<String> ffString2 = new List<String>();
        ffString2.add(ff1.Id);
        ffString2.add(ff1.Label__c);
        ffString2.add('Test First');

        List<String> ffString3 = new List<String>();
        ffString3.add(ff3.Id);
        ffString3.add(ff1.Label__c);
        ffString3.add('Test First');
        // ffString2.add(String.valueOf(ff1.Id), ff1.Label__c, 'Test Last');

        Map<String,List<String>> formFieldMap = new Map<String,List<String>> ();
        formFieldMap.put(ff.Id, ffString1);
        formFieldMap.put(ff1.Id, ffString2);
        formFieldMap.put(ff3.Id, ffString3);


        PreviewFormComponentController.getPreviewFormField(fm.Id);
        
        String sub1 = 'test submission';
        String sub2 = 'test submission';

        Form_Submission__c fs = new Form_Submission__c();
            fs.Form_Fields_Value__c = '{"0":{"pn":"New Page","pst":"Page Subtitle","temp_mappp":{"a0454000004koYDAAY":{"key":"Signature","value":"https://saas-business-8452-dev-ed--c.documentforce.com/sfc/dist/version/download/?oid=00D54000000l3v1&ids=06854000001hswy&d=%2Fa%2F540000009nOZ%2FC4Y6Zc54j64Pn2WZhqsuLQcosrDrSPhVhIELm1FE5lY&asPdf=false"},"a0454000004kmioAAA":{"key":"Email-Id","value":"tets@hf.com"},"a0454000004klT8AAI":{"key":"Name","value":"wergw"},"a0454000004tv08AAA":{"key":"Name","value":"wfvgwerg"},"a0454000004kmo2AAA":{"key":"RichText","value":""},"a0454000004koYNAAY":{"key":"Signature","value":"https://saas-business-8452-dev-ed--c.documentforce.com/sfc/dist/version/download/?oid=00D54000000l3v1&ids=06854000001hsx3&d=%2Fa%2F540000009nOe%2Fa5cszfrvepgnOc93SXCjl_agVOkrX8vHH6SIDV7fo4w&asPdf=false"},"a0454000004klT3AAI":{"key":"Email-Id","value":"wewerf@wd.com"}}}}';
            fs.Object_API_Name__c   = 'object api name';
            fs.Object_Label__c      = 'object label'; 
            fs.Form__c              = fm.id ;
        insert fs;

        
        
        PreviewFormComponentController.form_submission(fm.Id, sub1, sub2 );
        
        
        Form__c form = new Form__c();
            form.Title__c = 'testing apex class';
            form.Object_Mapping__c = '{"Account":{"Active":"true","objname":"Account","value":"{\\"Name\\":{\\"rowIndex\\":\\"100_req\\",\\"objfieldvalue3\\":\\"Name\\",\\"formfieldvalue\\":\\"'+ff.id+'\\"},\\"ShippingLongitude\\":{\\"rowIndex\\":\\"003_nreq_y4\\",\\"objfieldvalue3\\":\\"ShippingLongitude\\",\\"formfieldvalue\\":\\"LK_003_nreq_y4_Account\\"}}"}}';
            form.FolderId__c = fldr.id;
            form.notification_mail_recipient_email__c = '["mihir.r@mvclouds.com","mihir1.r@mvclouds22.com","yrgugds@email.com","asfdhao@email.com","email..email@example.com"]';
            form.notification_replyToEmail__c = 'test@test.com';
            form.notification_mail_message_subject__c = 'test apex class';
            form.notification_mail_message_body__c = 'Hello testing on the go';
            form.NotificationMail_EmailAttachment__c = true;
        insert form;


        String sd = form.id;
        
        PreviewFormComponentController.sendNotificationEmail(form.Id, fs.id );
        PreviewFormComponentController.fieldSubmit(sd, formFieldMap);
    }
}