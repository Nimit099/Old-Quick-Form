public class PreviewFormPage_extensions {

    public string formname {get;set;}
    public Map<String , String> sign_map { get; set; }

    public Map<String, Object> getAccount() {
        try {
            System.debug(ApexPages.currentPage().getParameters().get('Id'));
            String id = ApexPages.currentPage().getParameters().get('Id');
            System.debug(id);
            // Form_Submission__c acc = [SELECT Id, Name, Form_Fields_Value__c, Form__c FROM Form_Submission__c WHERE Id =: id ];
            Form_Submission__c acc = [SELECT Id, Name, Form_Fields_Value__c, Form__c FROM Form_Submission__c WHERE Id ='a0554000007AF0OAAW'];
            Form__c frm = [SELECT Id, Name, Title__c FROM Form__c WHERE Id =: acc.Form__c ];
            formname = frm.Title__c;
            String sd = acc.Form_Fields_Value__c;
            String sign_prefix = System.Label.signature_prefix;
            String doc_prefix = System.Label.upload_doc_prefix;
            System.debug('signature_prefix'+sign_prefix);
            System.debug('doc_prefix'+doc_prefix);
            sign_map = new Map<String , String>();
            Map<String, Object> m = (Map<String, Object>) System.JSON.deserializeUntyped(sd);
            
            Map<String, Object> ss = new Map<String, Object>();
            for(String n: m.keySet()){
                Map<String, Object> resobj = ( Map<String, Object> ) m.get(n);
                String pn = resobj.get('pn').toString();
                String pst = resobj.get('pst').toString();
                Map<String, Object> fld_id = ( Map<String, Object> ) resobj.get('temp_mappp');

                Map<String, Object> temp = new Map<String, Object>();
                Map<String, Object> temp_id = new Map<String, Object>();
    
                for(String j: fld_id.keySet()){
                    Map<String, Object> fld_value = ( Map<String, Object> ) fld_id.get(j);
                    Map<String, Object> temp_value = new Map<String, Object>();

                    String value = fld_value.get('value').toString();
                    if(value.length() >= 6 && value.substring(0,6) == sign_prefix){
                        sign_map.put(j, value.substring(7));
                        temp_value.put('key', fld_value.get('key'));
                        temp_value.put('value', sign_prefix);
                    }
                    else if(value.length() >= 6 && value.substring(0,6) == doc_prefix){
                        System.debug('docs'+value.substring(7));
                        // sign_map.put(j, value.substring(7));
                        temp_value.put('key', fld_value.get('key'));
                        temp_value.put('value', doc_prefix);
                    }
                    else{
                        temp_value.put('key', fld_value.get('key'));
                        temp_value.put('value', fld_value.get('value'));
                    }
                    temp_id.put(j, temp_value);
                }
                temp.put('pn', resobj.get('pn'));
                temp.put('pst', resobj.get('pst'));
                temp.put('temp_mappp', temp_id);
                ss.put(n, temp);
            }
            System.debug(ss);
            System.debug(sign_map);
            return ss;
        } catch (Exception e) {
            Map<String, Object> mm = new Map<String, Object>();
            return mm;
        }
    }
}