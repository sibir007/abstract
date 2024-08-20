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

### Строки

#### Кавычки

      let single = 'single-quoted';
      let double = "double-quoted";
      let backticks = `backticks ${single} ${double}`;

      let guestList = `Guests: // многострочная строка
       * John
       * Pete
       * Mary
      `;
      alert(guestList); // список гостей, состоящий из нескольких строк

#### Спецсимволы

// перевод строки добавлен с помощью символа перевода строки
let str1 = "Hello\nWorld";
// многострочная строка, созданная с использованием обратных кавычек
let str2 = `Hello
World`;
alert(str1 == str2); // true

|Символ| 	Описание|
|:-:|:-:|
|\n| 	Перевод строки|
|\r| 	В текстовых файлах Windows для перевода строки используется комбинация символов \r\n, а на других ОС это просто \n. Это так по историческим причинам, ПО под Windows обычно понимает и просто \n.|
|\', \", \`| 	Кавычки|
|\\ | 	Обратный слеш|
|\t | 	Знак табуляции
|\b, \f, \v| 	Backspace, Form Feed и Vertical Tab — оставлены для обратной совместимости, сейчас не используются.

#### Длина строки

      alert( `My\n`.length ); // 3 числовое свойство, а не функция, добавлять скобки не нужно

#### Доступ к символам

      let str = `Hello`;

      // получаем первый символ
      alert( str[0] ); // H
      alert( str.at(0) ); // H

      // получаем последний символ
      alert( str[str.length - 1] ); // o
      alert( str.at(-1) ); // o

      for (let char of "Hello") {
        alert(char); // H,e,l,l,o (char — сначала "H", потом "e", потом "l" и т.д.)
      }

#### Строки неизменяемы

      let str = 'Hi';
      str[0] = 'h'; // ошибка
      alert( str[0] ); // не работает

      let str = 'Hi';
      str = 'h' + str[1]; // заменяем строку
      alert( str ); // hi

#### Изменение регистра

      alert( 'Interface'.toUpperCase() ); // INTERFACE
      alert( 'Interface'.toLowerCase() ); // interface
      alert( 'Interface'[0].toLowerCase() ); // 'i'

#### Поиск подстроки

##### str.indexOf

      let str = 'Widget with id';
      alert( str.indexOf('Widget') ); // 0, потому что подстрока 'Widget' найдена в начале
      alert( str.indexOf('widget') ); // -1, совпадений нет, поиск чувствителен к регистру
      alert( str.indexOf("id") ); // 1, подстрока "id" найдена на позиции 1 (..idget with id)

      let str = 'Widget with id';
      alert( str.indexOf('id', 2) ) // 12 - поиск с позиции 2

все вхождения подстроки

      let str = 'Ослик Иа-Иа посмотрел на виадук';
      let target = 'Иа'; // цель поиска
      let pos = -1;
      while ((pos = str.indexOf(target, pos + 1)) != -1) {
        alert( pos );
      }

      let str = "Widget with id";
      if (str.indexOf("Widget") != -1) {
          alert("Совпадение есть");
      }

      str.lastIndexOf(substr, position) // последнее вхождение

##### includes, startsWith, endsWith

      alert( "Widget with id".includes("Widget") ); // true
      alert( "Hello".includes("Bye") ); // false
      alert( "Midget".includes("id") ); // true
      alert( "Midget".includes("id", 3) ); // false, поиск начат с позиции 3
      alert( "Widget".startsWith("Wid") ); // true, "Wid" — начало "Widget"
      alert( "Widget".endsWith("get") ); // true, "get" — окончание "Widget"

#### Получение подстроки

##### str.slice(start [, end])

      let str = "stringify";
      // 'strin', символы от 0 до 5 (не включая 5)
      alert( str.slice(0, 5) );
      // 's', от 0 до 1, не включая 1, т. е. только один символ на позиции 0
      alert( str.slice(0, 1) );

      let str = "stringify";
      alert( str.slice(2) ); // ringify, с позиции 2 и до конца

      let str = "stringify";
      // начинаем с позиции 4 справа, а заканчиваем на позиции 1 справа
      alert( str.slice(-4, -1) ); // gif

