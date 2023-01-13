@IsTest
public with sharing class quickformfieldcomponent1ControllerTest {
    @istest
    public static void quickformfieldcomponent1Controller(){

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
        ff.Data_Record_Id__c = 'CITY';
        ff.Label__c = 'First Name';
        insert ff;

        Form_Field__c ff1 = new Form_Field__c();
        ff1.Form__c = fm.Id;
        ff1.Page__c = pg.Id;
        ff1.Data_Record_Id__c = 'REGION';
        ff1.Label__c = 'Last Name';
        insert ff1;

        Form_Field__c ff2 = new Form_Field__c();
        ff2.Form__c = fm.Id;
        ff2.Page__c = pg.Id;
        ff2.Data_Record_Id__c = 'POSTALCODE';
        ff2.Label__c = 'Address';
        insert ff2;

        Form_Field__c ff3 = new Form_Field__c();
        ff3.Form__c = fm.Id;
        ff3.Page__c = pg.Id;
        ff3.Name_Id__c=ff2.Id;
        ff3.Data_Record_Id__c = 'COUNTRY';
        ff3.Label__c = 'Full Name';
        insert ff3;

        Form_Field__c ff4 = new Form_Field__c();
        ff4.Form__c = fm.Id;
        ff4.Page__c = pg.Id;
        ff4.Data_Record_Id__c = 'QFSCALERATING';
        ff4.Label__c = 'Scale Rating';
        insert ff4;

        FieldAttribute__c fa = new FieldAttribute__c();
        fa.Form_Field__c = ff.Id;
        fa.Label__c = 'Test Atribute';
        insert fa;

        // FieldAttribute__c fa1 = new FieldAttribute__c();
        // fa1.Form_Field__c = ff1.Id;
        // fa1.Label__c = 'Test Atribute';
        // insert fa1;
        
        // FieldAttribute__c fa2 = new FieldAttribute__c();
        // fa2.Form_Field__c = ff2.Id;
        // fa2.Label__c = 'Test Atribute';
        // insert fa2;
        
        // FieldAttribute__c fa3 = new FieldAttribute__c();
        // fa3.Form_Field__c = ff3.Id;
        // fa3.Label__c = 'Test Atribute';
        // insert fa3;
        
        // FieldAttribute__c fa4 = new FieldAttribute__c();
        // fa4.Form_Field__c = ff4.Id;
        // fa4.Label__c = 'Test Atribute';
        // insert fa4;
        
        Field_Value__c fv = new Field_Value__c();
        fv.Form_Field__c = ff.Id;
        fv.Name = 'field value';
        fv.Likert__c='Statement';
        insert fv;
        
        Field_Value__c fv1 = new Field_Value__c();
        fv1.Form_Field__c = ff1.Id;
        fv.Name = 'field value';
        insert fv1;

        Field_Value__c fv2 = new Field_Value__c();
        fv2.Form_Field__c = ff2.Id;
        fv2.Name = 'field value';
        insert fv2;

        Field_Value__c fv3 = new Field_Value__c();
        fv3.Form_Field__c = ff3.Id;
        fv3.Name = 'field value';
        insert fv3;

        Field_Value__c fv4 = new Field_Value__c();
        fv4.Form_Field__c = ff4.Id;
        fv4.Name = 'field value';
        fv4.Likert__c = 'Statement';
        insert fv4;

        Field_Value__c fv5 = new Field_Value__c();
        fv5.Form_Field__c = ff3.Id;
        fv5.Name = 'field value';
        fv5.Likert__c = 'Option';
        insert fv5;

        List<Page__c> pgList = new List<Page__c>();
        pgList.add(pg);

        List<Form__c> formList = new List<Form__c>();
        formList.add(fm);

        List<Field_Value__c> fieldValueList = new List<Field_Value__c>();
        fieldValueList.add(fv);
        fieldValueList.add(fv1);
        fieldValueList.add(fv2);
        fieldValueList.add(fv3);
        fieldValueList.add(fv4);
        fieldValueList.add(fv5);

        String s='test';

        ContentVersion conVer=new ContentVersion();
        conVer.title = 'signature1456';
        conVer.versionData = EncodingUtil.base64decode(s);
        conVer.PathOnClient = 'signature16.png';
        insert conVer;


        quickformfieldcomponent1Controller.signatureSave(ff.id, ff.id);
        quickformfieldcomponent1Controller.fieldSave(ff4.id,ff4.Id);
        quickformfieldcomponent1Controller.addressFieldSave(pg.Id, ff.id, 'test', 'test', 'test','test000', 'test');
        quickformfieldcomponent1Controller.fullNameSave(pg.Id, ff3.Id, ff3.Id, 'COUNTRY');
        quickformfieldcomponent1Controller.findByName(ff.Id,'Page');
        quickformfieldcomponent1Controller.likertdata(ff3.Id);
        quickformfieldcomponent1Controller.fileSave(ff2.Id, ff2.Id);
        quickformfieldcomponent1Controller.findById(fa.Id, 'fieldAttribute');
        quickformfieldcomponent1Controller.findContentById(conVer.Id);
        quickformfieldcomponent1Controller.SaveFile(conVer.Id,conVer.Id,conVer.Id);
    }

    @istest
    public static void quickformfield(){

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

        List<Form_Field__c> formfield=new List<Form_Field__c>();
        Form_Field__c ff = new Form_Field__c();
        ff.Form__c = fm.Id;
        ff.Page__c = pg.Id;

        ff.Data_Record_Id__c = 'CITY';
        ff.Label__c = 'First Name';
        formfield.add(ff);
        insert formfield;

        List<Field_Value__c> fieldval=new List<Field_Value__c>();
        Field_Value__c fv = new Field_Value__c();
        fv.Form_Field__c = formfield[0].Id;
        fv.Name = 'field value';
        fv.Likert__c='Statement';
        fieldval.add(fv);
        insert fieldval;
        
        ff.Address_Id__c= fieldval[0].id;
        update ff;


        quickformfieldcomponent1Controller.fullNameSave(pg.Id, formfield[0].Id, ff.Id, 'Salutation');
        quickformfieldcomponent1Controller.likertdata(formfield[0].Id);
        quickformfieldcomponent1Controller.addressFieldSave(pg.Id, fieldval[0].id, 'Test', 'Test','Test', 'Test', 'Test');

        formfield[0].Data_Record_Id__c='REGION';
        update formfield;
        quickformfieldcomponent1Controller.addressFieldSave(pg.Id, fieldval[0].id, 'Test', 'Test','Test', 'Test', 'Test');

        formfield[0].Data_Record_Id__c='POSTALCODE';
        update formfield;
        quickformfieldcomponent1Controller.addressFieldSave(pg.Id, fieldval[0].id, 'Test', 'Test','Test', 'Test', 'Test');

        formfield[0].Data_Record_Id__c='COUNTRY';
        update formfield;
        quickformfieldcomponent1Controller.addressFieldSave(pg.Id, fieldval[0].id, 'Test', 'Test','Test', 'Test', 'Test');

    }

}