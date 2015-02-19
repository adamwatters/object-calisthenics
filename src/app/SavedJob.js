function SavedJob(job, jobseeker, store){
    this.job = job;
    this.jobseeker = jobseeker;

    // todo: not sure where to put this so i can stay under 2 attribute limit 
    this.store = store;
    store.save('savedJobs', this);
}

module.exports = SavedJob;