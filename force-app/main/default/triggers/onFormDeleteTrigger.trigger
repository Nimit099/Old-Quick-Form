trigger onFormDeleteTrigger on Form__c (before delete) {
    Set<Id> Ids = new Set<Id>();
    for (Form__c e : Trigger.old) 
    {
        Ids.add(e.Id);
    }
    //System.debug(Ids);
    List<Page__c> page = new List<Page__c>([SELECT Id,Form__c FROM Page__c WHERE Form__c IN: Ids]);
    //System.debug(page);    
    List<id> idpage = new List<id>();
    for(Page__c p : page){
        idpage.add(p.Id);
    }      

    List<Form_Field__c> formField = new List<Form_Field__c>([SELECT Id,Page__c FROM Form_Field__c WHERE Page__c IN: idpage]);
    //System.debug(formField);
    List<id> idfield = new List<id>();
    for(Form_Field__c p : formField){
        idfield.add(p.Id);
    }    

    List<FieldAttribute__c> formAttribute = new List<FieldAttribute__c>([SELECT Id,Form_Field__c FROM FieldAttribute__c WHERE Form_Field__c IN: idfield]); 

    List<Field_Value__c> fieldValue = new List<Field_Value__c>([SELECT ID,Form_Field__c FROM Field_Value__c WHERE Form_Field__c IN: idfield]);

    if(fieldValue.size()>0){
        delete fieldValue;
    } 
    if(formAttribute.size()>0){
        delete formAttribute;
    }      
    if(formField.size()>0){
        delete formField;
    }
    if(page.size()>0){
        delete page;
    }
}