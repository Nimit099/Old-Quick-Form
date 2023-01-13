// **************************************************************
// Class Name       : QFFormFieldValidationComponentController
// Author           : Krunal
// Created Date     : 27/06/2022
// Description      : This Class Use In QFFormFieldValidationComponent and QFFormEditFieldComponent For Store Field Validation Data In Field Attribute Object.
// TestClass        :
// Code Coverage    :
// **************************************************************

public with sharing class QFFormFieldValidationComponentController {

    // Save Attribute Value
    @AuraEnabled
    public static WrapperSave saveAttributeList(WrapperSave wlist, List<String> deleteOptionLst){
        try {        
            WrapperSave wrp = new WrapperSave();

            if (deleteOptionLst.size() > 0) {
                List<Field_Value__c> valueList = [SELECT Id FROM Field_Value__c WHERE Id IN: deleteOptionLst];
                if(valueList.size()>0){
                    delete valueList;
                }
            }
            if(wlist.AttributeList != null){
                update wlist.AttributeList;
            }
            if(wlist.FieldList != null){
                upsert wlist.FieldList;
            } 
            wrp.AttributeList = wlist.AttributeList;
            wrp.FieldList = wlist.FieldList;        
            
            if (wlist.AttributeList.Form_Field__r.Data_Record_Id__c == 'QFFULLNAME') {
                List<Form_Field__c> listName =[SELECT Id FROM Form_Field__c WHERE Name_Id__c =: wlist.AttributeList.Form_Field__c];
                List<FieldAttribute__c> nameAttribute = [SELECT Id, Required_Field__c FROM FieldAttribute__c WHERE Form_Field__c IN: listName];
                for (FieldAttribute__c fValue : nameAttribute){
                    fValue.Required_Field__c = wlist.AttributeList.Required_Field__c;
                }
                update nameAttribute;
            }
            return wrp;
        }catch(Exception e){
            GenericException Exp = ExceptionHandler.logException(e, 'QFFormFieldValidationComponentController', 'saveAttributeList');
            return null;
        }
    }    

    // Get All Attribute Data Of Field For Edit
    @AuraEnabled
    public static WrapperClass fetchList(String ids){
        try{
            WrapperClass wrpcls=new WrapperClass();
            Form_Field__c fieldData = [SELECT Id, Label__c, LookUp_Obj__c FROM Form_Field__c WHERE Id =: ids];

            FieldAttribute__c attributeList = [SELECT Id, Name, Label__c, Visibility__c,Field_Validation__c,Total_value__c,Limit_value__c,
                                                Instruction__c, Min_no_of_character__c, Max_no_of_character__c, Hide_Field__c, Form_Field__c, Show_on_click__c, Required_Field__c,
                                                Read_Only__c,Add_Prefix_Inside_The_Field__c,Input_height_in_rows__c,Max_no_of_words__c,Min_no_of_words__c,Prefix__c,Show_Decimal__c, Inline_Choices__c,
                                                Date_Format__c,No_of_columns__c,Agreement_Text__c,Directions__c, Form_Field__r.Data_Record_Id__c,Placeholder__c,Placeholder_text__c, RichText__c
                                                FROM FieldAttribute__c WHERE Form_Field__c =: ids limit 1];

            List<Field_Value__c> fieldList = [SELECT Id,Name,Form_Field__c,Form__c, Likert__c, Likert_Data__c, Value_Sequence__c FROM Field_Value__c WHERE Form_Field__c =:ids ORDER BY Value_Sequence__c ASC];

            for(Field_Value__c fieldval : fieldList){
                System.debug('valueList => '+fieldval);
            }

            if (attributeList.Form_Field__r.Data_Record_Id__c == 'QFLOOKUP') {
                List<string> SObjectList = new List<string>();
                for(Schema.SObjectType sObj : schema.getGlobalDescribe().values()){
                    if(sObj.getDescribe().isUpdateable() && sObj.getDescribe().isAccessible()){
                        sObjectList.add(sObj.getDescribe().getName()+','+sObj.getDescribe().getLabel());
                    }
                }
                wrpcls.SObjectList = SObjectList;
            }

            wrpcls.FieldObj = fieldData;
            wrpcls.AttributeList = attributeList;
            wrpcls.FieldList=fieldList;
            return wrpcls;
        }catch(Exception e){
            GenericException Exp = ExceptionHandler.logException(e, 'QFFormFieldValidationComponentController', 'fetchList');
            return null;
        }
    }

    // For Delete Field From Form
    @AuraEnabled
    public static string deletefieldRecord(String fieldId, String fieldtype){
        try{
            List<Sobject> listobj = new List<Sobject>();

            Form_Field__c field = [SELECT Id, Sequence__c, Page__c, Form__c FROM Form_Field__c WHERE Id =: fieldId];
            List<FieldAttribute__c> formAttribute = [SELECT Id,Form_Field__c FROM FieldAttribute__c WHERE Form_Field__c =: fieldId];
            List<Field_Value__c> fieldValue = [SELECT Id,Form_Field__c FROM Field_Value__c WHERE Form_Field__c =: fieldId];

            Decimal fieldSeq = field.Sequence__c;
            String formId = field.Form__c;
            if (fieldtype == 'QFADDRESS') {
                List<Form_Field__c> fieldlist = [SELECT Id FROM Form_Field__c WHERE Address_Id__c =: fieldId];
                List<FieldAttribute__c> attributelist = [SELECT Id,Form_Field__c FROM FieldAttribute__c WHERE Form_Field__c IN: fieldlist];
                listobj.addAll(attributelist);
                listobj.addAll(fieldlist);
            }
            
            if (fieldtype == 'QFFULLNAME') {
                List<Form_Field__c> fieldlist = [SELECT Id FROM Form_Field__c WHERE Name_Id__c =: fieldId];
                List<FieldAttribute__c> attributelist = [SELECT Id,Form_Field__c FROM FieldAttribute__c WHERE Form_Field__c IN: fieldlist];
                listobj.addAll(attributelist);
                listobj.addAll(fieldlist);
            }

            listobj.addAll(formAttribute);
            listobj.addAll(fieldValue);
            listobj.add(field);
            
            if(listobj.size()>0){
                delete listobj;
            }

            List<Form_Field__c> fieldList = [SELECT Id, Sequence__c FROM Form_Field__c WHERE Form__c =: formId];
            for (Form_Field__c f : fieldList) {
                if (f.Sequence__c > fieldSeq) {
                    f.Sequence__c -= 1;
                }
            }
            update fieldList;
            return 'Success';
        }catch(Exception e){
            GenericException Exp = ExceptionHandler.logException(e, 'QFFormFieldValidationComponentController', 'deletefieldRecord');
            return null;
        }
    }

    // For Create Duplocate Field In Form
    @AuraEnabled
    public static string duplicatefieldRecord(String fieldId){
        try{
            Map<String ,String> labelMAp = new Map<String,String>();
            BaseField__mdt[] baseField = [SELECT Label,DataRecord__c FROM BaseField__mdt]; 
              for(BaseField__mdt base : baseField){
                  labelMAp.put(base.DataRecord__c,base.Label);
              }

            Form_Field__c listIds = [SELECT API_Name__c ,Data_Record_Id__c, Date_Format__c, Default_Value__c, Directions__c, Field_Validation__c, Form__c, Input_height_in_rows__c, Instruction__c, Label__c, Limit__c, 
                                        Max_no_of_character__c, Min_no_of_character__c, Number_Format__c, Object_API_Name__c, Page__c, Placeholder__c, Placeholder_Visibility__c, Read_Only__c, Required__c, Sequence__c, 
                                        Show_Decimal__c, Show_on_click__c, Type__c, Visibility__c FROM Form_Field__c WHERE Id =: fieldId];

            Form_Field__c newField = listIds.clone();
            if(newField != null){
                insert newField;
            }   

            FieldAttribute__c attributeList = [SELECT Id, Name, Label__c, Visibility__c,Field_Validation__c,Total_value__c,Limit_value__c,
                                                Instruction__c, Min_no_of_character__c, Max_no_of_character__c, Hide_Field__c, Form_Field__c, Show_on_click__c, Required_Field__c,
                                                Read_Only__c,Add_Prefix_Inside_The_Field__c,Input_height_in_rows__c,Max_no_of_words__c,Min_no_of_words__c,Prefix__c,Show_Decimal__c, Inline_Choices__c,
                                                Date_Format__c,No_of_columns__c,Agreement_Text__c,Directions__c, Form_Field__r.Data_Record_Id__c,Placeholder__c,Placeholder_text__c, RichText__c
                                                FROM FieldAttribute__c WHERE Form_Field__c =: fieldId];

            FieldAttribute__c fieldattribute = attributeList.clone();
            if (attributeList.Label__c == null) {
                fieldattribute.Label__c = 'Copy of ' + labelMAp.get(listIds.Data_Record_Id__c);
            } else {
                fieldattribute.Label__c = 'Copy of ' + attributeList.Label__c;
            }
            fieldattribute.Form_Field__c = newField.Id;
            if(fieldattribute != null){
                insert fieldattribute;
            } 
            

            if (newField.Data_Record_Id__c == 'QFCHECKBOX' || newField.Data_Record_Id__c == 'QFRADIOBUTTON' || newField.Data_Record_Id__c == 'QFDROPDOWN') {
                List<String> optionlst = new List<String>();
                List<Field_Value__c> FieldList = [SELECT Id,Name,Form_Field__c,Form__c FROM Field_Value__c WHERE Form_Field__c =:fieldId ];
                for (Field_Value__c fv : FieldList) {
                    optionlst.add(fv.Name);
                }
                
                List<Field_Value__c> fieldvalue = new List<Field_Value__c>();
                for(Integer i=0;i<optionlst.size();i++){
                    Field_Value__c ff = new Field_Value__c();
                    ff.Form__c = listIds.Form__c;
                    ff.Page__c = listIds.Page__c;
                    ff.Form_Field__c = newField.Id;            
                    ff.Name = optionlst[i];  
                    fieldvalue.add(ff);
                }
                if(fieldvalue.size()>0){
                    insert fieldvalue;
                } 
            }
            else if (newField.Data_Record_Id__c == 'QFADDRESS') {
                Form_Field__c addfield2 = new Form_Field__c(Data_Record_Id__c ='CITY', Address_Id__c = newField.Id, Form__c = listIds.Form__c, Page__c = listIds.Page__c);
                Form_Field__c addfield3 = new Form_Field__c(Data_Record_Id__c ='REGION', Address_Id__c = newField.Id, Form__c = listIds.Form__c, Page__c = listIds.Page__c);
                Form_Field__c addfield4 = new Form_Field__c(Data_Record_Id__c ='POSTALCODE', Address_Id__c = newField.Id, Form__c = listIds.Form__c, Page__c = listIds.Page__c);
                Form_Field__c addfield5 = new Form_Field__c(Data_Record_Id__c ='COUNTRY', Address_Id__c = newField.Id, Form__c = listIds.Form__c, Page__c = listIds.Page__c);
                List<Form_Field__c> addressList = new List<Form_Field__c>{addfield2, addfield3, addfield4, addfield5};
                if(addressList.size()>0){
                    insert addressList;
                } 

                FieldAttribute__c addattribure2 = new FieldAttribute__c(Form_Field__c = addfield2.Id, Label__c = 'City');
                FieldAttribute__c addattribure3 = new FieldAttribute__c(Form_Field__c = addfield3.Id, Label__c = 'Region');
                FieldAttribute__c addattribure4 = new FieldAttribute__c(Form_Field__c = addfield4.Id, Label__c = 'PostalCode');
                FieldAttribute__c addattribure5 = new FieldAttribute__c(Form_Field__c = addfield5.Id, Label__c = 'Country');
                List<FieldAttribute__c> addressAttributeList = new List<FieldAttribute__c>{addattribure2, addattribure3, addattribure4, addattribure5};
                if(addressAttributeList.size()>0){
                    insert addressAttributeList;
                } 
            }
            else if(newField.Data_Record_Id__c == 'QFFULLNAME'){
                Form_Field__c addfield2 = new Form_Field__c(Data_Record_Id__c ='First Name', Name_Id__c = newField.Id, Form__c = listIds.Form__c, Page__c = listIds.Page__c);
                Form_Field__c addfield3 = new Form_Field__c(Data_Record_Id__c ='Last Name', Name_Id__c = newField.Id, Form__c = listIds.Form__c, Page__c = listIds.Page__c);
                List<Form_Field__c> addressList = new List<Form_Field__c>{addfield2, addfield3};
                if(addressList.size()>0){
                    insert addressList;
                }

                FieldAttribute__c addattribure1 = [SELECT Label__c FROM FieldAttribute__c WHERE Id =: fieldattribute.Id];
                addattribure1.Label__c = 'Salutation';
                if(addattribure1 != null){
                    update addattribure1;
                } 

                FieldAttribute__c addattribure2 = new FieldAttribute__c(Form_Field__c = addfield2.Id, Label__c = 'First Name');
                FieldAttribute__c addattribure3 = new FieldAttribute__c(Form_Field__c = addfield3.Id, Label__c = 'Last Name');
                List<FieldAttribute__c> addressAttributeList = new List<FieldAttribute__c>{addattribure2, addattribure3};
                if(addressAttributeList.size()>0){
                    insert addressAttributeList;
                }
            }
            else if (newField.Data_Record_Id__c == 'QFSCALERATING') {
                List<Field_Value__c> FieldList=[ SELECT Id, Form_Field__c, Form__c, Page__c, Likert__c, Likert_Data__c FROM Field_Value__c WHERE Form_Field__c =:fieldId ];
                List<Field_Value__c> newScaleValue = new List<Field_Value__c>();
                for (Field_Value__c fValue : FieldList) {
                    if (fValue.Likert__c == 'Statement') {
                        Field_Value__c likertvalue1 = fValue.clone();
                        likertvalue1.Form_Field__c = newField.Id;
                        newScaleValue.add(likertvalue1);
                    }
                    else if(fValue.Likert__c == 'Option'){
                        Field_Value__c likertvalue2 = fValue.clone();
                        likertvalue2.Form_Field__c = newField.Id;
                        newScaleValue.add(likertvalue2);
                    }
                }
                if(newScaleValue.size()>0){
                    insert newScaleValue;
                } 
            }
            return 'Success';
        }catch(Exception e){
            GenericException Exp = ExceptionHandler.logException(e, 'QFFormFieldValidationComponentController', 'duplicatefieldRecord');
            return null;
        }
    } 

    // Get Form Data For Edit
    @AuraEnabled 
    public static Form__c fetchQuickFormField(String formId){
        try {
            return [SELECT Id, Name, Display_Type__c, Description__c, Active__c, Captcha_Type__c, Title__c FROM Form__c WHERE id =: formId];
        } catch (Exception e) {
            GenericException Exp = ExceptionHandler.logException(e, 'QFFormFieldValidationComponentController', 'fetchQuickFormField');
            return null;
        }
    }

    // Get Page Data For Edit
    @AuraEnabled
    public static Page__c fetchPagedetails(String pageId){
        try {
            return [SELECT Id ,Form__c,Title__c,Sub_Title__c FROM Page__c WHERE Id =: pageId];
        } catch (Exception e) {
            GenericException Exp = ExceptionHandler.logException(e, 'QFFormFieldValidationComponentController', 'fetchPagedetails');
            return null;
        }
    }
    
    // Update Form Data
    @AuraEnabled 
    public static String updateFormDetails(String formTitle,Form__c formdetails){
        try {
            List<Form__c> FormList = [SELECT Id,Name FROM Form__c WHERE Title__c =: formTitle  AND Id !=: formdetails.Id ];
            if(FormList.size() > 0){
                return 'error';
            }else{
                upsert formdetails;
                return 'success';
            }
        } catch (Exception e) {
            GenericException Exp = ExceptionHandler.logException(e, 'QFFormFieldValidationComponentController', 'updateFormDetails');
            return null;
        }
    }

    // Update Page Data
    @AuraEnabled
    public static string upatePageDetails(Page__c pagedetails){
        try {
            upsert pagedetails;
            return 'Success';
        } catch (Exception e) {
            GenericException Exp = ExceptionHandler.logException(e, 'QFFormFieldValidationComponentController', 'upatePageDetails');
            return null;
        }
    }

    // For Save Lookup Field Object Data In Field Record
    @AuraEnabled
    public static string updateLookUp(String fieldId, String userObj){
        try{
            Form_Field__c fieldData = [SELECT Id, Label__c, LookUp_Obj__c FROM Form_Field__c WHERE Id =: fieldId];
            fieldData.LookUp_Obj__c = userObj;
            if(fieldData != null){
                update fieldData;
            } 
            return 'Success';
        }catch(Exception e){
            GenericException Exp = ExceptionHandler.logException(e, 'QFFormFieldValidationComponentController', 'updateLookUp');
            return null;
        }
    }

    public class WrapperSave{
        @AuraEnabled public FieldAttribute__c AttributeList{get;set;}
        @AuraEnabled public List<Field_Value__c> FieldList{get;set;}
        public WrapperSave(){
            this.AttributeList=new FieldAttribute__c();
            this.FieldList=new List<Field_Value__c>();
        }
    }

    public class WrapperClass{
        @AuraEnabled public Form_Field__c FieldObj {get;set;}
        @AuraEnabled public FieldAttribute__c AttributeList{get;set;}
        @AuraEnabled public List<Field_Value__c> FieldList{get;set;}
        @AuraEnabled public List<String> SObjectList{get;set;}
        public WrapperClass(){
            this.AttributeList=new FieldAttribute__c();
            this.FieldList=new List<Field_Value__c>();
        }
    }
}