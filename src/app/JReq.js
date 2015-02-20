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

JReq.prototype.processApplication = function(application, postedJob){
    if (application.resume) {
        return new AcceptedApplication(application, postedJob, this.store);
    }
    return new FailedApplication(application, postedJob, this.store);
};

JReq.prototype.identify = function(){
    return this.identity;
};

JReq.prototype.equals = function(another){
    return this.identity.equals(another.identify());
};

module.exports = JReq;