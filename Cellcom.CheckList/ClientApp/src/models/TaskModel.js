export default class TaskModel {
    constructor(id, name, details, procedureLink, shift, shiftId, timingType, timingValues, timingOneTimeDate, startTime, isDisabled, isDeleted, createDate, updateDate, status, comments) {
        this.id = id;
        this.name = name;
        this.details = details;
        this.procedureLink = procedureLink;
        this.shift = shift;
        this.shiftId = shiftId;
        this.timingType = timingType;
        this.timingValues = timingValues;
        this.timingOneTimeDate = timingOneTimeDate;
        this.startTime = startTime;
        this.isDisabled = isDisabled;
        this.isDeleted = isDeleted;
        this.createDate = createDate;
        this.updateDate = updateDate;
        this.status = status;
        this.comments = comments;
    }
}