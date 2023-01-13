trigger onPageDeleteTrigger on Page__c (before delete) {
    Set<Id> Ids = new Set<Id>();
    for (Page__c e : Trigger.old) 
    {
        Ids.add(e.Id);
    }
    List<Form_Field__c> formField = new List<Form_Field__c>([SELECT Id,Page__c FROM Form_Field__c WHERE Page__c IN: Ids]);
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
}