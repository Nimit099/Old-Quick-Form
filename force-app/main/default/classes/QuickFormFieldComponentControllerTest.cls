@isTest
public class QuickFormFieldComponentControllerTest {
    public QuickFormFieldComponentControllerTest() {

    }
    
    @isTest
    public static void validate() {
        JSONGenerator gen = JSON.createGenerator(true);
        gen.writeStartObject(); //Inserts {
        gen.writeStringField('Form width', '50%');
        gen.writeStringField('headerPadding', '10%');
        gen.writeStringField('footerPadding', '5%');
        gen.writeStringField('Left Padding', '5%');
        gen.writeStringField('Right Padding', '5%');
        gen.writeStringField('Form_BackgroundSize', 'auto');
        gen.writeStringField('Form_BackgroundPosition', 'top left');
        gen.writeStringField('Form_BackgroundRepeat', 'no-repeat');
        gen.writeEndObject(); //Inserts }
        String body = gen.getAsString(); 

        JSONGenerator genpage = JSON.createGenerator(true);
        genpage.writeStartObject(); //Inserts {
        genpage.writeStringField('Top Padding', '50px');
        genpage.writeStringField('Bottom Padding', '10px');
        genpage.writeStringField('Background Color', 'red');
        genpage.writeStringField('Background size', 'auto');
        genpage.writeStringField('Background position', 'top left');
        genpage.writeStringField('Background repeat', 'no-repeat');
        genpage.writeStringField('Background fix position', 'scroll');
        genpage.writeStringField('BorderColor', 'yellow');
        genpage.writeStringField('BorderStyle', '2px');
        genpage.writeStringField('BorderThickness', '5px');

        genpage.writeEndObject(); //Inserts }
        String pageBody = genpage.getAsString();


        Folder__c myParentFolder = new Folder__c();
        myParentFolder.name='Test Folder';
        insert myParentFolder;

        Form__c myForm= new Form__c();
        myForm.Title__c='test form';
        myForm.cssProperties__c=body;
        myForm.pageCss__c=pageBody;
        myForm.FolderId__c=myParentFolder.Id;
        myForm.ThankYou_Page__c='ThankYou_Text';
        insert myForm;


        Form__c myForm2= new Form__c();
        myForm2=[select Title__c ,FolderId__c , pageCss__c , cssProperties__c From Form__c where id=:myForm.id];
        if(myForm2 != null){
            myForm2.Title__c='test form 2';
            myForm2.cssProperties__c=body;
            myForm2.pageCss__c=pageBody;
            myForm2.FolderId__c=myParentFolder.Id;
            update myForm2;
        
        }
      
       

        // for(String s: Listt){
        //     List<String> refStr = s.split(':::');
        //     SetId.add(refStr[0]);
        //     mapList.put(refStr[0],refStr[1]+';;'+refStr[2]);
        // }


        Attachment attach=new Attachment();     
        attach.Name='Unit Test Attachment';
        Blob bodyBlob=Blob.valueOf('Unit Test Attachment Body');
        attach.body=bodyBlob;
        attach.parentId=myForm.id;
        insert attach;

        Page__c pageRecord= new Page__c();
        pageRecord.Title__c ='test title';
        pageRecord.Sub_Title__c='sub title';
        insert pageRecord;

        Form_Field__c formfield = new Form_Field__c();
        formfield.Form__c = myForm.id;
        formfield.Page__c = pageRecord.id;
        formfield.Data_Record_Id__c = 'QFADDRESS';
        formfield.Sequence__c =2;
        insert formfield;

        Form_Field__c formfield2 = new Form_Field__c();
        formfield2.Form__c = myForm.id;
        formfield2.Page__c = pageRecord.id;
        formfield2.Data_Record_Id__c = 'QFFULLNAME';
        formfield2.Sequence__c =0;
        insert formfield2;

        Form_Field__c formfield3= new Form_Field__c();
        formfield3.Form__c = myForm.id;
        formfield3.Page__c = pageRecord.id;
        formfield3.Data_Record_Id__c = 'QFFULLNAME';
        formfield3.Sequence__c =1;
        insert formfield3;


        Field_Value__c formValue= new Field_Value__c();
        formValue.name='test';
        formValue.Form_Field__c=formfield.Id;
        insert formValue;


        List<String> Listt = new List<String>{formfield.id ,formfield2.id , formfield3.id};
        Map<Id,String> mapList = new Map<Id,String>();
        Set<Id> SetId = new Set<Id>();

        List<Form_Field__c> formList = new List<Form_Field__c>();
        formList = [SELECT Id,Name,Sequence__c,Page__c FROM Form_Field__c WHERE Id=: formfield.id];
        
     
        QuickFormFieldComponentController.saveCss(myForm.id , body );
        QuickFormFieldComponentController.savepageCss(myForm.id , pageBody);
        QuickFormFieldComponentController.fetchCss(myForm.id);
        QuickFormFieldComponentController.fetchpageCss(myForm.id);
        QuickFormFieldComponentController.SaveFile(myForm.id , 'test' , 'test' ,'test' );
        QuickFormFieldComponentController.SavePageFile(myForm.id , 'test' , 'test' ,'test' );
        QuickFormFieldComponentController.savepageCssId(myForm.id , 'test' );
        QuickFormFieldComponentController.saveFormCssId(myForm.id , 'test' );
        QuickFormFieldComponentController.fetchpageCssId(myForm.id);
        QuickFormFieldComponentController.fetchFormCssId(myForm.id);
        QuickFormFieldComponentController.fetchDeletedPageImages(myForm.id );
        QuickFormFieldComponentController.fetchDeletedFormImages(myForm.id );
        QuickFormFieldComponentController.SequenceSave(Listt);
        QuickFormFieldComponentController.thanksdata(myForm.id , 'test' , 'test' ,'ThankYou_Text', 'test' , 'test' , 'test' , 'test');
     
        QuickFormFieldComponentController.siteurl(myForm.id);
        QuickFormFieldComponentController.saveDeletedPageImages(myForm.id , attach.id);
        QuickFormFieldComponentController.saveDeletedFormImages(myForm.id , attach.id);
        QuickFormFieldComponentController.DeleteFile(myForm.id , attach.id);
        QuickFormFieldComponentController.DeletePageFile(myForm.id , attach.id);
       

        QuickFormFieldComponentController.formWrapper formwrapper =new QuickFormFieldComponentController.formWrapper();
        QuickFormFieldComponentController.PageWrapper Pagewrapper =new QuickFormFieldComponentController.PageWrapper();
        QuickFormFieldComponentController.FieldWrapper FieldWrapper =new QuickFormFieldComponentController.FieldWrapper();
        QuickFormFieldComponentController.formWrapper.fetchQuickFormField(myForm.id);
        QuickFormFieldComponentController.formWrapper.createPageRecord( pageRecord , myForm.id);
        QuickFormFieldComponentController.formWrapper.pageBreak( pageRecord , myForm.id , Listt , pageRecord.Id);
        QuickFormFieldComponentController.formWrapper.addFieldRecord(myForm.id , pageRecord.Id , 'QFADDRESS' , 2);
        QuickFormFieldComponentController.formWrapper.DeletePage(pageRecord.Id, myForm.id );
        // QuickFormFieldComponentController.formWrapper.fetchQuickFormField(myForm.id );



    }

