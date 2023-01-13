public Without Sharing class quickformfieldcomponent1Controller {

    @AuraEnabled
    // For Store Fields Data
    public static void fieldSave(String fieldId, String fieldData){
        try{
            Form_Field__c formField = [SELECT Id,Label__c FROM Form_Field__c WHERE Id =: fieldId];
            formField.Label__c = fieldData;
            update formField;
        } catch (Exception e) {
            System.debug(e);
        }
    }

    @AuraEnabled
    // For Store Signature Field Data
    public static String signatureSave(String fieldId, String fieldData){
        try{
            Form_Field__c formField = [SELECT Id, Label__c, Signature__c, Form__c FROM Form_Field__c WHERE Id =: fieldId];
            // SELECT Id, Title, ContentUrl, VersionData, VersionNumber, ContentDocumentId FROM ContentVersion
            String s = fieldData.replaceFirst('data:image/png;base64,','');
            ContentVersion conVer = new ContentVersion();
                conVer.title = 'signature1456';
                conVer.versionData = EncodingUtil.base64decode(s);
                conVer.PathOnClient = 'signature16.png';
            insert conVer;
                
            String contentId = [select id, ContentDocumentId from ContentVersion WHERE Id =:conVer.Id].ContentDocumentId;

            ContentDocumentLink cl = new ContentDocumentLink();
                cl.ContentDocumentId = contentId;
                cl.LinkedEntityId = formField.Form__c;
                cl.ShareType = 'V';
                cl.Visibility = 'AllUsers';

            insert cl;

            ContentDistribution cd = new ContentDistribution();        
                cd.Name = 'Test File';         
                cd.ContentVersionId = conVer.Id;                      
                //insert          
            insert cd;

            ContentDistribution distribution = [select Name,ContentDownloadUrl from ContentDistribution where id=: cd.id];
                //return ContentDistributionUrl

            String docurl = '@_#%_$ '+distribution.ContentDownloadUrl;

            return docurl;
            
        } catch (Exception e) {
            System.debug(e);
            return null;
        }
    }

    @AuraEnabled
    // For Store Address Field Data
    public static List<Id> addressFieldSave(String pageId, String fieldId, String street, String city, String region, String postalCode, String country ){
        try{
            List<Id> addressList = new List<Id>();
            List<Form_Field__c> formField = [SELECT Id,Label__c,Page__c, Data_Record_Id__c, Address_Id__c FROM Form_Field__c WHERE Page__c =: pageId ORDER BY CreatedDate ASC];
            for (Form_Field__c field : formField) {
                if (field.Id == fieldId) {
                    addressList.add(field.Id);
                    field.Label__c = street;
                }
                else if(field.Address_Id__c == fieldId && field.Data_Record_Id__c =='CITY'){
                    field.Label__c = city;
                    addressList.add(field.Id);
                }
                else if(field.Address_Id__c == fieldId && field.Data_Record_Id__c =='REGION'){
                    field.Label__c = region;
                    addressList.add(field.Id);
                }
                else if(field.Address_Id__c == fieldId && field.Data_Record_Id__c =='POSTALCODE'){
                    field.Label__c = postalCode;
                    addressList.add(field.Id);
                }
                else if(field.Address_Id__c == fieldId && field.Data_Record_Id__c =='COUNTRY'){
                    field.Label__c = country;
                    addressList.add(field.Id);
                }
            }
            update formField;
            return addressList;
        } catch (Exception e) {
            System.debug(e);
            return null;
        }
    }

    // For Store FullName Field
    @AuraEnabled
    public static String fullNameSave(String pageId, String fieldId, String fieldData, String fieldType){
        try{
            if (fieldType == 'Salutation') {
                Form_Field__c formField = [SELECT Id, Label__c, Page__c, Data_Record_Id__c, Name_Id__c FROM Form_Field__c WHERE Page__c =: pageId AND Id =:fieldId];
                formField.Label__c = fieldData;
                update formField;
                return formField.Id;
            } else {
                Form_Field__c formField = [SELECT Id, Label__c, Page__c, Data_Record_Id__c, Name_Id__c FROM Form_Field__c WHERE Page__c =: pageId AND Name_Id__c =: fieldId AND Data_Record_Id__c =: fieldType];
                formField.Label__c = fieldData;
                update formField;
                return formField.Id;
            }
        } catch (Exception e) {
            System.debug(e);
            return null;
        }
    }
    
    // For Get FullName Field
    @AuraEnabled
    public static String fullNameData(String pageId, String fieldId, String fieldType){
        try{
            Form_Field__c formField = [SELECT Id, Label__c, Page__c, Data_Record_Id__c, Name_Id__c FROM Form_Field__c WHERE Page__c =: pageId AND Name_Id__c =: fieldId AND Data_Record_Id__c =: fieldType];
            return formField.Id;
        } catch (Exception e) {
            System.debug(e);
            return null;
        }
    }

    @AuraEnabled
    // For Get LookUp Field Records 
    public static List<sObject> findByName (String searchKey, String objName){
        try{
            String query =  'SELECT Id, Name FROM ' + objName + ' WHERE Name LIKE \'%' + searchKey + '%\'';
            return Database.query( query );
        } catch (Exception e) {
            System.debug(e);
            return null;
        }
    }  

    @AuraEnabled
    // For Get LookUp Field Records Name for input field 
    public static List<sObject> findById (String objId, String objName){
        try{
            String query =  'SELECT Id, Name FROM ' + objName + ' WHERE Id = \'' + objId + '\'';
            return Database.query( query );
        } catch (Exception e) {
            System.debug(e);
            return null;
        }
    }  

    @AuraEnabled
    // For Get File Upload Field Records Name for input field 
    public static String findContentById (String objId){
        try{
            ContentVersion contentData = [SELECT Id, Title FROM ContentVersion WHERE ContentDocumentId =: objId];
            return contentData.Title;
        } catch (Exception e) {
            System.debug(e);
            return null;
        }
    }  

    @AuraEnabled
    // For Get Scale Rating Field Data
    public static LikertWrapper likertdata (String fieldId){
        try{
            List<Field_Value__c> valueList = [ SELECT Id, Name, Form_Field__c, Likert__c, Likert_Data__c FROM Field_Value__c WHERE Form_Field__c =:fieldId ];
            LikertWrapper wrpcls = new LikertWrapper();
            for (Field_Value__c val : valueList) {
                if (val.Likert__c == 'Statement') {
                    String[] statementLst = val.Likert_Data__c.split(' ::: ');
                    wrpcls.Statement = statementLst;
                }
                else if (val.Likert__c == 'Option') {
                    String[] optionLst = val.Likert_Data__c.split(' ::: ');
                    wrpcls.Option = optionLst;
                }
            }
            return wrpcls;
        } catch (Exception e) {
            System.debug(e);
            return null;
        }
    } 

    @AuraEnabled
    // For File Upload Field Data
    public static void fileSave(String fieldId, String fieldData){
        try{
            Form_Field__c formField = [SELECT Id,Label__c FROM Form_Field__c WHERE Id =: fieldId];
            formField.Label__c = fieldData;
            update formField;
        } catch (Exception e) {
            System.debug(e);
        }
    }

    @AuraEnabled
    public static Id SaveFile(String fileName, String base64Data, String contentType) {
        try {
            // base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');
            // ContentVersion cv = new ContentVersion();
            // cv.Title = fileName;
            // cv.PathOnClient = fileName;
            // cv.VersionData = EncodingUtil.base64Decode(base64Data);
            // cv.IsMajorVersion = true;
            // Insert cv;
            
            // String contentId = [select id, ContentDocumentId from ContentVersion WHERE Id =:cv.Id].ContentDocumentId;
            // ContentDocumentLink cl = new ContentDocumentLink();
            // cl.ContentDocumentId = contentId;
            // cl.ShareType = 'V';
            // cl.Visibility = 'AllUsers';
            // Insert cl;

            // ContentDistribution cd = new ContentDistribution();        
            // cd.Name = fileName;         
            // cd.ContentVersionId = cv.Id;                            
            // Insert cd;

            // ContentDistribution distribution = [select Name,ContentDownloadUrl from ContentDistribution where id=: cd.id];
            // String docurl = '@%_$*_'+distribution.ContentDownloadUrl;
            // return docurl;

            base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');
            ContentVersion cv = new ContentVersion();
            cv.Title = fileName;
            cv.PathOnClient = fileName;
            cv.VersionData = EncodingUtil.base64Decode(base64Data);
            cv.IsMajorVersion = true;
            Insert cv;
            
            Id conDocId = [SELECT ContentDocumentId FROM ContentVersion WHERE Id =:cv.Id].ContentDocumentId;
            return conDocId;
        } catch (Exception e) {
            System.debug('e =>'+e);
            return 'Error';
        }
    }   

    // Wrapper Class
    public class LikertWrapper{
        @AuraEnabled public List<String> Statement {get;set;}
        @AuraEnabled public List<String> Option {get;set;}
    }
}