public with sharing class ExceptionHandler {                    //implemented with sharing to fix the PMD issue of ApexSharingViolations
    
    public ExceptionHandler() {
        
    }
    public static final string CLASS_NAME = 'ExceptionHandler';             //added final to fix PMD issue of VariableNamingConventions
    public static void logException(Exception ex){
        
    }
    
    @future    
    public static void futureLogException(String exstr, String className, String methodName){
        Email_Parsor_Error__c errorlog;
        try{
            errorlog = new Email_Parsor_Error__c();
            errorlog.Class_Name__c = className;
            errorlog.Exception_Message__c = exstr;
            errorlog.Line_Number__c = '';
            errorlog.Method_Name__c = methodName;
            errorlog.Exception_Type__c = '';
            errorlog.More_Details__c ='';
            Database.SaveResult result = Database.insert(errorlog);
        }catch(Exception lex){
            ExceptionHandler.logException(lex, CLASS_NAME, 'futureLogException');
        }
    }
    
    public static GenericException logException(Exception ex, String className, String methodName){
        
        Integer counter = 0;
        Email_Parsor_Error__c errorlog = ExceptionHandler.logException(ex, className, methodName, '',(ex!=null?ex.getTypeName():''));
        list<String> formattingArguments = new List<String>();
        formattingArguments.add(String.valueOf(errorlog.Exception_Number__c));
        String formattedMessage = String.format('Test', formattingArguments);
        
        return new GenericException(null, formattedMessage);
    }
    
    public static Email_Parsor_Error__c logException(Exception ex, String className, String methodName, String moreDetails,String exceptionType){
        Email_Parsor_Error__c errorlog;
        try{
            errorlog = new Email_Parsor_Error__c();
            errorlog.Class_Name__c = className;
            errorlog.Exception_Message__c = ex.getMessage();
            errorlog.Line_Number__c = String.valueOf(ex.getLineNumber());
            errorlog.Method_Name__c = methodName;
            errorlog.Exception_Type__c = exceptionType!=null?exceptionType:ex.getTypeName();
            errorlog.More_Details__c = getExceptionInfo(ex);
            Database.SaveResult result = Database.insert(errorlog);
        }catch(Exception lex){
            ExceptionHandler.logInfo(CLASS_NAME, 'logException', lex.getStackTraceString(), lex.getMessage());
        }
        
        return errorlog;
    }
    
    @future
    public static void logInformation(String className, String methodName, String moreDetails,String addldetails){
        ExceptionHandler.logInfo( className,  methodName,  moreDetails, addldetails);
    }
    
    public static void logInfo(String className, String methodName, String moreDetails,String addldetails){
        Email_Parsor_Error__c errorlog = null;
        try{
            errorlog = new Email_Parsor_Error__c();
            errorlog.Class_Name__c = className;
            errorlog.Exception_Message__c = addldetails;
            errorlog.Line_Number__c = '';
            errorlog.Method_Name__c = methodName;
            errorlog.Exception_Type__c = 'Info';
            errorlog.More_Details__c = moreDetails;
            Database.SaveResult result = Database.insert(errorlog);
        }catch(Exception lex){
            ExceptionHandler.logException(lex, CLASS_NAME, 'logInfo');
        }
    }
    
    private static string getExceptionInfo(Exception exp){
        ExceptionInfo exInfo = new ExceptionInfo();
        
        exInfo.type = exp.getTypeName();
        exInfo.stackTrace = exp.getStackTraceString();
        
        if (exp instanceof GenericException){   
            //If the exception is custom exception
            GenericException gExp = (GenericException)exp;
            exInfo.isCustomException = true;
            exInfo.reasonCode = gExp.getReasonCode();
            exInfo.message = gExp.getErrorMsg();                    
        } 
        else{
            exInfo.message = exp.getMessage();
        }       
        
        return exInfo.asString();
    }     
}