public with sharing class ObjectMappingController {

    @AuraEnabled
    public static WrapperClass fetchobjectField(String formId){  
        try{
            WrapperClass Wrpcls = new WrapperClass();             
            List<string> SObjectList = new List<string>();         //object list

            for(Schema.SObjectType sObj : schema.getGlobalDescribe().values()){
                if(sObj.getDescribe().isUpdateable() && sObj.getDescribe().isAccessible()){
                    sObjectList.add(sObj.getDescribe().getName()+','+sObj.getDescribe().getLabel());
                }
            }
            List<Form_Field__c> field = [SELECT Id,Name,Form__c,Label__c,API_Name__c,Data_Record_Id__c FROM Form_Field__c WHERE Form__c =: formId];
            List<FieldAttribute__c> fieldattribute = [SELECT Id,Label__c  FROM FieldAttribute__c WHERE Form_Field__c IN: field];
            List<Form__c> form = [SELECT Id ,Title__c from Form__c where Id =: formId];
            Wrpcls.SObjectList = SObjectList;
            Wrpcls.fieldattribute = fieldattribute;
            Wrpcls.form = form[0].Title__c;
            return Wrpcls;
        }
        catch(DmlException e){
            System.debug('The following exception has fetchobjectField occurred: ' + e.getMessage());
            return null;
        }
    }

    public class WrapperClass {
        @AuraEnabled public list<String> SObjectList {get;set;}
        @AuraEnabled public list<FieldAttribute__c> fieldattribute {get;set;}
        @AuraEnabled public String form {get;set;}
    }

    @AuraEnabled
    public static List<Listwrapper> getAllFields(String fld){                     // object all field get 
        try{
            List<Listwrapper> lstwrapper = new List<Listwrapper>();
            List<pairWrapper> lstfieldname = new List<pairWrapper>();          // selected object field
            List<pairWrapper> objreqfield = new List<pairWrapper>();          // object required field
            Map<String, Schema.SObjectField> fieldMap = Schema.getGlobalDescribe().get(fld).getDescribe().fields.getMap();

            List<String> myList = new List<String>();                      // non used object field list
            myList.add('CreatedById');
            myList.add('CreatedDate');
            myList.add('LastModifiedById');
            myList.add('LastModifiedDate');
            myList.add('IsDeleted');
            myList.add('OwnerId');
            myList.add('SystemModstamp');
            myList.add('Id');

            List<String> acc = new List<String>();       // account object non used field 
            acc.add('shippingaddress');
            acc.add('billingaddress');

            List<String> con = new List<String>();       // contact object non used field
            con.add('mailingaddress');
            con.add('otheraddress');

            sObjectType objType = ((sObject)(Type.forName('Schema.'+fld).newInstance())).getsObjectType();

            Schema.DescribeSObjectResult r = objType.getDescribe();
            Map<String,Schema.SObjectField> m = r.fields.getMap();

            for(String fieldName : m.keySet()){ 
                Schema.SObjectField field = m.get(fieldName);
                Schema.DisplayType fielddataType = fieldMap.get(fieldName).getDescribe().getType();
                Schema.DescribeFieldResult f = field.getDescribe();

                Boolean ans = mylist.contains(f.getLabel());

                if(myList.contains(f.getName()) == false){

                    if((fld != 'Account' && acc.contains(fieldName) == false)){

                        if(f.isCreateable() && !f.isNillable() && !f.isDefaultedOnCreate()){
                            pairWrapper reqfield = new pairWrapper();
                            reqfield.label            = f.getLabel();
                            reqfield.apiName          = f.getName();
                            reqfield.type             =  String.valueOf(fielddataType);
                            objreqfield.add(reqfield);
                        }
                        else if(f.isCreateable()){
                            pairWrapper allfield = new pairWrapper();
                            allfield.label            = f.getLabel();
                            allfield.apiName          = f.getName();
                            allfield.type             =  String.valueOf(fielddataType);
                            lstfieldname.add(allfield);
                        }
                    }
                    else if(fld != 'Contact' && con.contains(fieldName) == false){

                        if(f.isCreateable() && !f.isNillable() && !f.isDefaultedOnCreate()){
                            pairWrapper reqfield = new pairWrapper();
                            reqfield.label            = f.getLabel();
                            reqfield.apiName          = f.getName();
                            reqfield.type             =  String.valueOf(fielddataType);
                            objreqfield.add(reqfield);
                        }
                        else if(f.isCreateable()){
                            pairWrapper allfield = new pairWrapper();
                            allfield.label            = f.getLabel();
                            allfield.apiName          = f.getName();
                            allfield.type             =  String.valueOf(fielddataType);
                            lstfieldname.add(allfield);
                        }
                    }
                }
            }

            Listwrapper listwrapper = new Listwrapper();
            listwrapper.lstfieldname = lstfieldname;
            listwrapper.objreqfield = objreqfield;
            lstwrapper.add(listwrapper);

            return lstwrapper;
        }
        catch(DmlException e){
            System.debug('The following exception has getAllFields occurred: ' + e.getMessage());
            return null;
        }
    }

    public class pairWrapper{
        @AuraEnabled public String label{get; set;}
        @AuraEnabled public String apiName{get; set;}
        @AuraEnabled public string type{get; set;}
    }
    
    public class Listwrapper{
        @AuraEnabled public List<pairWrapper> lstfieldname{get; set;}
        @AuraEnabled public List<pairWrapper> objreqfield{get; set;}
    }

    @AuraEnabled
    public static formWrapper fetchQuickFormField(String formId){
        try{
            List<string> SObjectList = new List<string>();      // object list

            for(Schema.SObjectType sObj : schema.getGlobalDescribe().values()){
                if(sObj.getDescribe().isUpdateable() && sObj.getDescribe().isAccessible()){
                    sObjectList.add(sObj.getDescribe().getName()+','+sObj.getDescribe().getLabel());
                }
            }
    
            List<Form_Field__c> fieldListId = new List<Form_Field__c>([SELECT Id ,Form__c,Page__c,Data_Record_Id__c,Page__r.Form__c,API_Name__c,Label__C FROM Form_Field__c Where Form__c =: formId AND Data_Record_Id__c != NULL]);
            List<id> idField = new List<id>();     // form field id list

            for(Form_Field__c p : fieldListId){
                idField.add(p.Id);
            }
           
            Form__c formName = [SELECT id ,Title__c,Object_Mapping__c  FROM Form__c WHERE id =: formId];        
    
            List<PageWrapper> formpage_lst = new List<PageWrapper>();        
            
            Map<Id,FieldAttribute__c> fieldAttribute = new Map<Id,FieldAttribute__c>();
    
            for(FieldAttribute__c fieldatt : [SELECT Id ,Label__c,Form_Field__c FROM FieldAttribute__c WHERE Form_Field__c IN: idField]){            
                fieldAttribute.put(fieldatt.Form_Field__c,fieldatt);         
            }
    
            Map<Id,List<FieldWrapper>> formPageMap = new Map<Id,List<FieldWrapper>>();
    
            for(Form_Field__c formField : [SELECT Id ,Form__c,Page__c,Data_Record_Id__c,Page__r.Form__c,API_Name__c,Label__c FROM Form_Field__c Where Form__c =: formId AND Data_Record_Id__c != NULL ORDER BY Sequence__c]){
                
                if(formPageMap.containsKey(formField.Page__c)){
                    List<FieldWrapper> fList = formPageMap.get(formField.Page__c);
                    FieldWrapper fieldwrapper = new FieldWrapper();
                    fieldwrapper.FieldObj = formField;
                    fieldwrapper.FieldAttObj = fieldAttribute.get(formField.Id);
                    fList.add(fieldwrapper);
                    formPageMap.put(formField.Page__c,fList);
                }else{
                    List<FieldWrapper> fList = new List<FieldWrapper>();
                    FieldWrapper fieldwrapper = new FieldWrapper();
                    fieldwrapper.FieldObj = formField;
                    fieldwrapper.FieldAttObj = fieldAttribute.get(formField.Id);
                    fList.add(fieldwrapper);
                    formPageMap.put(formField.Page__c,fList);
                }
            }
    
            List<Page__c> page_lst = [SELECT Id,form__c ,Name,Title__c,Sub_Title__c FROM Page__c WHERE Form__c =: formId ORDER BY CreatedDate];
    
            for(Page__c p : page_lst){
                PageWrapper page = new PageWrapper();
                page.PageObj = p;
                page.FieldWrapperList = formPageMap.get(p.Id);
                formpage_lst.add(page);
            }      
    
            formWrapper form = new formWrapper();
            form.formName = formName;
            form.PageWrapperList = formpage_lst;
            form.SObjectList = SObjectList;
    
            return form; 
        }
        catch(DmlException e){
            System.debug('The following exception has fetchQuickFormField occurred: ' + e.getMessage());
            return null;
        }
    }

    public class formWrapper{
        @AuraEnabled public Form__c formName {get; set;} 
        @AuraEnabled public List<PageWrapper> PageWrapperList {get;set;}
        @AuraEnabled public List<String> SObjectList{get;set;}
    }

    public class PageWrapper{
        @AuraEnabled public Page__c PageObj {get;set;}
        @AuraEnabled public List<FieldWrapper> FieldWrapperList {get;set;}
    }

    public class FieldWrapper{
        @AuraEnabled public Form_Field__c FieldObj {get;set;}
        @AuraEnabled public FieldAttribute__c FieldAttObj {get;set;} 
    }

    @AuraEnabled
    public static void saveList(string maplist, string formid){        // object mapping save JSON string in form field
        try{
            Form__c quickForm = [SELECT Id ,Title__c , Object_Mapping__c FROM Form__c WHERE Id =: formid LIMIT 1];
                quickForm.Object_Mapping__c = maplist;
            update quickForm;
        }
        catch(DmlException e){
            System.debug('The following exception has saveList occurred: ' + e.getMessage());
        }
    }

    @AuraEnabled
    public static string editform(String formId){
        try {
            System.debug(formId);
            Form__c formName = [SELECT id ,Title__c,Object_Mapping__c  FROM Form__c WHERE id =: formId];  
            return formName.Object_Mapping__c;
        } 
        catch (Exception e) {
            System.debug('The following exception has editform occurred: ' + e.getMessage());
            return null;
        }
    }
}