'use strict';

var CEContract = function() {
    LocalContractStorage.defineMapProperty(this, "college");
    LocalContractStorage.defineMapProperty(this, "collegeEvaluation");
    LocalContractStorage.defineMapProperty(this, "evaluation");
    LocalContractStorage.defineProperty(this, "evaluationNums");
    LocalContractStorage.defineMapProperty(this, "evaluationIndex");
};

CEContract.prototype = {
    init: function() {
        this.evaluationNums = 0;
    },

    addCollege: function(college) {

        var slug = college.slug;
        var result = this.college.get(slug);
        if (result) {
            return 0;
        }else{
            college.evaluationNums = 0;
            this.college.set(slug, college);
            return 1;
        }

    },


    searchCollege: function(college) {
        var slug = college.slug;
        var result = this.college.get(slug);
        return result;
    },


    addEvaluation: function(evaluation) {

        var txhash = Blockchain.transaction.hash;
        var college = this.college.get(evaluation.college);

        var detail = {
            hash: txhash,

            departmentname: evaluation.departmentname,
            specialityname: evaluation.specialityname,
            teachquality: evaluation.teachquality,
            researchstrength: evaluation.researchstrength,
            dormcondition: evaluation.dormcondition,
            environment: evaluation.environment,
            admission: evaluation.admission,
            employment: evaluation.employment,

            college: evaluation.college,
            evaluationIndex: this.evaluationNums,

        };

        this.evaluation.set(txhash, detail);
        this.evaluationIndex.set(this.evaluationNums, txhash);
        this.evaluationNums += 1;

        var collegeSlug = college.slug;
        this.collegeEvaluation.set(collegeSlug + "." + college.evaluationNums, txhash);

        college.evaluationNums += 1;
        this.college.set(collegeSlug, college);

        var result = {
            hash: txhash
        };
        return result;
    },



    collegeEvaluationList: function(slug, limit, offset) {

        limit = parseInt(limit);
        offset = parseInt(offset);

        var college = this.college.get(slug);

        if (!college) {
            throw new Error("10001");
        }

        var evaluationNums = college.evaluationNums;
        if (offset > evaluationNums) {
            throw new Error("10003");
        }
        if (offset == -1) {
            offset = evaluationNums;
        }
        var result = {
            total: evaluationNums,
            evaluation: []
        };
        var authorCache = {},
            collegeCache = {
                slug: college
            };

        for (var i = 0; i < limit; i++) {
            var index = offset - i - 1;
            if (index < 0) {
                break;
            }
            var hash = this.collegeEvaluation.get(slug + "." + index);
            var evaluation = this.evaluation.get(hash);
            if (evaluation) {
                result.evaluation.push(evaluation);
            }
            if (index == 0) {
                break;
            }
        }
        return result;
    },
};

module.exports = CEContract;