    @isTest
    public static void test2() {
        JSONGenerator gen = JSON.createGenerator(true);
        gen.writeStartObject(); //Inserts {
        gen.writeStringField('Form width', '50%');
        gen.writeStringField('headerPadding', '10%');
        gen.writeStringField('footerPadding', '5%');
        gen.writeStringField('Left Padding', '5%');
        gen.writeStringField('Right Padding', '5%');
        gen.writeStringField('Form_BackgroundSize', 'auto');
        gen.writeStringField('Form_BackgroundPosition', 'top left');
        gen.writeStringField('Form_BackgroundRepeat', 'no-repeat');
        gen.writeEndObject(); //Inserts }
        String body = gen.getAsString(); 

        JSONGenerator genpage = JSON.createGenerator(true);
        genpage.writeStartObject(); //Inserts {
        genpage.writeStringField('Top Padding', '50px');
        genpage.writeStringField('Bottom Padding', '10px');
        genpage.writeStringField('Background Color', 'red');
        genpage.writeStringField('Background size', 'auto');
        genpage.writeStringField('Background position', 'top left');
        genpage.writeStringField('Background repeat', 'no-repeat');
        genpage.writeStringField('Background fix position', 'scroll');
        genpage.writeStringField('BorderColor', 'yellow');
        genpage.writeStringField('BorderStyle', '2px');
        genpage.writeStringField('BorderThickness', '5px');

        genpage.writeEndObject(); //Inserts }
        String pageBody = genpage.getAsString();

        Folder__c myParentFolder = new Folder__c();
        myParentFolder.name='Test Folder';
        insert myParentFolder;


        Form__c myForm= new Form__c();
        myForm.Title__c='test form';
        myForm.cssProperties__c=body;
        myForm.pageCss__c=pageBody;
        myForm.FolderId__c=myParentFolder.Id;
        insert myForm;

        Page__c pageRecord= new Page__c();
        pageRecord.Title__c ='test title';
        pageRecord.Sub_Title__c='sub title';
        pageRecord.form__c=myForm.id;
        insert pageRecord;

        Form_Field__c formfield = new Form_Field__c();
        formfield.Form__c = myForm.id;
        formfield.Page__c = pageRecord.id;
        formfield.Data_Record_Id__c = 'QFFULLNAME';
        insert formfield;

        Page__c[] pageList = [SELECT Id,form__c ,Name,Title__c,Sub_Title__c FROM Page__c WHERE Form__c =: myForm.id];

        QuickFormFieldComponentController.formWrapper formwrapper =new QuickFormFieldComponentController.formWrapper();
        QuickFormFieldComponentController.formWrapper.addFieldRecord(myForm.id , pageRecord.Id , 'QFFULLNAME' , 2);
        // QuickFormFieldComponentController.formWrapper.pageBreak( pageRecord , myForm.id , Listt , pageRecord.Id);

        // QuickFormFieldComponentController.formWrapper.createPageRecord( null , myForm.id);

    }

