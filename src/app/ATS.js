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

ATS.prototype.display = function(){
    return this.title;
};

ATS.prototype.post = function(employer){
    return new PostedJob(this, employer, this.store);
};

ATS.prototype.processApplication = function(application, postedJob){
    console.log("posted job", postedJob);
    return new AcceptedApplication(application, postedJob, this.store);
};

ATS.prototype.identify = function(){
    return this.identity;
};

ATS.prototype.equals = function(another){
    return this.identity.equals(another.identify());
};

module.exports = ATS;