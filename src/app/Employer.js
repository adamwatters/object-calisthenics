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
    return this.store.getForOwner('acceptedApplications', function(acceptedApplication){
        console.log(acceptedApplication);
        return self.equals(acceptedApplication.postedJob.employer);
    });
};

Employer.prototype.filterAcceptedApplicationsByPostedJob = function(postedJob){
    var acceptedApplications = this.getAcceptedApplications();
    acceptedApplications.filter(function(acceptedApplication){
        return (acceptedApplication.postedJob.equals(postedJob));
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