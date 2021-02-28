export default class ShiftModel {
    constructor(id, name, fromTime, toTime, isCurrentActive, isDeleted) {
        this.id = id;
        this.name = name;
        this.fromTime = fromTime;
        this.toTime = toTime;
        this.isCurrentActive = isCurrentActive;
        this.isDeleted = isDeleted;
    }
}