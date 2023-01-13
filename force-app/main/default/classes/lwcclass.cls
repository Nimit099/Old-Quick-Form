public with sharing class lwcclass {
    public lwcclass() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContact(){
        try {
            return[Select id, name, email from contact limit 10];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}