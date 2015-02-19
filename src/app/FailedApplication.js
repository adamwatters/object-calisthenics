function FailedApplication(application, job, store) {

    this.application = application;
    this.job = job;
    this.date = new Date();

    // todo: not sure where to put this so i can stay under 2 attribute limit 
    this.store = store;
    store.save('applications', this);
}

module.exports = FailedApplication;