var Identity = require("../app/Identity.js");

describe("Identity is a constructor", function(){
    it("returns an identity", function(){
        // for debugging
        console.log("\n", module.filename, "\n");

        var identity = new Identity();
        expect(Identity === identity.constructor).toBe(true);
    });
    it("makes identities that know their 'type'", function(){
        var jobseeker1 = new Identity("jobseeker");
        expect(jobseeker1.isA("jobseeker")).toBe(true);
        expect(jobseeker1.isA("employer")).toBe(false);
    });
    it("makes identities that know their 'number'", function(){
        var jobseeker2 = new Identity("jobseeker");
        expect(jobseeker2.isNumber(2)).toBe(true);
        expect(jobseeker2.isNumber(0)).toBe(false);
    });
    it("assigns unique numbers to each entity of the same type", function(){
        var jobseeker3 = new Identity("jobseeker");
        var jobseeker4 = new Identity("jobseeker");
        expect(jobseeker3.isNumber(3)).toBe(true);
        expect(jobseeker4.isNumber(4)).toBe(true);
        var employer1 = new Identity("employer");
        expect(employer1.isNumber(100)).toBe(false);
    });
    it("makes identities that can compare themselves to others for equality", function(){
        var job1 = new Identity("job");
        var job2 = new Identity("job");
        expect(job1.equals(job1)).toBe(true);
        expect(job1.equals(job2)).toBe(false);
    });
});