public with sharing class QuickFormFieldComponentControllerTesting {
    
    public static List<BaseField__mdt> basefield = [ SELECT sequence__c,Label,DataRecord__c FROM BaseField__mdt ORDER BY sequence__c]; 
    // Run On Init Method And Get All Data Of Form
    @AuraEnabled
    public static formWrapper fetchQuickFormField(String formId){
        try{
            List<Form_Field__c> fieldListId = new List<Form_Field__c>([SELECT Id ,Form__c,Page__c,Data_Record_Id__c,Page__r.Form__c, LookUp_Obj__c FROM Form_Field__c WHERE Form__c =: formId AND Data_Record_Id__c != null AND Address_Id__c = null AND Name_Id__c = null ORDER BY Sequence__c]);
            List<id> idField = new List<id>();
            for(Form_Field__c fields : fieldListId){ // add fields instead of p for naming convention by harsh 
                idField.add(fields.Id); // add fields instead of p for naming convention by harsh 
            }

            // Remove List<BaseField__mdt>SOQL Query outside the method by harsh        
            Form__c formName = [SELECT id, ThankYou_Label__c, Title__c FROM Form__c WHERE id =: formId];        
            List<PageWrapper> formpage = new List<PageWrapper>();        
            
            Map<Id,FieldAttribute__c> fieldAttribute = new Map<Id,FieldAttribute__c>();
            FieldAttribute__c[] attributeList = [SELECT Id ,Label__c,Visibility__c,Instruction__c,Show_on_click__c,Required_Field__c,Field_Validation__c,Min_no_of_character__c,
                                                Min_no_of_words__c,Total_value__c,Limit_value__c,Show_Decimal__c,Placeholder__c,Placeholder_text__c,
                                                Input_height_in_rows__c,Hide_Field__c,Read_Only__c,Add_Prefix_Inside_The_Field__c,Prefix__c,Max_no_of_character__c,Max_no_of_words__c,
                                                Date_Format__c,Form_Field__c, RichText__c FROM FieldAttribute__c WHERE Form_Field__c IN: idField];
            for(FieldAttribute__c fieldatt : attributeList){            
                fieldAttribute.put(fieldatt.Form_Field__c,fieldatt);         
            }

            Map<Id,List<Field_Value__c>> fieldValue = new Map<Id,List<Field_Value__c>>();
            Field_Value__c[] valueList = [SELECT Id , Name , Form_Field__c FROM Field_Value__c WHERE Form_Field__c IN: idField ORDER BY CreatedDate ASC];
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
            for(Form_Field__c formField : fieldListId){
                if(formPageMap.containsKey(formField.Page__c)){
                    if(formPageMap.get(formField.Page__c) != null){
                        List<FieldWrapper> fList = formPageMap.get(formField.Page__c);
                        FieldWrapper fieldwrapper = new FieldWrapper();
                        fieldwrapper.FieldObj = formField;
                        fieldwrapper.FieldAttObj = fieldAttribute.get(formField.Id);
                        fieldwrapper.FieldValueObj = fieldValue.get(formField.Id);
                        fList.add(fieldwrapper);
                        formPageMap.put(formField.Page__c,fList);
                    }
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
            Page__c[] pageList = [SELECT Id,form__c ,Name,Title__c,Sub_Title__c FROM Page__c WHERE Form__c =: formId ORDER BY CreatedDate];
            for(Page__c pages : pageList){ // add pages instead of p for naming convention by harsh 
                PageWrapper page = new PageWrapper();
                page.PageObj = pages;
                page.FieldWrapperList = formPageMap.get(pages.Id);
                formpage.add(page);
            }      
            formWrapper form = new formWrapper();
            form.formName = formName;
            form.basefield = basefield;
            form.PageWrapperList = formpage;
            return form;
        }catch(Exception e){
            System.debug(e);
            return null;
        } 
    }

    // For Create New Page in Form
    @AuraEnabled
    public static formWrapper createPageRecord(Page__c pagedetail,String formId) {
        try{
            pagedetail.Form__c = formId;
            if(pagedetail != null){
                insert pagedetail;
            } 
            formWrapper wrpcls = fetchQuickFormField(formId);
            return wrpcls;
        }catch(Exception e){
            System.debug(e);
            return null;
        } 
    }

    // For Page Break Field to Break Field
    @AuraEnabled
    public static formWrapper pageBreak(Page__c pagedetail, String formId, List<String> Listt, String pageId) {
        try{
            if(pagedetail != null){
                pagedetail.Form__c = formId;
                pagedetail.Title__c = 'New Page';
                insert pagedetail;
            } 
                
            List<Form_Field__c> formList = new List<Form_Field__c>();
            Set<Id> setId = new Set<Id>();
            Map<Id,String> mapList = new Map<Id,String>();
            for(String s: Listt){
                List<String> refStr = s.split(':::');
                setId.add(refStr[0]);
                mapList.put(refStr[0],refStr[1]+';;'+refStr[2]);
            }
            formList = [SELECT Id,Name,Sequence__c,Page__c FROM Form_Field__c WHERE Id=: setId];
            for(Form_Field__c f: formList){
                List<String> mapVal = mapList.get(String.valueOf(f.Id)).split(';;');
                f.sequence__c = Decimal.valueOf(mapVal[0]);
                f.Page__c = pagedetail.id;
            }
            if(formList != null){
                update formList;
            } 
            
            List<Form_Field__c> fieldListId = [SELECT Id ,Page__c FROM Form_Field__c WHERE Page__c =:pageId];
            if (fieldListId.size() == 0) {
                Page__c delrecord = [Select Id from Page__c where Id =: pageId];
                if(delrecord != null){
                    delete delrecord;
                } 
            }
            
            List<Form_Field__c> newfieldListId = [SELECT Id ,Page__c FROM Form_Field__c WHERE Page__c =:pagedetail.id];
            if (newfieldListId.size() == 0) {
                Page__c delrecord = [Select Id from Page__c where Id =: pagedetail.id];
                if(delrecord != null){
                    delete delrecord;
                }
            }

            formWrapper wrpcls = fetchQuickFormField(formId);
            return wrpcls;
        }catch(Exception e){
            System.debug(e);
            return null;
        } 
    }
    
    // Add New Field After Drop Field In Main Component
    @AuraEnabled
    public static formWrapper addFieldRecord(String formId,String pageId, String fieldId) {
        try{
            Map<String ,String> labelMAp = new Map<String,String>();
          //  BaseField__mdt[] baseField = [SELECT Label,DataRecord__c FROM BaseField__mdt];  // Remove List<BaseField__mdt>SOQL Query outside the method by harsh  
            for(BaseField__mdt base : baseField){
                labelMAp.put(base.DataRecord__c,base.Label);
            }

            Form_Field__c formfield = new Form_Field__c();
            formfield.Form__c = formId;
            formfield.Page__c = pageId;
            formfield.Data_Record_Id__c = fieldId;
            if(formfield != null){
                insert formfield;
            }

            FieldAttribute__c fieldattribute = new FieldAttribute__c();
            fieldattribute.Form_Field__c = formfield.Id;
            if(labelMAp.get(formfield.Data_Record_Id__c) != Null){fieldattribute.Label__c = labelMAp.get(formfield.Data_Record_Id__c);}//add null check by harsh
            if(fieldattribute != null){
                insert fieldattribute;
            }

            if (fieldId == 'QFADDRESS') {
                Form_Field__c formfield1 = new Form_Field__c(Data_Record_Id__c ='CITY', Address_Id__c = formfield.Id, Form__c = formId, Page__c = pageId); // add formfield1 instead of addfield2 for naming convention by harsh 
                Form_Field__c formfield2 = new Form_Field__c(Data_Record_Id__c ='REGION', Address_Id__c = formfield.Id, Form__c = formId, Page__c = pageId);// add formfield2 instead of addfield3 for naming convention by harsh 
                Form_Field__c formfield3 = new Form_Field__c(Data_Record_Id__c ='POSTALCODE', Address_Id__c = formfield.Id, Form__c = formId, Page__c = pageId);// add formfield3 instead of addfield4 for naming convention by harsh 
                Form_Field__c formfield4 = new Form_Field__c(Data_Record_Id__c ='COUNTRY', Address_Id__c = formfield.Id, Form__c = formId, Page__c = pageId);// add formfield4 instead of addfield5 for naming convention by harsh 
                List<Form_Field__c> addressList = new List<Form_Field__c>{formfield1, formfield2, formfield3, formfield4};
                insert addressList;

                FieldAttribute__c fieldAttribute1 = new FieldAttribute__c(Form_Field__c = formfield1.Id, Label__c = 'City');// add fieldAttribute1 instead of addattribure2 for naming convention by harsh 
                FieldAttribute__c fieldAttribute2 = new FieldAttribute__c(Form_Field__c = formfield2.Id, Label__c = 'Region');// add fieldAttribute2 instead of addattribure3 for naming convention by harsh 
                FieldAttribute__c fieldAttribute3 = new FieldAttribute__c(Form_Field__c = formfield3.Id, Label__c = 'PostalCode');// add fieldAttribute3 instead of addattribure4 for naming convention by harsh 
                FieldAttribute__c fieldAttribute4 = new FieldAttribute__c(Form_Field__c = formfield4.Id, Label__c = 'Country');// add fieldAttribute4 instead of addattribure5 for naming convention by harsh 
                List<FieldAttribute__c> addressAttributeList = new List<FieldAttribute__c>{fieldAttribute1, fieldAttribute2, fieldAttribute3, fieldAttribute4};
                insert addressAttributeList;
            }

            else if(fieldId == 'QFFULLNAME'){
                Form_Field__c formfield1 = new Form_Field__c(Data_Record_Id__c ='First Name', Name_Id__c = formfield.Id, Form__c = formId, Page__c = pageId); // add formfield1 instead of addfield2 for naming convention by harsh 
                Form_Field__c formfield2 = new Form_Field__c(Data_Record_Id__c ='Last Name', Name_Id__c = formfield.Id, Form__c = formId, Page__c = pageId); // add formfield2 instead of addfield3 for naming convention by harsh 
                List<Form_Field__c> addressList = new List<Form_Field__c>{formfield1, formfield2};
                insert addressList;

                FieldAttribute__c fieldAttribute1 = new FieldAttribute__c(Form_Field__c = formfield1.Id, Label__c = 'First Name');// add fieldAttribute1 instead of addattribure2 for naming convention by harsh 
                FieldAttribute__c fieldAttribute2 = new FieldAttribute__c(Form_Field__c = formfield2.Id, Label__c = 'Last Name');// add fieldAttribute2 instead of addattribure3 for naming convention by harsh 
                List<FieldAttribute__c> addressAttributeList = new List<FieldAttribute__c>{fieldAttribute1, fieldAttribute2};
                insert addressAttributeList;
            }

            else if (fieldId == 'QFSCALERATING') {
                Field_Value__c likertvalue1 = new Field_Value__c(Form__c = formId, Page__c = pageId, Form_Field__c = formfield.Id, Likert__c = 'Statement', Likert_Data__c = 'Feedback');
                Field_Value__c likertvalue2 = new Field_Value__c(Form__c = formId, Page__c = pageId, Form_Field__c = formfield.Id, Likert__c = 'Option', Likert_Data__c = 'Very Poor ::: Poor ::: Fair ::: Good ::: Very Good');
                List<Field_Value__c> likertValueList = new List<Field_Value__c>{likertvalue1, likertvalue2};
                insert likertValueList;
            }

            if (fieldId == 'QFCHECKBOX' || fieldId == 'QFRADIOBUTTON' || fieldId == 'QFDROPDOWN') {
                List<String> l1 = new List<String>{'Option1','Option2','Option3'};
                List<Field_Value__c> fieldvalue = new List<Field_Value__c>();
                
                for(Integer i=0;i<l1.size();i++){
                    Field_Value__c ff = new Field_Value__c();
                    ff.Form__c = formId;
                    ff.Page__c = pageId;
                    ff.Form_Field__c = formfield.Id;            
                    ff.Name = l1[i];  
                    fieldvalue.add(ff);
                }
                insert fieldvalue;
            }
            formWrapper wrpcls = fetchQuickFormField(formId);
            return wrpcls;
        }catch(Exception e){
            System.debug(e);
            return null;
        } 
    }

    // Set Sequence of Field While Drop
    @AuraEnabled
    public static void SequenceSave(List<String> Listt){
        try{
            List<Form_Field__c> formList = new List<Form_Field__c>();
            Set<Id> SetId = new Set<Id>();
            Map<Id,String> mapList = new Map<Id,String>();
            for(String s: Listt){
                List<String> refStr = s.split(':::');
                SetId.add(refStr[0]);
                mapList.put(refStr[0],refStr[1]+';;'+refStr[2]);
            }
            formList = [SELECT Id,Name,Sequence__c,Page__c FROM Form_Field__c WHERE Id=: SetId];
            for(Form_Field__c f: formList){
                List<String> mapVal = mapList.get(String.valueOf(f.Id)).split(';;');
                f.sequence__c = Decimal.valueOf(mapVal[0]);
                f.Page__c = Id.valueOf(mapVal[1]);
            }
            if(formList != null){
                update formList;
            }
        }catch(Exception e){
            System.debug(e);
        } 
    }

    // Delete Page From Form
    @AuraEnabled
    public static formWrapper DeletePage(String pageId,String formId) {
        try{     
            if(pageId != null){
                List<Sobject> listobj = new List<Sobject>();

                Page__c delrecord = [Select Id from Page__c where Id =: pageId];
                Form_Field__c[] fieldlst = [SELECT Id ,Name, Page__c FROM Form_Field__c WHERE Page__c =: pageId];
                FieldAttribute__c[] formAttribute = [SELECT Id,Form_Field__c FROM FieldAttribute__c WHERE Form_Field__c IN: fieldlst];
                Field_Value__c[] fieldValue = [SELECT ID,Form_Field__c FROM Field_Value__c WHERE Form_Field__c IN: fieldlst];

                listobj.addAll(fieldValue);
                listobj.addAll(formAttribute);
                listobj.addAll(fieldlst);
                listobj.add(delrecord);

                if(listobj.size()>0){
                    delete listobj;
                }
            }
            formWrapper wrpcls = fetchQuickFormField(formId);
            return wrpcls;
        }catch(Exception e){
            System.debug(e);
            return null;
        } 
    }

    // Store Css Property
    @AuraEnabled
    public static void saveCss(String formId , String addStyle){
        try{
            Form__c formName = [SELECT id , cssProperties__c FROM Form__c WHERE id =: formId];  
            formName.cssProperties__c    = addStyle;
            if(formName != null){
                update formName;
            }
        }catch(Exception e){
            System.debug(e);
        } 
    }

    // Fetch Css Property
    @AuraEnabled
    public static String fetchCss(String formId){
        try{ 
            System.debug('Fetch form css is ' + [SELECT id, cssProperties__c FROM Form__c WHERE id =: formId].cssProperties__c);
            return [SELECT id, cssProperties__c FROM Form__c WHERE id =: formId].cssProperties__c;
        }catch(Exception e){
            System.debug(e);
            return null;
        } 
    }

    // Upload Attachment for background image
    @AuraEnabled
    public static Id SaveFile(Id parentId, String fileName, String base64Data, String contentType) {
        try{
            base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');
            Attachment attach = new Attachment();
            attach.parentId = parentId;
            attach.Body = EncodingUtil.base64Decode(base64Data);
            attach.Name = fileName;
            attach.ContentType = contentType;
            if(attach != null){
                insert attach;
            }
            return attach.Id;
        }catch(Exception e){
            System.debug(e);
            return null;
        } 
    }

    // Save page bg images
    @AuraEnabled
    public static Id SavePageFile(Id parentId, String fileName, String base64Data, String contentType) {
        try{
            base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');
            Attachment attach = new Attachment();
            attach.parentId = parentId;
            attach.Body = EncodingUtil.base64Decode(base64Data);
            attach.Name = fileName;
            attach.ContentType = contentType;
            if(attach != null){
                insert attach;
            }
            return attach.Id;
        }catch(Exception e){
            System.debug(e);
            return null;
        } 
    }

    // Delete  form bg images
    @AuraEnabled
    public static void DeleteFile(Id formId, Id myId) {
        try{
            Attachment attach=[SELECT id, parentId, Body, name, ContentType FROM Attachment WHERE parentId =: formId AND id =: myId]; // Remove List by harsh
            if(attach != null){
                delete attach;
            } 
        }catch(Exception e){
            System.debug(e);
        } 
    }

    // Delete page bg images
    @AuraEnabled
    public static void DeletePageFile(Id formId , Id myId) {
        try{
            Attachment attach=[SELECT id, parentId, Body, name, ContentType FROM Attachment WHERE parentId=:formId AND id=: myId]; // Remove List by harsh
            if(attach != null){
                delete attach;
            } 
        }catch(Exception e){
            System.debug(e);
        } 
    }

    // save  page Css Property
    @AuraEnabled
    public static void savepageCss(String formId , String addStyle){
        try{
            Form__c formName = [SELECT id , pageCss__c from Form__c WHERE id =: formId]; 
            formName.pageCss__c  = addStyle;
            if(formName != null){
                update formName;
            } 
        }catch(Exception e){
            System.debug(e);
        } 
    }

    // save  page bg image  Css id  Property
    @AuraEnabled
    public static void savepageCssId(String formId , String addStyle){
        try{
            Form__c imageId = [SELECT id , pageBackgroundImageId__c from Form__c WHERE id =: formId]; 
            imageId.pageBackgroundImageId__c = addStyle;
            if(imageId != null){
                update imageId;
            } 
        }catch(Exception e){
            System.debug(e);
        } 
    }

    // save  page bg image  Css id  Property
    @AuraEnabled
    public static void saveFormCssId(String formId , String addStyle){
        try{
            Form__c imageId = [SELECT id , formBgImage__c from Form__c WHERE id =: formId]; 
            imageId.formBgImage__c = addStyle;
            if(imageId != null){
                update imageId;
            } 
        }catch(Exception e){
            System.debug(e);
        } 
    }
 
    // fetch  page bg image  Css id  Property
    @AuraEnabled
    public static String fetchpageCssId(String formId){
        try{
            Form__c imageId = [SELECT id , pageBackgroundImageId__c from Form__c WHERE id =: formId ]; 
            return imageId.pageBackgroundImageId__c;
        }catch(Exception e){
            System.debug(e);
            return null;
        } 
    }

    // fetch  page bg image  Css id  Property
    @AuraEnabled
    public static String fetchFormCssId(String formId){
        try{
            Form__c imageId = [SELECT id , formBgImage__c from Form__c WHERE id =: formId ]; 
            return imageId.formBgImage__c;
        }catch(Exception e){
            System.debug(e);
            return null;
        } 
    }

    // Fetch  page Css Property
    @AuraEnabled
    public static String fetchpageCss(String formId){
        try{
            Form__c formName = [SELECT id , pageCss__c from Form__c WHERE id =: formId];  
            return formName.pageCss__c  ;
        }catch(Exception e){
            System.debug(e);
            return null;
        } 
    }

    // Return Thank You Page Data
    @AuraEnabled
     public static Form__c thanksdata(String formId, String thanksLabel, String ThanksType, String thanksTxt, String thanksURL, String richtxt, String redirectTxt, String redirectUrl){
         try {
            Form__c formName = [SELECT id, ThankYou_Label__c, ThankYou_Page__c, ThankYou_Text__c, ThankYou_URL__c, ThankYou_RichText__c, Redirect_Text__c, Redirect_URL__c FROM Form__c WHERE id =: formId]; 
            formName.ThankYou_Page__c = ThanksType;
            formName.ThankYou_Label__c = thanksLabel;
            if (ThanksType == 'ThankYou_Text') {
                formName.ThankYou_Text__c = thanksTxt;
            } 
            else if(ThanksType == 'ThankYou_URL'){
                formName.ThankYou_URL__c = thanksURL;
            } 
            else if(ThanksType == 'ThankYou_RichText'){
                formName.ThankYou_RichText__c = richtxt;
            } 
            else if(ThanksType == 'Redirect_Text_And_URL'){
                formName.Redirect_Text__c = redirectTxt;
                formName.Redirect_URL__c = redirectUrl;
            }
            if(formName != null){
                update formName;
            } 
            return formName;
        } 
        catch (Exception e) {
            System.debug(e);
            return null;
        }
    }


    // Save Email NOtification Data
//     @AuraEnabled
//     public static void  saveNotificationData(String formId, /*String fromName,String fromEmail,*/String replyToEmail,String massageSubject,String massageBody,Boolean emailattachment){ // add void method by harsh 
//         try {
//             String eMessage = '';
//             Form__c form = [SELECT id,Name,Title__c FROM Form__C WHERE Id =: formId];
//             System.debug('form for save email :::'+form);
//             // form.notification_mail_from_email__c = fromEmail;
//             form.notification_replyToEmail__c = replyToEmail;
//             // form.notification_mail_from_name__c = fromName;
//             form.notification_mail_message_subject__c = massageSubject;
//             form.notification_mail_message_body__c = massageBody;
//             form.NotificationMail_EmailAttachment__c=emailattachment;
//             upsert form;
//             // eMessage = 'Success';
//             // return eMessage; 
//        } catch (Exception e) {
//             System.debug(e);
//             // return null; 
//        }
//    }

   // Save Email Recipient List
//    @AuraEnabled
//    public static String saveEmailRecipientList(String formId, String emailRecipientList){ // add void method by harsh 
//         try {
//             System.debug('testing :::');
//             System.debug('emailRecipientList>>'+emailRecipientList);
//             Form__c form = [SELECT id, notification_mail_recipient_email__c FROM Form__C WHERE Id =: formId ];
//             // System.debug('form for add email::'+form);
//             form.notification_mail_recipient_email__c = emailRecipientList;
//             update form;
//             System.debug('form for add email::'+form);
//             // return 'success'; 
//             return emailRecipientList; 
//         } 
//         catch(Exception e) {
//                 System.debug(e);
//                 return null; 
//         }
//    }

    // Delete Email Recipient
//     @AuraEnabled
//     public static String deleteRecipientEmail(String formId, String emailRecipientList){ // add void method by harsh 
//        try {
//             String eMessage = '';
//             String recipentList = '';
//             Form__c form = [SELECT id,Name,Title__c,notification_mail_recipient_email__c FROM Form__C WHERE Id =: formId];
//             System.debug('form for delete list::'+form);
//             form.notification_mail_recipient_email__c = emailRecipientList;
//             recipentList = emailRecipientList;
//             // delete form;
//             update form;
//             System.debug('delete list:'+form);
//             eMessage = 'Success';
//             return recipentList; 
//        } catch (Exception e) {
//             System.debug(e);
//             return null; 
//        }
//    }
   
    // Edit Email Recipients
    // @AuraEnabled
    // public static String editRecipientEmail(String formId, String emailRecipientList){ // add void method by harsh 
    //     try {
    //        String eMessage = '';
    //        String recipentList = '';
    //        System.debug('test11');
    //        Form__c form = [SELECT id,Name,Title__c,notification_mail_recipient_email__c FROM Form__C WHERE Id =: formId];
    //        System.debug('form for edit recepient::'+form);
    //        form.notification_mail_recipient_email__c = emailRecipientList;
    //        recipentList = emailRecipientList;
    //        update form;
    //        System.debug('form for update list::'+form);
    //        eMessage = 'Success';
    //        return recipentList; 
    //    } catch (Exception e) {
    //         System.debug(e);
    //         return null; 
    //    }
    // }

    // Return Email Recipients List
    // @AuraEnabled
    // public static notificationwrapper loadRecipient(String formId){
    //     try {
    //         String eMessage = '';
    //         Form__c form = [SELECT id,Name,Title__c, notification_mail_from_email__c, notification_replyToEmail__c, notification_mail_message_body__c, notification_mail_message_subject__c, notification_mail_recipient_email__c FROM Form__C WHERE Id =: formId LIMIT 1];
            
    //         System.debug('notification_mail_recipient_email__c>>>>>>>>>'+form.notification_mail_recipient_email__c);
    //         System.debug('notification_mail_from_email__c>>>>>'+form.notification_mail_from_email__c);
    //         System.debug('notification_replyToEmail__c>>>>>>>>'+form.notification_replyToEmail__c);
    //         System.debug('notification_mail_message_body__c>>>>>>>>>>>>'+form.notification_mail_message_body__c);
    //         System.debug('notification_mail_message_subject__c>>>>>>>>>'+form.notification_mail_message_subject__c);
    //         System.debug('notification_mail_recipient_email__c>>>>>>>>>'+form.notification_mail_recipient_email__c);

    //         notificationwrapper ntf_wrp =new notificationwrapper();
    //         ntf_wrp.recever_mailid = String.valueOf(form.notification_mail_recipient_email__c);
    //         ntf_wrp.reply_mailid = form.notification_replyToEmail__c;
    //         ntf_wrp.body_mail = form.notification_mail_message_body__c;
    //         ntf_wrp.subject_mail = form.notification_mail_message_subject__c;
    //         ntf_wrp.attch_receved = 'true';

    //         System.debug(ntf_wrp);
    //         return ntf_wrp;

    //     } catch (Exception e) {
    //         System.debug('loadRecipient'+e);
    //         return null;
    //     }
    // }



    // For Get Public Link Of Form
    @AuraEnabled
    public static List<String> siteurl(String Formid){
        try{
            List<Site> siteList = [SELECT GuestUserId, Name, MasterLabel, Subdomain, OptionsRequireHttps, UrlPathPrefix FROM Site WHERE Status = 'Active'];
            List<String> siteFullUrlList = new List<String>();
            /** We can get instance of the org from organisation object **/
            if(siteList.size() == 0){
                siteFullUrlList.add('Deactivate');
            }
            else{
                /** We can get instance of the org from organisation object **/
                Organization org = [SELECT InstanceName,Name, IsSandbox, OrganizationType FROM Organization];
                if(siteList != null && siteList.size() != 0) {
                    for(Site s: siteList) {
                        if(s.Subdomain != null) {
                            String httpStr = 'http://';
                            if(s.OptionsRequireHttps == true) {
                                httpStr = 'https://';
                            }
                            String siteFullUrl = httpStr;
                            if(org.IsSandbox == true) {
                                siteFullUrl += 'sandbox-';
                            }
                            siteFullUrl += s.Subdomain + '.';
                            siteFullUrl += (org.IsSandbox || org.OrganizationType == 'Developer Edition' ? (org.InstanceName.toLowerCase() + '.') : '') + 'force.com';
                            if(s.UrlPathPrefix == null) {
                                siteFullUrlList.add(siteFullUrl);
                            }
                        }
                    }
                }
            }
            return siteFullUrlList;
        } catch (Exception e) {
            System.debug(e);
            return null;
        }
    }

    // save deleted page images
    @AuraEnabled
    public static void saveDeletedPageImages(String formId , Id DeleteImage){
        try{
            Form__c DeletedImages = [SELECT id , DeletedPageImageIds__c from Form__c WHERE id =: formId]; 
            DeletedImages.DeletedPageImageIds__c = DeleteImage;
            if(DeletedImages != null){
                update DeletedImages;
            } 
        }catch(Exception e){
            System.debug(e);
        } 
    }
    
        // save deleted form images
        @AuraEnabled
        public static void saveDeletedFormImages(String formId , Id DeleteformImage){
            try{
                Form__c Deleted= [SELECT id , DeletedFormImageId__c from Form__c WHERE id =: formId]; 
                Deleted.DeletedFormImageId__c =  DeleteformImage;
                if(Deleted != null){
                    update Deleted;
                } 
            }catch(Exception e){
                System.debug(e);
            } 
        }

    // Fetch deted page image 
    @AuraEnabled
    public static String fetchDeletedPageImages(String formId){
        try{
            Form__c DeletedImages = [SELECT id , DeletedPageImageIds__c from Form__c WHERE id =: formId]; 
           
            if(DeletedImages != null){
                return DeletedImages.DeletedPageImageIds__c;
            }else{
                return null;
            }

        }catch(Exception e){
            System.debug(e);
            return null;
        } 
    }

        // Fetch deleted form image 
        @AuraEnabled
        public static String fetchDeletedFormImages(String formId){
            try{
                Form__c DeleteImage = [SELECT id , DeletedFormImageId__c from Form__c WHERE id =: formId]; 
               
                if(DeleteImage != null){
                    return DeleteImage.DeletedFormImageId__c;
                }else{
                    return null;
                }
    
            }catch(Exception e){
                System.debug(e);
                return null;
            } 
        }
    



    // Wrapper Class
    public class formWrapper{
        @AuraEnabled public Form__c formName {get; set;} 
        @AuraEnabled public List<PageWrapper> PageWrapperList {get;set;}
        @AuraEnabled public List<BaseField__mdt> basefield {get;set;}
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

    // public class notificationwrapper{
    //     @AuraEnabled public String recever_mailid {get;set;}
    //     @AuraEnabled public String reply_mailid {get;set;}  
    //     @AuraEnabled public String body_mail {get;set;}
    //     @AuraEnabled public String subject_mail {get;set;}
    //     @AuraEnabled public String attch_receved {get;set;}
    // } 

}