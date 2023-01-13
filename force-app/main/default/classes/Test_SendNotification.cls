@isTest
public with sharing class Test_SendNotification {
    
    @isTest
    public static void test1(){

        Folder__c fldr =new Folder__c();
        fldr.Name = 'Folder Name';
        insert fldr;

        Form__c fm = new Form__c();
        fm.Title__c = 'Form Title';
        fm.FolderId__c = fldr.Id;
        insert fm;

        System.assertEquals(fm.Title__c,'Form Title','message');

        SendNotification.saveEmailRecipientList(fm.Id,'test@email.com');
        SendNotification.editRecipientEmail(fm.Id,'test@email.com');
        SendNotification.deleteRecipientEmail(fm.Id,'test@email.com');
        SendNotification.saveNotificationData(fm.Id,'test1@email.com','message subject','message body',true);
        SendNotification.loadRecipient(fm.Id);
    }
}