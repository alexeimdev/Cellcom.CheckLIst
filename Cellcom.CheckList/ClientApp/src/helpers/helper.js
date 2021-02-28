export default {
    replaceBrWithNewline: (string) => {
        if (!string) return "";
        
        return string.replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, `\n`);
    },
    replaceNewlinwWithBr: (string) => {
        if (!string) return "";

        return string.replace(/(\r\n|\r|\n)/g, `<br/>`);
    },
    chopTimeSeconds: (time) => {
        if (!time) return "";

        const splittedString = time.split(":");
        return splittedString.slice(0, -1).join(':');
    },
    fixDateFormat: (date) => {
        if (!date) return "";

        const splittedString = date.split("T");
        return splittedString.join('\n');
    },
    getDate: (datetime) => {
        if (!datetime) return "";

        const splittedDateTime = datetime.split("T");
        const date = splittedDateTime[0];
        const splitedDate = date.split("-");
        return `${splitedDate[2]}/${splitedDate[1]}/${splitedDate[0]}`;
    },
    getTime: (datetime) => {
        if (!datetime) return "";

        const splittedDateTime = datetime.split("T");
        const time = splittedDateTime[1];
        return time;
    },
    getDatePickerFormat: (datetime) => {
        if (!datetime) return null;

        if (datetime instanceof Date) return datetime;

        const splittedDateTime = datetime.split("T");
        const date = splittedDateTime[0];
        return new Date(date);
    },
    getTimeFromDate: (date) => {
        const hours = (date.getHours() < 10 ? '0' : '') + date.getHours();
        const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
        return hours + ":" + minutes;
        
    },
    getDayOfTheWeek: (day) => {
        if (!day) return "";

        switch (day) {
            case "1": return "ב'";
            case "2": return "ג'";
            case "3": return "ד'";
            case "4": return "ה'";
            case "5": return "ו'";
            case "6": return "ש'";
            case "7": return "א'";
            default: return "";
        }
    },
}