    @isTest
    public static void test3() {
        JSONGenerator gen = JSON.createGenerator(true);
        gen.writeStartObject(); //Inserts {
        gen.writeStringField('Form width', '50%');
        gen.writeStringField('headerPadding', '10%');
        gen.writeStringField('footerPadding', '5%');
        gen.writeStringField('Left Padding', '5%');
        gen.writeStringField('Right Padding', '5%');
        gen.writeStringField('Form_BackgroundSize', 'auto');
        gen.writeStringField('Form_BackgroundPosition', 'top left');
        gen.writeStringField('Form_BackgroundRepeat', 'no-repeat');
        gen.writeEndObject(); //Inserts }
        String body = gen.getAsString(); 

        JSONGenerator genpage = JSON.createGenerator(true);
        genpage.writeStartObject(); //Inserts {
        genpage.writeStringField('Top Padding', '50px');
        genpage.writeStringField('Bottom Padding', '10px');
        genpage.writeStringField('Background Color', 'red');
        genpage.writeStringField('Background size', 'auto');
        genpage.writeStringField('Background position', 'top left');
        genpage.writeStringField('Background repeat', 'no-repeat');
        genpage.writeStringField('Background fix position', 'scroll');
        genpage.writeStringField('BorderColor', 'yellow');
        genpage.writeStringField('BorderStyle', '2px');
        genpage.writeStringField('BorderThickness', '5px');

        genpage.writeEndObject(); //Inserts }
        String pageBody = genpage.getAsString();

        Folder__c myParentFolder = new Folder__c();
        myParentFolder.name='Test Folder';
        insert myParentFolder;


        Form__c myForm= new Form__c();
        myForm.Title__c='test form';
        myForm.cssProperties__c=body;
        myForm.pageCss__c=pageBody;
        myForm.FolderId__c=myParentFolder.Id;
        insert myForm;

        Page__c pageRecord= new Page__c();
        pageRecord.Title__c ='test title';
        pageRecord.Sub_Title__c='sub title';
        pageRecord.form__c=myForm.id;
        insert pageRecord;

        Form_Field__c formfield = new Form_Field__c();
        formfield.Form__c = myForm.id;
        formfield.Page__c = pageRecord.id;
        formfield.Data_Record_Id__c = 'QFSCALERATING';
        insert formfield;



        List<String> Listt = new List<String>{'form' ,'test2'};
        QuickFormFieldComponentController.formWrapper formwrapper =new QuickFormFieldComponentController.formWrapper();
        QuickFormFieldComponentController.formWrapper.addFieldRecord(myForm.id , pageRecord.Id , 'QFSCALERATING' , 2);
        QuickFormFieldComponentController.formWrapper.pageBreak(null , myForm.id , Listt , pageRecord.Id);



    }

    // @isTest
    // public static void test4() {
       
    //     Folder__c myParentFolder = new Folder__c();
    //     myParentFolder.name='Test Folder';
    //     insert myParentFolder;


    //     Form__c myForm= new Form__c();
    //     myForm.Title__c='test form';
    //     myForm.FolderId__c=myParentFolder.Id;
    //     insert myForm;

    //     Page__c pageRecord= new Page__c();
    //     pageRecord.Title__c ='test title';
    //     pageRecord.Sub_Title__c='sub title';
    //     pageRecord.form__c=myForm.id;
    //     insert pageRecord;

    //     Form_Field__c formfield = new Form_Field__c();
    //     formfield.Form__c = myForm.id;
    //     formfield.Page__c = pageRecord.id;
    //     formfield.Data_Record_Id__c = 'QFCHECKBOX';
    //     insert formfield;


     
    //     List<String> Listt = new List<String>{'form' ,'test2'};
    //     QuickFormFieldComponentController.formWrapper formwrapper =new QuickFormFieldComponentController.formWrapper();
    //     QuickFormFieldComponentController.formWrapper.addFieldRecord(myForm.id , pageRecord.Id , 'QFCHECKBOX' , 2);
     



    // }


}