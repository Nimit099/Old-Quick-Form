// **************************************************************
// Class Name       : QFHomeComponentController
// Author           : Nitin
// Created Date     : 27/06/2022
// Description      : This Class Used In QFHomeComponent and it used in Homepage of QuickForm
// TestClass        :
// Code Coverage    :
// **************************************************************

public with sharing class QFHomeComponentController {
    
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
            GenericException Exp = ExceptionHandler.logException(e, 'QFHomeComponentController', 'getForm');
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
            GenericException Exp = ExceptionHandler.logException(e, 'QFHomeComponentController', 'getFormInFolder');
            return null;
        }
    }

    @AuraEnabled 
    public static List<Folder__c> getFolder(){
        try {
            List<Folder__c> folderList = [SELECT id, Name, Description__c, FolderId__c FROM Folder__c ORDER BY CreatedDate ASC];
            return folderList;
        } catch (Exception e) {
            GenericException Exp = ExceptionHandler.logException(e, 'QFHomeComponentController', 'getFolder');
            return null;
        }
    }

    @AuraEnabled 
    public static List<Form__c> moveFormRecord( String selectedRecords, String parentFolderNameForFormMove, String parentFolderIdForMove) {
        try{
            Folder__c FolderList;

            if (parentFolderIdForMove == null || parentFolderIdForMove == '') {
                FolderList = [SELECT id,Name, FolderId__c FROM Folder__c WHERE Name =: parentFolderNameForFormMove AND FolderId__c = null];
            }else {
                FolderList = [SELECT id,Name, FolderId__c FROM Folder__c WHERE Id =: parentFolderIdForMove];
            }
            
            if(FolderList != null){
                Form__c formList = [SELECT id,Title__c, FolderId__c FROM Form__c WHERE Id =:selectedRecords];
                formList.FolderId__c = FolderList.Id;
                if(formList != null){
                    update formList;
                }
            }
            return [SELECT Id,Name,Title__c,Description__c,Active__c,CreatedDate FROM Form__c ORDER BY Name Desc];
        } 
        catch(Exception e){
            System.debug(e);
            GenericException Exp = ExceptionHandler.logException(e, 'QFHomeComponentController', 'moveFormRecord');
            return null;
        }
        
    }

    @AuraEnabled
    public static String deleteForm(String formId){
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
            return 'success';
        } catch (Exception e) {
            System.debug(e);
            GenericException Exp = ExceptionHandler.logException(e, 'QFHomeComponentController', 'deleteForm');
            return null;
        } 
    }

    @AuraEnabled
    public static String renameFormRecord(String newFormName, String formId){
        String messageForToast;
        try {
            List<Form__c> FormList = [SELECT id,Name FROM Form__c WHERE Title__c =: newFormName];
            if(FormList.size() > 0){
                messageForToast = 'duplicateRecord';
            }else {
                List<Form__c> formToRename = [SELECT id,Title__c FROM Form__c WHERE id =: FormId];
                for (Form__c reForm : formToRename) {
                    reform.Title__c = newFormName;
                }
                if(formToRename.size()>0){
                    update formToRename;
                }
                messageForToast = 'success';
            }
        } catch (Exception e) {
            messageForToast = null;
            GenericException Exp = ExceptionHandler.logException(e, 'QFHomeComponentController', 'renameFormRecord');
        }
        return messageForToast;
    }


    @AuraEnabled
    public static String activeDeactiveFormRecord(String formId) {
        try{
            Boolean formStatus;
            String forToast;

            List<Form__c> FormList = [SELECT id,Name, Active__c FROM Form__c WHERE id =: formId];
            if(FormList.size() == 0){
                return 'noForm';
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
            GenericException Exp = ExceptionHandler.logException(e, 'QFHomeComponentController', 'activeDeactiveFormRecord');
            return null;
        }
    }

    @AuraEnabled
    public static String createFormrecord(Form__c formId, String parentFolderNameForForm, String parentFolderIdForMove) {
        try{
            Folder__c prntFolderForm;

            System.debug('formId>>'+formId);
            String FName = formId.Title__c;
            List<Form__c> FormList = [SELECT id,Name FROM Form__c WHERE Title__c =: FName];
            if(FormList.size() > 0){
                return 'duplicate';
            }else{
                if (parentFolderIdForMove == null || parentFolderIdForMove == '') {
                    prntFolderForm = [SELECT id,Name FROM Folder__c WHERE Name =: parentFolderNameForForm AND FolderId__c = null];
                }else {
                    prntFolderForm = [SELECT id,Name FROM Folder__c WHERE Id =: parentFolderIdForMove];
                }
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
            GenericException Exp = ExceptionHandler.logException(e, 'QFHomeComponentController', 'createFormrecord');
            return null;
        }
    }

    @AuraEnabled
    public static String createFolderRecord(Folder__c folder, String parentFolderName, String parentFolderIdForMove) {
        try{
            Folder__c prntFolder;

            if (parentFolderIdForMove == null || parentFolderIdForMove == '') {
                prntFolder = [SELECT id,Name FROM Folder__c WHERE Name =: parentFolderName AND FolderId__c = null];
            } else {
                prntFolder = [SELECT id,Name FROM Folder__c WHERE Id =: parentFolderIdForMove];
            }
            
            List<Folder__c> sameFolderList = [SELECT id,Name FROM Folder__c WHERE Name =: folder.Name];
            if(sameFolderList.size() > 0){
                return 'duplicate';
            }else{
                folder.FolderId__c = prntFolder.id;
                if(folder != null){
                    insert folder;
                }   
                return folder.Id;
            }
        }catch(Exception e){
            System.debug(e);
            GenericException Exp = ExceptionHandler.logException(e, 'QFHomeComponentController', 'createFolderRecord');
            return null;
        }
    }


    @AuraEnabled
    public static String deleteFolderRecord(String divFolderId) {
        try{
            List<Folder__c> FolderList = [SELECT id,Name FROM Folder__c WHERE id =: divFolderId];
            if(FolderList.size() == 0){
                return 'notFound';
            }else{
                List<Sobject> listobj = new List<Sobject>();

                // for get folder list
                List<Id> folderIds = new list<Id>();
                // List<HierarchyData> returnValue = new List<HierarchyData>();
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
                return 'success';
            }
        }catch(Exception e){
            System.debug(e);
            GenericException Exp = ExceptionHandler.logException(e, 'QFHomeComponentController', 'deleteFolderRecord');
            return null;
        }
    }

    @AuraEnabled
    public static String getFolderName(String divFolderId) {
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
            GenericException Exp = ExceptionHandler.logException(e, 'QFHomeComponentController', 'getFolderName');
            return null;
        }
    }

    @AuraEnabled
    public static String renameFolderRecord(String divFolderId, String newFolderName) {
        String messageForToast;
        try{
            List<Folder__c> sameFolderList = [SELECT id,Name FROM Folder__c WHERE Name =: newFolderName];
            if(sameFolderList.size() > 0){
                messageForToast = 'duplicateRecord';
            }else {
                Folder__c folderToRename = [SELECT id,Name FROM Folder__c WHERE id =: divFolderId];
                if (folderToRename != null) {
                    folderToRename.Name = newFolderName;
                    update folderToRename;
                    messageForToast = 'success';
                }
            }
        }catch(Exception e){
            System.debug(e);
            messageForToast = null;
            GenericException Exp = ExceptionHandler.logException(e, 'QFHomeComponentController', 'renameFolderRecord');
        }
        return messageForToast;
    }


    @AuraEnabled
    public static String moveFolderRecord(String divFolderId, String parentFolderIdForMove, String parentFolderNameForMove) {
        try{
            String newParentFolderId;

            // for get folder list
            List<Id> folderIds = new list<Id>();
            // List<HierarchyData> returnValue = new List<HierarchyData>();
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

            Folder__c selectedFolder = [SELECT id, Name, FolderId__c FROM Folder__c WHERE Id =: divFolderId];

            Folder__c prntFolder;
            if (parentFolderIdForMove == null || parentFolderIdForMove == '') {
                prntFolder = [SELECT id, Name, FolderId__c FROM Folder__c WHERE Name =: parentFolderNameForMove AND FolderId__c = null];
            }else {
                prntFolder = [SELECT id, Name, FolderId__c FROM Folder__c WHERE Id =: parentFolderIdForMove];
            }
                
            System.debug(prntFolder + 'prntFolder');

            List<Folder__c> sameFolderList = [SELECT id,Name FROM Folder__c WHERE FolderId__c =: prntFolder.Id AND Name =: selectedFolder.Name];
            System.debug(sameFolderList + 'samefolderlist');
            System.debug(sameFolderList.size());

            List<Folder__c> FolderList = [SELECT id,Name FROM Folder__c WHERE Id =: prntFolder.Id AND FolderId__c NOT IN:folderIds];
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
                Folder__c folderToMove = [SELECT id, Name, FolderId__c FROM Folder__c WHERE id =: divFolderId];
                folderToMove.FolderId__c = newParentFolderId;
                update folderToMove;
                return newParentFolderId;
            }
        }catch(Exception e){
            System.debug(e);
            GenericException Exp = ExceptionHandler.logException(e, 'QFHomeComponentController', 'moveFolderRecord');
            return null;
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
            GenericException Exp = ExceptionHandler.logException(e, 'QFHomeComponentController', 'findHierarchyData');
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
            GenericException Exp = ExceptionHandler.logException(e, 'QFHomeComponentController', 'findFolder');
            return null;
        }
    }

    @AuraEnabled
    public static String getMainFolder(){
        try {
            Folder__c fldr = [SELECT Id, Name, FolderId__c FROM Folder__c WHERE FolderId__c = '' LIMIT 1];
            return fldr.Id;
        } catch (Exception e) {
            System.debug(e);
            GenericException Exp = ExceptionHandler.logException(e, 'QFHomeComponentController', 'getMainFolder');
            return null;
        }
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
        try {
            return userinfo.getName();
        } catch (Exception e) {
            System.debug(e);
            GenericException Exp = ExceptionHandler.logException(e, 'QFHomeComponentController', 'getUserName');
            return null;
        }
    }
}