##### str.substring(start [, end])

      let str = "stringify";

      // для substring эти два примера — одинаковы
      alert( str.substring(2, 6) ); // "ring"
      alert( str.substring(6, 2) ); // "ring"

      // …но не для slice:
      alert( str.slice(2, 6) ); // "ring" (то же самое)
      alert( str.slice(6, 2) ); // "" (пустая строка)

##### str.substr(start [, length])

      let str = "stringify";
      // ring, получаем 4 символа, начиная с позиции 2
      alert( str.substr(2, 4) );

#### Сравнение строк

строки сравниваются посимвольно в алфавитном порядке.

      alert( 'a' > 'Z' ); // true
      alert( 'Österreich' > 'Zealand' ); // true

##### str.codePointAt(pos)

      // одна и та же буква в нижнем и верхнем регистре
      // будет иметь разные коды
      alert( "z".codePointAt(0) ); // 122
      alert( "Z".codePointAt(0) ); // 90

##### String.fromCodePoint(code)

      let str = '';

      for (let i = 65; i <= 220; i++) {
        str += String.fromCodePoint(i);
      }
      alert( str );
      // ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
      // ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ

#### Правильное сравнение

Вызов str.localeCompare(str2) возвращает число, которое показывает, какая строка больше в соответствии с правилами языка:

- Отрицательное число, если str меньше str2.
- Положительное число, если str больше str2.
- 0, если строки равны.

Например:

      alert( 'Österreich'.localeCompare('Zealand') ); // -1

### Массивы

#### Объявление

    let arr = new Array();
    let arr = [];

    let fruits = ["Яблоко", "Апельсин", "Слива"];
    alert( fruits[0] ); // Яблоко
    alert( fruits[1] ); // Апельсин
    alert( fruits[2] ); // Слива

    fruits[3] = 'Лимон'; // теперь ["Яблоко", "Апельсин", "Груша", "Лимон"]

    let fruits = ["Яблоко", "Апельсин", "Слива"];
    alert( fruits.length ); // 3
    alert( fruits ); // Яблоко, Апельсин, Слива

    // разные типы значений
    let arr = [ 'Яблоко', { name: 'Джон' }, true, function() { alert('привет'); } ];

    // получить элемент с индексом 1 (объект) и затем показать его свойство
    alert( arr[1].name ); // Джон

    // получить элемент с индексом 3 (функция) и выполнить её
    arr[3](); // привет

    let fruits = [
      "Яблоко",
      "Апельсин",
      "Слива",
    ];

#### Получение последних элементов при помощи «at»

    let fruits = ["Apple", "Orange", "Plum"];
    alert( fruits[fruits.length-1] ); // Plum

    // то же самое, что и fruits[fruits.length-1]
    alert( fruits.at(-1) ); // Plum

#### Методы pop/push, shift/unshift

    let fruits = ["Яблоко", "Апельсин", "Груша"];
    alert( fruits.pop() ); // удаляем "Груша" и выводим его
    alert( fruits ); // Яблоко, Апельсин

    let fruits = ["Яблоко", "Апельсин"];
    fruits.push("Груша");
    alert( fruits ); // Яблоко, Апельсин, Груша


    let fruits = ["Яблоко", "Апельсин", "Груша"];
    alert( fruits.shift() ); // удаляем Яблоко и выводим его
    alert( fruits ); // Апельсин, Груша

    let fruits = ["Апельсин", "Груша"];
    fruits.unshift('Яблоко');
    alert( fruits ); // Яблоко, Апельсин, Груша


    let fruits = ["Яблоко"];
    fruits.push("Апельсин", "Груша");
    fruits.unshift("Ананас", "Лимон");
    // ["Ананас", "Лимон", "Яблоко", "Апельсин", "Груша"]
    alert( fruits );

#### Внутреннее устройство массива

