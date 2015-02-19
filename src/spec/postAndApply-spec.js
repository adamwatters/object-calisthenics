var Jobseeker = require("../app/Jobseeker.js");
var Employer = require("../app/Employer.js");
var Store = require("../app/Store.js");
var store = new Store();

var AcceptedApplication = require("../app/AcceptedApplication");

describe("job posting and apply process", function(){
    it("employer posts a JReq and ATS, jobseeker applies to each without and with an empty resume object", function(){
        // for debugging
        console.log("\n", module.filename, "\n");

        var employer = new Employer("TheLadders", store);
        var ats = employer.makeATS("engineer");
        var jreq = employer.makeJReq("product manager");

        var postedAts = employer.post(ats);
        var postedJreq = employer.post(jreq);

        var jobseeker = new Jobseeker("Adam", store);
        var applicationWithoutResume = jobseeker.makeApplication();
        var applicationWithResume = jobseeker.makeApplication({});

        var app1 = jobseeker.apply(applicationWithoutResume, postedAts);
        var app2 = jobseeker.apply(applicationWithoutResume, postedJreq);
        var app3 = jobseeker.apply(applicationWithResume, postedAts);
        var app4 = jobseeker.apply(applicationWithResume, postedJreq);



        expect(app1.constructor === AcceptedApplication).toBe(true);
        expect(app2 === undefined).toBe(true);
        expect(app3.constructor === AcceptedApplication).toBe(true);
        expect(app4.constructor === AcceptedApplication).toBe(true);

        console.log(store.dump());
    });
});

