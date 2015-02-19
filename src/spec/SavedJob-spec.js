var SavedJob = require("../app/SavedJob.js");
var JReq = require("../app/JReq.js");
var ATS = require("../app/ATS.js");
var Store = require("../app/Store.js");

var store = new Store();

describe("SavedJob is a constructor", function(){
    it("returns a SavedJob", function(){
        // for debugging
        console.log("\n", module.filename, "\n");

        var job12 = new JReq("chemist", store);
        var savedJob1 = new SavedJob(job12, "Kevin", store);
        expect(savedJob1.constructor === SavedJob).toBe(true);
    });
});