Массив – это особый подвид объектов. Движок JavaScript старается хранить элементы массива в непрерывной области памяти, один за другим, они утратят эффективность, если мы перестанем работать с массивом как с «упорядоченной коллекцией данных» и начнём использовать его как обычный объект.

Варианты неправильного применения массива:

- Добавление нечислового свойства, например: arr.test = 5.
- Создание «дыр», например: добавление arr[0], затем arr[1000] (между ними ничего нет).
- Заполнение массива в обратном порядке, например: arr[1000], arr[999] и т.д.

#### Эффективность

Методы push/pop выполняются быстро, а методы shift/unshift – медленно.

#### Перебор элементов

    let arr = ["Яблоко", "Апельсин", "Груша"];
    for (let i = 0; i < arr.length; i++) {
      alert( arr[i] );
    }

    let fruits = ["Яблоко", "Апельсин", "Слива"];
    // проходит по значениям
    for (let fruit of fruits) {
      alert( fruit );
    }

    //Цикл for..in оптимизирован под произвольные объекты, не массивы, и поэтому в 10-100 раз медленнее
    let arr = ["Яблоко", "Апельсин", "Груша"];
    for (let key in arr) {
      alert( arr[key] ); // Яблоко, Апельсин, Груша
    }

#### Немного о «length»

    let fruits = [];
    fruits[123] = "Яблоко";
    alert( fruits.length ); // 124

    let arr = [1, 2, 3, 4, 5];
    arr.length = 2; // укорачиваем до двух элементов
    alert( arr ); // [1, 2]
    arr.length = 5; // возвращаем length как было
    alert( arr[3] ); // undefined: значения не восстановились

    arr.length = 0; // самый простой способ очистить массив

#### new Array()

let arr = new Array("Яблоко", "Груша", "и тд");

let arr = new Array(2); // создастся ли массив [2]?
alert( arr[0] ); // undefined! нет элементов.
alert( arr.length ); // length 2

#### Многомерные массивы

    let matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    alert( matrix[1][1] ); // 5, центральный элемент

#### toString

    let arr = [1, 2, 3];
    alert( arr ); // 1,2,3
    alert( String(arr) === '1,2,3' ); // true

    alert( [] + 1 ); // "1"
    alert( [1] + 1 ); // "11"
    alert( [1,2] + 1 ); // "1,21"

#### Не сравнивайте массивы при помощи == 

У этого оператора нет специального подхода к массивам, он работает с ними, как и с любыми другими объектами.

    alert( [] == [] ); // false
    alert( [0] == [0] ); // false

    alert( 0 == [] ); // true
    alert('0' == [] ); // false
    // после того, как [] был преобразован в ''
    alert( 0 == '' ); // true, так как '' преобразуется в число 0
    alert('0' == '' ); // false, нет преобразования типов, разные строки

### Методы массивов

Шпаргалка по методам массива:

Для добавления/удаления элементов:
push(...items) – добавляет элементы в конец,
pop() – извлекает элемент с конца,
shift() – извлекает элемент с начала,
unshift(...items) – добавляет элементы в начало.
splice(pos, deleteCount, ...items) – начиная с индекса pos удаляет deleteCount элементов и вставляет items.
slice(start, end) – создаёт новый массив, копируя в него элементы с индекса start до end (не включая end).
concat(...items) – возвращает новый массив: копирует все члены текущего массива и добавляет к нему items. Если какой-то из items является массивом, тогда берутся его элементы.

Для поиска среди элементов:
indexOf/lastIndexOf(item, pos) – ищет item, начиная с позиции pos, и возвращает его индекс или -1, если ничего не найдено.
includes(value) – возвращает true, если в массиве имеется элемент value, в противном случае false.
find/filter(func) – фильтрует элементы через функцию и отдаёт первое/все значения, при прохождении которых через функцию возвращается true.
findIndex похож на find, но возвращает индекс вместо значения.

Для перебора элементов:
forEach(func) – вызывает func для каждого элемента. Ничего не возвращает.

