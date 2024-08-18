# javascript

## Основы JavaScript

### Структура кода

    alert('Привет'); alert('Мир');
    alert('Привет')
    alert('Мир')

    alert("После этого сообщения ждите ошибку")
    [1, 2].forEach(alert)
 
    function f() {
      // после объявления функции необязательно ставить точку с запятой
    }
    for(;;) {
      // после цикла точка с запятой также необязательна
    }

### Строгий режим — "use strict"

    "use strict";

#### Консоль браузера

`'use strict';`
`Shift+Enter` для перехода на новую строку>

### Переменные

    let user = 'John', age = 25, message = 'Hello';

    var user // это устаревший способ объявления.

#### Константы

    const COLOR_RED = "#F00";

### Типы данных

#### number

    let n = 123;
    n = 12.345;
    alert( Infinity ); // Infinity

    alert( "не число" / 2 ); // NaN, такое деление является ошибкой любая математическая операция с NaN возвращает NaN

#### BigInt

    // символ "n" в конце означает, что это BigInt
    const bigInt = 1234567890123456789012345678901234567890n;

#### string

    let str = "Привет";
    let str2 = 'Одинарные кавычки тоже подойдут';
    let phrase = `Обратные кавычки позволяют встраивать переменные ${str}`;

#### boolean

    let nameFieldChecked = true; // да, поле отмечено
    let ageFieldChecked = false; // нет, поле не отмечено

#### null

    let age = null; // специальное значение, которое представляет собой «ничего», «пусто» или «значение неизвестно»

#### undefined

    let age;
    alert(age); // выведет "undefined"
    name = undefined; // не рекомендуется
null используется для присвоения переменной «пустого» или «неизвестного» значения, а undefined – для проверок, была ли переменная назначена.

#### object

#### symbol

используется для создания уникальных идентификаторов в объектах

#### Оператор typeof

    // Обычный синтаксис
    typeof 5 // Выведет "number"
    // Синтаксис, напоминающий вызов функции (встречается реже)
    typeof(5) // Также выведет "number"

    typeof undefined // "undefined"
    typeof 0 // "number"
    typeof 10n // "bigint"
    typeof true // "boolean"
    typeof "foo" // "string"
    typeof Symbol("id") // "symbol"
    typeof Math // "object"  (1)
    typeof null // "object"  (2)
    typeof alert // "function"  (3)

    typeof null == "object" // ошибка в языке
    typeof function(){} == "function" // именно для функций

### Взаимодействие: alert, prompt, confirm

    alert("Hello");
    result = prompt(title, [default]);
    result = confirm(question); // true, folse

### Преобразование типов

#### Строковое преобразование

    let value = true;
    alert(typeof value); // boolean
    value = String(value); // теперь value это строка "true"
    alert(typeof value); // string

#### Численное преобразование

    alert( "6" / "2" ); // 3, строки преобразуются в числа

    let str = "123";
    alert(typeof str); // string
    let num = Number(str); // становится числом 123
    alert(typeof num); // number

    let age = Number("Любая строка вместо числа");
    alert(age); // NaN, преобразование не удалось

    undefined NaN
    null 0
    true / false 1 / 0
    string Пробельные символы (пробелы, знаки табуляции \t, знаки новой строки \n и т. п.) по краям обрезаются. Далее, если остаётся пустая строка, то получаем 0, иначе из непустой строки «считывается» число. При ошибке результат NaN.

#### Логическое преобразование

false Значения, которые интуитивно «пустые», вроде 0, пустой строки, null, undefined и NaN.
true Все остальные значения становятся

### Базовые операторы, математика

Сложение +,
Вычитание -,
Умножение *,
Деление /,
Взятие остатка от деления %,
Возведение в степень **.

#### Сложение строк при помощи бинарного +

    let s = "моя" + "строка";
    alert(s); // моястрока

    alert(2 + 2 + '1' ); // будет "41", а не "221"

    alert( 6 - '2' ); // 4, '2' приводится к числу
    alert( '6' / '2' ); // 3, оба операнда приводятся к числам

#### Приведение к числу, унарный +

    // Не влияет на числа
    let x = 1;
    alert( +x ); // 1
    let y = -2;
    alert( +y ); // -2

    // Преобразует не числа в числа
    alert( +true ); // 1
    alert( +"" );   // 0

    let apples = "2";
    let oranges = "3";
    alert( apples + oranges ); // "23", так как бинарный плюс объединяет строки

    // оба операнда предварительно преобразованы в числа
    alert( +apples + +oranges ); // 5

#### Приоритет операторов

15 унарный плюс +
15 унарный минус -
14 возведение в степень **
13 умножение *
13 деление /
12 сложение +
12 вычитание -
2 присваивание =

#### Сокращённая арифметика с присваиванием

    let n = 2;
    n += 5; // теперь n = 7 (работает как n = n + 5)
    n *= 2; // теперь n = 14 (работает как n = n * 2)
    alert( n ); // 14

#### Инкремент/декремент

    let counter = 1;
    let a = ++counter; // (*)
    alert(a); // 2

    let counter = 1;
    let a = counter++; // (*) меняем ++counter на counter++
    alert(a); // 1
    alert(counter); // 2

#### Побитовые операторы}

AND(и) ( & )
OR(или) ( | )
XOR(побитовое исключающее или) ( ^ )
NOT(не) ( ~ )
LEFT SHIFT(левый сдвиг) ( << )
RIGHT SHIFT(правый сдвиг) ( >> )
ZERO-FILL RIGHT SHIFT(правый сдвиг с заполнением нулями) ( >>> )

##### Оператор «запятая»

    let a = (1 + 2, 3 + 4);
    alert( a ); // 7 (результат вычисления 3 + 4)
первое выражение 1 + 2 выполняется, а результат отбрасывается. Затем идёт 3 + 4, выражение выполняется и возвращается результат.

    a = 1 + 2, 3 + 4;
    alert(a); // 3

### Операторы сравнения

    alert( 2 > 1 );  // true (верно)
    alert( 2 == 1 ); // false (неверно)
    alert( 2 != 1 ); // true (верно)

    let result = 5 > 4; // результат сравнения присваивается переменной result
    alert( result ); // true

#### Сравнение строк

Используется кодировка Unicode, а не настоящий алфавит
    alert( 'Я' > 'А' ); // true
    alert( 'Коты' > 'Кода' ); // true
    alert( 'Сонный' > 'Сон' ); // true

#### Сравнение разных типов

При сравнении значений разных типов JavaScript приводит каждое из них к числу.
    alert( '2' > 1 ); // true, строка '2' становится числом 2
    alert( '01' == 1 ); // true, строка '01' становится числом 1

    alert( true == 1 ); // true
    alert( false == 0 ); // true

    let a = 0;
    alert( Boolean(a) ); // false
    let b = "0";
    alert( Boolean(b) ); // true
    alert(a == b); // true!

