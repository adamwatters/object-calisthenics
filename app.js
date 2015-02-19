(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Identity = require("./Identity.js");
var PostedJob = require("./PostedJob.js");
var AcceptedApplication = require("./AcceptedApplication.js");

function ATS(title, store) {
    this.identity = new Identity("job");
    this.title = title;

    // todo: not sure where to put this so i can stay under 2 attribute limit 
    this.store = store;
    store.save('jobs', this);
}

ATS.prototype.post = function(employer){
    return new PostedJob(this, employer, this.store);
};

ATS.prototype.processApplication = function(application){
    return new AcceptedApplication(application, this, this.store);
};

ATS.prototype.identify = function(){
    return this.identity;
};

ATS.prototype.equals = function(another){
    return this.identity.equals(another.identify());
};

module.exports = ATS;
},{"./AcceptedApplication.js":2,"./Identity.js":6,"./PostedJob.js":9}],2:[function(require,module,exports){
function AcceptedApplication(application, job, store) {

    this.application = application;
    this.job = job;
    this.date = new Date();

    // todo: not sure where to put this so i can stay under 2 attribute limit 
    this.store = store;
    store.save('acceptedApplications', this);
}

module.exports = AcceptedApplication;
},{}],3:[function(require,module,exports){
function Application(jobseeker, store, resume) {

    this.jobseeker = jobseeker;
    this.resume = resume;

    // todo: not sure where to put this so i can stay under 2 attribute limit 
    this.store = store;
    store.save('applications', this);
}

Application.prototype.apply = function(job){
    return job.processApplication(this); 
};



module.exports = Application;
},{}],4:[function(require,module,exports){
var Identity = require("./Identity.js");
var JReq = require("./JReq.js");
var ATS = require("./ATS.js");

function Employer(name, store) {
    this.identity = new Identity("employer");
    this.name = name;

    // todo: not sure where to put this so i can stay under 2 attribute limit 
    this.store = store;
    store.save('employers', this);
}

Employer.prototype.makeJReq = function(title){
    return new JReq(title, this.store);
};

Employer.prototype.makeATS = function(title){
    return new ATS(title, this.store);
};

Employer.prototype.post = function(job){
    return job.post(this);
};

Employer.prototype.getAcceptedApplications = function(){
    var self = this;
    var postedJobs = this.getPostedJobs();
    //todo: this is awful - fix it
    return this.store.getForOwner('acceptedApplications', function(acceptedApplication){
        return postedJobs.some(function(postedJob){
            return postedJob.job.equals(acceptedApplication.job);
        });
    });
};

Employer.prototype.getFilteredAcceptedApplications = function(job){
    var acceptedApplications = this.getAcceptedApplications();
    return acceptedApplications.filter(function(acceptedApplication){
        return (acceptedApplication.job.equals(job));
    });
};

Employer.prototype.getPostedJobs = function(){
    var self = this;
    return this.store.getForOwner('postedJobs', function(postedJob){
        return self.equals(postedJob.employer);
    });
};

Employer.prototype.identify = function(){
    return this.identity;
};

Employer.prototype.equals = function(another){
    return this.identity.equals(another.identify());
};

module.exports = Employer;
},{"./ATS.js":1,"./Identity.js":6,"./JReq.js":7}],5:[function(require,module,exports){
function FailedApplication(application, job, store) {

    this.application = application;
    this.job = job;
    this.date = new Date();

    // todo: not sure where to put this so i can stay under 2 attribute limit 
    this.store = store;
    store.save('applications', this);
}

module.exports = FailedApplication;
},{}],6:[function(require,module,exports){
function Identity(type) {
    this.type = type;
    this.number = assignIdentityNumber(type);

    // for debugging
    console.log(this.type, this.number);
}

// todo: are these two methods neccassary?
Identity.prototype.isA = function(type) {
    return this.type === type;
};

Identity.prototype.isNumber = function(number) {
    return this.number === number;
};

Identity.prototype.equals = function(identity) {
    return this.type === identity.type && this.number === identity.number;
};

var assignIdentityNumber =  function() {
        var counts = counts || {};
        return function(type) {
            counts[type] = counts[type] ? counts[type] += 1 : 1;
            return counts[type];
        };
    }();

module.exports = Identity;
},{}],7:[function(require,module,exports){
var Identity = require("./Identity.js");
var PostedJob = require("./PostedJob.js");
var AcceptedApplication = require("./AcceptedApplication.js");
var FailedApplication = require("./FailedApplication.js");

function JReq(title, store) {
    this.identity = new Identity("job");
    this.title = title;

    // todo: not sure where to put this so i can stay under 2 attribute limit 
    this.store = store;
    store.save('jobs', this);
}

JReq.prototype.post = function(employer){
    return new PostedJob(this, employer, this.store);
};

JReq.prototype.processApplication = function(application){
    if (application.resume) {
        return new AcceptedApplication(application, this, this.store);
    }
    return new FailedApplication(application, this, this.store);
};

JReq.prototype.identify = function(){
    return this.identity;
};

JReq.prototype.equals = function(another){
    return this.identity.equals(another.identify());
};

module.exports = JReq;
},{"./AcceptedApplication.js":2,"./FailedApplication.js":5,"./Identity.js":6,"./PostedJob.js":9}],8:[function(require,module,exports){
var Identity = require("./Identity.js");
var SavedJob = require("./SavedJob.js");
var Application = require("./Application.js");

function Jobseeker(name, store) {
    this.identity = new Identity("jobseeker");
    this.name = name;

    // todo: not sure where to put this so i can stay under 2 attribute limit 
    this.store = store;
    store.save('jobseekers', this);
}

//saves a Job (not a PostedJob)
Jobseeker.prototype.saveJob = function(job){
    return new SavedJob(job, this, this.store);
};

Jobseeker.prototype.getSavedJobs = function(){
    var self = this;
    return this.store.getForOwner('savedJobs', function(savedJob){
        return self.equals(savedJob.jobseeker);
    });
};

Jobseeker.prototype.getAppliedToJobs = function(){
    var self = this;
    return this.store.getForOwner('acceptedApplications', function(acceptedApplication){
        return self.equals(acceptedApplication.application.jobseeker);
    });
};

//resume is optional
Jobseeker.prototype.makeApplication = function(resume){
    return new Application(this, this.store, resume);
};

Jobseeker.prototype.apply = function(application, job){
    return application.apply(job);
};

Jobseeker.prototype.identify = function(){
    return this.identity;
};

Jobseeker.prototype.equals = function(another){
    return this.identity.equals(another.identify());
};

module.exports = Jobseeker;
},{"./Application.js":3,"./Identity.js":6,"./SavedJob.js":10}],9:[function(require,module,exports){
function PostedJob(job, employer, store){
    this.job = job;
    this.employer = employer;

    // todo: not sure where to put this so i can stay under 2 attribute limit
    this.store = store;
    store.save('postedJobs', this);
}

PostedJob.prototype.processApplication = function(application){
    return this.job.processApplication(application);
};

PostedJob.prototype.equals = function(another){
    return this.job.equals(another.job);
};

module.exports = PostedJob;
},{}],10:[function(require,module,exports){
function SavedJob(job, jobseeker, store){
    this.job = job;
    this.jobseeker = jobseeker;

    // todo: not sure where to put this so i can stay under 2 attribute limit 
    this.store = store;
    store.save('savedJobs', this);
}

module.exports = SavedJob;
},{}],11:[function(require,module,exports){
function Store() {
    this.employers = [];
    this.jobseekers = [];
    this.jobs = [];
    this.postedJobs = [];
    this.savedJobs = [];
    this.applications = [];
    this.acceptedApplications = [];
    this.failedApplications = [];
    this.resumes = [];
}

Store.prototype.save = function(type, entity) {
    this[type].push(entity);
};

Store.prototype.getAll = function(type) {
    return this[type].slice();
};

Store.prototype.getForOwner = function(type, filter) {
    var unfilteredList = this.getAll(type);
    return unfilteredList.filter(filter);
};

Store.prototype.dump = function(){
    return this;
};

module.exports = Store;
},{}],12:[function(require,module,exports){
var Jobseeker = require("../app/Jobseeker.js");
var Employer = require("../app/Employer.js");
var Store = require("../app/Store.js");
var store = new Store();

tl = window.theLadders = {Jobseeker: Jobseeker, Employer: Employer, store: store};

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
tl.applicationWithResume = tl.jobSeeker.makeApplication({});

//first job seeker applies to both of his saved jobs
tl.jobSeeker.apply(tl.applicationWithResume, tl.savedATS.job); //should succeed
tl.jobSeeker.apply(tl.applicationWithResume, tl.savedJReq.job); //should succeed
tl.jobSeeker.apply(tl.applicationWithoutResume, tl.savedATS.job); //should succeed
tl.jobSeeker.apply(tl.applicationWithoutResume, tl.savedJReq.job); //should fail

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






},{"../app/Employer.js":4,"../app/Jobseeker.js":8,"../app/Store.js":11}]},{},[12]);
