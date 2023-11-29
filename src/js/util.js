function getDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const toDate = date.getDate();
    return `${year}년 ${month+1}월 ${toDate}일`
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