global class InterestCalculationBatch implements Database.Batchable<SObject> {

    global Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator(
            'SELECT Id, Loan_Amount__c, Interest_Rate__c, Total_Interest__c FROM Financial_Account__c'
        );
    }

    global void execute(Database.BatchableContext bc, List<Financial_Account__c> scope) {

        for (Financial_Account__c acc : scope) {

            if (acc.Loan_Amount__c != null && acc.Interest_Rate__c != null) {

                Decimal dailyInterest = (acc.Loan_Amount__c * acc.Interest_Rate__c) / 100 / 365;

                acc.Total_Interest__c =
                    (acc.Total_Interest__c == null ? 0 : acc.Total_Interest__c) + dailyInterest;
            }
        }

        update scope;
    }

    global void finish(Database.BatchableContext bc) {}
}