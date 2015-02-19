var JReq = require("../app/JReq.js");
var ATS = require("../app/ATS.js");
var Store = require("../app/Store.js");

var store = new Store();

describe("JReq is a constructor", function(){
    it("returns a JReq", function(){
        // for debugging
        console.log("\n", module.filename + " / JReq", "\n");

        var job1 = new JReq("chemist", store);
        expect(job1.constructor === JReq).toBe(true);
    });
    it("s jobs can check themselves against other jobs for equality", function(){
        var job2 = new JReq("chemist", store);
        var job3 = new JReq("chemist", store);
        expect(job2.equals(job2)).toBe(true);
        expect(job2.equals(job3)).toBe(false);
    });
    it("s jobs save themselves to a store when created", function(){
        var job4 = new JReq("chemist", store);
        expect(store.getAll('jobs').length).toEqual(4);
        expect(store.getAll('jobs')[3].equals(job4)).toBe(true);

        //for debugging
        console.log(store.dump());
    });
});

describe("ATS is a constructor", function(){

    it("returns an ATS", function(){
        // for debugging
        console.log("\n", module.filename + " / ATS", "\n");

        var job5 = new ATS("chemist", store);
        expect(job5.constructor === ATS).toBe(true);
    });
    it("s jobs can check themselves against other jobs for equality", function(){
        var job6 = new ATS("chemist", store);
        var job7 = new ATS("chemist", store);
        expect(job6.equals(job6)).toBe(true);
        expect(job6.equals(job7)).toBe(false);
    });
    it("s jobs save themselves to a store when created", function(){
        var job8 = new ATS("chemist", store);
        expect(store.getAll('jobs').length).toEqual(8);
        expect(store.getAll('jobs')[7].equals(job8)).toBe(true);
        
        //for debugging
        console.log(store.dump());
    });
});

console.log(store.dump());