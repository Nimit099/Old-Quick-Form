public with sharing class TestgtetFormList {
    @AuraEnabled
    public static List<Form__c> getForm()
    {
        return [SELECT id ,Name,Title__c,Description__c,Active__c,Display_Type__c FROM Form__c ORDER BY Name Desc];
    } 
    @AuraEnabled
    public static String createFormrecord(Form__c formId) {
        String FName = formId.Title__c;
        List<Form__c> FormList = [SELECT id,Name FROM Form__c WHERE Title__c =: FName];
        if(FormList.size() > 0){
            return 'error';
        }else{
            insert formId;
            return formId.Id;
        }
    }

    @AuraEnabled
    public static List<Form__c> deleterecord(String Id1) {
        if(Id1 != null){
         Form__c delrecord=[Select Id from Form__c where id=:Id1];
         delete delrecord;
        }
        return [SELECT id ,Name,Title__c,Description__c FROM Form__c ORDER BY Name Desc];
    }
}