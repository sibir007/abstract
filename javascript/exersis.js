style = ['Джаж', 'Блюз'];
console.log(style)
style.push('РР');
console.log(style)
style[Math.floor(style.length/2)] = 'Classic';
console.log(style)
console.log(style.shift())
style.unshift('Rep', 'Reggi')
console.log(style)

let arr = ["a", "b"];

arr.push(function() {
  console.log( this );
})

arr[2](); // a,b,function(){...}

function sumInput() {
    rezArr = []
    while (true) {
        rez = prompt('enter num:', '');
        if (rez == null || +rez == NaN || rez == '') break;
        rezArr.push(+rez);
    }
    rezSum = 0;
    for (const num of rezArr) {
        rezSum += num
    }
    console.log(rezSum)
}

sumInput()