#### Строгое сравнение

    alert( 0 == false ); // true
    alert( '' == false ); // true
    alert( 0 === false ); // false, так как сравниваются разные типы

#### Сравнение с null и undefined

    alert( null === undefined ); // false
    alert( null == undefined ); // true

При использовании математических операторов и других операторов сравнения < > <= >= значения null/undefined преобразуются к числам: null становится 0, а undefined – NaN.

Странный результат сравнения null и 0
    alert( null > 0 );  // (1) false
    alert( null == 0 ); // (2) false
    alert( null >= 0 ); // (3) true
для нестрогого равенства == значений undefined и null действует особое правило: эти значения ни к чему не приводятся, они равны друг другу и не равны ничему другому. Поэтому (2) null == 0 ложно.

#### Несравненное значение undefined

Значение undefined несравнимо с другими значениями:
    alert( undefined > 0 ); // false (1)
    alert( undefined < 0 ); // false (2)
    alert( undefined == 0 ); // false (3)
    alert( undefined == false); // false (4)

#### Как избежать проблем

Относитесь очень осторожно к любому сравнению с undefined/null, кроме случаев строгого равенства ===.
Не используйте сравнения >= > < <= с переменными, которые могут принимать значения null/undefined, разве что вы полностью уверены в том, что делаете. Если переменная может принимать эти значения, то добавьте для них отдельные проверки.

### Условное ветвление: if, '?'

#### Инструкция «if»

    if (year == 2015) alert( 'Вы правы!' );

    let year = prompt('В каком году была опубликована спецификация ECMAScript-2015?', '');
    if (year < 2015) {
  alert( 'Это слишком рано...' );
    } else if (year > 2015) {
  alert( 'Это поздновато' );
    } else {
  alert( 'Верно!' );
    }

#### Условный оператор „?“

    let accessAllowed = (age > 18) ? true : false;
    // то же самое
    let accessAllowed = age > 18 ? true : false;
    let accessAllowed = age > 18;

    let message = (age < 3) ? 'Здравствуй, малыш!' :
  (age < 18) ? 'Привет!' :
  (age < 100) ? 'Здравствуйте!' :
  'Какой необычный возраст!';

не рекомендуется
    let company = prompt('Какая компания создала JavaScript?', '');
    (company == 'Netscape') ?
   alert('Верно!') : alert('Неправильно.');

### Логические операторы

#### || (ИЛИ)

ИЛИ "||" находит первое истинное значение, если все операнды являются ложными (false), возвращает последний из них
    alert( true || true );   // true
    alert( false || true );  // true
    alert( true || false );  // true
    alert( false || false ); // false

    alert( 1 || 0 ); // 1 (1 - истинное значение)
    alert( true || 'какая-то строка' ); // true
    alert( null || 1 ); // 1 (первое истинное значение)
    alert( null || 0 || 1 ); // 1 (первое истинное значение)
    alert( undefined || null || 0 ); // 0 (поскольку все ложно, возвращается последнее значение)

##### Получение первого истинного значения из списка переменных или выражений

    let firstName = "";
    let lastName = "";
    let nickName = "Суперкодер";

    alert( firstName || lastName || nickName || "Аноним"); // Суперкодер

##### Сокращённое вычисление

    true || alert("никогда не сработает");
    false || alert("сработает");

#### ||= (Логическое присваивание ИЛИ)

    a ||= b;
    a || (a = b);

#### && (И)

    alert( true && true );   // true
    alert( false && true );  // false
    alert( true && false );  // false
    alert( false && false ); // false

И «&&» находит первое ложное значение, если все операнды были истинными, возвращается последний
    result = value1 && value2 && value3;

    alert( 1 && 2 && null && 3 ); // null
    alert( 1 && 2 && 3 ); // 3

Приоритет оператора && больше, чем у ||

#### &&= (Логическое присваивание И)

    a &&= b;
    a && (a = b);

    let greeting = "Привет"; // строка непустая, поэтому будет преобразована к логическому значению true оператором &&=
    greeting &&= greeting + ", пользователь!"; // то же самое, что true && (greeting = greeting + "...")
    alert( greeting ) // "Привет, пользователь!"

#### ! (НЕ)

    alert( !true ); // false
    alert( !0 ); // true

    alert( !!"непустая строка" ); // true
    alert( !!null ); // false

### Операторы нулевого слияния и присваивания: '??', '??='

#### Оператор нулевого слияния (??)

    result = a ?? b

Результат выражения a ?? b будет следующим:
если a определено, то a,
если a не определено, то b.

тоже самое
    result = (a !== null && a !== undefined) ? a : b;

    let user;
    alert(user ?? "Аноним"); // Аноним (user не существует)

    let user = "Иван";
    alert(user ?? "Аноним"); // Иван (user существует)

    let firstName = null;
    let lastName = null;
    let nickName = "Суперкодер";
    // показывает первое значение, которое определено:
    alert(firstName ?? lastName ?? nickName ?? "Аноним");

##### Использование ?? вместе с && или ||

    let x = 1 && 2 ?? 3; // Синтаксическая ошибка
    let x = (1 && 2) ?? 3; // Работает без ошибок
    alert(x); // 2

##### Оператор нулевого присваивания (??=)

    x ??= y

    let userAge = null;
    userAge ??= 18;
    alert(userAge) // 18

### Циклы while и for

#### Цикл «while»

    let i = 0;
    while (i < 3) { // выводит 0, затем 1, затем 2
      alert( i );
      i++;
    }

    let i = 3;
    while (i) { // когда i будет равно 0, условие станет ложным, и цикл остановится
      alert( i );
      i--;
    }

    let i = 3;
    while (i) alert(i--);

#### Цикл «do…while»

    let i = 0;
    do {
      alert( i );
      i++;
    } while (i < 3);

#### Цикл «for»

    for (let i = 0; i < 3; i++) { // выведет 0, затем 1, затем 2
      alert(i);
    }

    for (let i = 0; i < 3; i++) {
      alert(i); // 0, 1, 2
    }
    alert(i); // ошибка, нет такой переменной
    let i = 0;

    for (i = 0; i < 3; i++) { // используем существующую переменную
      alert(i); // 0, 1, 2
    }
    alert(i); // 3, переменная доступна, т.к. была объявлена снаружи цикла

##### Пропуск частей «for»

    let i = 0; // мы уже имеем объявленную i с присвоенным значением

    for (; i < 3; i++) { // нет необходимости в "начале"
      alert( i ); // 0, 1, 2
    }

    for (; i < 3;) {
      alert( i++ );
    }

    for (;;) {
      // будет выполняться вечно
    }

#### Прерывание цикла: «break»

    let sum = 0
    while (true) {
      let value = +prompt("Введите число", '');
      if (!value) break; // (*)
      sum += value;
    }
    alert( 'Сумма: ' + sum );

