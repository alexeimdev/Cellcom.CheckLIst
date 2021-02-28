
export default class ShiftHelper {

    static isCurrentTimeInRange(startTime, endTime) {
        const now = new Date();

        const time = this.getFullHourString(now) + this.getFullMinutesString(now) + this.getFullSecondsString(now);
        const start = startTime.split(':').join('');
        const end = endTime.split(':').join('');

        if (start <= end) {
            return time >= start && time <= end;
        }
        else {
            return time >= start || time <= end;
        }
    }

    static checkCurrentTimeShift(shifts) {
        for (const shift of shifts) {
            if (this.isCurrentTimeInRange(shift.fromTime, shift.toTime)) {
                return shift.id;
            }
        }
        return -1;
    }

    static getFullHourString(date) {
        return (date.getHours() < 10 ? '0' : '') + date.getHours();
    }

    static getFullMinutesString(date) {
        return (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    }

    static getFullSecondsString(date) {
        return (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
    }
}