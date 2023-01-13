@isTest
public class Test_getFormList {
	
    @isTest
    public static void test1(){
        
        Folder__c fldr =new Folder__c();
        fldr.Name = 'Folder Name';
        insert fldr;
        
        Folder__c fldr1 =new Folder__c();
        fldr1.Name = 'Parent Folder';
        insert fldr1;

        
        Form__c fm = new Form__c();
        fm.Title__c = 'Form Title';
        fm.FolderId__c = fldr.Id;
        insert fm;

        Form__c fm1 = new Form__c();
        fm1.Title__c = 'Form Title2';
        fm1.FolderId__c = fldr.Id;
        insert fm1;
        
        Form__c fm2 = new Form__c();
        fm2.Title__c = 'Form Title1';
        fm2.FolderId__c = fldr.Id;
        insert fm2;

        Form__c form = new Form__c();
        form.Title__c = 'test nishhit';
        form.FolderId__c = fldr1.Id;
        // insert form;


        getFormList.createFormrecord(fm2, 'Parent Folder');
        getFormList.createFormrecord(form, 'Parent Folder');
        getFormList.getForm();
        getFormList.getFormInFolder(fldr.Id);
        getFormList.getFolder();
        getFormList.moveFormRecord(fm.Id,fldr1.Name);
        getFormList.renameFormRecord('Form New Name',fm.Id);
        getFormList.activeDeactiveFormRecord(fm1.Id);

        fm1.Active__c = true;
        getFormList.activeDeactiveFormRecord(fm1.Id);

        getFormList.createFolderRecord(fldr,'Parent Folder');
        getFormList.deleteFolderRecord(fldr.Id);
        getFormList.getFolderName(fldr.Id);
        getFormList.renameFolderRecord(fldr1.Id,fm.Name);
        getFormList.moveFolderRecord(fldr1.Id,fldr1.Name);
        getFormList.findHierarchyData(fldr.Id,'Form__c','FolderId__c','Name');
        getFormList.findFolder(fldr.Name);
        getFormList.getMainFolder();
        getFormList.deleteForm(fm.Id);

        getFormList.HierarchyData wrap = new getFormList.HierarchyData();
    }

    @isTest
    public static void test2(){
        Folder__c fldr1 =new Folder__c();
        fldr1.Name = 'Parent Folder';
        insert fldr1;

        Folder__c fldr2 =new Folder__c();
        fldr2.Name = 'Parent Folder';
        insert fldr2;


        List<Folder__c> FolderList = [SELECT id,Name FROM Folder__c];
        
        getFormList.moveFolderRecord(fldr1.Id,fldr1.Name);


    }


    @isTest
    public static void test3(){
    String  newParentFolderId;
       
    
    Folder__c fldr1 =new Folder__c();
    fldr1.Name = 'Parent Folder';
    insert fldr1;

    Folder__c fldr2 =new Folder__c();
    fldr2.Name = 'Parent Folder';
    insert fldr2;
    List<Folder__c> FolderList= [SELECT id , Name from Folder__c where id=:fldr1.id];
    for (Folder__c newPrntFold : FolderList) {
        newParentFolderId = newPrntFold.id;       
    }
    List<Folder__c> folderToMove = [SELECT id, Name, FolderId__c FROM Folder__c WHERE id =: fldr1.id];
    for (Folder__c moveFolder : folderToMove) {
        moveFolder.FolderId__c = newParentFolderId;
    }

    getFormList.moveFolderRecord(fldr1.Id, 'test');

       }


}