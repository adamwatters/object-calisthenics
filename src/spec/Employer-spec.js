var Employer = require("../app/Employer.js");
var Store = require("../app/Store.js");

//just for checking types on lines 33-34
var JReq = require("../app/JReq.js");
var ATS = require("../app/ATS.js");

var store = new Store();

describe("Employer is a constructor", function(){
    it("returns an employer", function(){
        // for debugging
        console.log("\n", module.filename, "\n");
        
        var employer1 = new Employer("Sony", store);
        expect(employer1.constructor === Employer).toBe(true);
    });
    it("it's employers can check themselves against other employers for equality", function(){
        var employer2 = new Employer("Apple", store);
        var employer3 = new Employer("Target", store);
        expect(employer2.equals(employer2)).toBe(true);
        expect(employer2.equals(employer3)).toBe(false);
    });
    it("it's employers save themselves to a store when created", function(){
        var employer4 = new Employer("Walmart", store);
        expect(store.getAll('employers').length).toEqual(4);
        expect(store.getAll('employers')[3].equals(employer4)).toBe(true);
    });
    it("it's employers can make JReqs jobs and ATS jobs", function() {
        var employer = new Employer("BK", store);
        var jobJReq = employer.makeJReq("chef");
        var jobATS = employer.makeATS("cook");
        expect(jobJReq.constructor === JReq).toBe(true);
        expect(jobATS.constructor === ATS).toBe(true);
    });
    it("it's employers can post and retreive jobs", function(){
        var employer5 = new Employer("Walmart", store);
        var job1 = employer5.makeJReq("greeter");
        var job2 = employer5.makeATS("butcher");
        var postedJob1 = employer5.post(job1);
        var postedJob2 = employer5.post(job2);
        var employersPostedJobs = employer5.getPostedJobs();
        expect(employersPostedJobs.length === 2).toBe(true);
        expect(employersPostedJobs.indexOf(postedJob1) !== -1).toBe(true);
        expect(employersPostedJobs.indexOf(postedJob2) !== -1).toBe(true);

        //for debugging
        console.log(store.dump());
    });
});