Для преобразования массива:
map(func) – создаёт новый массив из результатов вызова func для каждого элемента.
sort(func) – сортирует массив «на месте», а потом возвращает его.
reverse() – «на месте» меняет порядок следования элементов на противоположный и возвращает изменённый массив.
split/join – преобразует строку в массив и обратно.
reduce/reduceRight(func, initial) – вычисляет одно значение на основе всего массива, вызывая func для каждого элемента и передавая промежуточный результат между вызовами.

Дополнительно:
Array.isArray(arr) проверяет, является ли arr массивом.

Пожалуйста, обратите внимание, что методы push, pop, shift, unshift, sort, reverse и splice изменяют исходный массив.

Эти методы – самые используемые, их достаточно в 99% случаев. Но существуют и другие:

arr.some(fn)/arr.every(fn) проверяет массив.

Функция fn вызывается для каждого элемента массива аналогично map. Если какие-либо/все результаты вызовов являются true, то метод возвращает true, иначе false.

Эти методы ведут себя примерно так же, как операторы || и &&: если fn возвращает истинное значение, arr.some() немедленно возвращает true и останавливает перебор остальных элементов; если fn возвращает ложное значение, arr.every() немедленно возвращает false и также прекращает перебор остальных элементов.

Мы можем использовать every для сравнения массивов:

function arraysEqual(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}

    alert( arraysEqual([1, 2], [1, 2])); // true

arr.fill(value, start, end) – заполняет массив повторяющимися value, начиная с индекса start до end.

arr.copyWithin(target, start, end) – копирует свои элементы, начиная с позиции start и заканчивая end, в себя, на позицию target (перезаписывая существующие).

arr.flat(depth)/arr.flatMap(fn) создаёт новый плоский массив из многомерного массива.


#### Добавление/удаление элементов

##### arr.push(...items) – добавляет элементы в конец,
##### arr.pop() – извлекает элемент из конца,
##### arr.shift() – извлекает элемент из начала,
##### arr.unshift(...items) – добавляет элементы в начало.

##### arr.splice(start[, deleteCount, elem1, ..., elemN])

Он изменяет arr начиная с индекса start: удаляет deleteCount элементов и затем вставляет elem1, ..., elemN на их место. Возвращает массив из удалённых элементов.

    let arr = ["I", "go", "home"];
    delete arr[1]; // удалить "go"
    alert( arr[1] ); // undefined
    // теперь arr = ["I",  , "home"];
    alert( arr.length ); // 3

    let arr = ["Я", "изучаю", "JavaScript"];
    arr.splice(1, 1); // начиная с индекса 1, удалить 1 элемент
    alert( arr ); // осталось ["Я", "JavaScript"]

    let arr = ["Я", "изучаю", "JavaScript", "прямо", "сейчас"];
    // удалить 3 первых элемента и заменить их другими
    let removed = arr.splice(0, 3, "Давай", "танцевать");
    alert(removed) // ["Я", "изучаю", "JavaScript"]
    alert( arr ) // теперь ["Давай", "танцевать", "прямо", "сейчас"]

    let arr = ["Я", "изучаю", "JavaScript"];
    // с индекса 2
    // удалить 0 элементов
    // вставить "сложный", "язык"
    arr.splice(2, 0, "сложный", "язык");
    alert( arr ); // "Я", "изучаю", "сложный", "язык", "JavaScript"

    let arr = [1, 2, 5];
    // начиная с индекса -1 (перед последним элементом)
    // удалить 0 элементов,
    // затем вставить числа 3 и 4
    arr.splice(-1, 0, 3, 4);
    alert( arr ); // 1,2,3,4,5

##### arr.slice([start], [end])

    let arr = ["t", "e", "s", "t"];
    alert( arr.slice(1, 3) ); // e,s (копирует с 1 до 3)
    alert( arr.slice(-2) ); // s,t (копирует с -2 до конца)

