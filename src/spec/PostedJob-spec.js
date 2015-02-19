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
    it("its postedJobs can check themselves against other postedJobs for equality", function(){
        var job10 = new ATS("chemist", store);
        var job11 = new JReq("chemist", store);
        var postedJob2 = new PostedJob(job10, "Apple", store);
        var postedJob3 = new PostedJob(job11, "Google", store);
        expect(postedJob2.equals(postedJob2)).toBe(true);
        expect(postedJob2.equals(postedJob3)).toBe(false);
    });
    it("its postedJobs save themselves to a store when created", function(){
        var job12 = new JReq("scientist", store);
        var postedJob4 = new PostedJob(job12, "McDonalds", store);
        expect(store.getAll('postedJobs').length).toEqual(4);
        expect(store.getAll('postedJobs')[3].equals(postedJob4)).toBe(true);

        //for debugging
        console.log(store.dump());
    });
});