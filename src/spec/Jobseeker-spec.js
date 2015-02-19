var Jobseeker = require("../app/Jobseeker.js");
var Store = require("../app/Store.js");
var JReq = require("../app/JReq.js");
var ATS = require("../app/ATS.js");

var store = new Store();

describe("Jobseeker is a constructor", function(){
    it("returns an jobseeker", function(){
        // for debugging
        console.log("\n", module.filename, "\n");

        var jobseeker1 = new Jobseeker("Ryan", store);
        expect(jobseeker1.constructor === Jobseeker).toBe(true);
    });
    it("it's jobseekers can check themselves against other jobseekers for equality", function(){
        var jobseeker2 = new Jobseeker("Adam", store);
        var jobseeker3 = new Jobseeker("Dave", store);
        expect(jobseeker2.equals(jobseeker2)).toBe(true);
        expect(jobseeker2.equals(jobseeker3)).toBe(false);
    });
    it("it's jobseekers save themselves to a store when created", function(){
        var jobseeker4 = new Jobseeker("Mike", store);
        expect(store.getAll('jobseekers').length).toEqual(4);
        expect(store.getAll('jobseekers')[3].equals(jobseeker4)).toBe(true);
    });
    it("it's jobseekers can make applications", function() {
        var jobseeker = new Jobseeker("Fran", store);
        var application = jobseeker.makeApplication();
        //todo: finish test
    });
    it("it's jobseekers can save and retreive jobs", function(){
        var jobseeker5 = new Jobseeker("Danny", store);
        var job1 = new JReq("engineer", store);
        var job2 = new ATS("scientist", store);
        var savedJob1 = jobseeker5.saveJob(job1);
        var savedJob2 = jobseeker5.saveJob(job2);
        var jobseekersSavedJobs = jobseeker5.getSavedJobs();
        expect(jobseekersSavedJobs.length === 2).toBe(true);
        expect(jobseekersSavedJobs.indexOf(savedJob1) !== -1).toBe(true);
        expect(jobseekersSavedJobs.indexOf(savedJob2) !== -1).toBe(true);
        
        //for debugging
        console.log(store.dump());
    });
});