#### Переход к следующей итерации: continue

    for(let i = 0; i<10; i++){
        if(i % 2 == 0) continue;
        alert(i);
    };

    (i > 5) ? alert(i) : continue; // continue здесь приведёт к ошибке

#### Метки для break/continue

    outer: for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let input = prompt(`Значение на координатах (${i},${j})`, '');
        // если пустая строка или Отмена, то выйти из обоих циклов
        if (!input) break outer; // (*)
        // сделать что-нибудь со значениями...
      }
    }
    alert('Готово!');

    outer:
    for (let i = 0; i < 3; i++) { ... }

    break label; // не прыгает к метке ниже
    label: for (...)

### Конструкция "switch"

    let a = 2 + 2;
    switch (a) {
      case 3:
        alert( 'Маловато' );
        break;
      case 4:
        alert( 'В точку!' );
        break;
      case 5:
        alert( 'Перебор' );
        break;
      default:
        alert( "Нет таких значений" );
    }

Если break нет, то выполнение пойдёт ниже по следующим case, при этом остальные проверки игнорируются.
    let a = 2 + 2;
    switch (a) {
      case 3:
        alert( 'Маловато' );
      case 4:
        alert( 'В точку!' ); //выполница
      case 5:
        alert( 'Перебор' ); //выполница
      default:
        alert( "Нет таких значений" ); //выполница
    }

    let a = "1";
    let b = 0;
    switch (+a) {
      case b + 1:
        alert("Выполнится, т.к. значением +a будет 1, что в точности равно b+1");
        break;
      default:
        alert("Это не выполнится");
    }

    let a = 3;
    switch (a) {
      case 4:
        alert('Правильно!');
        break;
      case 3: // (*) группируем оба case
      case 5: // 3 и 5 выводят одно сообщение.
        alert('Неправильно!');
        alert("Может вам посетить урок математики?");
        break;
      default:
        alert('Результат выглядит странновато. Честно.');
    }
проверка на равенство всегда строгая, значения должны быть одного типа, чтобы выполнялось равенство
    let arg = prompt("Введите число?");
    switch (arg) {
      case '0':
      case '1':
        alert( 'Один или ноль' );
        break;
      case '2':
        alert( 'Два' );
        break;
      case 3:
        alert( 'Никогда не выполнится!' );
        break;
      default:
        alert( 'Неизвестное значение' );
    }

### Функции

    let userName = 'Вася';

    function showMessage() {
      userName = "Петя"; // (1) изменяем значение внешней переменной
      let message = 'Привет, ' + userName;
      alert(message);
    }
    alert( userName ); // Вася перед вызовом функции
    showMessage();
    alert( userName ); // Петя, значение внешней переменной было изменено функцией

    let userName = 'Вася';

    function showMessage() {
      let userName = "Петя"; // объявляем локальную переменную
      let message = 'Привет, ' + userName; // Петя
      alert(message);
    }
    // функция создаст и будет использовать свою собственную локальную переменную userName
    showMessage();
    alert( userName ); // Вася, не изменилась, функция не трогала внешнюю переменную

    function showMessage(from, text) {
      from = '*' + from + '*'; // немного украсим "from"
      alert( from + ': ' + text );
    }
    let from = "Аня";
    showMessage(from, "Привет"); // *Аня*: Привет
    // значение "from" осталось прежним, функция изменила значение локальной переменной
    alert( from ); // Аня

    // Если при вызове функции аргумент не был указан, то его значением становится undefined.

    showMessage("Аня"); //"*Аня*: undefined"

    function showMessage(from, text = "текст не добавлен") { // значение по умолчанию
      alert( from + ": " + text );
    }
    showMessage("Аня"); // Аня: текст не добавлен

    function showMessage(from, text = anotherFunction()) {
      // anotherFunction() выполнится только если не передан text
      // результатом будет значение text
    }

    function showMessage(text) {
      // ...
      if (text === undefined) { // если параметр отсутствует
        text = 'пустое сообщение';
      }
      alert(text);
    }
    showMessage(); // пустое сообщение

    function showMessage(text) {
      // если значение text ложно или равняется undefined, тогда присвоить text значение 'пусто'
      text = text || 'пусто';
      ...
    }

    function showCount(count) {
      // если count равен undefined или null, показать "неизвестно"
      alert(count ?? "неизвестно");
    }
    showCount(0); // 0
    showCount(null); // неизвестно
    showCount(); // неизвестно

    function checkAge(age) {
      if (age >= 18) {
        return true;
      } else {
        return confirm('А родители разрешили?');
      }
    }
    let age = prompt('Сколько вам лет?', 18);
    if ( checkAge(age) ) {
      alert( 'Доступ получен' );
    } else {
      alert( 'Доступ закрыт' );
    }

    function showMovie(age) {
      if ( !checkAge(age) ) {
        return;
      }
      alert( "Вам показывается кино" ); // (*)
      // ...
    }

    function doNothing() { /* пусто */ }
    alert( doNothing() === undefined ); // true

    return (
      some + long + expression
      + or +
      whatever * f(a) + f(b)
      )

### Function Expression

    function sayHi() {
      alert( "Привет" );
    }

    let sayHi = function() {
      alert( "Привет" );
    };

    alert( sayHi ); // выведет код функции

    let func = sayHi;    // (2) копируем
    func(); // Привет     // (3) вызываем копию (работает)!

Function Expression ставится точка с запятой ; на конце, а в Function Declaration нет

Функции-«колбэки»

    function ask(question, yes, no) {
      if (confirm(question)) yes()
      else no();
    }

    function showOk() {
      alert( "Вы согласны." );
    }

    function showCancel() {
      alert( "Вы отменили выполнение." );
    }

    // использование: функции showOk, showCancel передаются в качестве аргументов ask
    ask("Вы согласны?", showOk, showCancel);

    ask(
      "Вы согласны?",
      function() { alert("Вы согласились."); },
      function() { alert("Вы отменили выполнение."); }
    );

Function Expression создаётся, когда выполнение доходит до него, и затем уже может использоваться.

Function Declaration может быть вызвана раньше, чем она объявлена.

    sayHi("Вася"); // Привет, Вася
    function sayHi(name) {
      alert( `Привет, ${name}` );
    }

В строгом режиме, когда Function Declaration находится в блоке {...}, функция доступна везде внутри блока. Но не снаружи него.

    let age = prompt("Сколько Вам лет?", 18);
    // в зависимости от условия объявляем функцию
    if (age < 18) {
      function welcome() {
        alert("Привет!");
      }
    } else {
      function welcome() {
        alert("Здравствуйте!");
      }
    }
    // ...не работает
    welcome(); // Error: welcome is not defined

    let age = 16; // возьмём для примера 16
    if (age < 18) {
      welcome();               // \   (выполнится)
      function welcome() {     //  |
        alert("Привет!");      //  |  Function Declaration доступно
      }                        //  |  во всём блоке кода, в котором объявлено
      welcome();               // /   (выполнится)
    } else {
      function welcome() {
        alert("Здравствуйте!");
      }
    }
    // здесь фигурная скобка закрывается,
    // поэтому Function Declaration, созданные внутри блока кода выше -- недоступны отсюда.
    welcome(); // Ошибка: welcome is not defined

