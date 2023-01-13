// **************************************************************
// Class Name       : QFNotificationComponentController
// Author           : Mihir
// Created Date     : 27/06/2022
// Description      : This Class Use In QFNotificationComponent for use notification data save 
// TestClass        :
// Code Coverage    :
// **************************************************************

public Without sharing class QFNotificationComponentController {

    // notification component init method to fetch notification data
    @AuraEnabled
    public static notificationwrapper fetch_notification_init(String formId){
        try {
            Form__c form = [SELECT id,Name,Title__c, notification_mail_recipient_email__c, NotificationMail_CC__c, notification_replyToEmail__c, notification_mail_message_body__c, notification_mail_message_subject__c, NotificationMail_EmailAttachment__c FROM Form__C WHERE Id =: formId LIMIT 1];

            notificationwrapper ntf_wrp =new notificationwrapper();

                ntf_wrp.recever_mailid = String.valueOf(form.notification_mail_recipient_email__c);
                ntf_wrp.cc_mailid = String.valueOf(form.NotificationMail_CC__c);
                ntf_wrp.reply_mailid = form.notification_replyToEmail__c;
                ntf_wrp.body_mail = form.notification_mail_message_body__c;
                ntf_wrp.subject_mail = form.notification_mail_message_subject__c;
                ntf_wrp.attch_receved = form.NotificationMail_EmailAttachment__c;

            return ntf_wrp;
            
        } catch (Exception e) {
            // throw new AuraHandledException(e.getMessage());
            GenericException Exp = ExceptionHandler.logException(e,'QFNotificationComponentController', 'fetch_notification_init');
            return null;
        }
    }

    // save notification data in form fields
    @AuraEnabled
    public static string save_nft_data(String formId, String recevermailid, String ccmailid, String replaymailid, String massageSubject, String massageBody, Boolean emailattachment){
        try {
            Form__c form = [SELECT id,Name,Title__c FROM Form__C WHERE Id =: formId];

            form.notification_mail_recipient_email__c = recevermailid;
            form.NotificationMail_CC__c = ccmailid;
            form.notification_replyToEmail__c = replaymailid;
            form.notification_mail_message_subject__c = massageSubject;
            form.notification_mail_message_body__c = massageBody;
            form.NotificationMail_EmailAttachment__c = emailattachment;

            upsert form;
            return null;
        } catch (Exception e) {
            GenericException Exp = ExceptionHandler.logException(e,'QFNotificationComponentController', 'save_nft_data');
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    public class notificationwrapper{
        @AuraEnabled public String recever_mailid {get;set;}
        @AuraEnabled public String cc_mailid {get;set;}
        @AuraEnabled public String reply_mailid {get;set;}  
        @AuraEnabled public String body_mail {get;set;}
        @AuraEnabled public String subject_mail {get;set;}
        @AuraEnabled public Boolean attch_receved {get;set;}
    } 
}