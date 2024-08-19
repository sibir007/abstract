console.log(`isFinite(NaN) ${isFinite(NaN)}`);
console.log(`isFinite(null) ${isFinite(null)}`);
console.log(`isFinite('str') ${isFinite('str')}`);
// console.log(isFinite(15));
console.log(`isFinite('15') ${isFinite('15')}`);
console.log(`isFinite(' ') ${isFinite(' ')}`);

console.log('--------------------');

console.log(Number.isFinite(NaN));
console.log(Number.isFinite(null));
console.log(Number.isFinite('str'));
// console.log(Number.isFinite(15));
console.log(Number.isFinite(+'15'));
console.log(Number.isFinite(+''));
console.log(Number(' '));

function checkNum() {
    while (true) {
        rez = prompt('enter num:');
        if (rez === null) continue;
        if (String(rez).trim() == '') continue;
        if (Number.isFinite(+rez)) break;
    }
}

checkNum()