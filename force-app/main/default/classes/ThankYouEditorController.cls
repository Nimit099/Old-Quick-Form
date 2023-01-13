public with sharing class ThankYouEditorController {
    
    // Run On Init Method For Get Thank You Data.
    @AuraEnabled
    public static Form__c fetchFormData(String formId){
        try{
            Form__c formData = [SELECT id, ThankYou_Label__c, ThankYou_Page__c, ThankYou_Text__c, ThankYou_URL__c, ThankYou_RichText__c, Redirect_Text__c, Redirect_URL__c FROM Form__c WHERE id =: formId];  
            return formData;
        }catch(Exception e){
            System.debug(e);
            return null;
        } 
    }

    // Save Thank You Data In Form Record.
    @AuraEnabled
    public static void saveThanksData(Form__c formData){
        try {
            if(formData != null){
                update formData;
            }
        } 
        catch (Exception e) {
            System.debug(e);
        }
    }
}