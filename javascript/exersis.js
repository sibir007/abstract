console.log(new Date(2013, 1, 20, 3, 12))

let daysMap = new Map(
    [
        [0, 'ВС'],
        [1, 'ПН'],
        [2, 'ВТ'],
        [3, 'СР'],
        [4, 'ЧТ'],
        [5, 'ПТ'],
        [6, 'СБ'],
]
    
)
let date = new Date(2012, 0, 3);  // 3 января 2012 года
// alert( getWeekDay(date) ); 

function getWeekDay(date) {
    console.log(daysMap.get(String(date.getDay())))
}

