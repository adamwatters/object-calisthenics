function AcceptedApplication(application, postedJob, store) {

    this.application = application;
    this.postedJob = postedJob;
    this.date = new Date();

    // todo: not sure where to put this so i can stay under 2 attribute limit 
    this.store = store;
    store.save('processedApplications', this);
}

AcceptedApplication.prototype.wasAccepted = function(){
    return true;
};

module.exports = AcceptedApplication;