##### arr.concat(arg1, arg2...)

    let arr = [1, 2];
    // создать массив из: arr и [3,4]
    alert( arr.concat([3, 4]) ); // 1,2,3,4
    // создать массив из: arr и [3,4] и [5,6]
    alert( arr.concat([3, 4], [5, 6]) ); // 1,2,3,4,5,6
    // создать массив из: arr и [3,4], потом добавить значения 5 и 6
    alert( arr.concat([3, 4], 5, 6) ); // 1,2,3,4,5,6

    let arr = [1, 2];
    let arrayLike = {
      0: "что-то",
      length: 1
    };
    alert( arr.concat(arrayLike) ); // 1,2,[object Object]

    let arr = [1, 2];
    let arrayLike = {
      0: "что-то",
      1: "ещё",
      [Symbol.isConcatSpreadable]: true,
      length: 2
    };
    alert( arr.concat(arrayLike) ); // 1,2,что-то,ещё

#### Перебор: forEach

    // Вызов alert для каждого элемента
    ["Бильбо", "Гэндальф", "Назгул"].forEach(alert);

    ["Бильбо", "Гэндальф", "Назгул"].forEach((item, index, array) => {
      alert(`У ${item} индекс ${index} в ${array}`);
    });

#### Поиск в массиве 

##### indexOf/lastIndexOf и includes

    alert( arr.indexOf(0) ); // 1
    alert( arr.indexOf(false) ); // 2
    alert( arr.indexOf(null) ); // -1
    alert( arr.includes(1) ); // true

методы используют строгое сравнение ===. Таким образом, если мы ищем false, он находит именно false, а не ноль.

    let fruits = ['Яблоко', 'Апельсин', 'Яблоко']
    alert( fruits.indexOf('Яблоко') ); // 0 (первый 'Яблоко')
    alert( fruits.lastIndexOf('Яблоко') ); // 2 (последний 'Яблоко')

    const arr = [NaN];
    alert( arr.indexOf(NaN) ); // -1 (неверно, должен быть 0)
    alert( arr.includes(NaN) );// true (верно)

##### find и findIndex/findLastIndex

    let result = arr.find(function(item, index, array) {
      // если true - возвращается текущий элемент и перебор прерывается
      // если все итерации оказались ложными, возвращается undefined
    });

    let users = [
      {id: 1, name: "Вася"},
      {id: 2, name: "Петя"},
      {id: 3, name: "Маша"}
    ];
    let user = users.find(item => item.id == 1);
    alert(user.name); // Вася

    let users = [
      {id: 1, name: "Вася"},
      {id: 2, name: "Петя"},
      {id: 3, name: "Маша"},
      {id: 4, name: "Вася"}
    ];
    // Найти индекс первого Васи
    alert(users.findIndex(user => user.name == 'Вася')); // 0
    // Найти индекс последнего Васи
    alert(users.findLastIndex(user => user.name == 'Вася')); // 3

##### filter

    let results = arr.filter(function(item, index, array) {
      // если `true` -- элемент добавляется к results и перебор продолжается
      // возвращается пустой массив в случае, если ничего не найдено
    });

    let users = [
      {id: 1, name: "Вася"},
      {id: 2, name: "Петя"},
      {id: 3, name: "Маша"}
    ];
    // возвращает массив, состоящий из двух первых пользователей
    let someUsers = users.filter(item => item.id < 3);
    alert(someUsers.length); // 2

#### Преобразование массива

##### map

    let result = arr.map(function(item, index, array) {
      // возвращается новое значение вместо элемента
    });

    let lengths = ["Бильбо", "Гэндальф", "Назгул"].map(item => item.length);
    alert(lengths); // 6,8,6

##### sort(fn)

    let arr = [ 1, 2, 15 ];
    // метод сортирует содержимое arr
    arr.sort();
    alert( arr );  // 1, 15, 2 - По умолчанию элементы сортируются как строки.

    function compare(a, b) {
      if (a > b) return 1; // если первое значение больше второго
      if (a == b) return 0; // если равны
      if (a < b) return -1; // если первое значение меньше второго
    }
    let arr = [ 1, 2, 15 ];
    arr.sort(compareNumeric);
    alert(arr);  // 1, 2, 15

    [1, -2, 15, 2, 0, 8].sort(function(a, b) {
      alert( a + " <> " + b );
      return a - b;
    });

    let arr = [ 1, 2, 15 ];
    arr.sort(function(a, b) { return a - b; });
    alert(arr);  // 1, 2, 15

    arr.sort( (a, b) => a - b );

    let countries = ['Österreich', 'Andorra', 'Vietnam'];
    alert( countries.sort( (a, b) => a > b ? 1 : -1) ); // Andorra, Vietnam, Österreich (неправильно)
    alert( countries.sort( (a, b) => a.localeCompare(b) ) ); // Andorra,Österreich,Vietnam (правильно!)

