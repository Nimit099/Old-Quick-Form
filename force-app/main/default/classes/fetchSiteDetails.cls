public class fetchSiteDetails {

    @AuraEnabled
    public static String createFolderrecord(){
        try{
            List<Folder__c> folderlist=[SELECT id,Name FROM Folder__c LIMIT 1];
            if(folderlist.size() == 0){
                Folder__c folder=new Folder__c();
                folder.Name='Main Folder';
                insert folder;
                return 'Folder Created Successfully';
            }
            else{
                return 'Folder Already Created';
            }
        }
        catch(Exception e){
            System.debug(e);
            return null;
        }
    }
}