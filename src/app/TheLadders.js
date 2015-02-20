function TheLadders(store) {
    this.store = store;
}

TheLadders.prototype.report = function(year, month, day, format){
    return this.store.getWithFilter("processedApplications", function(processedApplication){
        var date = processedApplication.date;
        return  (date.getYear() === year) && 
                (date.getMonth() === month) &&
                (date.getMonth() === month);
    });
};

TheLadders.prototype.aggregateApplications = function(date, format){
    
};

module.exports = TheLadders;