##### reverse

    let arr = [1, 2, 3, 4, 5];
    arr.reverse();
    alert( arr ); // 5,4,3,2,1

##### split и join

    let names = 'Вася, Петя, Маша';
    let arr = names.split(', ');
    for (let name of arr) {
      alert( `Сообщение получат: ${name}.` ); // Сообщение получат: Вася (и другие имена)
    }

    let arr = 'Вася, Петя, Маша, Саша'.split(', ', 2);
    alert(arr); // Вася, Петя

    let arr = ['Вася', 'Петя', 'Маша'];
    let str = arr.join(';'); // объединить массив в строку через ;
    alert( str ); // Вася;Петя;Маша

##### reduce/reduceRight

    let value = arr.reduce(function(accumulator, item, index, array) {
      // ...
    }, [initial]);

    let arr = [1, 2, 3, 4, 5];
    let result = arr.reduce((sum, current) => sum + current, 0);
    alert(result); // 15

    let arr = [1, 2, 3, 4, 5];

    // убрано начальное значение (нет 0 в конце)
    let result = arr.reduce((sum, current) => sum + current);
    alert( result ); // 15, при отсутствии initial в качестве первого значения берётся первый элемент массива

    let arr = [];
    // Error: Reduce of empty array with no initial value
    // если бы существовало начальное значение, reduce вернул бы его для пустого массива.
    arr.reduce((sum, current) => sum + current);

#### Array.isArray

    alert(typeof {}); // object
    alert(typeof []); // тоже object

    alert(Array.isArray({})); // false
    alert(Array.isArray([])); // true

#### Большинство методов поддерживают «thisArg»

    arr.find(func, thisArg);
    arr.filter(func, thisArg);
    arr.map(func, thisArg);
    // ...
    // thisArg -- необязательный последний аргумент

    let army = {
      minAge: 18,
      maxAge: 27,
      canJoin(user) {
        return user.age >= this.minAge && user.age < this.maxAge;
      }
    };
    let users = [
      {age: 16},
      {age: 20},
      {age: 23},
      {age: 30}
    ];

    // найти пользователей, для которых army.canJoin возвращает true
    let soldiers = users.filter(army.canJoin, army);
    alert(soldiers.length); // 2
    alert(soldiers[0].age); // 20
    alert(soldiers[1].age); // 23

### Перебираемые объекты

Объекты, которые можно использовать в цикле for..of, называются итерируемыми.

Технически итерируемые объекты должны иметь метод Symbol.iterator.

Результат вызова obj[Symbol.iterator] называется итератором. Он управляет процессом итерации
.
Итератор должен иметь метод next(), который возвращает объект {done: Boolean, value: any}, где done:true сигнализирует об окончании процесса итерации, в противном случае value – следующее значение.
Метод Symbol.iterator автоматически вызывается циклом for..of, но можно вызвать его и напрямую.

Встроенные итерируемые объекты, такие как строки или массивы, также реализуют метод Symbol.iterator.
Строковый итератор знает про суррогатные пары.

Объекты, имеющие индексированные свойства и length, называются псевдомассивами. Они также могут иметь другие свойства и методы, но у них нет встроенных методов массивов.

Если мы заглянем в спецификацию, мы увидим, что большинство встроенных методов рассчитывают на то, что они будут работать с итерируемыми объектами или псевдомассивами вместо «настоящих» массивов, потому что эти объекты более абстрактны.

