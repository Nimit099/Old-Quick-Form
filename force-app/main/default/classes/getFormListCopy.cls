public with sharing class getFormListCopy {
    @AuraEnabled 
    public static List<formListWrapper> getForm(){     
        List<formListWrapper> lstformListWrapper = new List<formListWrapper>();
        for(Form__c acc : [Select Id,Name,Title__c,Description__c,Active__c,CreatedDate From Form__c ORDER BY Name Desc]){
                               lstformListWrapper.add(new formListWrapper(false,acc));
                           } 
        return lstformListWrapper; 
    }
    @AuraEnabled 
    public static List<Form__c> deleteSelectedRecord(List<Form__c> selectedRecords) {
        List<id> ids=new List<id>(); 
        for(Form__c f : selectedRecords){
            ids.add(f.id);
        }
        List<Form__c> formList = [Select id,Title__c from Form__c where Id =:ids];
        delete formList;
        return [Select Id,Name,Title__c,Description__c,Active__c,CreatedDate From Form__c ORDER BY Name Desc]; 
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
    public static List<formListWrapper> fetchContact(String sortField, boolean isAsc) {
        String sSoql = 'SELECT Id,Name,Title__c,Description__c,Active__c,CreatedDate';
        sSoql += ' From Form__c';
        if (sortField != '') {
            sSoql += ' order by ' + sortField;    
        // if isAsc is equal tp ture then set 'asc' order otherwise set 'desc' order.
            if (isAsc) {
                sSoql += ' asc';
            } else {
                sSoql += ' desc';
            }
        }
    // set record limit to query 
        sSoql += ' LIMIT 5';    
        list <Form__c> lstResult = new List<Form__c>();
        try {
            lstResult = Database.query(sSoql);
            List<formListWrapper> lstformListWrapper = new List<formListWrapper>();
            for(form__c c: lstResult){
                lstformListWrapper.add(new formListWrapper(false,c));
            }
            return lstformListWrapper;            
        }         
        catch (Exception ex) {
            return null;
        }
   }

    /* wrapper class */  
    public class formListWrapper {
        @AuraEnabled public boolean isChecked {get;set;}
        @AuraEnabled public Form__c objForm {get;set;}
        public formListWrapper(boolean isChecked, Form__c objForm){
            this.isChecked = isChecked;
            this.objForm = objForm;
        }
    }
}