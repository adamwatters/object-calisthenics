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