Function Expression

    let age = prompt("Сколько Вам лет?", 18);
    let welcome;
    if (age < 18) {
      welcome = function() {
        alert("Привет!");
      };
    } else {

      welcome = function() {
        alert("Здравствуйте!");
      };
    }
    welcome(); // теперь всё в порядке

используя условный оператор ?:

    let age = prompt("Сколько Вам лет?", 18);
    let welcome = (age < 18) ?
      function() { alert("Привет!"); } :
      function() { alert("Здравствуйте!"); };
    welcome(); // теперь всё в порядке

### Стрелочные функции, основы

    let age = prompt("Сколько Вам лет?", 18);
    let welcome = (age < 18) ?
      () => alert('Привет!') :
      () => alert("Здравствуйте!");
    welcome();

    let sum = (a, b) => {  // фигурная скобка, открывающая тело многострочной функции
      let result = a + b;
      return result; // если мы используем фигурные скобки, то нам нужно явно указать "return"
    };
    alert( sum(1, 2) ); // 3

## Качество кода

### Комментарии

однострочный

        // однострочный

многострочный

        /* 
        многострочный 
        многострочный 
        многострочный 
        многострочный 
        */

документирование

        /**
        * Возвращает x, возведённое в n-ную степень.
        *
        * @param {number} x Возводимое в степень число.
        * @param {number} n Степень, должна быть натуральным числом.
        * @return {number} x, возведённое в n-ную степень.
        */
        function pow(x, n) {
          ...
        }

## Объекты: основы

### Литералы и свойства

        let user = new Object(); // синтаксис "конструктор объекта"
        let user = {};  // синтаксис "литерал объекта"

        let user = {
          name: "John",
          age: 30,
          "likes birds": true,  // имя свойства из нескольких слов должно быть в кавычках
        };
        // получаем свойства объекта:
        alert( user.name ); // John
        alert( user.age ); // 30

можно добавить свойство после создания

        user.isAdmin = true;
        
        delete user.age;

Квадратные скобки

        // присваивание значения свойству
        user["likes birds"] = true;

        // получение значения свойства
        alert(user["likes birds"]); // true

        // удаление свойства
        delete user["likes birds"];

        
        let key = prompt("Что вы хотите узнать о пользователе?", "name");

        // доступ к свойству через переменную
        alert( user[key] ); // John (если ввели "name")

        alert( user.key ); // undefined

        let fruit = prompt("Какой фрукт купить?", "apple");

Вычисляемые свойства

        let bag = {
          [fruit]: 5, // имя свойства будет взято из переменной fruit
        };
        alert( bag.apple ); // 5, если fruit="apple"

        let fruit = 'apple';
        let bag = {
          [fruit + 'Computers']: 5 // bag.appleComputers = 5
        };

Свойство из переменной

        function makeUser(name, age) {
          return {
            name: name,
            age: age
            // ...другие свойства
          };
        }
        let user = makeUser("John", 30);
        alert(user.name); // John

        function makeUser(name, age) {
          return {
            name, // то же самое, что и name: name
            age   // то же самое, что и age: age
            // ...
          };
        }

Ограничения на имена свойств

        // эти имена свойств допустимы
        let obj = {
          for: 1,
          let: 2,
          return: 3
        };
        alert( obj.for + obj.let + obj.return );  // 6

        let obj = {
          0: "Тест" // то же самое что и "0": "Тест", преобразуется в строку
        };
        // обе функции alert выведут одно и то же свойство (число 0 преобразуется в строку "0")
        alert( obj["0"] ); // Тест
        alert( obj[0] ); // Тест (то же свойство)

        let obj = {};
        obj.__proto__ = 5; // присвоим число
        alert(obj.__proto__); // [object Object], значение - это объект, т.е. не то, что мы ожидали

### Проверка существования свойства, оператор «in»

        let user = {};
        alert( user.noSuchProperty === undefined ); // true означает "свойства нет"

        let user = { name: "John", age: 30 };
        alert( "age" in user ); // true, user.age существует
        alert( "blabla" in user ); // false, user.blabla не существует

        let obj = {
          test: undefined
        };
        alert( obj.test ); //  выведет undefined, значит свойство не существует?
        alert( "test" in obj ); // true, свойство существует!

### Цикл "for..in"

        let user = {
          name: "John",
          age: 30,
          isAdmin: true
        };

        for (let key in user) {
          // ключи
          alert( key );  // name, age, isAdmin
          // значения ключей
          alert( user[key] ); // John, 30, true
        }

### Упорядочение свойств объекта

свойства упорядочены особым образом: свойства с целочисленными ключами сортируются по возрастанию, остальные располагаются в порядке создания. Термин «целочисленное свойство» означает строку, которая может быть преобразована в целое число и обратно без изменений.

        // Math.trunc - встроенная функция, которая удаляет десятичную часть
        alert( String(Math.trunc(Number("49"))) ); // "49", то же самое ⇒ свойство целочисленное
        alert( String(Math.trunc(Number("+49"))) ); // "49", не то же самое, что "+49" ⇒ свойство не целочисленное
        alert( String(Math.trunc(Number("1.2"))) ); // "1", не то же самое, что "1.2" ⇒ свойство не целочисленное

        let codes = {
          "49": "Германия",
          "41": "Швейцария",
          "44": "Великобритания",
          // ..,
          "1": "США"
        };
        for (let code in codes) {
          alert(code); // 1, 41, 44, 49
        }

        let user = {
          name: "John",
          surname: "Smith"
        };
        user.age = 25; // добавим ещё одно свойство
        // не целочисленные свойства перечислены в порядке создания
        for (let prop in user) {
          alert( prop ); // name, surname, age
        }

        let codes = {
          "+49": "Германия",
          "+41": "Швейцария",
          "+44": "Великобритания",
          // ..,
          "+1": "США"
        };
        for (let code in codes) {
          alert( +code ); // 49, 41, 44, 1
        }

### Копирование объектов и ссылки

        let message = "Привет!";
        let phrase = message; // копируется значение

        let user = { name: "John" };
        let admin = user; // копируется ссылка

#### Сравнение по ссылке

        let a = {};
        let b = a; // копирование по ссылке
        alert( a == b ); // true, обе переменные ссылаются на один и тот же объект
        alert( a === b ); // true

        let a = {};
        let b = {}; // два независимых объекта
        alert( a == b ); // false

