public with sharing class SendNotification {



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
            throw new AuraHandledException(e.getMessage());
        }
    }

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
            throw new AuraHandledException(e.getMessage());
        }
    }



     // Save Email Recipient List
   @AuraEnabled
   public static String saveEmailRecipientList(String formId, String emailRecipientList){  
        try {
            System.debug('testing :::');
            System.debug('emailRecipientList>>'+emailRecipientList);
            Form__c form = [SELECT id, notification_mail_recipient_email__c FROM Form__C WHERE Id =: formId ];
            form.notification_mail_recipient_email__c = emailRecipientList;
            update form;
            System.debug('form for add email::'+form);
            return emailRecipientList; 
        } 
        catch(Exception e) {
            System.debug(e);
            return null; 
        }
   }

    // Edit Email Recipients
    @AuraEnabled
    public static String editRecipientEmail(String formId, String emailRecipientList){ 
        try {
           String eMessage = '';
           String recipentList = '';
           System.debug('test11');
           Form__c form = [SELECT id,Name,Title__c,notification_mail_recipient_email__c FROM Form__C WHERE Id =: formId];
           System.debug('form for edit recepient::'+form);
           form.notification_mail_recipient_email__c = emailRecipientList;
           recipentList = emailRecipientList;
           update form;
           System.debug('form for update list::'+form);
           eMessage = 'Success';
           return recipentList; 
        } catch (Exception e) {
            System.debug(e);
            return null; 
        }
    }

    @AuraEnabled
    public static String deleteRecipientEmail(String formId, String emailRecipientList){ 
       try {
            String eMessage = '';
            String recipentList = '';
            Form__c form = [SELECT id,Name,Title__c,notification_mail_recipient_email__c FROM Form__C WHERE Id =: formId];
            System.debug('form for delete list::'+form);
            form.notification_mail_recipient_email__c = emailRecipientList;
            recipentList = emailRecipientList;
            update form;
            System.debug('delete list:'+form);
            eMessage = 'Success';
            return recipentList; 
        } catch (Exception e) {
            System.debug(e);
            return null; 
        }
   }

    // Save Email NOtification Data
    @AuraEnabled
    public static void  saveNotificationData(String formId,String replyToEmail,String massageSubject,String massageBody,Boolean emailattachment){ // add void method by harsh 
        try{
            String eMessage = '';
            Form__c form = [SELECT id,Name,Title__c FROM Form__C WHERE Id =: formId];
            System.debug('form for save email :::'+form);
            form.notification_replyToEmail__c = replyToEmail;
            form.notification_mail_message_subject__c = massageSubject;
            form.notification_mail_message_body__c = massageBody;
            form.NotificationMail_EmailAttachment__c=emailattachment;
            upsert form;
        } catch (Exception e) {
            System.debug(e);
        }
    }

    @AuraEnabled
    public static notificationwrapper loadRecipient(String formId){
        try {
            String eMessage = '';
            Form__c form = [SELECT id,Name,Title__c, notification_mail_from_email__c, notification_replyToEmail__c, notification_mail_message_body__c, notification_mail_message_subject__c, notification_mail_recipient_email__c FROM Form__C WHERE Id =: formId LIMIT 1];
    
            notificationwrapper ntf_wrp =new notificationwrapper();
            ntf_wrp.recever_mailid = String.valueOf(form.notification_mail_recipient_email__c);
            ntf_wrp.reply_mailid = form.notification_replyToEmail__c;
            ntf_wrp.body_mail = form.notification_mail_message_body__c;
            ntf_wrp.subject_mail = form.notification_mail_message_subject__c;
            // ntf_wrp.attch_receved = '';

            System.debug(ntf_wrp);
            return ntf_wrp;
        } catch (Exception e) {
            System.debug('loadRecipient'+e);
            return null;
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