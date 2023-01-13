trigger onFieldDeleteTrigger on Form_Field__c (before delete) {
    Set<Id> Ids = new Set<Id>();
    for (Form_Field__c e : Trigger.old) 
    {
        Ids.add(e.Id);
    }
    List<FieldAttribute__c> formAttribute = new List<FieldAttribute__c>([SELECT Id,Form_Field__c FROM FieldAttribute__c WHERE Form_Field__c IN: Ids]);

    List<Field_Value__c> fieldValue = new List<Field_Value__c>([SELECT ID,Form_Field__c FROM Field_Value__c WHERE Form_Field__c IN: Ids]);

    if(fieldValue.size()>0){
        delete fieldValue;
    } 

    if(formAttribute.size()>0){
        delete formAttribute;
    }
}