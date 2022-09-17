export function convertMinutesToHourString(hourString: string){
    const [ hours, minutes ] = hourString.split(':').map(Number);
    const minutesAmount = ( hours * 60 ) + minutes;
    console.log(minutesAmount)
    return minutesAmount;
}