export default class TaskModel {
    constructor(id, taskId, name, details, procedureLink, shiftId, shiftName, shiftFromTime, shiftToTime, timingType, timingValues, timingOneTimeDate, startTime, createDate, status, comments) {
        this.id = id;
        this.taskId = taskId;
        this.name = name;
        this.details = details;
        this.procedureLink = procedureLink;
        this.shiftId = shiftId;
        this.shiftName = shiftName;
        this.shiftFromTime = shiftFromTime;
        this.shiftToTime = shiftToTime;
        this.timingType = timingType;
        this.timingValues = timingValues;
        this.timingOneTimeDate = timingOneTimeDate;
        this.startTime = startTime;
        this.createDate = createDate;
        this.status = status;
        this.comments = comments;
    }
}