public with sharing class GetFormData {
    public String currentFormId{get; set;}
    public Form__c formData{get; set;}

    public String fId{get;set;}

    public void GetFormData() {
        Form__c curretFormData = [SELECT Id, Name, Active__c FROM Form__c WHERE Id =: currentFormId];
        formData = curretFormData;
    }

    public void testM(){
        System.debug('In test method');
        System.debug('fiD>>>>'+fId);
    }
}