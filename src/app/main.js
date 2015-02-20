var Jobseeker = require("../app/Jobseeker.js");
var Employer = require("../app/Employer.js");
var TheLadders = require("../app/TheLadders.js");
var Store = require("../app/Store.js");
var store = new Store();

tl = window.app = {Jobseeker: Jobseeker, Employer: Employer, TheLadders: TheLadders, store: store};

//make the ladders
tl.theLadders = new TheLadders(store);

//make job seekers
tl.jobSeeker = new Jobseeker("kevin", store);
tl.jobSeeker2 = new Jobseeker("dave", store);

//make employers
tl.employer = new Employer("Walmart", store);
tl.employer2 = new Employer("Burger King", store);

//employers each make an ATS and a JREQ
tl.ats = tl.employer.makeATS("greeter");
tl.jreq = tl.employer.makeJReq("butcher");
tl.ats2 = tl.employer2.makeATS("chef");
tl.jreq2 = tl.employer2.makeJReq("cook");

//employers each post an ATS and a JREQ
tl.postedATS = tl.employer.post(tl.ats);
tl.postedJReq = tl.employer.post(tl.jreq);
tl.postedATS2 = tl.employer2.post(tl.ats2);
tl.postedJReq2 = tl.employer2.post(tl.jreq2);

//first jobseeker saves an ATS and a JREQ
tl.savedATS = tl.jobSeeker.saveJob(tl.postedATS.job);
tl.savedJReq = tl.jobSeeker.saveJob(tl.postedJReq.job);

//first jobseeker makes an applications with and without a resume
tl.applicationWithoutResume = tl.jobSeeker.makeApplication();
//todo: make a real resume object
tl.applicationWithResume = tl.jobSeeker2.makeApplication({});

//first job seeker applies to both of his saved jobs
tl.jobSeeker2.apply(tl.applicationWithResume, tl.postedATS); //should succeed
tl.jobSeeker2.apply(tl.applicationWithResume, tl.postedJReq); //should succeed
tl.jobSeeker.apply(tl.applicationWithoutResume, tl.postedATS); //should succeed
tl.jobSeeker.apply(tl.applicationWithoutResume, tl.postedJReq); //should fail

console.log(store);

tl.employersPostedJobs = tl.employer.getPostedJobs();
console.log("employer can get Posted Jobs", tl.employersPostedJobs);

tl.jobSeekersSavedJobs = tl.jobSeeker.getSavedJobs();
console.log("jobSeeker can get Saved Jobs", tl.jobSeekersSavedJobs);

tl.jobSeekersAppliedToJobs = tl.jobSeeker.getAppliedToJobs();
console.log("jobSeeker can get Jobs they have applied to", tl.jobSeekersAppliedToJobs);

tl.employerApplications = tl.employer.getAcceptedApplications();
console.log("employer can get accepted applications", tl.employerApplications);

tl.filteredEmployerApplications = tl.employer.getFilteredAcceptedApplications(tl.ats);
console.log("employer can get accepted applications, filtered by job", tl.filteredEmployerApplications);

tl.theLadders.report(115,1,4);

console.log(tl.theLadders.getApplicationCountByEmployer(tl.employer));
console.log(tl.theLadders.getApplicationCountByEmployer(tl.employer2));

console.log(tl.theLadders.getApplicationCountByJob(tl.postedATS));
console.log(tl.theLadders.getApplicationCountByJob(tl.postedJReq));