Array.from(obj[, mapFn, thisArg]) создаёт настоящий Array из итерируемого объекта или псевдомассива obj, и затем мы можем применять к нему методы массивов. Необязательные аргументы mapFn и thisArg позволяют применять функцию с задаваемым контекстом к каждому элементу.

#### Symbol.iterator


    let range = {
      from: 1,
      to: 5
    };

    // 1. вызов for..of сначала вызывает эту функцию
    range[Symbol.iterator] = function() {

      // ...она возвращает объект итератора:
      // 2. Далее, for..of работает только с этим итератором,
      // запрашивая у него новые значения
      return {
        current: this.from,
        last: this.to,

        // 3. next() вызывается на каждой итерации цикла for..of
        next() {
          // 4. он должен вернуть значение в виде объекта {done:.., value :...}
          if (this.current <= this.last) {
            return { done: false, value: this.current++ };
          } else {
            return { done: true };
          }
        }
      };
    };

    // теперь работает!
    for (let num of range) {
      alert(num); // 1, затем 2, 3, 4, 5
    }

range как итератор, чтобы упростить код

    let range = {
      from: 1,
      to: 5,

      [Symbol.iterator]() {
        this.current = this.from;
        return this;
      },

      next() {
        if (this.current <= this.to) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };

#### Строка – перебираемый объект

    for (let char of "test") {
      // срабатывает 4 раза: по одному для каждого символа
      alert( char ); // t, затем e, затем s, затем t
    }

#### Явный вызов итератора

    let str = "Hello";

    // делает то же самое, что и
    // for (let char of str) alert(char);

    let iterator = str[Symbol.iterator]();

    while (true) {
      let result = iterator.next();
      if (result.done) break;
      alert(result.value); // выводит символы один за другим
    }

#### Итерируемые объекты и псевдомассивы

- Итерируемые объекты – это объекты, которые реализуют метод Symbol.iterator, как было описано выше.
- Псевдомассивы – это объекты, у которых есть индексы и свойство length, то есть, они выглядят как массивы.

Например, строки итерируемы (для них работает for..of) и являются псевдомассивами (они индексированы и есть length).

Но итерируемый объект может не быть псевдомассивом. И наоборот: псевдомассив может не быть итерируемым.

Например, объект range из примера выше – итерируемый, но не является псевдомассивом, потому что у него нет индексированных свойств и length.

А вот объект, который является псевдомассивом, но его нельзя итерировать:

    let arrayLike = { // есть индексы и свойство length => псевдомассив
      0: "Hello",
      1: "World",
      length: 2
    };

    // Ошибка (отсутствует Symbol.iterator)
    for (let item of arrayLike) {}

 И итерируемые объекты, и псевдомассивы – это обычно не массивы, у них нет методов push, pop и т.д.

#### Array.from

Array.from(obj[, mapFn, thisArg])

mapFn функцией, которая будет применена к каждому элементу перед добавлением в массив, а thisArg позволяет установить this для этой функции

    let arrayLike = { // псевдомассив 
      0: "Hello",
      1: "World",
      length: 2
    };
    let arr = Array.from(arrayLike); // (*)
    alert(arr.pop()); // World (метод работает)

    // range взят из примера в начале статьи, иттерируемый объект
    let arr = Array.from(range);
    alert(arr); // 1,2,3,4,5 (преобразование массива через toString работает)

    // range взят из примера в начале статьи
    // возводим каждое число в квадрат
    let arr = Array.from(range, num => num * num);
    alert(arr); // 1,4,9,16,25

    function slice(str, start, end) {
      return Array.from(str).slice(start, end).join('');
    }
    let str = '𝒳😂𩷶';
    alert( slice(str, 1, 3) ); // 😂𩷶
    // а вот встроенный метод не поддерживает суррогатные пары
    alert( str.slice(1, 3) ); // мусор (две части различных суррогатных пар)

### Map и Set

#### Map

Методы и свойства:

- **new Map()** – создаёт коллекцию.
- **map.set(key, value)** – записывает по ключу key значение value.
- **map.get(key)** – возвращает значение по ключу или undefined, если ключ key отсутствует.
- **map.has(key)** – возвращает true, если ключ key присутствует в коллекции, иначе false.
- **map.delete(key)** – удаляет элемент (пару «ключ/значение») по ключу key.
- **map.clear()** – очищает коллекцию от всех элементов.
- **map.size** – возвращает текущее количество элементов.

Можно использовать любые типы данных для ключей.

    let john = { name: "John" };
    // давайте сохраним количество посещений для каждого пользователя
    let visitsCountMap = new Map();
    // объект john - это ключ для значения в объекте Map
    visitsCountMap.set(john, 123);
    alert(visitsCountMap.get(john)); // 123

замена Map на Object:

    let john = { name: "John" };
    let ben = { name: "Ben" };
    let visitsCountObj = {}; // попробуем использовать объект
    visitsCountObj[ben] = 234; // пробуем использовать объект ben в качестве ключа
    visitsCountObj[john] = 123; // пробуем использовать объект john в качестве ключа, при этом объект ben будет замещён
    // Вот что там было записано!
    alert( visitsCountObj["[object Object]"] ); // 123

Цепочка вызовов

    map.set("1", "str1")
    .set(1, "num1")
    .set(true, "bool1");

##### Перебор Map

- **map.keys()** – возвращает итерируемый объект по ключам,
- **map.values()** – возвращает итерируемый объект по значениям,
- **map.entries()** – возвращает итерируемый объект по парам вида [ключ, значение], этот вариант используется по умолчанию в for..of.

    let recipeMap = new Map([
      ["огурец", 500],
      ["помидор", 350],
      ["лук",    50]
    ]);
    // перебор по ключам (овощи)
    for (let vegetable of recipeMap.keys()) {
      alert(vegetable); // огурец, помидор, лук
    }
    // перебор по значениям (числа)
    for (let amount of recipeMap.values()) {
      alert(amount); // 500, 350, 50
    }
    // перебор по элементам в формате [ключ, значение]
    for (let entry of recipeMap) { // то же самое, что и recipeMap.entries()
      alert(entry); // огурец,500 (и так далее)

В отличие от обычных объектов Object, в Map перебор происходит в том же порядке, в каком происходило добавление элементов.

    // выполняем функцию для каждой пары (ключ, значение)
    recipeMap.forEach((value, key, map) => {
      alert(`${key}: ${value}`); // огурец: 500 и так далее
    });

##### Object.fromEntries: Object из Map

    let prices = Object.fromEntries([
      ['banana', 1],
      ['orange', 2],
      ['meat', 4]
    ]);
    // prices = { banana: 1, orange: 2, meat: 4 }
    alert(prices.orange); // 2

    let map = new Map();
    map.set('banana', 1);
    map.set('orange', 2);
    map.set('meat', 4);
    let obj = Object.fromEntries(map.entries()); // создаём обычный объект (*)
    // готово!
    // obj = { banana: 1, orange: 2, meat: 4 }
    alert(obj.orange); // 2

    let obj = Object.fromEntries(map); // убрать .entries()

#### Set

Объект Set – это особый вид коллекции: «множество» значений (без ключей), где каждое значение может появляться только один раз.

- **new Set(iterable)** – создаёт Set, и если в качестве аргумента был предоставлен итерируемый объект (обычно это массив), то копирует его значения в новый Set.
- **set.add(value)** – добавляет значение (если оно уже есть, то ничего не делает), возвращает тот же объект set.
- **set.delete(value)** – удаляет значение, возвращает true, если value было в множестве на момент вызова, иначе false.
- **set.has(value)** – возвращает true, если значение присутствует в множестве, иначе false.
- **set.clear()** – удаляет все имеющиеся значения.
- **set.size** – возвращает количество элементов в множестве.

##### Перебор объекта Set

    let set = new Set(["апельсин", "яблоко", "банан"]);

    for (let value of set) alert(value);

    // то же самое с forEach:
    set.forEach((value, valueAgain, set) => {
      alert(value);
    });

### WeakMap и WeakSet

<https://learn.javascript.ru/weakmap-weakset>