#### Клонирование и объединение, Object.assign

        let user = {
          name: "John",
          age: 30
        };
        let clone = {}; // новый пустой объект
        // давайте скопируем все свойства user в него
        for (let key in user) {
          clone[key] = user[key];
        }
        // теперь clone это полностью независимый объект с тем же содержимым
        clone.name = "Pete"; // изменим в нём данные
        alert( user.name ); // все ещё John в первоначальном объекте

        let user = { name: "John" };
        let permissions1 = { canView: true };
        let permissions2 = { canEdit: true };
        // копируем все свойства из permissions1 и permissions2 в user
        Object.assign(user, permissions1, permissions2);
        // теперь user = { name: "John", canView: true, canEdit: true }

        let user = {
          name: "John",
          age: 30
        };
        let clone = Object.assign({}, user);

#### Вложенное клонирование

Чтобы выполнить глубокое клонирование, нужно использовать рекурсию - готовая реализация: _.cloneDeep(obj) из библиотеки JavaScript lodash.

Также мы можем использовать глобальный метод structuredClone(), который позволяет сделать полную копию объекта.

### Сборка мусора

### Методы объекта, "this"

#### Сокращённая запись метода

    // эти объекты делают одно и то же
    user = {
      sayHi: function() {
        alert("Привет");
      }
    };
    // сокращённая запись выглядит лучше, не так ли?
    user = {
      sayHi() { // то же самое, что и "sayHi: function(){...}"
        alert("Привет");
      }
    };

#### «this» не является фиксированным

    let user = { name: "John" };
    let admin = { name: "Admin" };
    function sayHi() {
      alert( this.name );
    }
    // используем одну и ту же функцию в двух объектах
    user.f = sayHi;
    admin.f = sayHi;
    // эти вызовы имеют  разное значение this
    // "this" внутри функции - это объект "перед точкой"
    user.f(); // John  (this == user)
    admin.f(); // Admin  (this == admin)
    admin['f'](); // Admin (нет разницы между использованием точки или квадратных скобок для доступа к объекту)

В строгом режиме ("use strict") в таком коде значением this будет являться undefined. Если мы попытаемся получить доступ к this.name – это вызовет ошибку.

В нестрогом режиме значением this в таком случае будет глобальный объект .

    function sayHi() {
      alert(this);
    }
    sayHi(); // undefined

#### У стрелочных функций нет «this»

    let user = {
      firstName: "Ilya",
      sayHi() {
        let arrow = () => alert(this.firstName);
        arrow();
      }
    };
    user.sayHi(); // Ilya


    Функции, которые находятся в свойствах объекта, называются «методами».
    Методы позволяют объектам «действовать»: object.doSomething().
    Методы могут ссылаться на объект через this.

#### Итого

Значение this определяется во время исполнения кода.
При объявлении любой функции в ней можно использовать this, но этот this не имеет значения до тех пор, пока функция не будет вызвана.
Функция может быть скопирована между объектами (из одного объекта в другой).
Когда функция вызывается синтаксисом «метода» – object.method(), значением this во время вызова является object.

### Конструктор, оператор "new"

    let user = new User; // <-- без скобок
    // то же, что и
    let user = new User();

#### Функция-конструктор

    function User(name) {
      // this = {};  (неявно)
      // добавляет свойства к this
      this.name = name;
      this.isAdmin = false;
      // return this;  (неявно)
    }
    let user = new User("Jack")

    // создаём функцию и сразу же вызываем её с помощью new
    let user = new function() {
      this.name = "John";
      this.isAdmin = false;
      // ...другой код для создания пользователя
      // возможна любая сложная логика и инструкции
      // локальные переменные и так далее
    };

#### Проверка на вызов в режиме конструктора: new.target

    function User() {
      alert(new.target);
    }
    // без "new":
    User(); // undefined
    // с "new":
    new User(); // function User { ... }

    function User(name) {
      if (!new.target) { // в случае, если вы вызвали меня без оператора new
        return new User(name); // ...я добавлю new за вас
      }
      this.name = name;
    }
    let john = User("John"); // переадресовывает вызов на new User
    alert(john.name); // John

#### Возврат значения из конструктора, return

    function BigUser() {
      this.name = "John";
      return { name: "Godzilla" };  // <-- возвращает этот объект
    }
    alert( new BigUser().name );  // Godzilla, получили этот объект

    // return с объектом возвращает этот объект, во всех остальных случаях возвращается this
    function SmallUser() {
      this.name = "John";
      return 'some string'; // <-- возвращает this
    }
    alert( new SmallUser().name );  // John

#### Создание методов в конструкторе

    function User(name) {
      this.name = name;

      this.sayHi = function() {
        alert( "Меня зовут: " + this.name );
      };
    }

    let john = new User("John");

    john.sayHi(); // Меня зовут: John

    /*
    john = {
      name: "John",
      sayHi: function() { ... }
    }
    */

#### Итого

Функции-конструкторы или просто конструкторы, являются обычными функциями, но существует общепринятое соглашение именовать их с заглавной буквы.
Функции-конструкторы следует вызывать только с помощью new. Такой вызов подразумевает создание пустого this в начале и возврат заполненного в конце.

Мы можем использовать конструкторы для создания множества похожих объектов.

JavaScript предоставляет функции-конструкторы для множества встроенных объектов языка: таких как Date, Set, и других, которые нам ещё предстоит изучить.

### Опциональная цепочка '?.'

    let user = {}; // пользователь без свойства "address"
    alert(user.address.street); // Ошибка!

    решение с помощью if
    let user = {};
    alert(user.address ? user.address.street : undefined);

    решение с помощью &&
    let user = {}; // пользователь без адреса
    alert( user.address && user.address.street && user.address.street.name ); // undefined (без ошибки)

Опциональная цепочка

    let user = {}; // пользователь без адреса
    alert( user?.address?.street ); // undefined (без ошибки)

    let html = document.querySelector('.elem')?.innerHTML; // будет undefined, если элемента нет

работает, даже если объект user не существует:

    let user = null;
    alert( user?.address ); // undefined
    alert( user?.address.street ); // undefined

Переменная перед ?. должна быть объявлена. Если переменной user вообще нет, то user?.anything приведёт к ошибке

#### Сокращённое вычисление

    let user = null;
    let x = 0;
    user?.sayHi(x++); // нет "user", поэтому выполнение не достигает вызова sayHi и x++
    alert(x); // 0, значение не увеличилось

#### Другие варианты применения: ?.(), ?.[]

с функцией

    let userAdmin = {
      admin() {
        alert("Я админ");
      }
    };
    let userGuest = {};
    userAdmin.admin?.(); // Я админ
    userGuest.admin?.(); // ничего не произойдет (такого метода нет)

    let key = "firstName";
    let user1 = {
      firstName: "John"
    };
    let user2 = null;
    alert( user1?.[key] ); // John
    alert( user2?.[key] ); // undefined

