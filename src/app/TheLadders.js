function TheLadders(store) {
    this.store = store;
}

TheLadders.prototype.report = function(date, format){
    return this.store.getAll("processedApplications");
};

TheLadders.prototype.aggregateApplications = function(date, format){
    
};

module.exports = TheLadders;