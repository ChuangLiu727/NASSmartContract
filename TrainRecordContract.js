'use strict';

var NebulasHeatCalculationContract = function() {

    LocalContractStorage.defineMapProperty(this, "Record");
    LocalContractStorage.defineMapProperty(this, "Account");

};

NebulasHeatCalculationContract.prototype = {
    init: function() {
    },

    initAccount: function(name,height,age){

        var fromaddress = Blockchain.transaction.from;
        var detail = {
            accountname: name,
            accountaddress:fromaddress,
            accountheight:height,
            accountage:age,
        };
        this.Account.set(fromaddress, detail);

        var heatArray = {
            totalnum : 0,

            distanceArray:[],
            heatArray:[],
            speeddistributionArray:[]
        };
        this.Record.set(fromaddress, heatArray);
        return 1;
    },


    searchAccount: function(){
        var fromaddress = Blockchain.transaction.from;
        var account = this.Account.get(fromaddress);
        return account;
    },


    adddataArray: function(newdistance,newheat,newspeeddistribution){
        var fromaddress = Blockchain.transaction.from;
        var olddataArray = this.Record.get(fromaddress);

        olddataArray.totalnum += 1;

        olddataArray.distanceArray.push(newdistance);
        olddataArray.heatArray.push(newheat);
        olddataArray.speeddistributionArray.push(newspeeddistribution);

        this.Record.set(fromaddress, olddataArray);
        return 1;
    },


    searchdataArray: function(){
        var fromaddress = Blockchain.transaction.from;
        var result = this.Record.get(fromaddress);
        return result;
    },
};

module.exports = NebulasHeatCalculationContract;

