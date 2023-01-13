public without sharing class PreviewFormComponentController {

    @AuraEnabled
    public static formWrapper getPreviewFormField(String formId){
        try{
            formId = formId.replaceAll('(\\s+)', '');
            List<Form_Field__c> fieldListId = new List<Form_Field__c>([SELECT Id, Form__c, Page__c ,Data_Record_Id__c, Page__r.Form__c, Object_API_Name__c, API_Name__c, LookUp_Obj__c FROM Form_Field__c Where Form__c =: formId AND Data_Record_Id__c != null]);
            List<id> idField = new List<id>();
            for(Form_Field__c p : fieldListId){
                idField.add(p.Id);
            }
            Form__c formName = [SELECT id ,Title__c, pageCss__c, Active__c,  cssProperties__c ,DeletedFormImageId__c , formBgImage__c , Display_Type__c, ThankYou_Page__c, Captcha_Type__c, ThankYou_Label__c, ThankYou_Text__c, ThankYou_URL__c, ThankYou_RichText__c, Redirect_Text__c, Redirect_URL__c  FROM Form__c WHERE id =: formId];  
            List<PageWrapper> formpage = new List<PageWrapper>();        
            Map<Id,FieldAttribute__c> fieldAttribute = new Map<Id,FieldAttribute__c>();
            List<FieldAttribute__c> attList = [SELECT Id ,Label__c,Visibility__c,Instruction__c,Show_on_click__c,Required_Field__c,Field_Validation__c,Min_no_of_character__c,
                                        Min_no_of_words__c,Total_value__c,Limit_value__c,Show_Decimal__c,Placeholder__c,Placeholder_text__c,
                                        Input_height_in_rows__c,Hide_Field__c,Agreement_Text__c,Read_Only__c,Add_Prefix_Inside_The_Field__c,Prefix__c,Max_no_of_character__c,Max_no_of_words__c,
                                        Date_Format__c,Form_Field__c,RichText__c FROM FieldAttribute__c WHERE Form_Field__c IN: idField];
            for(FieldAttribute__c fieldatt : attList){            
                fieldAttribute.put(fieldatt.Form_Field__c,fieldatt);         
            }
    
            Map<Id,List<Field_Value__c>> fieldValue = new Map<Id,List<Field_Value__c>>();
            List<Field_Value__c> valueList = [SELECT Id , Name , Form_Field__c FROM Field_Value__c WHERE Form_Field__c IN: idField];
            for(Field_Value__c fieldval : valueList){
                if(fieldValue.containsKey(fieldval.Form_Field__c)){
                List<Field_Value__c> fList = fieldValue.get(fieldval.Form_Field__c);
                fList.add(fieldval);
                fieldValue.put(fieldval.Form_Field__c,fList);
                }else{
                    List<Field_Value__c> fList = new List<Field_Value__c>();
                    fList.add(fieldval);
                    fieldValue.put(fieldval.Form_Field__c,fList);
                }
            }
    
            Map<Id,List<FieldWrapper>> formPageMap = new Map<Id,List<FieldWrapper>>();    
            List<Form_Field__c> fieldList = [SELECT Id , Label__c, Form__c,Page__c,Data_Record_Id__c,Page__r.Form__c, LookUp_Obj__c FROM Form_Field__c WHERE Form__c =: formId AND Data_Record_Id__c != null ORDER BY Sequence__c];
            for(Form_Field__c formField : fieldList){
                if(formPageMap.containsKey(formField.Page__c)){
                    List<FieldWrapper> fList = formPageMap.get(formField.Page__c);
                    FieldWrapper fieldwrapper = new FieldWrapper();
                    fieldwrapper.FieldObj = formField;
                    fieldwrapper.FieldAttObj = fieldAttribute.get(formField.Id);
                    fieldwrapper.FieldValueObj = fieldValue.get(formField.Id);
                    fList.add(fieldwrapper);
                    formPageMap.put(formField.Page__c,fList);
                }else{
                    List<FieldWrapper> fList = new List<FieldWrapper>();
                    FieldWrapper fieldwrapper = new FieldWrapper();
                    fieldwrapper.FieldObj = formField;
                    fieldwrapper.FieldAttObj = fieldAttribute.get(formField.Id);
                    fieldwrapper.FieldValueObj = fieldValue.get(formField.Id);
                    fList.add(fieldwrapper);
                    formPageMap.put(formField.Page__c,fList);
                }
            }
    
            List<Page__c> pageList = [SELECT Id,form__c ,Name,Title__c,Sub_Title__c FROM Page__c WHERE Form__c =: formId ORDER BY CreatedDate];
            for(Page__c p : pageList){
                PageWrapper page = new PageWrapper();
                page.PageObj = p;
                page.FieldWrapperList = formPageMap.get(p.Id);
                formpage.add(page);
            }   
            formWrapper form = new formWrapper();
            form.formName = formName;
            form.PageWrapperList = formpage;
            form.cssProperties=formName.cssProperties__c;
            form.pageCss=formName.pageCss__c;
            form.formBgImage=formName.formBgImage__c;
            form.DeletedFormImageId=formName.DeletedFormImageId__c;
            return form;



        }  
        catch(Exception e) {
            System.debug('The following exception has occurred: ' + e.getMessage());
            return null;
        }    
    }     
    
    @AuraEnabled
    public static String fieldSubmit(String formId, Map<String, List<String>> formFieldMap){
        try{

            System.debug(formFieldMap);

            List<String> objlabel = new List<String>(); 
            
            // Form_Submission__c fs = new Form_Submission__c();
            //     fs.Form_Fields_Value__c = allData;
            //     fs.Object_API_Name__c   = String.valueOf(objlabel) ;
            //     fs.Object_Label__c      = String.valueOf(objlabel); 
            //     fs.Form__c              = FormId ;
            // if(fs != null){
            //     insert fs;
            //     System.debug('id>>>>>>>>>>>'+fs.id);
            // }


            // List<Form_Field__c> FieldList = [SELECT Id,Name,Label__c FROM Form_Field__c WHERE Id=:IdList];
            Map<String,String> Formfieldvalue = new Map<String,String>();
            Map<String , String> submissionmap = new Map<String , String>();

            Map<String , Id> lookupdata = new Map<String , Id>(); 
            Map<String , Integer> lkcount = new Map<String, Integer>();
            Map<Integer, String> lkcount_two = new Map<Integer, String>();
            Map<String , List<String>> lkdata = new Map<String , List<String>>();
            
            Map<Integer, String> lkmap = new Map<Integer, String>();

            for(String il: formFieldMap.keySet()){
                submissionmap.put(formFieldMap.get(il)[1] ,formFieldMap.get(il)[2]);
                Formfieldvalue.put(formFieldMap.get(il)[0],formFieldMap.get(il)[2]);
                System.debug(formFieldMap.get(il)[0]+'<<<>>>'+formFieldMap.get(il)[1] +'<<>>'+formFieldMap.get(il)[2]);
            }
            
            // Form_Field__c[] fieldValueList = [SELECT Id ,Form__c,Page__c,Data_Record_Id__c,Page__r.Form__c,API_Name__c,Label__c FROM Form_Field__c WHERE Form__c =: FormId AND Data_Record_Id__c != null ORDER BY Sequence__c];
            // for(Form_Field__c formField : fieldValueList){
            //     Formfieldvalue.put(formField.Id,formField.Label__c);
            // }
            // System.debug(Formfieldvalue);



            Form__c quickForm = [SELECT Id ,Title__c , Object_Mapping__c FROM Form__c WHERE Id =: formId];
            String objmapping = quickForm.Object_Mapping__c;
            System.debug('objmapping>>>'+objmapping);

            if(objmapping != null){
                Map<String, Object> resultMap = ( Map<String, Object> ) JSON.deserializeUntyped(objmapping);
                Map<String,Object> responseObj = (Map<String,Object>)resultMap.get('response');
                Integer lksize = 0;
                for(String obb: resultMap.keySet()){
                    if (resultMap.get(obb) != null) {
                        Object obj = resultMap.get(obb);
                        Map<String,Object> responsObj = (Map<String,Object>)obj;
                        lkcount.put(String.valueOf(obb) , 0);
                        List<String> lklistt = new list<String>();
                        lkdata.put(obb , lklistt);
                        for(String s : responsObj.keySet()){
                            System.debug('>>>>>>>>>>>>>>>'+s);
                            System.debug('>>>>>>>>>>>>>>>'+responsObj.get(s));
                            if( s == 'Active' && responsObj.get(s) == 'true'){
                                System.debug(responsObj.get('value'));
                                Object objvalue = responsObj.get('value');
                                String sstr = String.valueOf(objvalue);
                                Map<String, Object> c = ( Map<String, Object> ) JSON.deserializeUntyped(sstr);
                                List<String> lklist = new list<String>();
                                for(String f : c.keySet()){
                                    Object fvalue = c.get(f);
                                    Map<String, Object> resobj = ( Map<String, Object> ) fvalue;
                                    String objnamevalue = String.valueOf(resobj.get('objfieldvalue3'));
                                    String formvalue = String.valueOf(resobj.get('formfieldvalue'));
                                    String ss = String.valueOf(formvalue);
                                    if(ss.substring(0 ,2) == 'LK'){
                                        lksize = lksize + 1;
                                        lklist.add(ss.substring(8 , ss.length()));
                                        String lkname = ss.substring(8 , ss.length());
                                        lkdata.put(obb , lklist);
                                        if(lkcount.get(obb) == null){
                                            lkcount.put(String.valueOf(obb) , 1);
                                        }
                                        else{
                                            lkcount.put(String.valueOf(obb) , lkcount.get(obb)+1);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                List<String> rt = new List<String>();
                    for(Integer i = 0; i <= lksize; i++){
                        for(String df: lkcount.keySet()){
                            if( i == lkcount.get(df) && i == 0){
                                rt.add(df);
                            }
                            else if(i == lkcount.get(df)){
                                Boolean er = true;
                                for(String hgh : lkdata.get(df)){
                                    if(rt.contains(hgh) == false){
                                        er = false;
                                        break;
                                    }
                                }
                                if(er == true){
                                    rt.add(df);
                                }
                            }
                        }
                    }
                    System.debug(lkdata);
                for(String objname : resultMap.keySet()){
                    Object obj = resultMap.get(objname);
                    Map<String,Object> responsObj = (Map<String,Object>)obj;
                    Map<String, String> objtype = new Map<String, String>();
                    Map<String, Schema.SObjectField> fieldMap = Schema.getGlobalDescribe().get(objname).getDescribe().fields.getMap();
                    sObjectType objTypee = ((sObject)(Type.forName('Schema.'+objname).newInstance())).getsObjectType();
                    Schema.DescribeSObjectResult r = objTypee.getDescribe();
                    Map<String,Schema.SObjectField> m = r.fields.getMap();
                    for(String fieldName : m.keySet()){
                        Schema.SObjectField field = m.get(fieldName);
                        Schema.DisplayType fielddataType = fieldMap.get(fieldName).getDescribe().getType();
                        Schema.DescribeFieldResult f = field.getDescribe();
                        objtype.put(f.getName() , String.valueOf(fielddataType));
                    }
                    for(String s : responsObj.keySet()){
                        if( s == 'Active' && responsObj.get(s) == 'true'){
                            Object objvalue = responsObj.get('value');
                            String sstr = String.valueOf(objvalue);
                            objlabel.add(objname);
                            Map<String, Object> c = ( Map<String, Object> ) JSON.deserializeUntyped(sstr);
                            sObject objj = Schema.getGlobalDescribe().get(objname).newSObject();
                            for(String f : c.keySet()){
                                Object fvalue = c.get(f);
                                Map<String, Object> resobj = ( Map<String, Object> ) fvalue;
                                String objnamevalue = String.valueOf(resobj.get('objfieldvalue3'));         // id form field
                                String formvalue = String.valueOf(resobj.get('formfieldvalue'));            // obj apiname
                                string ffvalue = formfieldvalue.get(formvalue);
                                String ss = String.valueOf(formvalue);
                                System.debug(ss.contains('data:image/png;base64,'));
                                if(ss.substring(0 ,2) == 'LK'){
                                    String lkname = ss.substring(8 , ss.length());
                                    objj.put(objnamevalue, lookupdata.get(lkname));
                                }
                                else if(ss.contains('data:image/png;base64,')){
                                    System.debug('signature>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                                    // SELECT Id, Title, ContentUrl, VersionData, VersionNumber, ContentDocumentId FROM ContentVersion
                                    // ContentVersion cont_ver = new ContentVersion();
                                    // cont_ver.Title = 
                                }
                                else{
                                    System.debug(objtype.get(objnamevalue));
                                    if( objtype.get(objnamevalue) ==  'DATE'){
                                        objj.put(objnamevalue, date.valueOf(ffvalue));
                                        System.debug('objnamevalue >> +' +objnamevalue  +  '<<<value>>>' +date.valueOf(ffvalue));
                                    }
                                    else if(objtype.get(objnamevalue) == 'BOOLEAN'){
                                        boolean bool = Boolean.valueOf(ffvalue);
                                        objj.put(objnamevalue, bool);
                                        System.debug('objnamevalue >> +' +objnamevalue   + '<<<value>>>'+ bool);
                                    }
                                    else if(objtype.get(objnamevalue) == 'CURRENCY'){
                                        Decimal x = decimal.valueOf(ffvalue);
                                        objj.put(objnamevalue, x);
                                        System.debug('objnamevalue >> +' +objnamevalue   + '<<<value>>>'+ x);
                                    }
                                    else if(objtype.get(objnamevalue) == 'TIME'){
                                        String[] strTimeSplit = ffvalue.split(':');
                                        Time timeChange = Time.newInstance( Integer.valueOf(strTimeSplit[0]) ,Integer.valueOf(strTimeSplit[1]),0 ,0);                              
                                        objj.put(objnamevalue, timeChange);
                                        System.debug('objnamevalue >> +' +objnamevalue   + '<<<value>>>'+ timeChange);
                                    }
                                    else if(objtype.get(objnamevalue) == 'DATETIME'){
                                        Datetime validDatetime=DateTime.Valueof(ffvalue.replace('T', ' '));
                                        objj.put(objnamevalue, validDatetime);
                                        System.debug('objnamevalue >> +' +objnamevalue   + '<<<value>>>'+ validDatetime);
                                    }
                                    else{
                                        objj.put(objnamevalue , ffvalue);
                                        System.debug('objnamevalue >> +' +objnamevalue   + '<<<value>>>'+ ffvalue);
                                    }
                                }
                            }
                            if(objj != null){
                                insert objj;
                            }
                            lookupdata.put(objname ,objj.id );
                            System.debug(lookupdata);
                        }
                    }
                }
            }
            // String mapAsString = submissionmap.keySet().stream()
            // .map(key -> key + "=" + submissionmap.get(key))
            // .collect(Collectors.joining(", ", "{", "}"));
            return 'return object data';
        }catch(Exception e){
            System.debug(e);
            return 'Not Found';
        }
    }       

    @AuraEnabled
    public static string form_submission(String formId, String obj_return_data, String submissionData){
        try {
            Form_Submission__c fs = new Form_Submission__c();
                fs.Form_Fields_Value__c = submissionData;
                fs.Object_API_Name__c   = String.valueOf(obj_return_data);
                fs.Object_Label__c      = String.valueOf(obj_return_data); 
                fs.Form__c              = formId ;
            insert fs;
            return fs.id;
            
        } catch (Exception e) {
            System.debug('The following exception has occurred: ' + e.getMessage());
            return null;
        }
    }

    @AuraEnabled
    public static String sendNotificationEmail(String formId, String submittionid){
        String sMessage = '';
        try {
            Form__c form = [SELECT id,Name,Title__c, notification_mail_recipient_email__c, NotificationMail_CC__c, notification_replyToEmail__c, notification_mail_message_body__c, notification_mail_message_subject__c, NotificationMail_EmailAttachment__c FROM Form__c WHERE id=: formId];
            
            String recipientList = form.notification_mail_recipient_email__c;
            String ccmaillist = form.NotificationMail_CC__c;
            String replyToEmail = form.notification_replyToEmail__c;
            String massageBody = form.notification_mail_message_body__c;
            String massageSubject = form.notification_mail_message_subject__c;
            boolean attachmentpdf = form.NotificationMail_EmailAttachment__c;

            System.debug(formId);
            System.debug(submittionid);
             
            System.debug(recipientList);
            System.debug(ccmaillist);
            System.debug(replyToEmail);
            System.debug(massageBody);
            System.debug(massageSubject);
            System.debug(attachmentpdf);

            recipientList = recipientList.replace('[','').replace(']','').replace('"','');
            List<String> toAddresses = recipientList.split(',');

            ccmaillist = ccmaillist.replace('[','').replace(']','').replace('"','');
            List<String> ccAddresses = ccmaillist.split(',');

            System.debug('toAddresses>>>'+toAddresses);
            System.debug('ccAddresses>>>'+ccAddresses);

            if(toAddresses.size() != 0 ){
                Messaging.SingleEmailMessage emailNotification = new Messaging.SingleEmailMessage();

                emailNotification.setToAddresses(toAddresses);
                emailNotification.setReplyTo(replyToEmail);
                
                System.debug(ccAddresses.size());
                if(ccAddresses.size() != 1){
                    emailNotification.setCCaddresses(ccAddresses);
                }
                emailNotification.setSubject(massageSubject);
                emailNotification.setHtmlBody(massageBody);

                if(attachmentpdf == true){

                    String pdf_url = '/apex/PDFGenerator?Id='+submittionid;
    
                    PageReference pdfPage = new PageReference(pdf_url);
                    Blob pdfContent;
                    if(Test.isRunningTest()) { 
                        pdfContent = blob.valueOf('Unit.Test');
                    }
                    else{
                        pdfContent = pdfPage.getContentAsPDF();
                    }
                    // pdfPage.setRedirect(true);
    
                    Messaging.EmailFileAttachment emailAttachment = new Messaging.EmailFileAttachment();
                    emailAttachment.setFileName('testpdf.pdf');
                    emailAttachment.setBody(pdfContent);
    
                    emailNotification.setFileAttachments(new Messaging.EmailFileAttachment[]{emailAttachment});
                }
                Messaging.SendEmailResult [] results = Messaging.sendEmail(new Messaging.SingleEmailMessage[] {emailNotification});
            }


        } catch (Exception e) {
            sMessage=e.getLineNumber()+'\n'+e.getCause()+'\n'+e.getMessage()+'\n'+e.getStackTraceString();
            System.debug('Error-------------->'+sMessage);
            return null;
        }
        return sMessage;
    }
    

    public class formWrapper{
        @AuraEnabled public Form__c formName {get; set;} 
        @AuraEnabled public List<PageWrapper> PageWrapperList {get;set;}
        @AuraEnabled public string  cssProperties{get;set;}
        @AuraEnabled public string  pageCss {get;set;}
        @AuraEnabled public string  formBgImage {get;set;}
        @AuraEnabled public string  DeletedFormImageId {get;set;}
    }
    public class PageWrapper{
        @AuraEnabled public Page__c PageObj {get;set;}
        @AuraEnabled public List<FieldWrapper> FieldWrapperList {get;set;}
    }
    public class FieldWrapper{
        @AuraEnabled public Form_Field__c FieldObj {get;set;}
        @AuraEnabled public FieldAttribute__c FieldAttObj {get;set;}  
        @AuraEnabled public List<Field_Value__c> FieldValueObj {get;set;}
    }

    
}