с delete

    delete user?.name; // удаляет user.name если пользователь существует

Мы можем использовать ?. для безопасного чтения и удаления, но не для записи

    let user = null;
    user?.name = "John"; // Ошибка, не работает
    // то же самое что написать undefined = "John"

#### Итого

Синтаксис опциональной цепочки ?. имеет три формы:

1. obj?.prop – возвращает obj.prop если obj существует, в противном случае undefined.
2. obj?.[prop] – возвращает obj[prop] если obj существует, в противном случае undefined.
3. obj.method?.() – вызывает obj.method(), если obj.method существует, в противном случае возвращает undefined.

### Тип данных Symbol

#### Символы

Символ (symbol) – примитивный тип данных, использующийся для создания уникальных идентификаторов.

Символы имеют два основных варианта использования:

 «Скрытые» свойства объектов.

 1. Если мы хотим добавить свойство в объект, который «принадлежит» другому скрипту или библиотеке, мы можем создать символ и использовать его в качестве ключа. Символьное свойство не появится в for..in, так что оно не будет нечаянно обработано вместе с другими. Также оно не будет модифицировано прямым обращением, так как другой скрипт не знает о нашем символе. Таким образом, свойство будет защищено от случайной перезаписи или использования. Так что, используя символьные свойства, мы можем спрятать что-то нужное нам, но что другие видеть не должны.

 2. Существует множество системных символов, используемых внутри JavaScript, доступных как Symbol.*. Мы можем использовать их, чтобы изменять встроенное поведение ряда объектов. Например, в дальнейших главах мы будем использовать Symbol.iterator для итераторов, Symbol.toPrimitive для настройки преобразования объектов в примитивы и так далее.

Технически символы скрыты не на 100%. Существует встроенный метод Object.getOwnPropertySymbols(obj) – с его помощью можно получить все свойства объекта с ключами-символами. Также существует метод Reflect.ownKeys(obj), который возвращает все ключи объекта, включая символьные. Так что они не совсем спрятаны. Но большинство библиотек, встроенных методов и синтаксических конструкций не используют эти методы.

      // Создаём новый символ - id
      let id = Symbol();

      // Создаём символ id с описанием (именем) "id"
      let id = Symbol("id");

      let id1 = Symbol("id");
      let id2 = Symbol("id");
      alert(id1 == id2); // false

Символы не преобразуются автоматически в строки

      let id = Symbol("id");
      alert(id); // TypeError: Cannot convert a Symbol value to a string

      let id = Symbol("id");
      alert(id.toString()); // Symbol(id), теперь работает

      let id = Symbol("id");
      alert(id.description); // id

#### «Скрытые» свойства

Символы позволяют создавать «скрытые» свойства объектов, к которым нельзя нечаянно обратиться и перезаписать их из других частей программы.

      let user = {
        name: "Вася"
      };
      let id = Symbol("id");
      user[id] = 1;
      alert( user[id] ); // мы можем получить доступ к данным по ключу-символу

Сторонний код может создать для этого свой символ Symbol("id"):

      // ...
      let id = Symbol("id");
      user[id] = "Их идентификатор";

Конфликта между их и нашим идентификатором не будет, так как символы всегда уникальны, даже если их имена совпадают.

      let user = { name: "Вася" };
      // Объявляем в нашем скрипте свойство "id"
      user.id = "Наш идентификатор";
      // ...другой скрипт тоже хочет свой идентификатор...
      user.id = "Их идентификатор"
      // Ой! Свойство перезаписано сторонней библиотекой!

#### Символы в литеральном объекте

необходимо заключить в квадратные скобки

      let id = Symbol("id");
      let user = {
        name: "Вася",
        [id]: 123 // просто "id: 123" не сработает
      };

#### Символы игнорируются циклом for…in

      let id = Symbol("id");
      let user = {
        name: "Вася",
        age: 30,
        [id]: 123
      };
      for (let key in user) alert(key); // name, age (свойства с ключом-символом нет среди перечисленных)
      // хотя прямой доступ по символу работает
      alert( "Напрямую: " + user[id] );

Object.assign, в отличие от цикла for..in, копирует и строковые, и символьные свойства

      let id = Symbol("id");
      let user = {
        [id]: 123
      };
      let clone = Object.assign({}, user);
      alert( clone[id] ); // 123

#### Глобальные символы

Symbol.for(key)

      // читаем символ из глобального реестра и записываем его в переменную
      let id = Symbol.for("id"); // если символа не существует, он будет создан
      // читаем его снова и записываем в другую переменную (возможно, из другого места кода)
      let idAgain = Symbol.for("id");
      // проверяем -- это один и тот же символ
      alert( id === idAgain ); // true

Symbol.keyFor(sym)

      // получаем символ по имени
      let sym = Symbol.for("name");
      let sym2 = Symbol.for("id");
      // получаем имя по символу
      alert( Symbol.keyFor(sym) ); // name
      alert( Symbol.keyFor(sym2) ); // id

      let globalSymbol = Symbol.for("name");
      let localSymbol = Symbol("name");
      alert( Symbol.keyFor(globalSymbol) ); // name, глобальный символ
      alert( Symbol.keyFor(localSymbol) ); // undefined для неглобального символа
      alert( localSymbol.description ); // name

#### Системные символы

Эти символы перечислены в спецификации в таблице Well-known symbols:

Symbol.hasInstance
Symbol.isConcatSpreadable
Symbol.iterator
Symbol.toPrimitive
…и так далее.

### Преобразование объектов в примитивы

Преобразование объекта в примитив вызывается автоматически многими встроенными функциями и операторами, которые ожидают примитив в качестве значения.

Существует всего 3 типа (хинта) для этого:

1. "string" (для alert и других операций, которым нужна строка)
2. "number" (для математических операций)
3. "default" (для некоторых других операторов, обычно объекты реализуют его как "number")

Спецификация явно описывает для каждого оператора, какой ему следует использовать хинт.

Алгоритм преобразования таков:

1. Сначала вызывается метод obj[Symbol.toPrimitive](hint), если он существует,
2. В случае, если хинт равен "string"
происходит попытка вызвать obj.toString() и obj.valueOf(), смотря что есть.
3. В случае, если хинт равен "number" или "default" происходит попытка вызвать obj.valueOf() и obj.toString(), смотря что есть.

Все эти методы должны возвращать примитив (если определены).

На практике часто бывает достаточно реализовать только obj.toString() в качестве универсального метода для преобразований к строке, который должен возвращать удобочитаемое представление объекта для целей логирования или отладки.

#### Правила преобразования


