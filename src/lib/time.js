export function millisecondsToMinutesAndSeconds(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return seconds == 60 ? minutes + 1 + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

export function toDateFormat(timestamp) {
    if (timestamp === "1970-01-01T00:00:00Z") return null;
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;

}

export function greeting() {
    const hours = new Date().getHours();

    if (hours < 12) {
        return ('Good morning');
    } else if (hours >= 12 && hours < 18) {
        return ('Good afternoon');
    } else {
        return ('Good evening');
    }
}

export function timeColor() {
    const hours = new Date().getHours();
    if (hours < 12) {
        return ('text-[#FFD700]');
    } else if (hours >= 12 && hours < 18) {
        return ('text-[#FFA500]');
    } else {
        return ('text-[#FF6347]');
    }
}
export function getHours() {
    const hours = new Date().getHours();
    return hours;
}

export function getGradient() {
    return "g" + new Date().getHours()
}