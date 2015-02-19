var PostedJob = require("../app/PostedJob.js");
var JReq = require("../app/JReq.js");
var ATS = require("../app/ATS.js");
var Store = require("../app/Store.js");

var store = new Store();

describe("PostedJob is a constructor", function(){
    it("returns a PostedJob", function(){
        //for debuggin
        console.log("\n", module.filename, "\n");

        var job9 = new JReq("chemist", store);
        var postedJob1 = new PostedJob(job9, "Apple", store);
        expect(postedJob1.constructor === PostedJob).toBe(true);
    });
});