public with sharing class ThankYouComponentController {
    @AuraEnabled
    // get all page, field, attribute, and field value list
    public static FormWrapper getPreviewFormField(String formId){
        try {
            List<Form_Field__c> fieldListId = new List<Form_Field__c>([SELECT Id , Label__c, Form__c,Page__c,Data_Record_Id__c,Page__r.Form__c, LookUp_Obj__c FROM Form_Field__c WHERE Form__c =: formId AND Data_Record_Id__c != NULL AND Address_Id__c = Null ORDER BY Sequence__c]);
            List<id> idField = new List<id>();
            for(Form_Field__c p : fieldListId){
                idField.add(p.Id);
            }
            Form__c formName = [SELECT id ,Title__c, ThankYou_Label__c, ThankYou_Page__c, ThankYou_Text__c, ThankYou_URL__c, ThankYou_RichText__c, Redirect_Text__c, Redirect_URL__c  FROM Form__c WHERE id =: formId];        
            List<PageWrapper> formpage = new List<PageWrapper>();        
            
            Map<Id,FieldAttribute__c> fieldAttribute = new Map<Id,FieldAttribute__c>();
            FieldAttribute__c[] attributeList = [SELECT Id ,Label__c,Visibility__c,Instruction__c,Show_on_click__c,Required_Field__c,Field_Validation__c,Min_no_of_character__c,
                                                Min_no_of_words__c,Total_value__c,Limit_value__c,Show_Decimal__c,Placeholder__c,Placeholder_text__c,
                                                Input_height_in_rows__c,Hide_Field__c,Read_Only__c,Add_Prefix_Inside_The_Field__c,Prefix__c,Max_no_of_character__c,Max_no_of_words__c,
                                                Date_Format__c,Form_Field__c,RichText__c FROM FieldAttribute__c WHERE Form_Field__c IN: idField];
            for(FieldAttribute__c fieldatt : attributeList){            
                fieldAttribute.put(fieldatt.Form_Field__c,fieldatt);         
            }

            Map<Id,List<Field_Value__c>> fieldValue = new Map<Id,List<Field_Value__c>>();
            Field_Value__c[] valueList = [SELECT Id , Name , Form_Field__c FROM Field_Value__c WHERE Form_Field__c IN: idField];
            for(Field_Value__c fieldval : valueList){
                if(fieldValue.containsKey(fieldval.Form_Field__c)){
                    List<Field_Value__c> fList = fieldValue.get(fieldval.Form_Field__c);
                    fList.add(fieldval);
                    fieldValue.put(fieldval.Form_Field__c,fList);
                }else{
                    List<Field_Value__c> fList = new List<Field_Value__c>();
                    fList.add(fieldval);
                    fieldValue.put(fieldval.Form_Field__c,fList);
                }
            }
            Map<Id,List<FieldWrapper>> formPageMap = new Map<Id,List<FieldWrapper>>();    
            for(Form_Field__c formField : fieldListId){
                if(formPageMap.containsKey(formField.Page__c)){
                    if(formPageMap.get(formField.Page__c) != null){
                        List<FieldWrapper> fList = formPageMap.get(formField.Page__c);
                        FieldWrapper fieldwrapper = new FieldWrapper();
                        fieldwrapper.FieldObj = formField;
                        fieldwrapper.FieldAttObj = fieldAttribute.get(formField.Id);
                        fieldwrapper.FieldValueObj = fieldValue.get(formField.Id);
                        fList.add(fieldwrapper);
                        formPageMap.put(formField.Page__c,fList);
                    }
                }else{
                    List<FieldWrapper> fList = new List<FieldWrapper>();
                    FieldWrapper fieldwrapper = new FieldWrapper();
                    fieldwrapper.FieldObj = formField;
                    fieldwrapper.FieldAttObj = fieldAttribute.get(formField.Id);
                    fieldwrapper.FieldValueObj = fieldValue.get(formField.Id);
                    fList.add(fieldwrapper);
                    formPageMap.put(formField.Page__c,fList);
                }
            }
            Page__c[] pageList = [SELECT Id,form__c ,Name,Title__c,Sub_Title__c FROM Page__c WHERE Form__c =: formId ORDER BY CreatedDate];
            for(Page__c p : pageList){
                PageWrapper page = new PageWrapper();
                page.PageObj = p;
                page.FieldWrapperList = formPageMap.get(p.Id);
                formpage.add(page);
            }      
            FormWrapper form = new FormWrapper();
            form.formName = formName;
            form.PageWrapperList = formpage;

            return form;        
        } catch (Exception e) {
                System.debug(e);
                return null;
        }
    }

    public class FormWrapper{
        @AuraEnabled public Form__c formName {get; set;} 
        @AuraEnabled public List<PageWrapper> PageWrapperList {get;set;}
    }
    public class PageWrapper{
        @AuraEnabled public Page__c PageObj {get;set;}
        @AuraEnabled public List<FieldWrapper> FieldWrapperList {get;set;}
    }
    public class FieldWrapper{
        @AuraEnabled public Form_Field__c FieldObj {get;set;}
        @AuraEnabled public FieldAttribute__c FieldAttObj {get;set;}  
        @AuraEnabled public List<Field_Value__c> FieldValueObj {get;set;}
    }
}