trigger SubmissionCount on Form_Submission__c (after insert) {
	List<Form__c> frecord = new List<Form__c>();
    Form__c form = new Form__c();
    if (Trigger.isInsert){
        for (Form_Submission__c sub : Trigger.new){
            form = [SELECT Id, Total_Submissions__c From Form__c Where Id = :sub.Form__c];
            System.debug(form);
            form.Total_Submissions__c = form.Total_Submissions__c + 1;
        }
        update form;
    }
}