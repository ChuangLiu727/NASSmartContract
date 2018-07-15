'use strict';

var ScoreRecordContract = function() {
    LocalContractStorage.defineMapProperty(this, "Account");
    LocalContractStorage.defineMapProperty(this, "ProjectList");
    LocalContractStorage.defineMapProperty(this, "ScoreOfProject");
};

ScoreRecordContract.prototype = {
    init: function() {
    },

    //init or update
    initAccount: function(name,gender,school){
        //["string","string"]
        var createraddress = Blockchain.transaction.from;
        var createtime = Blockchain.transaction.timestamp;

        var accountdetail = {
            name: name,
            gender:gender,
            school:school,
            createraddress:createraddress,
            createtime:createtime
        };
        this.Account.set(createraddress, accountdetail);

        var projectlistdetail = {
            totalnum:0,
            projectidlist:[]
        };

        this.ProjectList.set(createraddress, projectlistdetail);

        return 1;
    },


    searchAccount: function(){
        var createraddress = Blockchain.transaction.from;
        var account = this.Account.get(createraddress);
        return account;
    },

    addProject: function(projectname){
        var createraddress = Blockchain.transaction.from;
        var projectid = createraddress+"."+projectname;
        var projectlist = this.ProjectList.get(createraddress);
        projectlist.totalnum += 1;
        projectlist.projectidlist.push(projectid);
        this.ProjectList.set(createraddress, projectlist);

        var projectscoredetail = {
            totalnum:0,
            scorelist:[]
        };
        this.ScoreOfProject.set(projectid, projectscoredetail);
        return 1;
    },

    serachProject: function(){
        var createraddress = Blockchain.transaction.from;
        var projectlistdetail = this.ProjectList.get(createraddress);

        return projectlistdetail;
    },

    delProject: function(projectid){
        var createraddress = Blockchain.transaction.from;
        this.ScoreOfProject.del(projectid);
        var projectlist = this.ProjectList.get(createraddress);
        var array = projectlist.projectidlist;
        var num = projectlist.totalnum;
        var newarray = [];
        for (var i=0;i<num;i++){
            if (array[i]!=projectid){
                newarray.push(array[i]);
            }else{
                num -= 1;
                break;
            }
        }

        var newarraydetail = {
            totalnum:num,
            projectidlist:newarray
        };
        this.ProjectList.set(createraddress, newarraydetail);
        return 1;
    },

    addScore: function(projectid,socre){
        var socrelist = this.ScoreOfProject.get(projectid);
        socrelist.totalnum += 1;
        socrelist.scorelist.push(socre);
        this.ScoreOfProject.set(projectid, socrelist);
        return 1;
    },

    serachScore: function(projectid){
        //var createraddress = Blockchain.transaction.from;
        var scorelistdetail = this.ScoreOfProject.get(projectid);

        return scorelistdetail;
    },

};

module.exports = ScoreRecordContract;