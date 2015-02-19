function Store() {
    this.employers = [];
    this.jobseekers = [];
    this.jobs = [];
    this.postedJobs = [];
    this.savedJobs = [];
    this.applications = [];
    this.acceptedApplications = [];
    this.resumes = [];
}

Store.prototype.save = function(type, entity) {
    this[type].push(entity);
};

Store.prototype.getAll = function(type) {
    return this[type].slice();
};

Store.prototype.getForOwner = function(type, filter) {
    var unfilteredList = this.getAll(type);
    return unfilteredList.filter(filter);
};

Store.prototype.dump = function(){
    return this;
};

module.exports = Store;