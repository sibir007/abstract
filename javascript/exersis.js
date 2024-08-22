function makeCounter() {
    let count = 0;
    
    let counter = function func() {
        
        func.set = (num) =>  count = num;
        
        func.decrease = () => --count;
        
        return  count++
    
    }
    return counter
    // ... ваш код ...
  }

let counter = makeCounter();

console.log( counter() ); // 0
console.log( counter() ); // 1

counter.set(10); // установить новое значение счётчика

console.log( counter() ); // 10

counter.decrease(); // уменьшить значение счётчика на 1

console.log( counter() ); // 10 (вместо 11)



function randomInteger(min, max) {

    return () => Math.floor(Math.random()*(max - min) + min)
} 

// console.log(randomInteger())
// console.log(randomInteger())
// console.log(randomInteger())
// console.log(randomInteger())
let rand = randomInteger(1, 5)
console.log( rand() ); // 1
console.log( rand() ); // 1
console.log( rand() ); // 1
console.log( rand() ); // 1
console.log( rand() ); // 1
console.log( rand() ); // 1
console.log( rand() ); // 1
console.log( rand() ); // 1
console.log( rand() ); // 1

