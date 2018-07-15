'use strict';

var NebulasMedicalRecordBookContract = function() {
    LocalContractStorage.defineMapProperty(this, "personinformation");//个人信息
    LocalContractStorage.defineMapProperty(this, "hospitalizationrecords");//住院记录
    LocalContractStorage.defineMapProperty(this, "diagnosticrecord");//诊断记录
};

NebulasMedicalRecordBookContract.prototype = {
    init: function() {
    },

    initpersoninformation: function(pi_name,pi_gender,pi_age,pi_workplace,pi_phone,pi_drugtaboo){
        //["string","string"]
        var createraddress = Blockchain.transaction.from;

        var detail = {
            pi_name: pi_name,//姓名
            pi_gender:pi_gender,//性别
            pi_age: pi_age,//年龄
            pi_workplace:pi_workplace,//单位（学校等）
            pi_phone: pi_phone,//电话
            pi_drugtaboo:pi_drugtaboo,//药物禁忌
            createraddress:createraddress,
        };
        this.personinformation.set(createraddress, detail);


        var hospitalizationrecordsdetail = {
            totalnum:0,
            hr_indate:[],//入院日期
            hr_outdate:[],//出院日期
            hr_diagnosis:[],//住院诊断
            hr_process:[],//做过何种手术或处理
            hr_place:[],//住院地点
            hr_number:[],//住院编号
        };
        this.hospitalizationrecords.set(createraddress, hospitalizationrecordsdetail);

        var diagnosticrecorddetail = {
            totalnum:0,
            dr_date:[],//日期
            dr_diseasename:[],//疾病名称
            dr_diagnosis:[],//处方
        };
        this.diagnosticrecord.set(createraddress, diagnosticrecorddetail);


        return 1;
    },

    editpersoninformation: function(pi_age,pi_workplace,pi_phone,pi_drugtaboo){
        var createraddress = Blockchain.transaction.from;
        var record = this.personinformation.get(createraddress);
        record.pi_age = pi_age;
        record.pi_workplace = pi_workplace;
        record.pi_phone = pi_phone;
        record.pi_drugtaboo = pi_drugtaboo;
        this.personinformation.set(createraddress, record);
        return 1;
    },

    searchpersoninformation: function(){
        var createraddress = Blockchain.transaction.from;
        var record = this.personinformation.get(createraddress);
        return record;
    },


    //---------------------------------
    addhospitalizationrecords: function(hr_indate,hr_outdate,hr_diagnosis,hr_process,hr_place,hr_number){
        var createraddress = Blockchain.transaction.from;
        var hospitalizationrecordsdetail = this.hospitalizationrecords.get(createraddress);
        hospitalizationrecordsdetail.totalnum += 1;
        hospitalizationrecordsdetail.hr_indate.push(hr_indate);
        hospitalizationrecordsdetail.hr_outdate.push(hr_outdate);
        hospitalizationrecordsdetail.hr_diagnosis.push(hr_diagnosis);
        hospitalizationrecordsdetail.hr_process.push(hr_process);
        hospitalizationrecordsdetail.hr_place.push(hr_place);
        hospitalizationrecordsdetail.hr_number.push(hr_number);
        this.hospitalizationrecords.set(createraddress, hospitalizationrecordsdetail);
        return 1;
    },


    searchhospitalizationrecords: function(){
        var createraddress = Blockchain.transaction.from;
        var record = this.hospitalizationrecords.get(createraddress);
        return record;
    },

    //---------------------------------
    adddiagnosticrecord: function(dr_date,dr_diseasename,dr_diagnosis){
        var createraddress = Blockchain.transaction.from;
        var diagnosticrecorddetail = this.diagnosticrecord.get(createraddress);
        diagnosticrecorddetail.totalnum += 1;
        diagnosticrecorddetail.dr_date.push(dr_date);
        diagnosticrecorddetail.dr_diseasename.push(dr_diseasename);
        diagnosticrecorddetail.dr_diagnosis.push(dr_diagnosis);
        this.diagnosticrecord.set(createraddress, diagnosticrecorddetail);
        return 1;
    },


    searchdiagnosticrecord: function(){
        var createraddress = Blockchain.transaction.from;
        var record = this.diagnosticrecord.get(createraddress);
        return record;
    },



};

module.exports = NebulasMedicalRecordBookContract;


