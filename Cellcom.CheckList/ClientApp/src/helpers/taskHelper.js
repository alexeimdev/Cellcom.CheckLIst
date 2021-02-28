import Helper from './helper';

export default {
    getTimingText: (timingType) => {
        switch (timingType) {
            case 0: return "יומי";
            case 1: return "מזדמן";
            case 2: return "שבועי";
            case 3: return "חודשי";
            default: return ""; 
        }
    },
    getTimingValues: (timingType, timingValues) => {
        let values = "";
        switch (timingType) {
            case 0:
                values = "";
                break;
            case 1:
                values = Helper.fixDateFormat(timingValues);
                break;
            case 2:
                const splitedValues = timingValues.split(',');
                const valuesArr = splitedValues.map(x => Helper.getDayOfTheWeek(x)).sort();
                return valuesArr.join(', ');
                break;
            case 3:
                values = timingValues.split(',').sort().join(', ')
                break;
            default:
                break;
        }

        return values;
    },
    getProgressValue: (time, startTime, endTime) => {
        let progress = 0;

        const now = new Date();

        const timeArr = time.split(':'); 
        const startTimeArr = startTime.split(':');
        const endTimeArr = endTime.split(':');

        const currentDate = new Date(now.getTime());
        currentDate.setHours(timeArr[0]);
        currentDate.setMinutes(timeArr[1]);
        currentDate.setSeconds(timeArr[2]);

        const startDate = new Date(now.getTime());
        startDate.setHours(startTimeArr[0]);
        startDate.setMinutes(startTimeArr[1]);
        startDate.setSeconds(startTimeArr[2]);

        const endDate = new Date(now.getTime());
        endDate.setHours(endTimeArr[0]);
        endDate.setMinutes(endTimeArr[1]);
        endDate.setSeconds(endTimeArr[2]);

        const isInRange = startDate <= currentDate && currentDate < endDate;
        const isRunning = currentDate < now && now < endDate;

        if (isInRange) {
            if (isRunning) {
                const partTime = now - currentDate;
                const totalTime = endDate - currentDate;
                progress = Math.ceil((partTime / totalTime) * 100); 
            }
        }

        return progress;
    },

}