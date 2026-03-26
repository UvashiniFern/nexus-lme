public with sharing class InterestBatchInvoker {

    public class InputWrapper {
        @InvocableVariable
        public String dummy;
    }

    @InvocableMethod(label='Run Daily Interest Batch')
    public static void runBatch(List<InputWrapper> inputs) {
        Database.executeBatch(new InterestCalculationBatch(), 200);
    }
}