//This test class covers Apex class ObjectMappingController

@isTest
public with sharing class Test_ObjectMappingController {
    @TestSetup static void testSetup(){

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
        ff1.Label__c = 'First Name1';
        insert ff1;

        FieldAttribute__c fa = new FieldAttribute__c();
        fa.Form_Field__c = ff.Id;
        fa.Label__c = 'Test Atribute';
        insert fa;
        
    }

    @isTest
    public static void testMethod1(){
        Test.startTest();

        Form__c fm = [SELECT Id, Object_Mapping__c from Form__c];
        
        ObjectMappingController.fetchobjectField(fm.Id);
        ObjectMappingController.getAllFields('Account');
        ObjectMappingController.getAllFields('Contact');
        ObjectMappingController.fetchQuickFormField(fm.Id);
        ObjectMappingController.editform(fm.Id);
        ObjectMappingController.saveList('AccountMap',fm.Id);

        Form__c fm1 = [SELECT Id, Object_Mapping__c from Form__c];

        System.assertEquals(fm1.Object_Mapping__c, 'AccountMap', 'form object match should be match');

        Test.stopTest();
    }

}