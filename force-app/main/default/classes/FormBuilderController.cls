public with sharing class FormBuilderController {
   
    
    @AuraEnabled
    public static List<BaseField_mdt__mdt> GetFieldsMetaData(){
     try {
         List<BaseField_mdt__mdt> basefield = BaseField_mdt__mdt.getAll().values();
         return basefield;
     } catch (Exception e) {
         throw new AuraHandledException(e.getMessage());
     }
    }

    @AuraEnabled
    public static StylesWrapper GetStyles(){
        try {
            StylesWrapper sw = new StylesWrapper();
            sw.AlignmentProp = Alignment__mdt.getAll().values();
            sw.BgPositionProp = Background_position__mdt.getAll().values();
            sw.BgRepeatProp = Background_repeat__mdt.getAll().values();
            sw.BgsizeProp = Background_size__mdt.getAll().values();
            sw.BorderStylesProp=Border_styles__mdt.getAll().values();
            sw.FixPosProp = Fix_position__mdt.getAll().values();
            sw.FontProp = Font__mdt.getAll().values();
            sw.FontLineHeightProp = Font_Line_Height__mdt.getAll().values();
            sw.FontStyleProp = Font_Style__mdt.getAll().values();
            sw.FontWeightProp = Font_Weight__mdt.getAll().values();
            sw.FormDirectionProp = Form_Direction__mdt.getAll().values();
            return sw;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    //Method to get Field's Data
    @Auraenabled
    public static List<List<String>> getFields(String id){
        List<String> types= new List<String>();
        Form__c FormDetail = [SELECT Id, Mapped_Objects__c FROM Form__c WHERE Id=:id LIMIT 1];
        //List<Form_Page__c> pageList = [SELECT Id, Name, Page_Number__c FROM Form_Page__c WHERE Form__c=:Form_Id ORDER BY Page_Number__c ASC];
        types = (FormDetail.Mapped_Objects__c).split(',');
        System.debug(types);
        List<List<String>> allFields = new List<List<String>>();
        List<List<String>> allReqiredFields= new List<List<String>>();
        List<Form_Fields__c> FieldList = new List<Form_Fields__c>();

        for (String type : types) {
            Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
            Schema.SObjectType leadSchema = schemaMap.get(type);
            Map<String, Schema.SObjectField> fieldMap = leadSchema.getDescribe().fields.getMap();
            List<String> Fields = new List<String>();
            Set<String> compoundFields = new Set<String>(); 
            Integer Position = 0;
            for (String fieldName: fieldMap.keySet()) {
                if (fieldMap.get(fieldName).getDescribe().isUpdateable() && fieldMap.get(fieldName).getDescribe().isNillable()==true){
                    // list of all field API name
                    System.debug(fieldMap.get(fieldName).getDescribe().getCompoundFieldName()+'===> getfields');
                    if(fieldMap.get(fieldName).getDescribe().getCompoundFieldName()==null)
                    {Fields.add(fieldMap.get(fieldName).getDescribe().getLabel()+'./.'+ fieldMap.get(fieldName).getDescribe().getType());}//It provides to get the object fields label.
                    //It provides to get the object fields label.
                    else{
                          String temp = fieldMap.get(fieldName).getDescribe().getCompoundFieldName();
                          String type1='';
                           boolean hasAddress = temp.Contains('Address');
                           if(hasAddress){
                            type1 = 'QFADDRESS';
                           }
                        compoundFields.add(temp+'./.'+type1);
                    }
                }
                
            }
            Fields.addAll(compoundFields);
            allFields.add(Fields);
        }
        // if(!FieldList.isEmpty()){
        //     insert FieldList;
        // }
        System.debug(allFields);

        return allFields;
    }


    @AuraEnabled
    public static List<Form_Page__c> GetFormPage(String Form_Id){
        try {
            List<Form_Page__c> pageList = [SELECT Id, Name, Page_Number__c FROM Form_Page__c WHERE Form__c=:Form_Id ORDER BY Page_Number__c ASC];
            return pageList;
     } catch (Exception e) {
         throw new AuraHandledException(e.getMessage());
     }
    }
    public class StylesWrapper{
        @AuraEnabled
        public list<Alignment__mdt> AlignmentProp{get; set;}
        @AuraEnabled
        public list<Background_position__mdt> BgPositionProp{get; set;}
        @AuraEnabled
        public list<Background_repeat__mdt> BgRepeatProp{get;set;}
        @AuraEnabled
        public list<Background_size__mdt> BgsizeProp{get;set;}
        @AuraEnabled
        public list<Border_styles__mdt> BorderStylesProp{get;set;}
        @AuraEnabled
        public list<Fix_position__mdt> FixPosProp{get;set;}
        @AuraEnabled
        public list<Font__mdt> FontProp{get;set;}
        @AuraEnabled
        public list<Font_Line_Height__mdt> FontLineHeightProp{get;set;}
        @AuraEnabled
        public list<Font_Style__mdt> FontStyleProp{get;set;}
        @AuraEnabled
        public list<Font_Weight__mdt> FontWeightProp{get;set;}
        @AuraEnabled
        public list<Form_Direction__mdt> FormDirectionProp{get;set;}

    }

    @AuraEnabled
    public static List<Scale_Rating__mdt> getScaleRating(){
        try {
            return Scale_Rating__mdt.getAll().values();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Form_Fields__c> CreateFieldRecord(String Form_Id,String Name,String Form_Page_Id,Decimal Position,boolean isold,String Field_Page_Id){
        try {
            boolean nimit=true;
            if(nimit==true){
              
             System.debug('old page id-->'+Form_Page_Id);
            Form_Fields__c field = new Form_Fields__c();
            List<Form_Fields__c> updateList= new List<Form_Fields__c>();
            
            List<Form_Fields__c> fieldList=[SELECT Id,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE Form_Page__c=:Form_Page_Id ORDER BY Field_Order__c ASC ];
             if(Field_Page_Id!=''){
                Form_Fields__c field_which_page_changed = [SELECT Id,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE Id=:Name ORDER BY Field_Order__c ASC ];
                field_which_page_changed.Form_Page__c = Form_Page_Id;
                update field_which_page_changed;
             }
            for(Form_Fields__c it: fieldList){
                if(it.Field_Order__c > Position){
                    if(isold){
                        System.debug(it.Id);
                        System.debug(Name);
                      if(it.Id == Name)  {
                      
                        it.Field_Order__c = Position+1;
                      }
                      else{
                        it.Field_Order__c = it.Field_Order__c+1;
                      }
                    }
                    else{
                        it.Field_Order__c = it.Field_Order__c+1;
                    }
                 
                   updateList.add(it);
                }
            }
            if(!updateList.isEmpty()){
                update updateList;
            }
            if(!isold){
            string form = [SELECT Mapped_Objects__c from Form__c WHERE Id=:Form_Id].Mapped_Objects__c;
            List<String> Objects = form.split(',');
            List<String> label  = Name.split(',');
            String firstLabel = label[0];
            System.debug(firstLabel);
            for (String type : Objects) {
                Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
                Schema.SObjectType leadSchema = schemaMap.get(type);
                Map<String, Schema.SObjectField> fieldMap = leadSchema.getDescribe().fields.getMap();
                List<String> Fields = new List<String>();
                for (String fieldName: fieldMap.keySet()) {
                    if (fieldMap.get(fieldName).getDescribe().isUpdateable()){
                     
                       if(fieldMap.get(fieldName).getDescribe().getLabel()==firstLabel){
                        System.debug('##Field API Name='+fieldName);// list of all field API na
                        System.debug('type:=>'+type);
                        field.Mapped_Obj__c = type;
                        field.Field_Mapping__c = fieldName;
                       }
                  
                         
                    }
                }
            }
            if(Position==0){
              Form_Fields__c maxPostion =   [SELECT Id,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c ORDER BY Field_Order__c DESC LIMIT 1 ];
              if(maxPostion !=null){
                Position = maxPostion.Field_Order__c;
              }  
            }
            field.Name= Name;
            field.Form__c =  Form_Id;
            field.Form_Page__c = Form_Page_Id;
            field.Field_Order__c = Position+1;
          
            insert field;}
        nimit=false;
           fieldList=[SELECT Id,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c ORDER BY Field_Order__c ASC];
        return fieldList;
      
    }
    else return null;
            
            //System.debug('5');
//                      Form_Fields__c field = new Form_Fields__c(Name= 'Account2',Form__c =  'a0B1y00000013pXEAQ',Form_Page__c = 'a091y000004uuFeAAI');
//                 // field.Name= 'Account2';
//                 // field.Form__c =  'a0B1y00000013pXEAQ';
//                 // field.Form_Page__c = 'a091y000004uuFeAAI';
//                // field.Field_Order__c = 2;
// insert field1;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

   @AuraEnabled
   public static pageWrapper addPageBreak(Id FormId,String Name,String Form_Page_Id,Integer Position,String TargetedFeild){
    try {
        List<Form_Page__c> allPages= [SELECT id from Form_Page__c];
        Integer total_pages = allPages.size()+1;
        Form_Page__c newFormPage= new Form_Page__c();
        System.debug(FormId);
        System.debug('debugsss-->>');
        System.debug(Name);
        newFormPage.Form__c = FormId;
        newFormPage.Name = 'New Form';
        newFormPage.Page_Number__c = total_pages;
        insert newFormPage;

        String newId =  [SELECT Id From Form_Page__c where Page_Number__c=: total_pages].Id;
        if(Position!=0){
            List<Form_Fields__c> updateList= new List<Form_Fields__c>();
        List<Form_Fields__c> formFields = [SELECT Id,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE Form_Page__c=:Form_Page_Id ORDER BY Field_Order__c ASC ];
        for(Form_Fields__c it: formFields){
         if(it.Field_Order__c>Position){
            it.Form_Page__c = newId;
            updateList.add(it);
         }
        }
        update updateList;
        formFields=[SELECT Id,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c ORDER BY Field_Order__c ASC];
        pageWrapper pw = new pageWrapper();
        pw.fieldList = formFields;
        pw.pageList = [SELECT Id, Name, Page_Number__c FROM Form_Page__c WHERE Form__c=:FormId ORDER BY Page_Number__c ASC];
        return pw;
        
    }
        return null;
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
   }
   public class pageWrapper{
    @AuraEnabled
    public list<Form_Fields__c> fieldList{get; set;}
    @AuraEnabled
    public list<Form_Page__c> pageList{get; set;}}



    @AuraEnabled
    public static List<Form_Fields__c> getFieldsRecords(Id id){
        try {
            //string form = [SELECT Mapped_Objects__c from Form__c WHERE Id=:id].Mapped_Objects__c;
           // List<String> Objects = form.split(',');
          
            Form__c FormDetail = [SELECT Id, Mapped_Objects__c FROM Form__c WHERE Id=:id LIMIT 1];
            //List<Form_Page__c> pageList = [SELECT Id, Name, Page_Number__c FROM Form_Page__c WHERE Form__c=:Form_Id ORDER BY Page_Number__c ASC];
            List<String> types = (FormDetail.Mapped_Objects__c).split(',');
            Decimal Position =0;
            List<Form_Page__c> AllFormPages = [SELECT ID From Form_Page__c where Form__c =: FormDetail.Id ORDER BY Page_Number__c] ;
            boolean hasRequiredField = false;
            List<Form_Fields__c> fieldContainsRequireCheck = [SELECT Name From Form_Fields__c where Form_Page__c=:AllFormPages.get(0).Id];
            for(Form_Fields__c it: fieldContainsRequireCheck){
               List<String> temp=  it.Name.split(',');
               if(temp.size()==3){
                 if(temp.get(2) == 'isrequired'){
                    hasRequiredField = true;
                 }
               }
            }
            if(hasRequiredField == false){
            Integer iteration=0;
            List<Form_Fields__c> Fields = new List<Form_Fields__c>();
            for (String type : types) {
                Position = 0;
                Form_Page__c page_Id = AllFormPages.get(iteration);
                Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
                Schema.SObjectType leadSchema = schemaMap.get(type);
                Map<String, Schema.SObjectField> fieldMap = leadSchema.getDescribe().fields.getMap();
                for (String fieldName: fieldMap.keySet()) {
                    if (fieldMap.get(fieldName).getDescribe().isUpdateable()){
                        
                        
                        if( fieldMap.get(fieldName).getDescribe().isNillable()==false){
                            Position=Position+1;
                            System.debug('##Field API Name='+fieldName);
                            Form_Fields__c field = new Form_Fields__c();
                            //requiredFieldList.add(fieldMap.get(fieldName).getDescribe().getLabel()+'./.'+ fieldMap.get(fieldName).getDescribe().getType());
                            field.Mapped_Obj__c = type;
                            field.Field_Mapping__c = fieldName;
                            field.Name= fieldMap.get(fieldName).getDescribe().getLabel()+','+fieldMap.get(fieldName).getDescribe().getType()+',isrequired';
                            field.Form__c =  FormDetail.Id;
                            field.Form_Page__c = page_Id.Id;
                            field.Field_Order__c = Position+1;
                            Fields.add(field);
                        }
                         
                    }
                }
                iteration=iteration+1;
            }
        
            for(Form_Fields__c it: Fields ){
                System.debug(it.Name+'--->>>');
                System.debug(it.Form_Page__c+'---->>>>');
            }
           insert Fields;
        }
           List<Form_Fields__c> fieldList=[SELECT Id,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c];

           return fieldList;
          
        
       
        
        }
         
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static pageWrapper createPage(Integer totalPages,Id formId){
        try {
            Form_Page__c newFormPage= new Form_Page__c();
            newFormPage.Form__c = formId;
            newFormPage.Page_Number__c = totalPages +1;
            newFormPage.Name= 'New Form Page';
            insert newFormPage;
           List<Form_Fields__c> formFields=[SELECT Id,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c ORDER BY Field_Order__c ASC];
            pageWrapper pw = new pageWrapper();
            pw.fieldList = formFields;
            pw.pageList = [SELECT Id, Name, Page_Number__c FROM Form_Page__c WHERE Form__c=:FormId ORDER BY Page_Number__c ASC];
            return pw;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static pageWrapper renameform(Id id, String rename,Id FormId){
        try {
            Form_Page__c form = [SELECT Name FROM Form_Page__c WHERE Id =: id];
            form.Name = rename;
            update form;     
            List<Form_Fields__c> formFields=[SELECT Id,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c ORDER BY Field_Order__c ASC];
            pageWrapper pw = new pageWrapper();
            pw.fieldList = formFields;
            pw.pageList = [SELECT Id, Name, Page_Number__c FROM Form_Page__c WHERE Form__c=:FormId ORDER BY Page_Number__c ASC];
            return pw;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static string renameMainform(String rename,Id FormId){
        try {
            Form__c renameform = [SELECT Name from Form__c WHERE Id=:FormId];
            renameform.Name = rename;
            update renameform;
            return rename;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static pageWrapper deletePage(Id FormId, Id PageId){
        try {
            Form_Page__c deletePage= [SELECT Id from Form_Page__c where Id=:PageId];
            boolean hasRequiredField = false;
            List<Form_Fields__c> fieldContainsRequireCheck = [SELECT Name From Form_Fields__c where Form_Page__c=:PageId];
            for(Form_Fields__c it: fieldContainsRequireCheck){
               List<String> temp=  it.Name.split(',');
               if(temp.size()==3){
                 if(temp.get(2) == 'isrequired'){
                    hasRequiredField = true;
                 }
               }
            }
            if(hasRequiredField==false){
            delete deletePage;}
            List<Form_Fields__c> formFields=[SELECT Id,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c ORDER BY Field_Order__c ASC];

            pageWrapper pw = new pageWrapper();
            pw.fieldList = formFields;
            pw.pageList = [SELECT Id, Name, Page_Number__c FROM Form_Page__c WHERE Form__c=:FormId ORDER BY Page_Number__c ASC];
            return pw;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Form__c formDetails(Id id){
        try {
            return [SELECT Id, Captcha_Type__c, Progress_Indicator__c, Name FROM Form__c where Id=:id];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static string editFormSubmit(Id id,String name, String progressIn,String captcha){
        try {
            Form__c editForm =  [SELECT Id, Captcha_Type__c, Progress_Indicator__c, Name FROM Form__c where Id=:id];
            if(captcha=='None'){
                editForm.Captcha_Type__c ='';
            }
            else{
            editForm.Captcha_Type__c = captcha;}
            if(progressIn== 'None'){
                editForm.Progress_Indicator__c = '';
            }
            else{
            editForm.Progress_Indicator__c = progressIn;}
            editForm.Name = name;
            update editForm;
            
            return 'saved successfully';
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}