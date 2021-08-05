export default function convertTime(min) {
    min = min.split(' ')[0];
    const hours = Math.floor(min / 60);
    const minutes = min % 60;
    const format = hours === 0 ? `${minutes}m` : (minutes === 0 ? `${hours}h` : `${hours}h ${minutes}m`);

    return format;
};
