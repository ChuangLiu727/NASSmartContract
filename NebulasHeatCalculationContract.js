'use strict';

var NebulasHeatCalculationContract = function() {

    LocalContractStorage.defineMapProperty(this, "heatRecord");
    LocalContractStorage.defineMapProperty(this, "Account");

};

NebulasHeatCalculationContract.prototype = {
    init: function() {
    },

    //init or update
    initAccount: function(name,height,age){
        //["string",int,int]
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
            heatArray:[]
        };
        this.heatRecord.set(fromaddress, heatArray);
        return 1;
    },


    searchAccount: function(){
        var fromaddress = Blockchain.transaction.from;
        var account = this.Account.get(fromaddress);
        return account;
    },


    addHeatArray: function(newheat){
        var fromaddress = Blockchain.transaction.from;
        var oldheatArray = this.heatRecord.get(fromaddress);

        oldheatArray.totalnum += 1;
        oldheatArray.heatArray.push(newheat);

        this.heatRecord.set(fromaddress, oldheatArray);
        return 1;
    },


    searchHeatArray: function(){
        var fromaddress = Blockchain.transaction.from;
        var heatArray = this.heatRecord.get(fromaddress);
        return heatArray;
    },
};

module.exports = NebulasHeatCalculationContract;


