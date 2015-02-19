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