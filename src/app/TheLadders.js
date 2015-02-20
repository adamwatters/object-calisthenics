function TheLadders(store) {
    this.store = store;
}

TheLadders.prototype.report = function(year, month, day, format){
    var applications = this.getApplicationsByDay(year, month, day);
    applications.forEach(function(application){
        console.log(
            application.application.jobseeker.display(),
            application.postedJob.employer.display(),
            application.postedJob.job.display(),
            application.date.getDay() + "/" + application.date.getMonth() + "/" + application.date.getFullYear()
        );
    });
};

TheLadders.prototype.getApplicationsByDay = function(year, month, day){
    return this.store.getWithFilter("processedApplications", function(processedApplication){
        var date = processedApplication.date;
        return  (date.getYear() === year) && 
                (date.getMonth() === month) &&
                (date.getMonth() === month);
    });
};

TheLadders.prototype.getApplicationCount = function(){

};

module.exports = TheLadders;