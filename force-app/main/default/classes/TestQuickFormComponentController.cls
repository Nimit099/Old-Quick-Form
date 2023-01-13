public with sharing class TestQuickFormComponentController {
    
    @AuraEnabled
    public static formWrapper fetchQuickFormField(String formId){

        List<Form_Field__c> fieldListId = new List<Form_Field__c>([SELECT Id ,Form__c,Page__c,Data_Record_Id__c,Page__r.Form__c FROM Form_Field__c Where Form__c =: formId AND Data_Record_Id__c != NULL]);
        List<id> idField = new List<id>();
        for(Form_Field__c p : fieldListId){
            idField.add(p.Id);
        }

        List<BaseField__mdt> basefield = [ SELECT sequence__c,Label,DataRecord__c FROM BaseField__mdt ORDER BY sequence__c];        
        Form__c formName = [SELECT id ,Title__c FROM Form__c WHERE id =: formId LIMIT 1];        
        List<PageWrapper> formpage = new List<PageWrapper>();        
        
        Map<Id,FieldAttribute__c> fieldAttribute = new Map<Id,FieldAttribute__c>();
        for(FieldAttribute__c fieldatt : [SELECT Id ,Label__c,Visibility__c,Instruction__c,Show_on_click__c,Required_Field__c,Field_Validation__c,Min_no_of_character__c,
                                    Min_no_of_words__c,Total_value__c,Limit_value__c,Show_Decimal__c,Placeholder__c,Placeholder_text__c,
                                    Input_height_in_rows__c,Hide_Field__c,Read_Only__c,Add_Prefix_Inside_The_Field__c,Prefix__c,Max_no_of_character__c,Max_no_of_words__c,
                                    Date_Format__c,Form_Field__c FROM FieldAttribute__c WHERE Form_Field__c IN: idField]){            
            fieldAttribute.put(fieldatt.Form_Field__c,fieldatt);         
        }

        Map<Id,List<Field_Value__c>> fieldValue = new Map<Id,List<Field_Value__c>>();
        for(Field_Value__c fieldval : [SELECT Id , Name , Form_Field__c FROM Field_Value__c WHERE Form_Field__c IN: idField]){
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
        for(Form_Field__c formField : [SELECT Id ,Form__c,Page__c,Data_Record_Id__c,Page__r.Form__c FROM Form_Field__c Where Form__c =: formId AND Data_Record_Id__c != NULL ORDER BY Sequence__c]){
            if(formPageMap.containsKey(formField.Page__c)){
                List<FieldWrapper> fList = formPageMap.get(formField.Page__c);
                FieldWrapper fieldwrapper = new FieldWrapper();
                fieldwrapper.FieldObj = formField;
                fieldwrapper.FieldAttObj = fieldAttribute.get(formField.Id);
                fieldwrapper.FieldValueObj = fieldValue.get(formField.Id);
                fList.add(fieldwrapper);
                formPageMap.put(formField.Page__c,fList);
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
        for(Page__c p : [SELECT Id,form__c ,Name,Title__c,Sub_Title__c FROM Page__c WHERE Form__c =: formId ORDER BY CreatedDate]){
            PageWrapper page = new PageWrapper();
            page.PageObj = p;
            page.FieldWrapperList = formPageMap.get(p.Id);
            formpage.add(page);
        }      
        formWrapper form = new formWrapper();
        form.formName = formName;
        form.basefield = basefield;
        form.PageWrapperList = formpage;
        return form;        
    }

    // @AuraEnabled
    // public static formWrapper addNewPage(String formId) {        
    //     Page__c pg = new Page__c();
    //     pg.Form__c = formId;
    //     insert pg;

    //     formWrapper Wrpcls = fetchQuickFormField(formId);
    //     return Wrpcls;
    // }
    @AuraEnabled
    public static formWrapper createPageRecord(Page__c pagedetail,String formId) {
        pagedetail.Form__c = formId;
        insert pagedetail;
        
        formWrapper Wrpcls = fetchQuickFormField(formId);
        return Wrpcls;
    }


    @AuraEnabled
    public static formWrapper addFieldRecord(String formId,String pageId, String fieldId) {
        Form_Field__c formfield = new Form_Field__c();
        formfield.Form__c = formId;
        formfield.Page__c = pageId;
        formfield.Data_Record_Id__c = fieldId;
        insert formfield;
        
        FieldAttribute__c fieldattribute = new FieldAttribute__c();
        fieldattribute.Form_Field__c = formfield.Id;
        insert fieldattribute;

        if (fieldId == 'QFCHECKBOX' || fieldId == 'QFRADIOBUTTON' || fieldId == 'QFDROPDOWN') {
            List<String> l1 = new List<String>{'Option1','Option2','Option3'};
            List<Field_Value__c> fieldvalue = new List<Field_Value__c>();
            
            for(Integer i=0;i<l1.size();i++){
                Field_Value__c ff = new Field_Value__c();
                ff.Form__c = formId;
                ff.Page__c = pageId;
                ff.Form_Field__c = formfield.Id;            
                ff.Name = l1[i];  
                fieldvalue.add(ff);
            }
            insert fieldvalue;
        }
        formWrapper Wrpcls = fetchQuickFormField(formId);
        return Wrpcls;
    }

    @AuraEnabled
    public static void SequenceSave(List<String> Listt){
        List<Form_Field__c> FormList = new List<Form_Field__c>();
        Set<Id> SetId = new Set<Id>();
        Map<Id,String> MapList = new Map<Id,String>();
        for(String s: Listt){
            List<String> RefStr = s.split(':::');
            SetId.add(RefStr[0]);
            MapList.put(RefStr[0],RefStr[1]+';;'+RefStr[2]);
        }
        FormList = [SELECT Id,Name,Sequence__c,Page__c FROM Form_Field__c WHERE Id=: SetId];
        for(Form_Field__c f: FormList){
            List<String> MapVal = MapList.get(String.valueOf(f.Id)).split(';;');
            f.sequence__c = Decimal.valueOf(MapVal[0]);
            f.Page__c = Id.valueOf(MapVal[1]);
        }
        update FormList;
    }

    @AuraEnabled
    public static String updateFormName(String formId,String formname){
        List<Form__c> flist = [SELECT Id,Title__c FROM Form__c where Title__c =:formName];
        if(flist.size() > 0){
            return 'error';
        }
        else{
            List<Form__c> listForm = [SELECT Id ,Title__c from Form__c where Id =: formId];
            for(Form__c form: listForm ){
                form.Title__c = formname;
            }
            update listForm;  
            return null;   
        }   
        
    }
    @AuraEnabled
    public static void updatePageTitle(String formId,String pageId,String pagetitle){
        List<Page__c> listpagetitle = [SELECT Id ,Form__c,Title__c from Page__c where Id =: pageId AND Form__c =:formId];
        for(Page__c Title: listpagetitle ){
            Title.Title__c = pagetitle;
        }
        update listpagetitle;        
    }
    @AuraEnabled
    public static void updatePageSubtitle(String formId,String pageId,String pagesubtitle){
        List<Page__c> listpagesubtitle = [SELECT Id ,Form__c,Sub_Title__c from Page__c where Form__c =: formId AND Id =:pageId];
        for(Page__c SubTitle: listpagesubtitle ){
            SubTitle.Sub_Title__c = pagesubtitle;
        }
        update listpagesubtitle;        
    }

    @AuraEnabled
    public static formWrapper DeletePage(String pageId,String formId) {        
        if(pageId != null){
         Page__c delrecord = [Select Id from Page__c where Id =: pageId];
         delete delrecord;
        }
        formWrapper Wrpcls = fetchQuickFormField(formId);
        return Wrpcls;
    }

    public class formWrapper{
        @AuraEnabled public Form__c formName {get; set;} 
        @AuraEnabled public List<PageWrapper> PageWrapperList {get;set;}
        @AuraEnabled public List<BaseField__mdt> basefield {get;set;}

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