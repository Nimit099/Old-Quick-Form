public class qfFolderSideBarController {
    @AuraEnabled
    public static List<Folder__c> getFolders(){
        try {
            List<Folder__c> fldrList = [SELECT Id,Name, Active__c FROM Folder__c ORDER BY CreatedDate DESC];
            System.debug('fldrList==='+fldrList);
            return fldrList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    

    @AuraEnabled
    public static Folder__c createFolder(String folderName){
        try {
            Folder__c folderObj = new Folder__c();
            folderObj.Name = folderName;
            System.debug('folderObj==='+folderObj);
            insert folderObj;
            return folderObj;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}