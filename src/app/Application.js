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