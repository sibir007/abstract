function unique(arr) {
    return new Set(arr)
  }
  
  let values = ["Hare", "Krishna", "Hare", "Krishna",
    "Krishna", "Krishna", "Hare", "Hare", ":-O"
  ];
  
console.log( unique(values) ); // Hare,Krishna,:-O

function aclean(arr) {
    let resMap = arr.reduce(function (acc, val) {
        acc.
        set(val.toLowerCase().
        split('').
        sort().
        join(''), val);
        return acc;
    }, new Map);
    return Array.from(resMap.values())
} 

// String().sort

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

console.log( aclean(arr) ); // "nap,teachers,ear" или "PAN,cheaters,era"