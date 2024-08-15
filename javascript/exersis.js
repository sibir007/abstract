let obj1 = Object()
let user = {}

user.name = 'Joth'
user['surname'] = 'Smith'

user.name = 'Pete'

delete user.name

function isEmpty(obj){
    for(key in obj){
        return false
    }
    return true
}

let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
  }

function salariesSum(obj){
    let sum = 0;
    for(key in obj){
        sum += obj[key]
    }
    return sum
}  

alert(salariesSum(salaries))

// до вызова функции
let menu = {
    width: 200,
    height: 300,
    title: "My menu"
  };

function multiplyNumeric(menu){
    for(key in menu){
        if (typeof menu[key] == 'number'){
            menu[key] *= 2
        }
    }
}

multiplyNumeric(menu)

for(key in menu){
    console.log(menu[key])
}