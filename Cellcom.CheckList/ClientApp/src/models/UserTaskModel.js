export default class UserTaskModel {
    constructor(id, name, details, procedureLink, shift, timingType, timingValues, timingOneTimeDate, startTime, status, comments) {
        this.id = id;
        this.name = name;
        this.details = details;
        this.procedureLink = procedureLink;
        this.shift = shift;
        this.timingType = timingType;
        this.timingValues = timingValues;
        this.timingOneTimeDate = timingOneTimeDate;
        this.startTime = startTime;
        this.status = status;
        this.comments = comments;
    }
}