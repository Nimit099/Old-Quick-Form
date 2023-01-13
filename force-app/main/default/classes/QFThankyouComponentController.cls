// **************************************************************
// Class Name       : QFThankyouComponentController
// Author           : Krunal
// Created Date     : 27/06/2022
// Description      : This Class Use In QFThankyouComponent For Get Thank You Data And Save Thank You Data In Form Object.
// TestClass        :
// Code Coverage    :
// **************************************************************

public with sharing class QFThankyouComponentController {
    // Run On Init Method For Get Thank You Data.
    @AuraEnabled
    public static Form__c fetchFormData(String formId){
        try{
            Form__c formData = [SELECT id, ThankYou_Label__c, ThankYou_Page__c, ThankYou_Text__c, ThankYou_URL__c, ThankYou_RichText__c, Redirect_Text__c, Redirect_URL__c FROM Form__c WHERE id =: formId];  
            return formData;
        }catch(Exception e){
            GenericException Exp = ExceptionHandler.logException(e, 'QFThankyouComponentController', 'fetchFormData');
            return null;
        } 
    }

    // Save Thank You Data In Form Record.
    @AuraEnabled
    public static string saveData(Form__c formData){
        try {
            if(formData != null){
                update formData;
            }
            return 'success';
        } 
        catch (Exception e) {
            GenericException Exp = ExceptionHandler.logException(e, 'QFThankyouComponentController', 'saveData');
            return null;
        }
    }
}