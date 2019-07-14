function formatTime(mins) {
    const days = parseInt(mins / 1440);
    const hours = parseInt(mins % 1440 / 60);
    const minutes = mins % 1440 % 60;
    return `${days} days, ${hours} hours, ${minutes} minutes`
}

formatTime(120);
formatTime(59);
formatTime(3601);
