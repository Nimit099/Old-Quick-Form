public with sharing class qfFormListController {
    @AuraEnabled
    public static Folder__c insertFolderMethod(Folder__c folder){
        try {
            insert folder;
            return folder;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(cacheable=true)
    public static List<Form__c> searchFormMethod(String formName){
        String keyNameString='%'+ formName+'%';
        return [Select Id,Name FROM Form__c WHERE Name like:keyNameString];
    }

    @AuraEnabled
    public static Form__c insertFormMethod(Form__c form){
        try {
            insert form;
            return form;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(cacheable=true)
    public static List<Form__c> getFormRecord(){
       return [SELECT Id, IsDeleted, Name, Title__c, Description__c, Active__c, FolderId__c, Object__c, Email_Template_Id__c, Display_Type__c FROM Form__c];
    }

    @AuraEnabled 
    public static String updateFormDetails(List<Form__c> formdetails){
        String formTitle;
        set<id> cid = new set<Id>();
        for(Form__c ct : formdetails){
            cid.add(ct.Id);
        }
        List<Form__c> FormList = [SELECT Id,Name FROM Form__c WHERE Title__c =: formTitle  AND Id !=: cid ];
        if(FormList.size() > 0){
            return 'error';
        }else{
            upsert formdetails;
            return 'success';
        }
    }
    @AuraEnabled(cacheable=true)
    public static void deleteFormRecord(String deleteForm){
        Form__c valuelist= [SELECT Id,Name FROM Form__c where Id =: deleteForm ];
        delete valuelist;
    }  
}