1. Не существует преобразования к логическому значению. В логическом контексте все объекты являются true, всё просто. Существует лишь их числовое и строковое преобразование.
2. Числовое преобразование происходит, когда мы вычитаем объекты или применяем математические функции. Например, объекты Date (которые будут рассмотрены в главе Дата и время) могут быть вычтены, и результатом date1 - date2 будет разница во времени между двумя датами.
3. Что касается преобразований к строке – оно обычно происходит, когда мы выводим на экран объект при помощи alert(obj) и в подобных контекстах.

Мы можем реализовать свои преобразования к строкам и числам, используя специальные объектные методы.

#### Хинты

Существует три варианта преобразования типов, которые происходят в различных ситуациях. Они называются «хинтами»

"string"

Для преобразования объекта к строке, когда мы выполняем операцию над объектом, которая ожидает строку, например alert:

      // вывод
      alert(obj);

      // используем объект в качестве ключа
      anotherObj[obj] = 123;

"number"

Для преобразования объекта к числу, в случае математических операций:

      // явное преобразование
      let num = Number(obj);

      // математические (не считая бинарного плюса)
      let n = +obj; // унарный плюс
      let delta = date1 - date2;

      // сравнения больше/меньше
      let greater = user1 > user2;

"default"

Происходит редко, когда оператор «не уверен», какой тип ожидать.

      // бинарный плюс использует хинт "default"
      let total = obj1 + obj2;

      // obj == number использует хинт "default"
      if (user == 1) { ... };

Все встроенные объекты, за исключением одного (объект Date, который мы рассмотрим позже), реализуют "default" преобразование тем же способом, что и "number"

Чтобы выполнить преобразование, JavaScript пытается найти и вызвать три следующих метода объекта:

1. Вызвать `obj[Symbol.toPrimitive](hint)` – метод с символьным ключом Symbol.toPrimitive (системный символ), если такой метод существует,
2. Иначе, если хинт равен "string"
попробовать вызвать obj.toString() или obj.valueOf(), смотря какой из них существует.
3. Иначе, если хинт равен "number" или "default" попробовать вызвать obj.valueOf() или obj.toString(), смотря какой из них существует.

##### Symbol.toPrimitive

      let user = {
        name: "John",
        money: 1000,

        [Symbol.toPrimitive](hint) {
          alert(`hint: ${hint}`);
          return hint == "string" ? `{name: "${this.name}"}` : this.money;
        }
      };

      // демонстрация результатов преобразований:
      alert(user); // hint: string -> {name: "John"}
      alert(+user); // hint: number -> 1000
      alert(user + 500); // hint: default -> 1500

##### toString/valueOf

Если нет Symbol.toPrimitive, тогда JavaScript пытается найти методы toString и valueOf:

1. Для хинта "string": вызвать метод toString, а если он не существует или возвращает объект вместо примитивного значения, то valueOf (таким образом, toString имеет приоритет при строковом преобразовании).
2. Для других хинтов: вызвать метод valueOf, а если он не существует или возвращает объект вместо примитивного значения, то toString (таким образом, valueOf имеет приоритет для математических операций).

По умолчанию обычный объект имеет следующие методы toString и valueOf:

1. Метод toString возвращает строку "[object Object]".
2. Метод valueOf возвращает сам объект.

пример

      let user = {name: "John"};
      alert(user); // [object Object]
      alert(user.valueOf() === user); // true

      let user = {
        name: "John",
        money: 1000,
        // для хинта равного "string"
        toString() {
          return `{name: "${this.name}"}`;
        },
        // для хинта равного "number" или "default"
        valueOf() {
          return this.money;
        }
      };
      alert(user); // toString -> {name: "John"}
      alert(+user); // valueOf -> 1000
      alert(user + 500); // valueOf -> 1500

      let user = {
        name: "John",
        toString() {
          return this.name;
        }
      };
      alert(user); // toString -> John
      alert(user + 500); // toString -> John500

В отсутствие Symbol.toPrimitive и valueOf, toString обработает все примитивные преобразования.

##### Преобразование может вернуть любой примитивный тип

Важная вещь, которую следует знать обо всех методах преобразования примитивов, заключается в том, что они не обязательно возвращают подсказанный хинтом примитив.

Нет никакого контроля над тем, вернёт ли toString именно строку, или чтобы метод Symbol.toPrimitive возвращал именно число для хинта "number".

Единственное обязательное условие: эти методы должны возвращать примитив, а не объект.

#### Дальнейшие преобразования

      let obj = {
        // toString обрабатывает все преобразования в случае отсутствия других методов
        toString() {
          return "2";
        }
      };
      alert(obj * 2); // 4, объект был преобразован к примитиву "2", затем умножение сделало его числом

      let obj = {
        toString() {
          return "2";
        }
      };
      alert(obj + 2); // "22" ("2" + 2), преобразование к примитиву вернуло строку => конкатенация

## Типы данных

### Методы примитивов

Давайте взглянем на ключевые различия между примитивами и объектами.

Примитив

Это – значение «примитивного» типа.
Есть 7 примитивных типов: string, number, boolean, symbol, null, undefined и bigint.

Объект

Может хранить множество значений как свойства.
Объявляется при помощи фигурных скобок {}, например: {name: "Рома", age: 30}. В JavaScript есть и другие виды объектов: например, функции тоже являются объектами.

Каждый примитив имеет свой собственный «объект-обёртку», которые называются: String, Number, Boolean, Symbol и BigInt. Таким образом, они имеют разный набор методов.

      let str = "Привет";
      alert( str.toUpperCase() ); // ПРИВЕТ


1. Строка str – примитив. В момент обращения к его свойству, создаётся специальный объект, который знает значение строки и имеет такие полезные методы, как toUpperCase().
2. Этот метод запускается и возвращает новую строку (показывается в alert).
Специальный объект удаляется, оставляя только примитив str.

Конструкторы String/Number/Boolean предназначены только для внутреннего пользования

      alert( typeof 0 ); // "число"
      alert( typeof new Number(0) ); // "object"!

      let zero = new Number(0);
      if (zero) {
        // zero возвращает "true", так как является объектом
        alert( "zero имеет «истинное» значение?!?" );
      }

### Числа

В современном JavaScript существует два типа чисел:

1. Обычные числа в JavaScript хранятся в 64-битном формате IEEE-754, который также называют «числа с плавающей точкой двойной точности» (double precision floating point numbers). Это числа, которые мы будем использовать чаще всего. Мы поговорим о них в этой главе.
2. BigInt числа дают возможность работать с целыми числами произвольной длины. Они нужны достаточно редко и используются в случаях, когда необходимо работать со значениями более чем (253-1) или менее чем -(253-1). Так как BigInt числа нужны достаточно редко, мы рассмотрим их в отдельной главе BigInt.

#### Способы записи числа

      let billion = 1000000000;
      let billion = 1_000_000_000

"e" и указать необходимое количество нулей

      1e3 === 1 * 1000 // e3 означает *1000
      1.23e6 === 1.23 * 1000000 // e6 означает *1000000

      let mcs = 0.000001;
      let ms = 1e-6; // шесть нулей слева от 1

