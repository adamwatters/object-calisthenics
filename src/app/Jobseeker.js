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

Jobseeker.prototype.display = function(){
    return this.name;
};

Jobseeker.prototype.saveJob = function(job){
    return new SavedJob(job, this, this.store);
};

Jobseeker.prototype.getSavedJobs = function(){
    var self = this;
    return this.store.getWithFilter('savedJobs', function(savedJob){
        return self.equals(savedJob.jobseeker);
    });
};

Jobseeker.prototype.getAppliedToJobs = function(){
    var self = this;
    return this.store.getWithFilter('processedApplications', function(processedApplication){
        return processedApplication.wasAccepted() && self.equals(processedApplication.application.jobseeker);
    });
};

//resume is optional
Jobseeker.prototype.makeApplication = function(resume){
    return new Application(this, this.store, resume);
};

Jobseeker.prototype.apply = function(application, postedJob){
    return application.apply(postedJob);
};

Jobseeker.prototype.identify = function(){
    return this.identity;
};

Jobseeker.prototype.equals = function(another){
    return this.identity.equals(another.identify());
};

module.exports = Jobseeker;