function NullResume(jobSeeker, store) {

    this.jobSeeker = jobSeeker;

    // todo: not sure where to put this so i can stay under 2 attribute limit 
    this.store = store;
}

NullResume.prototype.process = function(job){

};

module.exports = Resume;