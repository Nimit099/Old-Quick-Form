//This test class covers Apex class QuickFormField_Component

@isTest
public with sharing class Test_QuickFormField_Component {
    @isTest
    public static void testMethod1(){

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
        ff.Data_Record_Id__c = 'QFLOOKUP';
        ff.Label__c = 'First Name';
        insert ff;

        Form_Field__c ff1 = new Form_Field__c();
        ff1.Form__c = fm.Id;
        ff1.Page__c = pg.Id;
        ff1.Data_Record_Id__c = 'QFCHECKBOX';
        ff1.Label__c = 'Last Name';
        insert ff1;

        Form_Field__c ff2 = new Form_Field__c();
        ff2.Form__c = fm.Id;
        ff2.Page__c = pg.Id;
        ff2.Data_Record_Id__c = 'QFADDRESS';
        ff2.Label__c = 'Address';
        insert ff2;

        Form_Field__c ff3 = new Form_Field__c();
        ff3.Form__c = fm.Id;
        ff3.Page__c = pg.Id;
        ff3.Data_Record_Id__c = 'QFFULLNAME';
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

        FieldAttribute__c fa1 = new FieldAttribute__c();
        fa1.Form_Field__c = ff1.Id;
        fa1.Label__c = 'Test Atribute';
        insert fa1;
        
        FieldAttribute__c fa2 = new FieldAttribute__c();
        fa2.Form_Field__c = ff2.Id;
        fa2.Label__c = 'Test Atribute';
        insert fa2;
        
        FieldAttribute__c fa3 = new FieldAttribute__c();
        fa3.Form_Field__c = ff3.Id;
        fa3.Label__c = 'Test Atribute';
        insert fa3;
        
        FieldAttribute__c fa4 = new FieldAttribute__c();
        fa4.Form_Field__c = ff4.Id;
        fa4.Label__c = 'Test Atribute';
        insert fa4;
        
        Field_Value__c fv = new Field_Value__c();
        fv.Form_Field__c = ff.Id;
        fv.Name = 'field value';
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
        fv5.Form_Field__c = ff4.Id;
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
        
        QuickFormField_Component.WrapperSave wrap = new QuickFormField_Component.WrapperSave();
        wrap.FieldList = fieldValueList;
        wrap.AttributeList = fa;
        QuickFormField_Component.saveAttributeList(wrap);

        QuickFormField_Component.fetchQuickFormField(fm.Id);
        QuickFormField_Component.fetchPagedetails(pg.Id);
        QuickFormField_Component.updateLookUp(ff1.Id, 'Contact');
        QuickFormField_Component.upatePageDetails(pgList);
        QuickFormField_Component.updateFormDetails('New Form Title',formList);
        QuickFormField_Component.fetchList(ff1.Id);
        QuickFormField_Component.duplicatefieldRecord(ff.Id);
        QuickFormField_Component.duplicatefieldRecord(ff1.Id);
        QuickFormField_Component.duplicatefieldRecord(ff2.Id);
        QuickFormField_Component.duplicatefieldRecord(ff3.Id);
        QuickFormField_Component.duplicatefieldRecord(ff4.Id);
        QuickFormField_Component.deleteRecord(fv.Id,ff.id);
        QuickFormField_Component.deletefieldRecord(ff.id,'QFADDRESS');
        QuickFormField_Component.deletefieldRecord(ff1.id,'QFFULLNAME');
        

    }
        

}