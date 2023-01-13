public with sharing class HomeTestNitinController {
    
    @AuraEnabled 
    public static List<formListWrapper> getForm(){     
        List<formListWrapper> lstformListWrapper = new List<formListWrapper>();
        for(Form__c acc : [Select Id,Name,Title__c,Description__c,Active__c,CreatedDate From Form__c ORDER BY Name Desc]){
            lstformListWrapper.add(new formListWrapper(false,acc));
        } 
        return lstformListWrapper; 
    }

    @AuraEnabled 
    public static List<formListWrapper> getFormInFolder(String folderId ){  
        
        System.debug('getformin Folder called ---->');
        System.debug('folderId---->'+folderId);
        List<formListWrapper> lstformListWrapper = new List<formListWrapper>();
        
        for(Form__c acc : [SELECT Id,Name,Title__c,Description__c,Active__c,CreatedDate FROM Form__c WHERE FolderId__c =: folderId]){
                                       lstformListWrapper.add(new formListWrapper(false,acc));
                                   } 
                System.debug('return list is ---->'+lstformListWrapper);

        return lstformListWrapper; 
    }

    // @AuraEnabled 
    // public static List<formListWrapper> getFormInFolder(String folderId ){  
        
    //     System.debug('getformin Folder called ---->');
    //     System.debug('folderId---->'+folderId);
    //     List<formListWrapper> lstformListWrapper = new List<formListWrapper>();
    //     for(Form__c acc : [SELECT Id,Name,Title__c,Description__c,Active__c,CreatedDate FROM Form__c WHERE FolderId__c =: folderId]){
    //                            lstformListWrapper.add(new formListWrapper(false,acc));
    //                        } 
    //     System.debug('return list is ---->'+lstformListWrapper);
    //     return lstformListWrapper; 
    // }

    @AuraEnabled 
    public static List<Folder__c> getFolder(){     
        
        List<Folder__c> folderList = [SELECT id, Name, Description__c, FolderId__c from Folder__c];
        return folderList; 
    }

    @AuraEnabled 
    public static List<Form__c> deleteSelectedRecord(List<Form__c> selectedRecords) {
        List<id> ids=new List<id>(); 
        for(Form__c f : selectedRecords){
            ids.add(f.id);
        }
        
        List<Form__c> formList = [Select id,Title__c from Form__c where Id =:ids];
        
        Page__c[] pagelst = [SELECT Id,Form__c FROM Page__c WHERE Form__c IN: formList];
        
        Form_Field__c[] fieldlst = [SELECT Id ,Name, Page__c FROM Form_Field__c WHERE Page__c IN: pagelst];
        
        FieldAttribute__c[] formAttribute = [SELECT Id,Form_Field__c FROM FieldAttribute__c WHERE Form_Field__c IN: fieldlst];
        
        Field_Value__c[] fieldValue = [SELECT ID,Form_Field__c FROM Field_Value__c WHERE Form_Field__c IN: fieldlst];
        
        
        
        
        if(pagelst.size()>0){
            delete pagelst;
        }
        
        if(fieldlst.size()>0){
            delete fieldlst;
        }
        if(fieldValue.size()>0){
            delete fieldValue;
        }
        if(formAttribute.size()>0){
            delete formAttribute;
        }
        
        delete formList;



        return [SELECT Id,Name,Title__c,Description__c,Active__c,CreatedDate FROM Form__c ORDER BY Name Desc]; 
    }

    @AuraEnabled
    public static List<Form__c> deleteForm(String formId){  // Created By Nitin
        try {

            System.debug('deleteForm Started =====');

            List<Form__c> formToDelete = [SELECT id,Title__c FROM Form__c WHERE id =: formId];

            System.debug('Form to delete is :::::>>>>>>'+formToDelete);

            // ============ form delete finished ============= //

            
            // ============ Page delete Start ============= //


            Page__c[] pagelst = [SELECT Id,Form__c FROM Page__c WHERE Form__c =: formId];

            Form_Field__c[] fieldlst = [SELECT Id ,Name, Page__c FROM Form_Field__c WHERE Page__c IN: pagelst];
            
            FieldAttribute__c[] formAttribute = [SELECT Id,Form_Field__c FROM FieldAttribute__c WHERE Form_Field__c IN: fieldlst];
            
            Field_Value__c[] fieldValue = [SELECT ID,Form_Field__c FROM Field_Value__c WHERE Form_Field__c IN: fieldlst];
            
            
            
            if(pagelst.size()>0){
                delete pagelst;
            }

            if(fieldlst.size()>0){
                delete fieldlst;
            }
            if(fieldValue.size()>0){
                delete fieldValue;
            }
            if(formAttribute.size()>0){
                delete formAttribute;
            }
            

            // ============ Page delete Finish ============= //
            
            delete formToDelete; // Deleting Form


        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return [SELECT Id,Name,Title__c,Description__c,Active__c,CreatedDate FROM Form__c ORDER BY Name Desc]; 
    }
    // @AuraEnabled
    // public static List<Form__c> testmethod11(String tt){  // Created By Nitin
    //     try {
    //         System.debug('testmethod11');
    //         List<Form__c> formToDelete = [SELECT id,Title__c FROM Form__c WHERE id =: tt];
    //         System.debug('Form to delete is :::::>>>>>>'+formToDelete);

    //         delete formToDelete;
    //     } catch (Exception e) {
    //         throw new AuraHandledException(e.getMessage());
    //     }
    //     return [SELECT Id,Name,Title__c,Description__c,Active__c,CreatedDate FROM Form__c ORDER BY Name Desc]; 
    // }

    @AuraEnabled
    public static List<Form__c> renameFormRecord(String newFormName, String FormId){  // Created By Nitin
        try {
            System.debug('deleteForm');
            List<Form__c> formToRename = [SELECT id,Title__c FROM Form__c WHERE id =: FormId];
            System.debug('Form to rename is :::::>>>>>>'+formToRename);

            for (Form__c reForm : formToRename) {
                reform.Title__c = newFormName;
            }
            update formToRename;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return [SELECT Id,Name,Title__c,Description__c,Active__c,CreatedDate FROM Form__c ORDER BY Name Desc]; 
    }

    @AuraEnabled
    public static String activeDeactiveFormRecord(String formId) {
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
            update formToActiveDeactive;
            return forToast;
        }
    }

    @AuraEnabled
    public static String createFormrecord(Form__c formId, String parentFolderNameForForm) {
        String FName = formId.Title__c;
        List<Form__c> FormList = [SELECT id,Name FROM Form__c WHERE Title__c =: FName];
        if(FormList.size() > 0){
            return 'error';
        }else{

            Folder__c prntFolderForm = [SELECT id,Name FROM Folder__c WHERE Name =: parentFolderNameForForm];

            formId.FolderId__c = prntFolderForm.id;

            insert formId;
            return formId.Id;
        }
    }

    @AuraEnabled
    public static String createFolderRecord(Folder__c folder, String parentFolderName) { // Created By Nitin
        String FolderName = folder.Name;
        List<Folder__c> FolderList = [SELECT id,Name FROM Folder__c WHERE Name =: FolderName];
        if(FolderList.size() > 0){
            return 'error';
        }else{
            
            Folder__c prntFolder = [SELECT id,Name FROM Folder__c WHERE Name =: parentFolderName];
            
            folder.FolderId__c = prntFolder.id;

            insert folder;
            return folder.Id;
        }
    }


    @AuraEnabled
    public static String deleteFolderRecord(String divFolderId) { // Created By Nitin
        
        List<Folder__c> FolderList = [SELECT id,Name FROM Folder__c WHERE id =: divFolderId];
        if(FolderList.size() == 0){
            return 'error';
        }else{
            
            Folder__c deletingFolder = [SELECT id,Name FROM Folder__c WHERE id =: divFolderId];
            


            List<Form__c> formList = [SELECT id,Title__c FROM Form__c WHERE FolderId__c =:FolderList];
        
            Page__c[] pagelst = [SELECT Id,Form__c FROM Page__c WHERE Form__c IN: formList];
            
            Form_Field__c[] fieldlst = [SELECT Id ,Name, Page__c FROM Form_Field__c WHERE Page__c IN: pagelst];
            
            FieldAttribute__c[] formAttribute = [SELECT Id,Form_Field__c FROM FieldAttribute__c WHERE Form_Field__c IN: fieldlst];
            
            Field_Value__c[] fieldValue = [SELECT ID,Form_Field__c FROM Field_Value__c WHERE Form_Field__c IN: fieldlst];
            
            
            if(formList.size()>0){
                
                if(pagelst.size()>0){
                    delete pagelst;
                }
                
                if(fieldlst.size()>0){
                    delete fieldlst;
                }
                if(fieldValue.size()>0){
                    delete fieldValue;
                }
                if(formAttribute.size()>0){
                    delete formAttribute;
                }

            }
            
            delete deletingFolder;
            return deletingFolder.Id;
        }
    }

    
    @AuraEnabled
    public static String getFolderName(String divFolderId) { // Created By Nitin
        
        String currentFolderName;

        List<Folder__c> FolderList = [SELECT id,Name FROM Folder__c WHERE id =: divFolderId];
        
        if(FolderList.size() == 0){
            return 'error';
        }else{
            
            Folder__c folderToRename = [SELECT id,Name FROM Folder__c WHERE id =: divFolderId];

            currentFolderName = folderToRename.Name;
            return currentFolderName;
        }
    }


    @AuraEnabled
    public static String renameFolderRecord(String divFolderId, String newFolderName) { // Created By Nitin
        
        String renamedfolderId;

        List<Folder__c> FolderList = [SELECT id,Name FROM Folder__c WHERE Name =: newFolderName];
        
        if(FolderList.size() > 0){
            return 'error';
        }else{
            
            List<Folder__c> folderToRename = [SELECT id,Name FROM Folder__c WHERE id =: divFolderId];

            for (Folder__c reFolder : folderToRename) {
                reFolder.Name = newFolderName;
                renamedfolderId = reFolder.Id;
            }
            
            update folderToRename;
            return renamedfolderId;
        }
    }

    @AuraEnabled
    public static String moveFolderRecord(String divFolderId, String parentFolderNameForMove) { // Created By Nitin
        
        String newParentFolderId;

        List<Folder__c> FolderList = [SELECT id,Name FROM Folder__c WHERE Name =: parentFolderNameForMove];
        
        if(FolderList.size() == 0){
            return 'error';
        }else{

            for (Folder__c newPrntFold : FolderList) {
                newParentFolderId = newPrntFold.id;       
            }
            
            List<Folder__c> folderToMove = [SELECT id, Name, FolderId__c FROM Folder__c WHERE id =: divFolderId];

            for (Folder__c moveFolder : folderToMove) {
                moveFolder.FolderId__c = newParentFolderId;
            }
            
            update folderToMove;
            return newParentFolderId;
        }
    }

    @AuraEnabled
    public static List<formListWrapper> fetchContact(String sortField, boolean isAsc) {
        String sSoql = 'SELECT Id,Name,Title__c,Description__c,Active__c,CreatedDate';
        sSoql += ' From Form__c';
        if (sortField != '') {
            sSoql += ' order by ' + sortField;    
        // if isAsc is equal tp ture then set 'asc' order otherwise set 'desc' order.
            if (isAsc) {
                sSoql += ' asc';
            } else {
                sSoql += ' desc';
            }
        }
    // set record limit to query 
        sSoql += ' LIMIT 5';    
        list <Form__c> lstResult = new List<Form__c>();
        try {
            lstResult = Database.query(sSoql);
            List<formListWrapper> lstformListWrapper = new List<formListWrapper>();
            for(form__c c: lstResult){
                lstformListWrapper.add(new formListWrapper(false,c));
            }
            return lstformListWrapper;            
        }         
        catch (Exception ex) {
            return null;
        }
   }

    /* wrapper class */  
    public class formListWrapper {
        @AuraEnabled public boolean isChecked {get;set;}
        @AuraEnabled public Form__c objForm {get;set;}
        public formListWrapper(boolean isChecked, Form__c objForm){
            this.isChecked = isChecked;
            this.objForm = objForm;
        }
    }




    //==================================== For Folder Tree  Heirachy start  ===================================
    
    // @AuraEnabled
    // public static List<HierarchyData> findHierarchyData(string recId, string sObjectName, string parentFieldAPIname, string labelFieldAPIName){
    //     List<HierarchyData> returnValue = new List<HierarchyData>();
    //     string queryString = 'select id, '+labelFieldAPIName+ ' ,' +parentFieldAPIname+ ' from '+sObjectName;
    //     //Section to get all child account details from ultimate parent starts-------------------------
    //     List<String> currentParent      = new List<String>{};
    //     Integer level               = 0;
    //     Boolean endOfStructure      = false;
    //     //method to find ultimate parent of account
    //     string topMostparent = GetUltimateParentId(recId, sObjectName,parentFieldAPIname );
    //     currentParent.add(topMostparent);
    //     system.debug('**********topMostparent:'+ currentParent);
    //     //Loop though all children
    //     string finalQueryString = '';
    //     List<sObject> queryOutput = new List<sObject>();
    //     while ( !endOfStructure ){  
    //         if( level == 0 ){
    //             finalQueryString = queryString + ' where id IN : CurrentParent ORDER BY '+parentFieldAPIname +'  Limit 1000';
    //         } 
    //         else {
    //             // finalQueryString = queryString + ' where ParentID IN : CurrentParent ORDER BY '+parentFieldAPIname+' Limit 1000';
    //             finalQueryString = queryString + ' where FolderId__c IN : CurrentParent ORDER BY '+parentFieldAPIname+' Limit 1000';
    //         }
    //         system.debug('********finalQueryString:'+finalQueryString);
    //         if(finalQueryString != null && finalQueryString !=''){
    //             try{
    //                 if(Limits.getLimitQueries()-Limits.getQueries()>0){
    //                     queryOutput = database.query(finalQueryString);
    //                 }else{
    //                     endOfStructure = true;
    //                 }
    //             }catch(exception ex){ 
    //                 endOfStructure = true;
    //             }
    //         }
    //         if( queryOutput.size() == 0 ){
    //             endOfStructure = true;
    //         }
    //         else{
    //             currentParent.clear();
    //             //iterating through query output
    //             for ( Integer i = 0 ; i < queryOutput.size(); i++ ){
    //                 sobject sb= queryOutput[i];
    //                 currentParent.add(string.valueof(sb.get('id')) );
    //                 HierarchyData ss = new HierarchyData();
    //                 if(sb.get('id') == recId || level == 0){
    //                     ss.expanded = true;
    //                 }else{
    //                     ss.expanded = false;
    //                 }
    //                 ss.rec = sb;
    //                 returnValue.add(ss);
    //              }
    //         }
    //         level++;
    //     }
    //     system.debug('**********returnValue:'+returnValue);
    //     return returnValue;
    // }

    @AuraEnabled
    public static List<HierarchyData> findHierarchyData(string recId, string sObjectName, string parentFieldAPIname, string labelFieldAPIName){
        List<HierarchyData> returnValue = new List<HierarchyData>();
        string queryString = 'select id, '+labelFieldAPIName+ ' ,' +parentFieldAPIname+ ' from '+sObjectName;
        //Section to get all child account details from ultimate parent starts-------------------------
        List<String> currentParent      = new List<String>{};
        Integer level               = 0;
        Boolean endOfStructure      = false;
        //method to find ultimate parent of account

        Folder__c fldr = [SELECT Id, Name, FolderId__c FROM Folder__c WHERE FolderId__c = '' LIMIT 1];
        
        recId = fldr.Id;
        System.debug('************ recID on =======>>'+recId);
        currentParent.add(recId);
        system.debug('**********topMostparent:'+ currentParent);
        // string topMostparent = GetUltimateParentId(recId, sObjectName,parentFieldAPIname );
        // currentParent.add(topMostparent);
        // system.debug('**********topMostparent:'+ currentParent);
        //Loop though all children
        string finalQueryString = '';
        List<sObject> queryOutput = new List<sObject>();
        while ( !endOfStructure ){  
            if( level == 0 ){
                finalQueryString = queryString + ' where id IN : CurrentParent ORDER BY '+parentFieldAPIname +'  Limit 1000';
            } 
            else {
                // finalQueryString = queryString + ' where ParentID IN : CurrentParent ORDER BY '+parentFieldAPIname+' Limit 1000';
                finalQueryString = queryString + ' where FolderId__c IN : CurrentParent ORDER BY '+parentFieldAPIname+' Limit 1000';
            }
            system.debug('********finalQueryString:'+finalQueryString);
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
                    sobject sb= queryOutput[i];
                    currentParent.add(string.valueof(sb.get('id')) );
                    HierarchyData ss = new HierarchyData();
                    if(sb.get('id') == recId || level == 0){
                        ss.expanded = true;
                    }else{
                        ss.expanded = false;
                    }
                    ss.rec = sb;
                    returnValue.add(ss);
                 }
            }
            level++;
        }
        system.debug('**********returnValue:'+returnValue);
        return returnValue;
    }


    // Find the tom most element in Heirarchy  
    // @return objId
    // public static String GetUltimateParentId( string recId, string sObjectName, string parentFieldAPIname ){
    //     Boolean top = false;
    //     while ( !top ) {
    //         string queryString = 'select id , ' +parentFieldAPIname+ ' from '+sObjectName + ' where Id =:recId LIMIT 1';
    //         system.debug('**********queryString GetUltimateParentId:'+queryString);
    //         sobject sb = database.query(queryString);
            
    //         if ( sb.get(parentFieldAPIname) != null ) {
    //             recId = string.valueof(sb.get(parentFieldAPIname));
    //         }else {
    //             top = true;
    //         }
    //     }
    //     return recId ;
    // }


    public class HierarchyData{
        @AuraEnabled
        public sObject rec{get;set;}
        @AuraEnabled
        public boolean expanded{get;set;}
        public HierarchyData(){
            expanded = false;
        }
    }

    //========= For Folder Tree  Heirachy Finish  =========



}