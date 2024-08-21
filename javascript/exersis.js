let list = {
    value: 1,
    next: {
      value: 2,
      next: {
        value: 3,
        next: {
          value: 4,
          next: null
        }
      }
    }
  };

function printListRec(list) {
  if (list.next) printListRec(list.next)
  console.log(list.value)
}

function printListIt(list) {
    let current = list
    // let count = 0
    let values = []
    do {
        values.push(current.value)
        // console.log(current.value)
        current = current.next
    } while (current);
    
    do {
      current = values.pop()
      if (current) console.log(current);
    } while (current);

}

printListRec(list)
printListIt(list)
// console.log(Boolean(null))

