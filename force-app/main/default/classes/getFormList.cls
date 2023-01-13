public with sharing class getFormList {
    
    @AuraEnabled 
    public static List<formListWrapper> getForm(){     
        try{
            List<formListWrapper> lstformListWrapper = new List<formListWrapper>();
            Form__c[] formList = [SELECT Id,Name,Title__c,Description__c,Active__c,CreatedDate FROM Form__c ORDER BY Title__c ASC];
            for(Form__c formData : formList){
                Integer submissionCount = [SELECT COUNT() FROM Form_Submission__c WHERE Form__c =: formData.Id];
                lstformListWrapper.add(new formListWrapper(false, formData, submissionCount));
            } 
            return lstformListWrapper; 
        }catch(Exception e){
            System.debug(e);
            return null;
        }
    }

    @AuraEnabled 
    public static List<formListWrapper> getFormInFolder(String folderId ){  
        try{
            List<formListWrapper> lstformListWrapper = new List<formListWrapper>();
            Form__c[] formData = [SELECT Id,Name,Title__c,Description__c,Active__c,CreatedDate FROM Form__c WHERE FolderId__c =: folderId ORDER BY Title__c ASC];
            for(Form__c acc : formData){
                Integer submissionCount = [SELECT COUNT() FROM Form_Submission__c WHERE Form__c =: acc.Id];
                lstformListWrapper.add(new formListWrapper(false, acc, submissionCount));
            } 
            return lstformListWrapper; 
        }catch(Exception e){
            System.debug(e);
            return null;
        }
    }

    @AuraEnabled 
    public static List<Folder__c> getFolder(){     
        List<Folder__c> folderList = [SELECT id, Name, Description__c, FolderId__c FROM Folder__c ORDER BY CreatedDate ASC];
        return folderList; 
    }

    @AuraEnabled 
    public static List<Form__c> moveFormRecord( String selectedRecords, String parentFolderNameForFormMove) {
        try{
            Folder__c FolderList = [SELECT id,Name, FolderId__c FROM Folder__c WHERE Name =: parentFolderNameForFormMove];
            if(FolderList != null){
                Form__c formList = [SELECT id,Title__c, FolderId__c FROM Form__c WHERE Id =:selectedRecords];
                formList.FolderId__c = FolderList.Id;
                if(formList != null){
                    update formList;
                }
            }
        }catch(Exception e){
            System.debug(e);
        }
        return [SELECT Id,Name,Title__c,Description__c,Active__c,CreatedDate FROM Form__c ORDER BY Name Desc];
    }

    @AuraEnabled
    public static List<Form__c> deleteForm(String formId){  // Created By Nitin
        try {
            List<Sobject> listobj = new List<Sobject>();

            List<Form__c> formToDelete = [SELECT id,Title__c FROM Form__c WHERE id =: formId];
            Page__c[] pagelst = [SELECT Id,Form__c FROM Page__c WHERE Form__c =: formId];
            Form_Field__c[] fieldlst = [SELECT Id ,Name, Page__c FROM Form_Field__c WHERE Page__c IN: pagelst];
            FieldAttribute__c[] formAttribute = [SELECT Id,Form_Field__c FROM FieldAttribute__c WHERE Form_Field__c IN: fieldlst];
            Field_Value__c[] fieldValue = [SELECT ID,Form_Field__c FROM Field_Value__c WHERE Form_Field__c IN: fieldlst];
            
            listobj.addAll(fieldValue);
            listobj.addAll(formAttribute);
            listobj.addAll(fieldlst);
            listobj.addAll(pagelst);
            listobj.addAll(formToDelete);
    
            if(listobj.size()>0){
                delete listobj;
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return [SELECT Id,Name,Title__c,Description__c,Active__c,CreatedDate FROM Form__c ORDER BY Name Desc]; 
    }

    @AuraEnabled
    public static List<Form__c> renameFormRecord(String newFormName, String formId){  // Created By Nitin
        try {
            List<Form__c> formToRename = [SELECT id,Title__c FROM Form__c WHERE id =: FormId];
            for (Form__c reForm : formToRename) {
                reform.Title__c = newFormName;
            }
            if(formToRename.size()>0){
                update formToRename;
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return [SELECT Id,Name,Title__c,Description__c,Active__c,CreatedDate FROM Form__c ORDER BY Name Desc]; 
    }

    @AuraEnabled
    public static String activeDeactiveFormRecord(String formId) {
        try{
            Boolean formStatus;
            String forToast;

            List<Form__c> FormList = [SELECT id,Name, Active__c FROM Form__c WHERE id =: formId];
            if(FormList.size() == 0){
                return 'error';
            }else{
                Form__c formToActiveDeactive = [SELECT id,Name, Active__c FROM Form__c WHERE id =: formId];
                formStatus = formToActiveDeactive.Active__c;
                if (formStatus == True) {
                    formToActiveDeactive.Active__c = False;
                    forToast = 'Deactive';
                }
                else {
                    formToActiveDeactive.Active__c = True;
                    forToast = 'Active';
                }
                if(formToActiveDeactive != null){
                    update formToActiveDeactive;
                } 
                return forToast;
            }
        }catch(Exception e){
            System.debug(e);
            return 'error';
        }
    }

    @AuraEnabled
    public static String createFormrecord(Form__c formId, String parentFolderNameForForm) {
        try{
            System.debug('formId>>'+formId);
            String FName = formId.Title__c;
            List<Form__c> FormList = [SELECT id,Name FROM Form__c WHERE Title__c =: FName];
            if(FormList.size() > 0){
                return 'error';
            }else{
                Folder__c prntFolderForm = [SELECT id,Name FROM Folder__c WHERE Name =: parentFolderNameForForm];
                formId.FolderId__c = prntFolderForm.id;
                formId.Active__c = true;
                if(formId != null){
                    insert formId;
                    Page__c newPage = new Page__c(Title__c = 'New Page', Form__c = formId.Id);
                    insert newPage;
                }
                return formId.Id;
            }
        }catch(Exception e){
            System.debug(e);
            return 'error';
        }
    }

    @AuraEnabled
    public static String createFolderRecord(Folder__c folder, String parentFolderName) { // Created By Nitin
        try{
            Folder__c prntFolder = [SELECT id,Name FROM Folder__c WHERE Name =: parentFolderName];
            List<Folder__c> sameFolderList = [SELECT id,Name FROM Folder__c WHERE FolderId__c =: prntFolder.Id AND Name =: folder.Name];
            if(sameFolderList.size() > 0){
                return 'error';
            }else{
                folder.FolderId__c = prntFolder.id;
                if(folder != null){
                    insert folder;
                }   
                return folder.Id;
            }
        }catch(Exception e){
            System.debug(e);
            return 'error';
        }
    }


    @AuraEnabled
    public static String deleteFolderRecord(String divFolderId) { // Created By Nitin
        try{
            List<Folder__c> FolderList = [SELECT id,Name FROM Folder__c WHERE id =: divFolderId];
            if(FolderList.size() == 0){
                return 'error';
            }else{
                List<Sobject> listobj = new List<Sobject>();

                // for get folder list
                List<Id> folderIds = new list<Id>();
                List<HierarchyData> returnValue = new List<HierarchyData>();
                string queryString = 'select id, Name, FolderId__c from Folder__c';
                List<String> currentParent      = new List<String>{};
                Integer level               = 0;
                Boolean endOfStructure      = false;

                Folder__c fldr = [SELECT Id, Name, FolderId__c FROM Folder__c WHERE FolderId__c = '' LIMIT 1];
                string recId = divFolderId;
                currentParent.add(recId);
                string finalQueryString = '';
                List<sObject> queryOutput = new List<sObject>();
                while ( !endOfStructure ){  
                    if( level == 0 ){
                        finalQueryString = queryString + ' where id IN : CurrentParent ORDER BY FolderId__c';
                    } 
                    else {
                        finalQueryString = queryString + ' where FolderId__c IN : CurrentParent ORDER BY FolderId__c';
                    }
                    if(finalQueryString != null && finalQueryString !=''){
                        try{
                            if(Limits.getLimitQueries()-Limits.getQueries()>0){
                                queryOutput = database.query(finalQueryString);
                            }else{
                                endOfStructure = true;
                            }
                        }catch(exception ex){ 
                            endOfStructure = true;
                        }
                    }
                    System.debug('finalQueryString>>>'+finalQueryString);
                    if( queryOutput.size() == 0 ){
                        endOfStructure = true;
                    }
                    else{
                        currentParent.clear();
                        for ( Integer i = 0 ; i < queryOutput.size(); i++ ){
                            sobject sObjectData= queryOutput[i];
                            currentParent.add(string.valueof(sObjectData.get('id')) );
                            folderIds.add(sObjectData.Id);
                        }
                    }
                    level++;
                }

                Folder__c[] deletingFolder = [SELECT id, Name, FolderId__c FROM Folder__c WHERE id =: divFolderId OR FolderId__c IN:folderIds];
                Form__c[] formList = [SELECT id,Title__c FROM Form__c WHERE FolderId__c IN: FolderList];
                Page__c[] pagelst = [SELECT Id,Form__c FROM Page__c WHERE Form__c IN: formList];
                Form_Field__c[] fieldlst = [SELECT Id ,Name, Page__c FROM Form_Field__c WHERE Page__c IN: pagelst];
                FieldAttribute__c[] formAttribute = [SELECT Id,Form_Field__c FROM FieldAttribute__c WHERE Form_Field__c IN: fieldlst];
                Field_Value__c[] fieldValue = [SELECT ID,Form_Field__c FROM Field_Value__c WHERE Form_Field__c IN: fieldlst];

                listobj.addAll(fieldValue);
                listobj.addAll(formAttribute);
                listobj.addAll(fieldlst);
                listobj.addAll(pagelst);
                listobj.addAll(formList);
                listobj.addAll(deletingFolder);
        
                if(listobj.size()>0){
                    delete listobj;
                }
                return null;
            }
        }catch(Exception e){
            System.debug(e);
            return 'error';
        }
    }

    @AuraEnabled
    public static String getFolderName(String divFolderId) { // Created By Nitin
        try{
            List<Folder__c> FolderList = [SELECT id,Name FROM Folder__c WHERE id =: divFolderId];
            if(FolderList.size() == 0){
                return 'error';
            }else{
                Folder__c folderToRename = [SELECT id,Name FROM Folder__c WHERE id =: divFolderId];
                return folderToRename.Name;
            }
        }catch(Exception e){
            System.debug(e);
            return 'error';
        }
    }

    @AuraEnabled
    public static String renameFolderRecord(String divFolderId, String newFolderName) { // Created By Nitin
        try{
            String renamedfolderId;
            Folder__c prntFolder = [SELECT id, Name, FolderId__c FROM Folder__c WHERE Id =: divFolderId];
            List<Folder__c> sameFolderList = [SELECT id,Name FROM Folder__c WHERE FolderId__c =: prntFolder.FolderId__c AND Name =: newFolderName];
            if(sameFolderList.size() > 0){
                return 'error';
            }else{
                List<Folder__c> folderToRename = [SELECT id,Name FROM Folder__c WHERE id =: divFolderId];
                for (Folder__c reFolder : folderToRename) {
                    reFolder.Name = newFolderName;
                    renamedfolderId = reFolder.Id;
                }
                if(folderToRename.size()>0){
                    update folderToRename;
                }
                return renamedfolderId;
            }
        }catch(Exception e){
            System.debug(e);
            return 'error';
        }
    }

    @AuraEnabled
    public static String moveFolderRecord(String divFolderId, String parentFolderNameForMove) { // Created By Nitin
        try{
            String newParentFolderId;
            
            // for get folder list
            List<Id> folderIds = new list<Id>();
            List<HierarchyData> returnValue = new List<HierarchyData>();
            string queryString = 'select id, Name, FolderId__c from Folder__c';
            List<String> currentParent      = new List<String>{};
            Integer level               = 0;
            Boolean endOfStructure      = false;

            Folder__c fldr = [SELECT Id, Name, FolderId__c FROM Folder__c WHERE FolderId__c = '' LIMIT 1];
            string recId = divFolderId;
            currentParent.add(recId);
            string finalQueryString = '';
            List<sObject> queryOutput = new List<sObject>();
            while ( !endOfStructure ){  
                if( level == 0 ){
                    finalQueryString = queryString + ' where id IN : CurrentParent ORDER BY FolderId__c';
                } 
                else {
                    finalQueryString = queryString + ' where FolderId__c IN : CurrentParent ORDER BY FolderId__c';
                }
                if(finalQueryString != null && finalQueryString !=''){
                    try{
                        if(Limits.getLimitQueries()-Limits.getQueries()>0){
                            queryOutput = database.query(finalQueryString);
                        }else{
                            endOfStructure = true;
                        }
                    }catch(exception ex){ 
                        endOfStructure = true;
                    }
                }
                if( queryOutput.size() == 0 ){
                    endOfStructure = true;
                }
                else{
                    currentParent.clear();
                    for ( Integer i = 0 ; i < queryOutput.size(); i++ ){
                        sobject sObjectData= queryOutput[i];
                        currentParent.add(string.valueof(sObjectData.get('id')) );
                        folderIds.add(sObjectData.Id);
                    }
                }
                level++;
            }

            Folder__c prntFolder = [SELECT id, Name, FolderId__c FROM Folder__c WHERE Id =: divFolderId];
            List<Folder__c> sameFolderList = [SELECT id,Name FROM Folder__c WHERE FolderId__c =: prntFolder.FolderId__c AND Name =: prntFolder.Name];
            System.debug(sameFolderList + 'samefolderlist');
            System.debug(sameFolderList.size());

            List<Folder__c> FolderList = [SELECT id,Name FROM Folder__c WHERE Name =: parentFolderNameForMove AND FolderId__c NOT IN:folderIds];
            System.debug(FolderList + 'FoLDERlist');

            if(FolderList.size() == 0){
                return 'error';
            } else if(sameFolderList.size() > 0){
                return 'sameName';
            }
            else{
                for (Folder__c newPrntFold : FolderList) {
                    newParentFolderId = newPrntFold.id;       
                }

                List<Folder__c> folderToMove = [SELECT id, Name, FolderId__c FROM Folder__c WHERE id =: divFolderId];
                for (Folder__c moveFolder : folderToMove) {
                    moveFolder.FolderId__c = newParentFolderId;
                }
                if(folderToMove.size()>0){
                    update folderToMove;
                }
                return newParentFolderId;
            }
        }catch(Exception e){
            System.debug(e);
            return 'error';
        }
    }

    @AuraEnabled
    public static List<HierarchyData> findHierarchyData(string recId, string sObjectName, string parentFieldAPIname, string labelFieldAPIName){
        try{
            List<HierarchyData> returnValue = new List<HierarchyData>();
            string queryString = 'select id, '+labelFieldAPIName+ ' ,' +parentFieldAPIname+ ' from '+sObjectName;
            //Section to get all child account details from ultimate parent starts-------------------------
            List<String> currentParent      = new List<String>{};
            Integer level               = 0;
            Boolean endOfStructure      = false;
            //method to find ultimate parent of account

            Folder__c fldr = [SELECT Id, Name, FolderId__c FROM Folder__c WHERE FolderId__c = '' LIMIT 1];
            recId = fldr.Id;
            currentParent.add(recId);
            //Loop though all children
            string finalQueryString = '';
            List<sObject> queryOutput = new List<sObject>();
            while ( !endOfStructure ){  
                if( level == 0 ){
                    finalQueryString = queryString + ' where id IN : CurrentParent ORDER BY '+parentFieldAPIname +'  Limit 1000';
                } 
                else {
                    finalQueryString = queryString + ' where FolderId__c IN : CurrentParent ORDER BY '+parentFieldAPIname+' Limit 1000';
                }
                if(finalQueryString != null && finalQueryString !=''){
                    try{
                        if(Limits.getLimitQueries()-Limits.getQueries()>0){
                            queryOutput = database.query(finalQueryString);
                        }else{
                            endOfStructure = true;
                        }
                    }catch(exception ex){ 
                        endOfStructure = true;
                    }
                }
                if( queryOutput.size() == 0 ){
                    endOfStructure = true;
                }
                else{
                    currentParent.clear();
                    //iterating through query output
                    for ( Integer i = 0 ; i < queryOutput.size(); i++ ){
                        sobject sObjectData= queryOutput[i];
                        currentParent.add(string.valueof(sObjectData.get('id')) );

                        HierarchyData hierarchyDataLst = new HierarchyData();
                        if(sObjectData.get('id') == recId || level == 0){
                            hierarchyDataLst.expanded = true;
                        }else{
                            hierarchyDataLst.expanded = false;
                        }
                        hierarchyDataLst.rec = sObjectData;
                        returnValue.add(hierarchyDataLst);
                    }
                }
                level++;
            }
            return returnValue;
        }catch(Exception e){
            System.debug(e);
            return null;
        }
    }

    // search folder for new form and new folder
    @AuraEnabled
    public static List<Folder__c> findFolder (String searchKey){
        try{
            String query =  'SELECT Id, Name FROM Folder__c WHERE Name LIKE \'%' + searchKey + '%\'';
            return Database.query( query );
        } catch (Exception e) {
            System.debug(e);
            return null;
        }
    }

    @AuraEnabled
    public static String getMainFolder(){
        Folder__c fldr = [SELECT Id, Name, FolderId__c FROM Folder__c WHERE FolderId__c = '' LIMIT 1];
        return fldr.Id;
    }

    public class HierarchyData{
        @AuraEnabled public sObject rec{get;set;}
        @AuraEnabled public boolean expanded{get;set;}
        public HierarchyData(){
            expanded = false;
        }
    }

    public class formListWrapper {
        @AuraEnabled public boolean isChecked {get;set;}
        @AuraEnabled public Form__c objForm {get;set;}
        @AuraEnabled public Integer submissionCount {get;set;}
        public formListWrapper(boolean isChecked, Form__c objForm, Integer submissionCount){
            this.isChecked = isChecked;
            this.objForm = objForm;
            this.submissionCount = submissionCount;
        }
    }

    @AuraEnabled
    public static String getUserName() {
      return userinfo.getName();
    }

}