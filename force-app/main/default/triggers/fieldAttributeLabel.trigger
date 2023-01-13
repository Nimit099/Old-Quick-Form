trigger fieldAttributeLabel on FieldAttribute__c (after insert) {
    Map<String ,String> labelMAp = new Map<String,String>();
    for(BaseField__mdt base : [SELECT Label,DataRecord__c from BaseField__mdt]){
        labelMAp.put(base.DataRecord__c,base.Label);
    }
    Set<Id> Ids = new Set<Id>();
    for (FieldAttribute__c e : Trigger.new) 
    {
        Ids.add(e.Id);
    }
    system.debug(Ids);
    if(Trigger.isInsert){
        List<FieldAttribute__c> l1 = new List<FieldAttribute__c>([SELECT Id , Label__c, Form_Field__r.Data_Record_Id__c FROM FieldAttribute__c WHERE Id IN : Ids ]); 
        for(FieldAttribute__c fatt : l1){     
            fatt.Label__c = labelMAp.get(fatt.Form_Field__r.Data_Record_Id__c);          
        }       
        update l1; 
    }
}