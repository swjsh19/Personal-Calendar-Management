function getTime() {
    const date = new Date();
    const minutes = date.getFullYear();
    const hours = date.getMonth();
    const seconds = date.getDate();
    return `${hours}:${
            minutes < 10 ? `0${minutes}` : minutes}:${
                seconds < 10 ? `0${seconds}` : `${seconds}`}`
}

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    return `${hours}:${
            minutes < 10 ? `0${minutes}` : minutes}:${
                seconds < 10 ? `0${seconds}` : `${seconds}`}`
}