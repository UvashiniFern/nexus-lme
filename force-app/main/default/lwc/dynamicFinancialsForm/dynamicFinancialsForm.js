import { LightningElement, api, track } from 'lwc';

export default class DynamicFinancialsForm extends LightningElement {

    @track incomes = [];
    @track assets = [];
    @track liabilities = [];

    @api incomeList = '';
    @api assetList = '';
    @api liabilityList = '';

    // PICKLIST OPTIONS
    assetTypeOptions = [
        { label: 'Real Estate', value: 'Real Estate' },
        { label: 'Savings', value: 'Savings' },
        { label: 'Investments', value: 'Investments' }
    ];

    liabilityTypeOptions = [
        { label: 'Mortgage', value: 'Mortgage' },
        { label: 'Auto Loan', value: 'Auto Loan' },
        { label: 'Credit Card', value: 'Credit Card' }
    ];

    // -------- INCOME --------
    addIncome() {
        this.incomes = [...this.incomes, { id: Date.now(), source: '', amount: '' }];
    }

    removeIncome(event) {
        const index = event.target.dataset.index;
        this.incomes.splice(index, 1);
        this.incomes = [...this.incomes];
        this.updateOutput();
    }

    handleIncomeChange(event) {
        const index = event.target.dataset.index;
        const label = event.target.label;

        if (label === 'Income Source') {
            this.incomes[index].source = event.target.value;
        } else {
            this.incomes[index].amount = event.target.value;
        }

        this.updateOutput();
    }

    // -------- ASSET --------
    addAsset() {
        this.assets = [...this.assets, { id: Date.now(), type: '', value: '', desc: '' }];
    }

    removeAsset(event) {
        const index = event.target.dataset.index;
        this.assets.splice(index, 1);
        this.assets = [...this.assets];
        this.updateOutput();
    }

    handleAssetChange(event) {
        const index = event.target.dataset.index;
        const label = event.target.label;

        if (label === 'Asset Type') this.assets[index].type = event.target.value;
        if (label === 'Estimated Value') this.assets[index].value = event.target.value;
        if (label === 'Description') this.assets[index].desc = event.target.value;

        this.updateOutput();
    }

    // -------- LIABILITY --------
    addLiability() {
        this.liabilities = [...this.liabilities, { id: Date.now(), type: '', amount: '', payment: '' }];
    }

    removeLiability(event) {
        const index = event.target.dataset.index;
        this.liabilities.splice(index, 1);
        this.liabilities = [...this.liabilities];
        this.updateOutput();
    }

    handleLiabilityChange(event) {
        const index = event.target.dataset.index;
        const label = event.target.label;

        if (label === 'Liability Type') this.liabilities[index].type = event.target.value;
        if (label === 'Amount Owed') this.liabilities[index].amount = event.target.value;
        if (label === 'Monthly Payment') this.liabilities[index].payment = event.target.value;

        this.updateOutput();
    }

    // -------- SEND DATA TO FLOW --------
    updateOutput() {
        this.incomeList = JSON.stringify(this.incomes);
        this.assetList = JSON.stringify(this.assets);
        this.liabilityList = JSON.stringify(this.liabilities);
    }
}