#### Шестнадцатеричные, двоичные и восьмеричные числа

##### Шестнадцатеричные 

      alert( 0xff ); // 255
      alert( 0xFF ); // 255 (то же самое, регистр не имеет значения)

##### Двоичные и восьмеричные числа

      let a = 0b11111111; // двоичная (бинарная) форма записи числа 255
      let b = 0o377; // восьмеричная форма записи числа 255

      alert( a == b ); // true, с двух сторон число 255

#### toString(base)

      let num = 255;

      alert( num.toString(16) );  // ff
      alert( num.toString(2) );   // 11111111

      alert( 123456..toString(36) ); // 2n9c
      // Если мы поставим одну точку: 123456.toString(36), тогда это будет ошибкой, поскольку синтаксис JavaScript предполагает, что после первой точки начинается десятичная часть.

#### Округление

##### Округление до целого

###### Math.floor

Округление в меньшую сторону: 3.1 становится 3, а -1.1 — -2.

###### Math.ceil

Округление в большую сторону: 3.1 становится 4, а -1.1 — -1.

###### Math.round

Округление до ближайшего целого: 3.1 становится 3, 3.6 — 4, а -1.1 — -1.

###### Math.trunc (не поддерживается в Internet Explorer)

Производит удаление дробной части без округления: 3.1 становится 3, а -1.1 — -1.

##### Округление до дробного

      let num = 1.23456;
      alert( Math.round(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23

      let num = 12.34;
      alert( num.toFixed(1) ); // "12.3"

      let num = 12.36;
      alert( num.toFixed(1) ); // "12.4"

      let num = 12.34;
      alert( num.toFixed(5) ); // "12.34000", добавлены нули, чтобы получить 5 знаков после запятой

#### Неточные вычисления

alert( 1e500 ); // Infinity
alert( 0.1 + 0.2 == 0.3 ); // false
alert( 0.1 + 0.2 ); // 0.30000000000000004

alert(0.1.toString(2)); // 0.0001100110011001100110011001100110011001100110011001101
alert(0.2.toString(2)); // 0.001100110011001100110011001100110011001100110011001101
alert((0.1 + 0.2).toString(2)); // 0.0100110011001100110011001100110011001100110011001101

Деление на 10 гарантированно хорошо работает в десятичной системе, но деление на 3 – нет. По той же причине и в двоичной системе счисления, деление на 2 обязательно сработает, а 1/10 становится бесконечной дробью.

Числовой формат IEEE-754 решает эту проблему путём округления до ближайшего возможного числа. Правила округления обычно не позволяют нам увидеть эту «крошечную потерю точности», но она существует.

      alert( 0.1.toFixed(20) ); // 0.10000000000000000555

      let sum = 0.1 + 0.2;
      alert( sum.toFixed(2) ); // "0.30"

      let sum = 0.1 + 0.2;
      alert( +sum.toFixed(2) ); // 0.3

Из 64 бит, отведённых на число, сами цифры числа занимают до 52 бит, остальные 11 бит хранят позицию десятичной точки и один бит – знак. Так что если 52 бит не хватает на цифры, то при записи пропадут младшие разряды.

      // Привет! Я – число, растущее само по себе!
      alert( 9999999999999999 ); // покажет 10000000000000000

Другим забавным следствием внутреннего представления чисел является наличие двух нулей: 0 и -0.

#### Проверка: isFinite и isNaN

##### isNaN(value)

Значение NaN уникально тем, что оно не является равным ничему другому, даже самому себе

      alert( isNaN(NaN) ); // true
      alert( isNaN("str") ); // true
      alert( NaN === NaN ); // false

##### isFinite(value)

      alert( isFinite("15") ); // true
      alert( isFinite("str") ); // false, потому что специальное значение: NaN
      alert( isFinite(Infinity) ); // false, потому что специальное значение: Infinity

      let num = +prompt("Введите число:", '');
      // вернёт true всегда, кроме ситуаций, когда аргумент - Infinity/-Infinity или не число
      alert( isFinite(num) );

##### Number.isNaN и Number.isFinite

      alert( Number.isNaN(NaN) ); // true
      alert( Number.isNaN("str" / 2) ); // true
      // Обратите внимание на разный результат:
      alert( Number.isNaN("str") ); // false, так как "str" является строкой, а не числом
      alert( isNaN("str") ); // true, так как isNaN сначала преобразует строку "str" в число и в результате преобразования получает NaN

      alert( Number.isFinite(123) ); // true
      alert( Number.isFinite(Infinity) ); // false
      alert( Number.isFinite(2 / 0) ); // false
      // Обратите внимание на разный результат:
      alert( Number.isFinite("123") ); // false, так как "123" является строкой, а не числом
      alert( isFinite("123") ); // true, так как isFinite сначала преобразует строку "123" в число 123

##### Object.is

Существует специальный метод Object.is, который сравнивает значения примерно как ===, но более надёжен в двух особых ситуациях:

1. Работает с NaN: Object.is(NaN, NaN) === true, здесь он хорош.
2. Значения 0 и -0 разные: Object.is(0, -0) === false, это редко используется, но технически эти значения разные.

Во всех других случаях Object.is(a, b) идентичен a === b.

Этот способ сравнения часто используется в спецификации JavaScript. Когда внутреннему алгоритму необходимо сравнить 2 значения на предмет точного совпадения, он использует Object.is (Определение SameValue).

#### parseInt и parseFloat

Они «читают» число из строки. Если в процессе чтения возникает ошибка, они возвращают полученное до ошибки число. Функция parseInt возвращает целое число, а parseFloat возвращает число с плавающей точкой:

      alert( parseInt('100px') ); // 100
      alert( parseFloat('12.5em') ); // 12.5

      alert( parseInt('12.3') ); // 12, вернётся только целая часть
      alert( parseFloat('12.3.4') ); // 12.3, произойдёт остановка чтения на второй точке

      alert( parseInt('a123') ); // NaN, на первом символе происходит остановка чтения

      alert( parseInt('0xff', 16) ); // 255
      alert( parseInt('ff', 16) ); // 255, без 0x тоже работает
      alert( parseInt('2n9c', 36) ); // 123456

#### Другие математические функции

##### Math.random()

      alert( Math.random() ); // 0.1234567894322
      alert( Math.random() ); // 0.5435252343232
      alert( Math.random() ); // ... (любое количество псевдослучайных чисел)

##### Math.max(a, b, c...) / Math.min(a, b, c...)

      alert( Math.max(3, 5, -10, 0, 1) ); // 5
      alert( Math.min(1, 2) ); // 1

##### Math.pow(n, power)

      alert( Math.pow(2, 10) ); // 2 в степени 10 = 1024

<https://learn.javascript.ru/task/sum-interface>