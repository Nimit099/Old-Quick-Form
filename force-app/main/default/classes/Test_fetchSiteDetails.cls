@istest
public with sharing class Test_fetchSiteDetails {
    @istest
    public static void test_method1(){
        fetchSiteDetails.createFolderrecord();
        Folder__c fldObj = new Folder__c();
        fldObj.Name = 'Tetsting';
        fetchSiteDetails.createFolderrecord();
    }
    
}