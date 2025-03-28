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
**push(...items)** – добавляет элементы в конец,
**pop()** – извлекает элемент с конца,
**shift()** – извлекает элемент с начала,
**unshift(...items)** – добавляет элементы в начало.
**splice(pos, deleteCount, ...items)** – начиная с индекса pos удаляет deleteCount элементов и вставляет items.
**slice(start, end)** – создаёт новый массив, копируя в него элементы с индекса start до end (не включая end).
**concat(...items)** – возвращает новый массив: копирует все члены текущего массива и добавляет к нему items. Если какой-то из items является массивом, тогда берутся его элементы.

Для поиска среди элементов:
**indexOf/lastIndexOf(item, pos)** – ищет item, начиная с позиции pos, и возвращает его индекс или -1, если ничего не найдено.
**includes(value)** – возвращает true, если в массиве имеется элемент value, в противном случае false.
**find/filter(func)** – фильтрует элементы через функцию и отдаёт первое/все значения, при прохождении которых через функцию возвращается true.
**findIndex** похож на find, но возвращает индекс вместо значения.

Для перебора элементов:
**forEach(func)** – вызывает func для каждого элемента. Ничего не возвращает.

Для преобразования массива:
**map(func)** – создаёт новый массив из результатов вызова func для каждого элемента.
**sort(func)** – сортирует массив «на месте», а потом возвращает его.
**reverse()** – «на месте» меняет порядок следования элементов на противоположный и возвращает изменённый массив.
**split/join** – преобразует строку в массив и обратно.
**reduce/reduceRight(func, initial)** – вычисляет одно значение на основе всего массива, вызывая func для каждого элемента и передавая промежуточный результат между вызовами.

Дополнительно:
**Array.isArray(arr)** проверяет, является ли arr массивом.

Пожалуйста, обратите внимание, что **методы push, pop, shift, unshift, sort, reverse и splice изменяют исходный массив**.

Эти методы – самые используемые, их достаточно в 99% случаев. Но существуют и другие:

**arr.some(fn)/arr.every(fn)** проверяет массив.

Функция fn вызывается для каждого элемента массива аналогично map. Если какие-либо/все результаты вызовов являются true, то метод возвращает true, иначе false.

Эти методы ведут себя примерно так же, как операторы || и &&: если fn возвращает истинное значение, arr.some() немедленно возвращает true и останавливает перебор остальных элементов; если fn возвращает ложное значение, arr.every() немедленно возвращает false и также прекращает перебор остальных элементов.

Мы можем использовать every для сравнения массивов:

    function arraysEqual(arr1, arr2) {
      return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
    }

    alert( arraysEqual([1, 2], [1, 2])); // true

**arr.fill(value, start, end)** – заполняет массив повторяющимися value, начиная с индекса start до end.

**arr.copyWithin(target, start, end)** – копирует свои элементы, начиная с позиции start и заканчивая end, в себя, на позицию target (перезаписывая существующие).

**arr.flat(depth)/arr.flatMap(fn)** создаёт новый плоский массив из многомерного массива.


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

#### WeakMap

если мы используем объект как ключ в Map, то до тех пор, пока существует Map, также будет существовать и этот объект. Он занимает место в памяти и не может быть удалён сборщиком мусора

    let john = { name: "John" };
    let map = new Map();
    map.set(john, "...");
    john = null; // перезаписываем ссылку на объект
    // объект john сохранён внутри объекта `Map`,
    // он доступен через map.keys()

ключи в WeakMap должны быть объектами, а не примитивными значениями

    let weakMap = new WeakMap();
    let obj = {};
    weakMap.set(obj, "ok"); // работает (объект в качестве ключа)
    // нельзя использовать строку в качестве ключа
    weakMap.set("test", "Whoops"); // Ошибка, потому что "test" не объект

если мы используем объект в качестве ключа и если больше нет ссылок на этот объект, то он будет удалён из памяти (и из объекта WeakMap) автоматически

    let john = { name: "John" };
    let weakMap = new WeakMap();
    weakMap.set(john, "...");
    john = null; // перезаписываем ссылку на объект
    // объект john удалён из памяти!

WeakMap не поддерживает перебор и методы keys(), values(), entries(), так что нет способа взять все ключи или значения из неё.

В WeakMap присутствуют только следующие методы:

- weakMap.get(key)
- weakMap.set(key, value)
- weakMap.delete(key)
- weakMap.has(key)

##### Пример: дополнительные данные

    weakMap.set(john, "секретные документы");
    // если john умрёт, "секретные документы" будут автоматически уничтожены

пример реализации счётчика посещений с использованием Map

    // 📁 visitsCount.js
    let visitsCountMap = new Map(); // map: пользователь => число визитов
    // увеличиваем счётчик
    function countUser(user) {
      let count = visitsCountMap.get(user) || 0;
      visitsCountMap.set(user, count + 1);
    }

А вот другая часть кода, возможно, в другом файле, которая использует countUser

    // 📁 main.js
    let john = { name: "John" };
    countUser(john); // ведём подсчёт посещений
    // пользователь покинул нас
    john = null;

Нам нужно очищать visitsCountMap при удалении объекта пользователя, иначе коллекция будет бесконечно расти.

Проблемы можно избежать, если использовать WeakMap:

    // 📁 visitsCount.js
    let visitsCountMap = new WeakMap(); // map: пользователь => число визитов
    // увеличиваем счётчик
    function countUser(user) {
      let count = visitsCountMap.get(user) || 0;
      visitsCountMap.set(user, count + 1);
    }

##### Применение для кеширования

кеширование, когда результат вызова функции должен где-то запоминаться («кешироваться») для того, чтобы дальнейшие её вызовы на том же объекте могли просто брать уже готовый результат, повторно используя его.

Для хранения результатов мы можем использовать Map, вот так:

    // 📁 cache.js
    let cache = new Map();
    // вычисляем и запоминаем результат
    function process(obj) {
      if (!cache.has(obj)) {
        let result = /* тут какие-то вычисления результата для объекта */ obj;
        cache.set(obj, result);
      }
      return cache.get(obj);
    }
    // Теперь используем process() в другом файле:
    // 📁 main.js
    let obj = {/* допустим, у нас есть какой-то объект */};
    let result1 = process(obj); // вычислен результат
    // ...позже, из другого места в коде...
    let result2 = process(obj); // ранее вычисленный результат взят из кеша
    // ...позже, когда объект больше не нужен:
    obj = null;
    alert(cache.size); // 1 (Упс! Объект всё ещё в кеше, занимает память!)

если мы будем использовать WeakMap вместо Map, то эта проблема исчезнет: закешированные результаты будут автоматически удалены из памяти сборщиком мусора

    // 📁 cache.js
    let cache = new WeakMap();
    // вычисляем и запоминаем результат
    function process(obj) {
      if (!cache.has(obj)) {
        let result = /* вычисляем результат для объекта */ obj;
        cache.set(obj, result);
      }
      return cache.get(obj);
    }
    // 📁 main.js
    let obj = {/* какой-то объект */};
    let result1 = process(obj);
    let result2 = process(obj);
    // ...позже, когда объект больше не нужен:
    obj = null;
    // Нет возможности получить cache.size, так как это WeakMap,
    // но он равен 0 или скоро будет равен 0
    // Когда сборщик мусора удаляет obj, связанные с ним данные из кеша тоже удаляются

#### WeakSet

- Она аналогична Set, но мы можем добавлять в WeakSet только объекты (не примитивные значения).
- Объект присутствует в множестве только до тех пор, пока доступен где-то ещё.
- Как и Set, она поддерживает add, has и delete, но не size, keys() и не является перебираемой.

    let visitedSet = new WeakSet();
    let john = { name: "John" };
    let pete = { name: "Pete" };
    let mary = { name: "Mary" };
    visitedSet.add(john); // John заходил к нам
    visitedSet.add(pete); // потом Pete
    visitedSet.add(john); // John снова
    // visitedSet сейчас содержит двух пользователей
    // проверим, заходил ли John?
    alert(visitedSet.has(john)); // true
    // проверим, заходила ли Mary?
    alert(visitedSet.has(mary)); // false
    john = null;
    // структура данных visitedSet будет очищена автоматически (объект john будет удалён из visitedSet)

### Object.keys, values, entries

- Object.keys(obj) – возвращает массив ключей.
- Object.values(obj) – возвращает массив значений.
- Object.entries(obj) – возвращает массив пар [ключ, значение].

методы вида Object.* возвращают «реальные» массивы, а не просто итерируемые объекты

    let user = {
      name: "John",
      age: 30
    };
    Object.keys(user) == ["name", "age"]
    Object.values(user) == ["John", 30]
    Object.entries(user) == [ ["name","John"], ["age",30] ]

Object.keys/values/entries игнорируют символьные свойства для этого существует отдельный метод Object.getOwnPropertySymbols, возвращающий массив только символьных ключей. Также, существует метод Reflect.ownKeys(obj), который возвращает все ключи

#### Трансформации объекта

    let prices = {
      banana: 1,
      orange: 2,
      meat: 4,
    };
    let doublePrices = Object.fromEntries(
      // преобразовать в массив, затем map, затем fromEntries (обратно в объект)
      Object.entries(prices).map(([key, value]) => [key, value * 2])
    );
    alert(doublePrices.meat); // 8

### Деструктурирующее присваивание

#### Деструктуризация массива

    // у нас есть массив с именем и фамилией
    let arr = ["Ilya", "Kantor"];
    // деструктурирующее присваивание
    // записывает firstName = arr[0]
    // и surname = arr[1]
    let [firstName, surname] = arr;
    alert(firstName); // Ilya
    alert(surname);  // Kantor

«Деструктуризация» не означает «разрушение».

    let [firstName, surname] = "Ilya Kantor".split(' ');
    alert(firstName); // Ilya
    alert(surname);  // Kantor

Пропускайте элементы, используя запятые

    // второй элемент не нужен
    let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
    alert( title ); // Consul

Работает с любым перебираемым объектом с правой стороны

    let [a, b, c] = "abc";
    let [one, two, three] = new Set([1, 2, 3]);

Присваивайте чему угодно с левой стороны

    let user = {};
    [user.name, user.surname] = "Ilya Kantor".split(' ');
    alert(user.name); // Ilya
    alert(user.surname); // Kantor

Цикл с .entries()

    let user = {
      name: "John",
      age: 30
    };

    // цикл по ключам и значениям
    for (let [key, value] of Object.entries(user)) {
      alert(`${key}:${value}`); // name:John, затем age:30
    }

…то же самое для map:

    let user = new Map();
    user.set("name", "John");
    user.set("age", "30");
    // Map перебирает как пары [ключ, значение], что очень удобно для деструктурирования
    for (let [key, value] of user) {
      alert(`${key}:${value}`); // name:John, затем age:30
    }

Трюк обмена переменных

    let guest = "Jane";
    let admin = "Pete";
    // Давайте поменяем местами значения: сделаем guest = "Pete", а admin = "Jane"
    [guest, admin] = [admin, guest];
    alert(`${guest} ${admin}`); // Pete Jane (успешно заменено!)

Остаточные параметры «…»

    let [name1, name2] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
    alert(name1); // Julius
    alert(name2); // Caesar
    // Дальнейшие элементы нигде не присваиваются

    let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
    // rest это массив элементов, начиная с 3-го
    alert(rest[0]); // Consul
    alert(rest[1]); // of the Roman Republic
    alert(rest.length); // 2

Значения по умолчанию

    let [firstName, surname] = [];
    alert(firstName); // undefined
    alert(surname); // undefined

    // значения по умолчанию
    let [name = "Guest", surname = "Anonymous"] = ["Julius"];
    alert(name);    // Julius (из массива)
    alert(surname); // Anonymous (значение по умолчанию)

    // prompt запустится только для surname
    let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];
    alert(name);    // Julius (из массива)
    alert(surname); // результат prompt

#### Деструктуризация объекта

    let options = {
      title: "Menu",
      width: 100,
      height: 200
    };

    let {title, width, height} = options;
    alert(title);  // Menu
    alert(width);  // 100
    alert(height); // 200

изменён порядок в let {...}

    let {height, width, title} = { title: "Menu", height: 200, width: 100 }

присвоить свойство объекта переменной с другим названием

    // { sourceProperty: targetVariable }
    let {width: w, height: h, title} = options;
    // width -> w
    // height -> h
    // title -> title
    alert(title);  // Menu
    alert(w);      // 100
    alert(h);      // 200

Для потенциально отсутствующих свойств мы можем установить значения по умолчанию, используя "="

    let options = {
      title: "Menu"
    };
    let {width = 100, height = 200, title} = options;
    alert(title);  // Menu
    alert(width);  // 100
    alert(height); // 200

значениями по умолчанию могут быть любые выражения или даже функции

    let options = {
      title: "Menu"
    };
    let {width = prompt("width?"), title = prompt("title?")} = options;
    alert(title);  // Menu
    alert(width);  // (результат prompt)

Мы также можем совмещать : и =:

    let options = {
      title: "Menu"
    };
    let {width: w = 100, height: h = 200, title} = options;
    alert(title);  // Menu
    alert(w);      // 100
    alert(h);      // 200

можно взять только то, что нужно:

    let options = {
      title: "Menu",
      width: 100,
      height: 200
    };
    // взять только title, игнорировать остальное
    let { title } = options;
    alert(title); // Menu

Остаток объекта «…»

    let options = {
      title: "Menu",
      height: 200,
      width: 100
    };
    // title = свойство с именем title
    // rest = объект с остальными свойствами
    let {title, ...rest} = options;
    // сейчас title="Menu", rest={height: 200, width: 100}
    alert(rest.height);  // 200
    alert(rest.width);   // 100

Обратите внимание на let

    let title, width, height;
    // ошибка будет в этой строке
    {title, width, height} = {title: "Menu", width: 200, height: 100};

JavaScript считает, что видит блок кода, отсюда и ошибка

    let title, width, height;
    // сейчас всё работает
    ({title, width, height} = {title: "Menu", width: 200, height: 100});
    alert( title ); // Menu

#### Вложенная деструктуризация

    let options = {
      size: {
        width: 100,
        height: 200
      },
      items: ["Cake", "Donut"],
      extra: true
    };
    // деструктуризация разбита на несколько строк для ясности
    let {
      size: { // положим size сюда
        width,
        height
      },
      items: [item1, item2], // добавим элементы к items
      title = "Menu" // отсутствует в объекте (используется значение по умолчанию)
    } = options;
    alert(title);  // Menu
    alert(width);  // 100
    alert(height); // 200
    alert(item1);  // Cake
    alert(item2);  // Donut

#### Умные параметры функций

функцию, которая создаёт меню, – плохой способ писать подобные функции:

    function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
      // ...
    }

как вызвать функцию, когда большинство параметров передавать не надо, и значения по умолчанию вполне подходят?

    // undefined там, где подходят значения по умолчанию
    showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])

На помощь приходит деструктуризация!

    // мы передаём объект в функцию
    let options = {
      title: "My menu",
      items: ["Item1", "Item2"]
    };
    // ...и она немедленно извлекает свойства в переменные
    function showMenu({title = "Untitled", width = 200, height = 100, items = []}) {
      // title, items – взято из options,
      // width, height – используются значения по умолчанию
      alert( `${title} ${width} ${height}` ); // My Menu 200 100
      alert( items ); // Item1, Item2
    }
    showMenu(options);

более сложное деструктурирование с вложенными объектами и двоеточием:

    let options = {
      title: "My menu",
      items: ["Item1", "Item2"]
    };
    function showMenu({
      title = "Untitled",
      width: w = 100,  // width присваиваем в w
      height: h = 200, // height присваиваем в h
      items: [item1, item2] // первый элемент items присваивается в item1, второй в item2
    }) {
      alert( `${title} ${w} ${h}` ); // My Menu 100 200
      alert( item1 ); // Item1
      alert( item2 ); // Item2
    }
    showMenu(options);

что такое деструктурирование подразумевает, что в showMenu() будет обязательно передан аргумент

    showMenu({}); // ок, все значения - по умолчанию
    showMenu(); // так была бы ошибка

Мы можем исправить это, сделав {} значением по умолчанию для всего объекта параметров:

    function showMenu({ title = "Menu", width = 100, height = 200 } = {}) {
      alert( `${title} ${width} ${height}` );
    }
    showMenu(); // Menu 100 200

### Дата и время

#### Создание

##### new Date()

    let now = new Date();
    alert( now ); // показывает текущие дату и время

##### new Date(milliseconds)

    // 0 соответствует 01.01.1970 UTC+0
    let Jan01_1970 = new Date(0);
    alert( Jan01_1970 );

    // теперь добавим 24 часа и получим 02.01.1970 UTC+0
    let Jan02_1970 = new Date(24 * 3600 * 1000);
    alert( Jan02_1970 );

    // 31 декабря 1969 года
    let Dec31_1969 = new Date(-24 * 3600 * 1000);
    alert( Dec31_1969 );

##### new Date(datestring)

    let date = new Date("2017-01-26");
    alert(date);
    // Время не указано, поэтому оно ставится в полночь по Гринвичу и
    // меняется в соответствии с часовым поясом места выполнения кода
    // Так что в результате можно получить
    // Thu Jan 26 2017 11:00:00 GMT+1100 (восточно-австралийское время)
    // или
    // Wed Jan 25 2017 16:00:00 GMT-0800 (тихоокеанское время)

##### new Date(year, month, date, hours, minutes, seconds, ms)

    new Date(2011, 0, 1, 0, 0, 0, 0); // // 1 Jan 2011, 00:00:00
    new Date(2011, 0, 1); // то же самое, так как часы и проч. равны 0

    let date = new Date(2011, 0, 1, 2, 3, 4, 567);
    alert( date ); // 1.01.2011, 02:03:04.567

##### Получение компонентов даты

Все вышеперечисленные методы возвращают значения в соответствии с местным часовым поясом.

**getFullYear()** Получить год (4 цифры)
**getMonth()** Получить месяц, от 0 до 11.
**getDate()** Получить день месяца, от 1 до 31, что несколько противоречит названию метода.
**getHours(), getMinutes(), getSeconds(), getMilliseconds()** Получить, соответственно, часы, минуты, секунды или миллисекунды.
**getDay()** Вернуть день недели от 0 (воскресенье) до 6 (суббота).

Однако существуют и их UTC-варианты, возвращающие день, месяц, год для временной зоны UTC+0: **getUTCFullYear(), getUTCMonth(), getUTCDay()**. Для их использования требуется после "get" подставить "UTC".
**getTime()** Для заданной даты возвращает таймстамп – количество миллисекунд, прошедших с 1 января 1970 года UTC+0.
**getTimezoneOffset()** Возвращает разницу в минутах между UTC и местным часовым поясом

##### Установка компонентов даты

Следующие методы позволяют установить компоненты даты и времени:

- setFullYear(year, [month], [date])
- setMonth(month, [date])
- setDate(date)
- setHours(hour, [min], [sec], [ms])
- setMinutes(min, [sec], [ms])
- setSeconds(sec, [ms])
- setMilliseconds(ms)
- setTime(milliseconds) (устанавливает дату в виде целого количества миллисекунд, прошедших с 01.01.1970 UTC)

У всех этих методов, кроме setTime(), есть UTC-вариант, например: setUTCHours().

##### Автоисправление даты

нам требуется увеличить дату «28 февраля 2016» на два дня. В зависимости от того, високосный это год или нет, результатом будет «2 марта» или «1 марта»

    let date = new Date(2016, 1, 28);
    date.setDate(date.getDate() + 2);
    alert( date ); // 1 Mar 2016

«спустя 70 секунд с текущего момента»:

    let date = new Date();
    date.setSeconds(date.getSeconds() + 70);
    alert( date ); // выводит правильную дату

можно установить нулевые или даже отрицательные значения.

    let date = new Date(2016, 0, 2); // 2 Jan 2016
    date.setDate(1); // задать первое число месяца
    alert( date );
    date.setDate(0); // первый день месяца -- это 1, так что выводится последнее число предыдущего месяца
    alert( date ); // 31 Dec 2015

##### Преобразование к числу, разность дат

    let date = new Date();
    alert(+date); // количество миллисекунд, то же самое, что date.getTime()

измерения времени

    let start = new Date(); // начинаем отсчёт времени
    // выполняем некоторые действия
    for (let i = 0; i < 100000; i++) {
      let doSomething = i * i * i;
    }
    let end = new Date(); // заканчиваем отсчёт времени
    alert( `Цикл отработал за ${end - start} миллисекунд` );

##### Date.now() эквивалентен new Date().getTime()

    let start = Date.now(); // количество миллисекунд с 1 января 1970 года
    // выполняем некоторые действия
    for (let i = 0; i < 100000; i++) {
      let doSomething = i * i * i;
    }
    let end = Date.now(); // заканчиваем отсчёт времени
    alert( `Цикл отработал за ${end - start} миллисекунд` ); // вычитаются числа, а не даты

##### Бенчмаркинг

Метод getTime() работает ощутимо быстрее!

    function diffSubtract(date1, date2) {
      return date2 - date1;
    }
    function diffGetTime(date1, date2) {
      return date2.getTime() - date1.getTime();
    }
    function bench(f) {
      let date1 = new Date(0);
      let date2 = new Date();
      let start = Date.now();
      for (let i = 0; i < 100000; i++) f(date1, date2);
      return Date.now() - start;
    }
    alert( 'Время diffSubtract: ' + bench(diffSubtract) + 'мс' );
    alert( 'Время diffGetTime: ' + bench(diffGetTime) + 'мс' );

##### Разбор строки с датой Date.parse(str)

Метод Date.parse(str) считывает дату из строки.

Формат строки должен быть следующим: YYYY-MM-DDTHH:mm:ss.sssZ, где:

- YYYY-MM-DD – это дата: год-месяц-день.
- Символ "T" используется в качестве разделителя.
- HH:mm:ss.sss – время: часы, минуты, секунды и миллисекунды.
- Необязательная часть 'Z' обозначает часовой пояс в формате +-hh:mm. Если указать просто букву Z, то получим UTC+0.

Возможны и более короткие варианты, например, YYYY-MM-DD или YYYY-MM, или даже YYYY.

    let ms = Date.parse('2012-01-26T13:51:50.417-07:00');
    alert(ms); // 1327611110417 (таймстамп)

    let date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );
    alert(date);

### Формат JSON, метод toJSON

JSON поддерживает следующие типы данных:

- Объекты { ... }
- Массивы [ ... ]
- Примитивы:
  - строки,
  - числа,
  - логические значения true/false,
  - null.

JSON пропускает:

- Свойства-функции (методы).
- Символьные ключи и значения.
- Свойства, содержащие undefined

JavaScript предоставляет методы:

**JSON.stringify** для преобразования объектов в JSON.
**JSON.parse** для преобразования JSON обратно в объект.

#### JSON.stringify

    let student = {
      name: 'John',
      age: 30,
      isAdmin: false,
      courses: ['html', 'css', 'js'],
      wife: null
    };

    let json = JSON.stringify(student);

    alert(typeof json); // мы получили строку!

    alert(json);
    /* выведет объект в формате JSON:
    {
      "name": "John",
      "age": 30,
      "isAdmin": false,
      "courses": ["html", "css", "js"],
      "wife": null
    }
    */

##### Исключаем и преобразуем: replacer

    let json = JSON.stringify(value[, replacer, space])

**value** Значение для кодирования.
**replacer** Массив свойств для кодирования или функция соответствия function(key, value).
**space** Дополнительное пространство (отступы), используемое для форматирования.

 массив свойств

    let room = {
      number: 23
    };
    let meetup = {
      title: "Conference",
      participants: [{name: "John"}, {name: "Alice"}],
      place: room // meetup ссылается на room
    };
    room.occupiedBy = meetup; // room ссылается на meetup
    alert( JSON.stringify(meetup, ['title', 'participants']) );
    // {"title":"Conference","participants":[{},{}]}

все свойства, кроме room.occupiedBy, из-за которого появляется цикличная ссылка

    let room = {
      number: 23
    };
    let meetup = {
      title: "Conference",
      participants: [{name: "John"}, {name: "Alice"}],
      place: room // meetup ссылается на room
    };
    room.occupiedBy = meetup; // room ссылается на meetup
    alert( JSON.stringify(meetup, ['title', 'participants', 'place', 'name', 'number']) );
    /*
    {
      "title":"Conference",
      "participants":[{"name":"John"},{"name":"Alice"}],
      "place":{"number":23}
    }
    */

использовать функцию, а не массив

    let room = {
      number: 23
    };

    let meetup = {
      title: "Conference",
      participants: [{name: "John"}, {name: "Alice"}],
      place: room // meetup ссылается на room
    };

    room.occupiedBy = meetup; // room ссылается на meetup

    alert( JSON.stringify(meetup, function replacer(key, value) {
      alert(`${key}: ${value}`);
      return (key == 'occupiedBy') ? undefined : value;
    }));

    /* пары ключ:значение, которые приходят в replacer:
    :             [object Object] // {"": meetup} пустой ключ, а значением является целевой объект в общем.
    title:        Conference
    participants: [object Object],[object Object]
    0:            [object Object]
    name:         John
    1:            [object Object]
    name:         Alice
    place:        [object Object]
    number:       23
    occupiedBy: [object Object]
    */

##### Форматирование: space

    let user = {
      name: "John",
      age: 25,
      roles: {
        isAdmin: false,
        isEditor: true
      }
    };
    alert(JSON.stringify(user, null, 2));
    /* отступ в 2 пробела:
    {
      "name": "John",
      "age": 25,
      "roles": {
        "isAdmin": false,
        "isEditor": true
      }
    }
    */
    /* для JSON.stringify(user, null, 4) результат содержит больше отступов:
    {
        "name": "John",
        "age": 25,
        "roles": {
            "isAdmin": false,
            "isEditor": true
        }
    }
    */

##### Пользовательский «toJSON»

    let room = {
      number: 23,
      toJSON() {
        return this.number;
      }
    };
    let meetup = {
      title: "Conference",
      room
    };
    alert( JSON.stringify(room) ); // 23
    alert( JSON.stringify(meetup) );
    /*
      {
        "title":"Conference",
        "room": 23
      }
    */

#### JSON.parse

    let value = JSON.parse(str[, reviver]);

**str** JSON для преобразования в объект.
**reviver** Необязательная функция, которая будет вызываться для каждой пары (ключ, значение) и может преобразовывать значение. 

    let user = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';
    user = JSON.parse(user);
    alert( user.friends[1] ); // 1

типичные ошибки в написанном от руки JSON

    let json = `{
      name: "John",                     // Ошибка: имя свойства без кавычек
      "surname": 'Smith',               // Ошибка: одинарные кавычки в значении (должны быть двойными)
      'isAdmin': false,                 // Ошибка: одинарные кавычки в ключе (должны быть двойными)
      "birthday": new Date(2000, 2, 3), // Ошибка: не допускается конструктор "new", только значения
      "gender": "male"                  // Ошибка: отсутствует запятая после непоследнего свойства
      "friends": [0,1,2,3],             // Ошибка: не должно быть запятой после последнего свойства
    }`;

##### Использование reviver

    let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
    let meetup = JSON.parse(str);
    alert( meetup.date.getDate() ); // Ошибка!

 функциz восстановления вторым аргументом, которая возвращает все значения «как есть», но date станет Date

    let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
    let meetup = JSON.parse(str, function(key, value) {
      if (key == 'date') return new Date(value);
      return value;
    });
    alert( meetup.date.getDate() ); // 30 - теперь работает

## Продвинутая работа с функциями

### Рекурсия и стек

Итеративный способ: цикл for:

    function pow(x, n) {
      let result = 1;
      // умножаем result на x n раз в цикле
      for (let i = 0; i < n; i++) {
        result *= x;
      }
      return result;
    }
    alert( pow(2, 3) ); // 8

Рекурсивный способ

    function pow(x, n) {
      return (n == 1) ? x : (x * pow(x, n - 1));
    }

Любая рекурсия может быть переделана в цикл. Как правило, вариант с циклом будет эффективнее с точки зрения памяти

### Рекурсивные обходы

    let company = { // тот же самый объект, сжатый для краткости
      sales: [{name: 'John', salary: 1000}, {name: 'Alice', salary: 600 }],
      development: {
        sites: [{name: 'Peter', salary: 2000}, {name: 'Alex', salary: 1800 }],
        internals: [{name: 'Jack', salary: 1300}]
      }
    };
    // Функция для подсчёта суммы зарплат
    function sumSalaries(department) {
      if (Array.isArray(department)) { // случай (1)
        return department.reduce((prev, current) => prev + current.salary, 0); // сумма элементов массива
      } else { // случай (2)
        let sum = 0;
        for (let subdep of Object.values(department)) {
          sum += sumSalaries(subdep); // рекурсивно вызывается для подотделов, суммируя результаты
        }
        return sum;
      }
    }
    alert(sumSalaries(company)); // 6700

### Связанный список

 массивов есть недостатки. Операции «удалить элемент» и «вставить элемент» являются дорогостоящими, альтернативой может быть связанный список

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

### Остаточные параметры и оператор расширения

#### Остаточные параметры (...)

    function sum(a, b) {
      return a + b;
    }
    alert( sum(1, 2, 3, 4, 5) ); // 3,4,5 остаточные параметры

три точки `...` значит: «собери оставшиеся параметры и положи их в массив».

    function sumAll(...args) { // args — имя массива
      let sum = 0;
      for (let arg of args) sum += arg;
      return sum;
    }
    alert( sumAll(1) ); // 1
    alert( sumAll(1, 2) ); // 3
    alert( sumAll(1, 2, 3) ); // 6

первые несколько параметров в переменные, а остальные – собрать в массив

    function showName(firstName, lastName, ...titles) {
      alert( firstName + ' ' + lastName ); // Юлий Цезарь
      // Оставшиеся параметры пойдут в массив
      // titles = ["Консул", "Император"]
      alert( titles[0] ); // Консул
      alert( titles[1] ); // Император
      alert( titles.length ); // 2
    }
    showName("Юлий", "Цезарь", "Консул", "Император");

Остаточные параметры должны располагаться в конце

    function f(arg1, ...rest, arg2) { // arg2 после ...rest ?!
      // Ошибка
    }

#### Переменная "arguments"

Все аргументы функции находятся в псевдомассиве arguments под своими порядковыми номерами.

    function showName() {
      alert( arguments.length );
      alert( arguments[0] );
      alert( arguments[1] );
      // Объект arguments можно перебирать
      // for (let arg of arguments) alert(arg);
    }
    // Вывод: 2, Юлий, Цезарь
    showName("Юлий", "Цезарь");
    // Вывод: 1, Илья, undefined (второго аргумента нет)
    showName("Илья");

Стрелочные функции не имеют "arguments". Если мы обратимся к arguments из стрелочной функции, то получим аргументы внешней «нормальной» функции.

    function f() {
      let showArg = () => alert(arguments[0]);
      showArg(2);
    }
    f(1); // 1

#### Оператор расширения

    let arr = [3, 5, 1];
    alert( Math.max(arr) ); // NaN

оператор расширения

    let arr1 = [1, -2, 3, 4];
    let arr2 = [8, 3, -8, 1];
    alert( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25

для слияния массивов

    let arr = [3, 5, 1];
    let arr2 = [8, 9, 15];
    let merged = [0, ...arr, 2, ...arr2];
    alert(merged); // 0,3,5,1,2,8,9,15 (0, затем arr, затем 2, в конце arr2)

 превратить строку в массив символов

    let str = "Привет";
    alert( [...str] ); // П,р,и,в,е,т

 можем использовать и Array.from

    let str = "Привет";
    // Array.from преобразует перебираемый объект в массив
    alert( Array.from(str) ); // П,р,и,в,е,т

### Область видимости переменных, замыкание

#### Блоки кода

    {
      // показать сообщение
      let message = "Hello";
      alert(message);
    }
    {
      // показать другое сообщение
      let message = "Goodbye";
      alert(message);
    }

Без блоков была бы ошибка

    // показать сообщение
    let message = "Hello";
    alert(message);

    // показать другое сообщение
    let message = "Goodbye"; // SyntaxError: Identifier 'message' has already been declared
    alert(message);

Для **if, for, while** и т.д. переменные, объявленные в блоке кода {...}, также видны только внутри:

    if (true) {
      let phrase = "Hello";
      alert(phrase); // Hello
    }
    alert(phrase); // Ошибка, нет такой переменной!

#### Вложенные функции

для упорядочивания нашего кода,

    function sayHiBye(firstName, lastName) {

      // функция-помощник, которую мы используем ниже
      function getFullName() {
        return firstName + " " + lastName;
      }

      alert( "Hello, " + getFullName() );
      alert( "Bye, " + getFullName() );

    }

функция может быть возвращена

    function makeCounter() {
      let count = 0;

      return function() {
        return count++; // есть доступ к внешней переменной "count"
      };
    }

    let counter = makeCounter();

    alert( counter() ); // 0
    alert( counter() ); // 1
    alert( counter() ); // 2

##### Лексическое окружение

В JavaScript у каждой выполняемой функции, блока кода `{...}` и скрипта есть связанный с ними внутренний (скрытый) объект, называемый лексическим окружением `LexicalEnvironment`.

Объект лексического окружения состоит из двух частей:

- Environment Record – объект, в котором как свойства хранятся все локальные переменные (а также некоторая другая информация, такая как значение this).

- Ссылка на внешнее лексическое окружение – то есть то, которое соответствует коду снаружи (снаружи от текущих фигурных скобок).

##### Шаг 1. Переменные

"Переменная" – это просто свойство специального внутреннего объекта: Environment Record. «Получить или изменить переменную», означает, «получить или изменить свойство этого объекта».

При запуске скрипта лексическое окружение предварительно заполняется всеми объявленными переменными. 

##### Шаг 2. Function Declaration

Функция – это тоже значение, как и переменная.

Разница заключается в том, что Function Declaration мгновенно инициализируется полностью.

##### Шаг 3. Внутреннее и внешнее лексическое окружение

Когда запускается функция, в начале ее вызова автоматически создается новое лексическое окружение для хранения локальных переменных и параметров вызова.

В процессе вызова функции у нас есть два лексических окружения: внутреннее (для вызываемой функции) и внешнее (глобальное)

У внутреннего лексического окружения есть ссылка на внешнее outer.

Когда код хочет получить доступ к переменной – сначала происходит поиск во внутреннем лексическом окружении, затем во внешнем, затем в следующем и так далее, до глобального.

Если переменная не была найдена, это будет ошибкой в строгом режиме (use strict). Без строгого режима, для обратной совместимости, присваивание несуществующей переменной создаёт новую глобальную переменную с таким же именем.

##### Шаг 4. Возврат функции

    function makeCounter() {
      let count = 0;

      return function() {
        return count++;
      };
    }
    let counter = makeCounter();

В начале каждого вызова makeCounter() создается новый объект лексического окружения, в котором хранятся переменные для конкретного запуска makeCounter.

Таким образом, мы имеем два вложенных лексических окружения,

Отличие заключается в том, что во время выполнения makeCounter() создается крошечная вложенная функция, состоящая всего из одной строки: return count++. Мы ее еще не запускаем, а только создаем.

Все функции помнят лексическое окружение, в котором они были созданы. Технически здесь нет никакой магии: все функции имеют скрытое свойство [[Environment]], которое хранит ссылку на лексическое окружение, в котором была создана функция

##### Сборка мусора

Обычно лексическое окружение удаляется из памяти вместе со всеми переменными после завершения вызова функции. Это связано с тем, что на него нет ссылок. Как и любой объект JavaScript, оно хранится в памяти только до тех пор, пока к нему можно обратиться.

Однако если существует вложенная функция, которая все еще доступна после завершения функции, то она имеет свойство [[Environment]], ссылающееся на лексическое окружение.

    function f() {
      let value = 123;

      return function() {
        alert(value);
      }
    }
    let g = f(); // g.[[Environment]] хранит ссылку на лексическое окружение
    // из соответствующего вызова f()
    // пока существует функция g, value остается в памяти
    g = null; // ...и теперь память очищена.

### Устаревшее ключевое слово "var"

### Глобальный объект

Глобальный объект предоставляет переменные и функции, доступные в любом месте программы. По умолчанию это те, что встроены в язык или среду исполнения.

В браузере он называется window, в Node.js — global, в другой среде исполнения может называться иначе. Недавно globalThis был добавлен в язык как стандартизированное имя для глобального объекта, которое должно поддерживаться в любом окружении. 

    alert("Привет");
    // это то же самое, что и
    window.alert("Привет");

В браузере глобальные функции и переменные, объявленные с помощью var (не let/const!), становятся свойствами глобального объекта:

    var gVar = 5;
    alert(window.gVar); // 5 (становится свойством глобального объекта)

Если свойство настолько важное, что вы хотите сделать его доступным для всей программы, запишите его в глобальный объект напрямую:

    // сделать информацию о текущем пользователе глобальной, для предоставления доступа всем скриптам
    window.currentUser = {
      name: "John"
    };
    // где угодно в коде
    alert(currentUser.name); // John
    // или, если у нас есть локальная переменная с именем "currentUser",
    // получим её из window явно (безопасно!)
    alert(window.currentUser.name); // John

При этом обычно не рекомендуется использовать глобальные переменные. Следует применять их как можно реже.

#### Использование для полифилов

    if (!window.Promise) {
      alert("Ваш браузер очень старый!");
    }

    if (!window.Promise) {
      window.Promise = ... // собственная реализация современной возможности языка
    }

### Объект функции, NFE

функции – это объекты.

#### Свойство «name»

имя функции нам доступно как свойство «name»

    function sayHi() {
      alert("Hi");
    }
    alert(sayHi.name); // sayHi

функция создаётся без имени и тут же присваивается

    let sayHi = function() {
      alert("Hi");
    };
    alert(sayHi.name); // sayHi (есть имя!)

присваивания значения по умолчанию

    function f(sayHi = function() {}) {
      alert(sayHi.name); // sayHi (работает!)
    }
    f();

имена имеют и методы объекта

    let user = {
      sayHi() {
        // ...
      },
      sayBye: function() {
        // ...
      }
    }
    alert(user.sayHi.name); // sayHi
    alert(user.sayBye.name); // sayBye

корректное имя определить невозможно. В таких случаях свойство name имеет пустое значение

    // функция объявлена внутри массива
    let arr = [function() {}];
    alert( arr[0].name ); // <пустая строка>
    // здесь отсутствует возможность определить имя, поэтому его нет

#### Свойство «length»

    function f1(a) {}
    function f2(a, b) {}
    function many(a, b, ...more) {}
    alert(f1.length); // 1
    alert(f2.length); // 2
    alert(many.length); // 2 «остаточные параметры», здесь как бы «не считается»

простой синтаксис обработчика без аргументов для положительных ответов (наиболее распространённый случай), но также и возможность передавать универсальные обработчики

    function ask(question, ...handlers) {
      let isYes = confirm(question);

      for(let handler of handlers) {
        if (handler.length == 0) {
          if (isYes) handler();
        } else {
          handler(isYes);
        }
      }
    }
    // для положительных ответов вызываются оба типа обработчиков
    // для отрицательных - только второго типа
    ask("Вопрос?", () => alert('Вы ответили да'), result => alert(result));

#### Пользовательские свойства

    function sayHi() {
      alert("Hi");
      // давайте посчитаем, сколько вызовов мы сделали
      sayHi.counter++;
    }
    sayHi.counter = 0; // начальное значение
    sayHi(); // Hi
    sayHi(); // Hi
    alert( `Вызвана ${sayHi.counter} раза` ); // Вызвана 2 раза

Иногда свойства функции могут использоваться вместо замыканий

    function makeCounter() {
      // вместо
      // let count = 0
      function counter() {
        return counter.count++;
      };
      counter.count = 0;
      return counter;
    }
    let counter = makeCounter();
    alert( counter() ); // 0
    alert( counter() ); // 1

если значение count живёт во внешней переменной, то оно не доступно для внешнего кода. Изменить его могут только вложенные функции. А если оно присвоено как свойство функции, то мы можем его получить

    function makeCounter() {
      function counter() {
        return counter.count++;
      };
      counter.count = 0;
      return counter;
    }
    let counter = makeCounter();
    counter.count = 10;
    alert( counter() ); // 10

#### Named Function Expression

Function Expression:

    let sayHi = function(who) {
      alert(`Hello, ${who}`);
    };

присвоим ему имя

    let sayHi = function func(who) {
      alert(`Hello, ${who}`);
    };

Функция все ещё доступна как sayHi():

    let sayHi = function func(who) {
      alert(`Hello, ${who}`);
    };
    sayHi("John"); // Hello, John

особенности имени func, ради которого оно даётся:

- Оно позволяет функции ссылаться на себя же.
- Оно не доступно за пределами функции.

    let sayHi = function func(who) {
      if (who) {
        alert(`Hello, ${who}`);
      } else {
        func("Guest"); // использует func, чтобы снова вызвать себя же
      }
    };
    sayHi(); // Hello, Guest
    // А вот так - не cработает:
    func(); // Ошибка, func не определена (недоступна вне функции)

Почему мы используем func? Почему просто не использовать sayHi для вложенного вызова? Мы можем так поступить

    let sayHi = function(who) {
      if (who) {
        alert(`Hello, ${who}`);
      } else {
        sayHi("Guest");
      }
    };

у этого кода есть проблема, которая заключается в том, что значение sayHi может быть изменено

    let sayHi = function(who) {
      if (who) {
        alert(`Hello, ${who}`);
      } else {
        sayHi("Guest"); // Ошибка: sayHi не является функцией
      }
    };
    let welcome = sayHi;
    sayHi = null;
    welcome(); // Ошибка, вложенный вызов sayHi больше не работает!

Необязательное имя, которое можно вставить в Function Expression, как раз и призвано решать такого рода проблемы

    let sayHi = function func(who) {
      if (who) {
        alert(`Hello, ${who}`);
      } else {
        func("Guest"); // Теперь всё в порядке
      }
    };
    let welcome = sayHi;
    sayHi = null;
    welcome(); // Hello, Guest (вложенный вызов работает)

### Синтаксис "new Function"

#### Синтаксис

Синтаксис для объявления функции:

    let func = new Function([arg1, arg2, ...argN], functionBody);

Функция создаётся с заданными аргументами arg1...argN и телом functionBody

    let sum = new Function('a', 'b', 'return a + b');
    alert( sum(1, 2) ); // 3

функция без аргументов, в этом случае достаточно указать только тело:

    let sayHi = new Function('alert("Hello")');
    sayHi(); // Hello

Но new Function позволяет превратить любую строку в функцию. 

    let str = ... код, полученный с сервера динамически ...
    let func = new Function(str);
    func();

#### Замыкание

Обычно функция запоминает, где родилась, в специальном свойстве [[Environment]]. Это ссылка на лексическое окружение (Lexical Environment

Но когда функция создаётся с использованием new Function, в её [[Environment]] записывается ссылка не на внешнее лексическое окружение, в котором она была создана, а на глобальное. Поэтому такая функция имеет доступ только к глобальным переменным.

    function getFunc() {
      let value = "test";
      let func = new Function('alert(value)');
      return func;
    }
    getFunc()(); // ошибка: value не определено

перед отправкой JavaScript-кода на реальные работающие проекты код сжимается с помощью минификатора – специальной программы, которая уменьшает размер кода, удаляя комментарии, лишние пробелы, и, что самое главное, локальным переменным даются укороченные именапоэтому, если бы даже new Function и имела доступ к внешним переменным, она не смогла бы найти переименованную userName

### Планирование: setTimeout и setInterval

#### setTimeout

позволяет вызвать функцию один раз через определённый интервал времени

    let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...);

`func|code` Функция или строка кода для выполнения. Обычно это функция. По историческим причинам можно передать и строку кода, но это не рекомендуется.
`delay` Задержка перед запуском в миллисекундах (1000 мс = 1 с). Значение по умолчанию – 0.
`arg1, arg2…` Аргументы, передаваемые в функцию

    function sayHi(phrase, who) {
      alert( phrase + ', ' + who );
    }
    setTimeout(sayHi, 1000, "Привет", "Джон"); // Привет, Джон

первый аргумент является строкой, то JavaScript создаст из неё функцию

    setTimeout("alert('Привет')", 1000);

строка

    setTimeout("alert('Привет')", 1000);

Но использование строк не рекомендуется. Вместо этого используйте функции. Например, так:

  setTimeout(() => alert('Привет'), 1000);

Отмена через clearTimeout

    let timerId = setTimeout(() => alert("ничего не происходит"), 1000);
    alert(timerId); // идентификатор таймера
    clearTimeout(timerId);
    alert(timerId); // тот же идентификатор (не принимает значение null после отмены)

#### setInterval

позволяет вызывать функцию регулярно, повторяя вызов через определённый интервал времени.

    let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...);

Все аргументы имеют такое же значение. Но отличие этого метода от setTimeout в том, что функция запускается не один раз, а периодически через указанный интервал времени.

Чтобы остановить дальнейшее выполнение функции, необходимо вызвать clearInterval(timerId).

    // повторить с интервалом 2 секунды
    let timerId = setInterval(() => alert('tick'), 2000);

    // остановить вывод через 5 секунд
    setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000);

#### Вложенный setTimeout

    /** вместо:
    let timerId = setInterval(() => alert('tick'), 2000);
    */
    let timerId = setTimeout(function tick() {
      alert('tick');
      timerId = setTimeout(tick, 2000); // (*)
    }, 2000);

Вложенный setTimeout – более гибкий метод, чем setInterval. С его помощью последующий вызов может быть задан по-разному в зависимости от результатов предыдущего.

сервис, который отправляет запрос для получения данных на сервер каждые 5 секунд, но если сервер перегружен, то необходимо увеличить интервал запросов до 10, 20, 40 секунд… Вот псевдокод:

    let delay = 5000;

    let timerId = setTimeout(function request() {
      ...отправить запрос...

      if (ошибка запроса из-за перегрузки сервера) {
        // увеличить интервал для следующего запроса
        delay *= 2;
      }

      timerId = setTimeout(request, delay);

    }, delay);

#### setTimeout с нулевой задержкой

планировщик будет вызывать функцию только после завершения выполнения текущего кода

код выводит «Привет» и затем сразу «Мир»

    setTimeout(() => alert("Мир"));
    alert("Привет");

##### Минимальная задержка вложенных таймеров в браузере

В браузере есть ограничение на то, как часто внутренние счётчики могут выполняться. В стандарте HTML5 говорится: «после пяти вложенных таймеров интервал должен составлять не менее четырёх миллисекунд.».

let start = Date.now();
let times = [];

    setTimeout(function run() {
      times.push(Date.now() - start); // запоминаем задержку от предыдущего вызова

      if (start + 100 < Date.now()) alert(times); // показываем задержку через 100 мс
      else setTimeout(run); // если нужно ещё запланировать
    });

    // пример вывода:
    // 1,1,1,1,9,15,20,24,30,35,40,45,50,55,59,64,70,75,80,85,90,95,100

Первый таймер запускается сразу (как и указано в спецификации), а затем задержка вступает в игру, и мы видим 9, 15, 20, 24....

### Декораторы и переадресация вызова, call/apply

#### Прозрачное кеширование

`slow(x)`, выполняющая ресурсоёмкие вычисления, но возвращающая стабильные результаты, которые мы будем кешировать (запоминать), чтобы сэкономить время на повторных вычислениях.

    function slow(x) {
      // здесь могут быть ресурсоёмкие вычисления
      alert(`Called with ${x}`);
      return x;
    }

    function cachingDecorator(func) {
      let cache = new Map();

      return function(x) {
        if (cache.has(x)) {    // если кеш содержит такой x,
          return cache.get(x); // читаем из него результат
        }

        let result = func(x); // иначе, вызываем функцию

        cache.set(x, result); // и кешируем (запоминаем) результат
        return result;
      };
    }

    slow = cachingDecorator(slow);

    alert( slow(1) ); // slow(1) кешируем
    alert( "Again: " + slow(1) ); // возвращаем из кеша

    alert( slow(2) ); // slow(2) кешируем
    alert( "Again: " + slow(2) ); // возвращаем из кеша

#### Применение «func.call» для передачи контекста

Декоратор передаёт вызов оригинальному методу, но без контекста. Следовательно – ошибка.

    // сделаем worker.slow кеширующим
    let worker = {
      someMethod() {
        return 1;
      },
      slow(x) {
        // здесь может быть страшно тяжёлая задача для процессора
        alert("Called with " + x);
        return x * this.someMethod(); // (*)
      }
    };
    // тот же код, что и выше
    function cachingDecorator(func) {
      let cache = new Map();
      return function(x) {
        if (cache.has(x)) {
          return cache.get(x);
        }
        let result = func(x); // (**)
        cache.set(x, result);
        return result;
      };
    }
    alert( worker.slow(1) ); // оригинальный метод работает
    worker.slow = cachingDecorator(worker.slow); // теперь сделаем его кеширующим
    alert( worker.slow(2) ); // Ой! Ошибка: не удаётся прочитать свойство 'someMethod' из 'undefined'

Существует специальный встроенный метод функции func.call(context, …args), который позволяет вызывать функцию, явно устанавливая this.

специальный встроенный метод функции func.call(context, …args) позволяет вызывать функцию, явно устанавливая this.

Синтаксис:

    func.call(context, arg1, arg2, ...)

два вызова делают почти то же самое:

    func(1, 2, 3);
    func.call(obj, 1, 2, 3)

оба вызывают func с аргументами 1, 2 и 3. Единственное отличие состоит в том, что func.call ещё и устанавливает this равным obj.

    function sayHi() {
      alert(this.name);
    }
    let user = { name: "John" };
    let admin = { name: "Admin" };
    // используем 'call' для передачи различных объектов в качестве 'this'
    sayHi.call( user ); // John
    sayHi.call( admin ); // Admin

Здесь мы используем call для вызова say с заданным контекстом и фразой:

    function say(phrase) {
      alert(this.name + ': ' + phrase);
    }
    let user = { name: "John" };
    // 'user' становится 'this', и "Hello" становится первым аргументом
    say.call( user, "Hello" ); // John: Hello

В нашем случае мы можем использовать call в обёртке для передачи контекста в исходную функцию:

    let worker = {
      someMethod() {
        return 1;
      },
      slow(x) {
        alert("Called with " + x);
        return x * this.someMethod(); // (*)
      }
    };
    function cachingDecorator(func) {
      let cache = new Map();
      return function(x) {
        if (cache.has(x)) {
          return cache.get(x);
        }
        let result = func.call(this, x); // теперь 'this' передаётся правильно
        cache.set(x, result);
        return result;
      };
    }
    worker.slow = cachingDecorator(worker.slow); // теперь сделаем её кеширующей
    alert( worker.slow(2) ); // работает
    alert( worker.slow(2) ); // работает, не вызывая первоначальную функцию (кешируется)

#### Переходим к нескольким аргументам с «func.apply»

более мощный cachingDecorator

    let worker = {
      slow(min, max) {
        alert(`Called with ${min},${max}`);
        return min + max;
      }
    };

    function cachingDecorator(func, hash) {
      let cache = new Map();
      return function() {
        let key = hash(arguments); // (*)
        if (cache.has(key)) {
          return cache.get(key);
        }

        let result = func.call(this, ...arguments); // (**)

        cache.set(key, result);
        return result;
      };
    }

    function hash(args) {
      return args[0] + ',' + args[1];
    }

    worker.slow = cachingDecorator(worker.slow, hash);

    alert( worker.slow(3, 5) ); // работает
    alert( "Again " + worker.slow(3, 5) ); // аналогично (из кеша)

Вместо func.call(this, ...arguments) мы могли бы написать func.apply(this, arguments). Единственная разница в синтаксисе между call и apply состоит в том, что call ожидает список аргументов, в то время как apply принимает псевдомассив.

    func.call(context, ...args); // передаёт массив как список с оператором расширения
    func.apply(context, args);   // тот же эффект

Передача всех аргументов вместе с контекстом другой функции называется «перенаправлением вызова» (call forwarding). При вызове wrapper из внешнего кода его не отличить от вызова исходной функции

    let wrapper = function() {
      return func.apply(this, arguments);
    };

#### Заимствование метода

улучшение функции хеширования:

    function hash(args) {
      return args[0] + ',' + args[1];
    }

это не сработает, потому что мы вызываем hash(arguments), а объект arguments является перебираемым и псевдомассивом, но не реальным массивом:

    function hash() {
      alert( arguments.join() ); // Ошибка: arguments.join не является функцией
    }
    hash(1, 2);

способ использовать соединение массива - заимствование метода:

    function hash() {
      alert( [].join.call(arguments) ); // 1,2
    }
    hash(1, 2);

1. Пускай первым аргументом будет glue или, в случае отсутствия аргументов, им будет запятая ","
2. Пускай result будет пустой строкой "".
3. Добавить this[0] к result.
4. Добавить glue и this[1].
5. Добавить glue и this[2].
6. …выполнять до тех пор, пока this.length элементов не будет склеено.
7. Вернуть result.

Таким образом, технически он принимает this и объединяет this[0], this[1]… и т.д. вместе. Он намеренно написан так, что допускает любой псевдомассив this (не случайно, многие методы следуют этой практике). Вот почему он также работает с this=arguments.

### Привязка контекста к функции

#### Потеря «this»

      let user = {
        firstName: "Вася",
        sayHi() {
          alert(`Привет, ${this.firstName}!`);
        }
      };
      setTimeout(user.sayHi, 1000); // Привет, undefined!

последняя строка может быть переписана как

      let f = user.sayHi;
      setTimeout(f, 1000); // контекст user потеряли

Метод setTimeout в браузере имеет особенность: он устанавливает this=window для вызова функции (в Node.js this становится объектом таймера, но здесь это не имеет значения). Таким образом, для this.firstName он пытается получить window.firstName, которого не существует. В других подобных случаях this обычно просто становится undefined.

##### Решение 1: сделать функцию-обёртку

      setTimeout(() => user.sayHi(), 1000); // Привет, Вася!

уязвимость - в переменную user будет записано другое значение

      let user = {
        firstName: "Вася",
        sayHi() {
          alert(`Привет, ${this.firstName}!`);
        }
      };
      setTimeout(() => user.sayHi(), 1000);
      // ...в течение 1 секунды
      user = { sayHi() { alert("Другой пользователь в 'setTimeout'!"); } };
      // Другой пользователь в 'setTimeout'!

##### Решение 2: привязать контекст с помощью bind

      let user = {
        firstName: "Вася"
      };
      function func() {
        alert(this.firstName);
      }
      let funcUser = func.bind(user);
      funcUser(); // Вася

func.bind(user) – это «связанный вариант» func, с фиксированным this=user.

Все аргументы передаются исходному методу func как есть,

      let user = {
        firstName: "Вася"
      };
      function func(phrase) {
        alert(phrase + ', ' + this.firstName);
      }
      // привязка this к user
      let funcUser = func.bind(user);
      funcUser("Привет"); // Привет, Вася (аргумент "Привет" передан, при этом this = user)

с методом объекта:

      let user = {
        firstName: "Вася",
        sayHi() {
          alert(`Привет, ${this.firstName}!`);
        }
      };
      let sayHi = user.sayHi.bind(user); // (*)
      sayHi(); // Привет, Вася!
      setTimeout(sayHi, 1000); // Привет, Вася!

#### Частичное применение

Полный синтаксис bind:

      let bound = func.bind(context, [arg1], [arg2], ...);

Мы можем привязать не только this, но и аргументы

      function mul(a, b) {
        return a * b;
      }
      let double = mul.bind(null, 2);
      alert( double(3) ); // = mul(2, 3) = 6
      alert( double(4) ); // = mul(2, 4) = 8
      alert( double(5) ); // = mul(2, 5) = 10

#### Частичное применение без контекста

      function partial(func, ...argsBound) {
        return function(...args) { // (*)
          return func.call(this, ...argsBound, ...args);
        }
      }
      // использование:
      let user = {
        firstName: "John",
        say(time, phrase) {
          alert(`[${time}] ${this.firstName}: ${phrase}!`);
        }
      };
      // добавляем частично применённый метод с фиксированным временем
      user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

      user.sayNow("Hello");
      // Что-то вроде этого:
      // [10:00] John: Hello!

### Повторяем стрелочные функции

- У стрелочных функций нет «this»
- Стрелочные функции не имеют «arguments»

## Свойства объекта, их конфигурация

### Флаги и дескрипторы свойств

#### Флаги свойств

Помимо значения value, свойства объекта имеют три специальных атрибута (так называемые «флаги»).

- writable – если true, свойство можно изменить, иначе оно только для чтения.
- enumerable – если true, свойство перечисляется в циклах, в противном случае циклы его игнорируют.
- configurable – если true, свойство можно удалить, а эти атрибуты можно изменять, иначе этого делать нельзя.

Когда мы создаём свойство «обычным способом», все они имеют значение true. Но мы можем изменить их в любое время.

Метод Object.getOwnPropertyDescriptor позволяет получить полную информацию о свойстве.

**obj** Объект, из которого мы получаем информацию.
**propertyName** Имя свойства.

Возвращаемое значение – это объект, так называемый «дескриптор свойства»: он содержит значение свойства и все его флаги.

    let user = {
      name: "John"
    };
    let descriptor = Object.getOwnPropertyDescriptor(user, 'name');
    alert( JSON.stringify(descriptor, null, 2 ) );
    /* дескриптор свойства:
    {
      "value": "John",
      "writable": true,
      "enumerable": true,
      "configurable": true
    }
    */

Чтобы изменить флаги, мы можем использовать метод Object.defineProperty.

    Object.defineProperty(obj, propertyName, descriptor)

**obj, propertyName** Объект и его свойство, для которого нужно применить дескриптор.
**descriptor** Применяемый дескриптор.

Если свойство существует, defineProperty обновит его флаги. В противном случае метод создаёт новое свойство с указанным значением и флагами; если какой-либо флаг не указан явно, ему присваивается значение false.

    let user = {};
    Object.defineProperty(user, "name", {
      value: "John"
    });
    let descriptor = Object.getOwnPropertyDescriptor(user, 'name');
    alert( JSON.stringify(descriptor, null, 2 ) );
    /*
    {
      "value": "John",
      "writable": false,
      "enumerable": false,
      "configurable": false
    }
     */

#### Только для чтения

    let user = { };
    Object.defineProperty(user, "name", {
      value: "John",
      // для нового свойства необходимо явно указывать все флаги, для которых значение true
      enumerable: true,
      configurable: true
    });
    alert(user.name); // John
    user.name = "Pete"; // Ошибка

#### Неперечислимое свойство

    let user = {
      name: "John",
      toString() {
        return this.name;
      }
    };
    Object.defineProperty(user, "toString", {
      enumerable: false
    });
    // Теперь наше свойство toString пропало из цикла:
    for (let key in user) alert(key); // name

Неперечислимые свойства также не возвращаются Object.keys:

    alert(Object.keys(user)); // name

#### Неконфигурируемое свойство

    let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');
    alert( JSON.stringify(descriptor, null, 2 ) );
    /*
    {
      "value": 3.141592653589793,
      "writable": false,
      "enumerable": false,
      "configurable": false
    }
    */
    Math.PI = 3; // Ошибка, потому что writable: false
    // delete Math.PI тоже не сработает
    // Ошибка, из-за configurable: false
    Object.defineProperty(Math, "PI", { writable: true });

configurable: false не даст изменить флаги свойства, а также не даст его удалить. При этом можно изменить значение свойства.

    let user = {
      name: "John"
    };
    Object.defineProperty(user, "name", {
      configurable: false
    });
    user.name = "Pete"; // работает
    delete user.name; // Ошибка

#### Метод Object.defineProperties

позволяет определять множество свойств сразу

    Object.defineProperties(user, {
      name: { value: "John", writable: false },
      surname: { value: "Smith", writable: false },
      // ...
    });

#### Object.getOwnPropertyDescriptors

получить все дескрипторы свойств сразу

    let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));

аналогично, …Но это не копирует флаги

    for (let key in user) {
      clone[key] = user[key]
    }

#### Глобальное запечатывание объекта

**Object.preventExtensions(obj)**
Запрещает добавлять новые свойства в объект.
**Object.seal(obj)**
Запрещает добавлять/удалять свойства. Устанавливает configurable: false для всех существующих свойств.
**Object.freeze(obj)**
Запрещает добавлять/удалять/изменять свойства. Устанавливает configurable: false, writable: false для всех существующих свойств.
А также есть методы для их проверки:

**Object.isExtensible(obj)**
Возвращает false, если добавление свойств запрещено, иначе true.
**Object.isSealed(obj)**
Возвращает true, если добавление/удаление свойств запрещено и для всех существующих свойств установлено configurable: false.
**Object.isFrozen(obj)** Возвращает true, если добавление/удаление/изменение свойств запрещено, и для всех текущих свойств установлено configurable: false, writable: false.

### Свойства - геттеры и сеттеры

Есть два типа свойств объекта.

- свойства-данные (data properties
- свойства-аксессоры (accessor properties)

#### Геттеры и сеттеры

    let obj = {
      get propName() {
        // геттер, срабатывает при чтении obj.propName
      },

      set propName(value) {
        // сеттер, срабатывает при записи obj.propName = value
      }
    };

добавим свойство объекта fullName

    let user = {
      name: "John",
      surname: "Smith",

      get fullName() {
        return `${this.name} ${this.surname}`;
      }
    };

    alert(user.fullName); // John Smith

Если мы попытаемся назначить user.fullName=, произойдёт ошибка:

    let user = {
      get fullName() {
        return `...`;
      }
    };

    user.fullName = "Тест"; // Ошибка (у свойства есть только геттер)

 добавив сеттер для user.fullName

     let user = {
      name: "John",
      surname: "Smith",

      get fullName() {
        return `${this.name} ${this.surname}`;
      },

      set fullName(value) {
        [this.name, this.surname] = value.split(" ");
      }
    };

    // set fullName запустится с данным значением
    user.fullName = "Alice Cooper";

    alert(user.name); // Alice
    alert(user.surname); // Cooper

##### Дескрипторы свойств доступа

Свойства-аксессоры **не имеют** **value** и **writable**, но взамен предлагают функции get и set.

То есть, дескриптор аксессора может иметь:

**get** – функция без аргументов, которая сработает при чтении свойства,
**set** – функция, принимающая один аргумент, вызываемая при присвоении свойства,
enumerable – то же самое, что и для свойств-данных,
**configurable** – то же самое, что и для свойств-данных.

Например, для создания аксессора fullName при помощи defineProperty мы можем передать дескриптор с использованием get и set:

    let user = {
      name: "John",
      surname: "Smith"
    };

    Object.defineProperty(user, 'fullName', {
      get() {
        return `${this.name} ${this.surname}`;
      },

      set(value) {
        [this.name, this.surname] = value.split(" ");
      }
    });

    alert(user.fullName); // John Smith

    for(let key in user) alert(key); // name, surname

Ещё раз заметим, что свойство объекта может быть либо свойством-аксессором (с методами get/set), либо свойством-данным (со значением value).

При попытке указать и get, и value в одном дескрипторе будет ошибка:

    // Error: Invalid property descriptor.
    Object.defineProperty({}, 'prop', {
      get() {
        return 1
      },

      value: 2
    });

##### Умные геттеры/сеттеры

    let user = {
      get name() {
        return this._name;
      },

      set name(value) {
        if (value.length < 4) {
          alert("Имя слишком короткое, должно быть более 4 символов");
          return;
        }
        this._name = value;
      }
    };

    user.name = "Pete";
    alert(user.name); // Pete

    user.name = ""; // Имя слишком короткое...

существует широко известное соглашение о том, что свойства, которые начинаются с символа "_", являются внутренними, и к ним не следует обращаться из-за пределов объекта.

##### Использование для совместимости

объект user, используя свойства-данные имя name и возраст age:

    function User(name, age) {
      this.name = name;
      this.age = age;
    }

    let john = new User("John", 25);

    alert( john.age ); // 25

возраста age мы можем решить хранить дату рождения birthday

    function User(name, birthday) {
      this.name = name;
      this.birthday = birthday;
    }

    let john = new User("John", new Date(1992, 6, 1));

Что нам делать со старым кодом, который использует свойство age? Добавление геттера для age решит проблему:

    function User(name, birthday) {
      this.name = name;
      this.birthday = birthday;

      // возраст рассчитывается из текущей даты и дня рождения
      Object.defineProperty(this, "age", {
        get() {
          let todayYear = new Date().getFullYear();
          return todayYear - this.birthday.getFullYear();
        }
      });
    }

    let john = new User("John", new Date(1992, 6, 1));

    alert( john.birthday ); // доступен как день рождения
    alert( john.age );      // ...так и возраст

## Прототипы, наследование

### Прототипное наследование

#### [[Prototype]]

специальное скрытое свойство [[Prototype]] (так оно названо в спецификации), которое либо равно null, либо ссылается на другой объект. Этот объект называется «прототип»

Когда мы хотим прочитать свойство из object, а оно отсутствует, JavaScript автоматически берёт его из прототипа

Свойство [[Prototype]] является внутренним и скрытым, но есть много способов задать его. Одним из них является использование __proto__, например так

    let animal = {
      eats: true,
      walk() {
        alert("Animal walk");
      }
    };

    let rabbit = {
      jumps: true,
      __proto__: animal
    };

    let longEar = {
      earLength: 10,
      __proto__: rabbit
    };

    // walk взят из цепочки прототипов
    longEar.walk(); // Animal walk
    alert(longEar.jumps); // true (из rabbit)

Так что если у animal много полезных свойств и методов, то они автоматически становятся доступными у rabbit. Такие свойства называются «унаследованными».

 __proto__ — не то же самое, что внутреннее свойство [[Prototype]]. Это геттер/сеттер для [[Prototype]]

 Современный JavaScript предполагает, что мы должны использовать функции Object.getPrototypeOf/Object.setPrototypeOf вместо того, чтобы получать/устанавливать прототип.

#### Операция записи не использует прототип

мы присваиваем rabbit собственный метод walk:

    let animal = {
      eats: true,
      walk() {
        /* этот метод не будет использоваться в rabbit */
      }
    };

    let rabbit = {
      __proto__: animal
    };

    rabbit.walk = function() {
      alert("Rabbit! Bounce-bounce!");
    };

    rabbit.walk(); // Rabbit! Bounce-bounce!

Свойства-аксессоры – исключение, так как запись в него обрабатывается функцией-сеттером. То есть это фактически вызов функции

    let user = {
      name: "John",
      surname: "Smith",

      set fullName(value) {
        [this.name, this.surname] = value.split(" ");
      },

      get fullName() {
        return `${this.name} ${this.surname}`;
      }
    };

    let admin = {
      __proto__: user,
      isAdmin: true
    };

    alert(admin.fullName); // John Smith (*)

    // срабатывает сеттер!
    admin.fullName = "Alice Cooper"; // (**)
    alert(admin.name); // Alice
    alert(admin.surname); // Cooper

#### Значение «this»

**Неважно, где находится метод: в объекте или его прототипе. При вызове метода this — всегда объект перед точкой.**

    // методы animal
    let animal = {
      walk() {
        if (!this.isSleeping) {
          alert(`I walk`);
        }
      },
      sleep() {
        this.isSleeping = true;
      }
    };

    let rabbit = {
      name: "White Rabbit",
      __proto__: animal
    };

    // модифицирует rabbit.isSleeping
    rabbit.sleep();

    alert(rabbit.isSleeping); // true
    alert(animal.isSleeping); // undefined (нет такого свойства в прототипе)

#### Цикл for…in

Цикл for..in проходит не только по собственным, но и по унаследованным свойствам объекта

    let animal = {
      eats: true
    };

    let rabbit = {
      jumps: true,
      __proto__: animal
    };

    // Object.keys возвращает только собственные ключи
    alert(Object.keys(rabbit)); // jumps

    // for..in проходит и по своим, и по унаследованным ключам
    for(let prop in rabbit) alert(prop); // jumps, затем eats

Если унаследованные свойства нам не нужны, то мы можем отфильтровать их при помощи встроенного метода obj.hasOwnProperty(key)

    let animal = {
      eats: true
    };

    let rabbit = {
      jumps: true,
      __proto__: animal
    };

    for(let prop in rabbit) {
      let isOwn = rabbit.hasOwnProperty(prop);

      if (isOwn) {
        alert(`Our: ${prop}`); // Our: jumps
      } else {
        alert(`Inherited: ${prop}`); // Inherited: eats
      }
    }

В этом примере цепочка наследования выглядит так: rabbit наследует от animal, который наследует от Object.prototype (так как animal – литеральный объект {...}, то это по умолчанию), а затем null

### F.prototype

F.prototype означает обычное свойство с именем "prototype" для F

    let animal = {
      eats: true
    };

    function Rabbit(name) {
      this.name = name;
    }

    Rabbit.prototype = animal;

    let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal

    alert( rabbit.eats ); // true

F.prototype используется только в момент вызова new F
F.prototype используется только при вызове new F и присваивается в качестве свойства [[Prototype]] нового объекта.

Если после создания свойство F.prototype изменится (F.prototype = <другой объект>), то новые объекты, созданные с помощью new F, будут иметь в качестве [[Prototype]] другой объект, а уже существующие объекты сохранят старый.

#### F.prototype по умолчанию, свойство constructor

У каждой функции (за исключением стрелочных) по умолчанию уже есть свойство "prototype". По умолчанию "prototype" – объект с единственным свойством constructor, которое ссылается на функцию-конструктор.

    function Rabbit() {}
    // по умолчанию:
    // Rabbit.prototype = { constructor: Rabbit }

    alert( Rabbit.prototype.constructor == Rabbit ); // true

Соответственно, если мы ничего не меняем, то свойство constructor будет доступно всем кроликам через [[Prototype]]:

    function Rabbit() {}
    // по умолчанию:
    // Rabbit.prototype = { constructor: Rabbit }

    let rabbit = new Rabbit(); // наследует от {constructor: Rabbit}

    alert(rabbit.constructor == Rabbit); // true (свойство получено из прототипа)

Мы можем использовать свойство constructor существующего объекта для создания нового

    function Rabbit(name) {
      this.name = name;
      alert(name);
    }

    let rabbit = new Rabbit("White Rabbit");

    let rabbit2 = new rabbit.constructor("Black Rabbit");

**…JavaScript сам по себе не гарантирует правильное значение свойства "constructor".**

 если мы заменим прототип по умолчанию на другой объект, то свойства "constructor" в нём не будет.

     function Rabbit() {}
    Rabbit.prototype = {
      jumps: true
    };

    let rabbit = new Rabbit();
    alert(rabbit.constructor === Rabbit); // false

сохранить верное свойство "constructor", мы должны добавлять/удалять/изменять свойства у прототипа по умолчанию вместо того, чтобы перезаписывать его целиком:

    function Rabbit() {}

    // Не перезаписываем Rabbit.prototype полностью,
    // а добавляем к нему свойство
    Rabbit.prototype.jumps = true
    // Прототип по умолчанию сохраняется, и мы всё ещё имеем доступ к Rabbit.prototype.constructor

Или мы можем заново создать свойство constructor:

    Rabbit.prototype = {
      jumps: true,
      constructor: Rabbit
    };

    // теперь свойство constructor снова корректное, так как мы добавили его

### Встроенные прототипы

<https://learn.javascript.ru/native-prototypes>

### Методы прототипов, объекты без свойства __proto__

<https://learn.javascript.ru/prototype-methods>

## Классы

<https://learn.javascript.ru/classes>

### Класс: базовый синтаксис

#### Синтаксис «class»

    class MyClass {
      // методы класса
      constructor() { ... }
      method1() { ... }
      method2() { ... }
      method3() { ... }
      ...
    }

Затем используйте вызов new MyClass() для создания нового объекта со всеми перечисленными методами.

При этом автоматически вызывается метод constructor(), в нём мы можем инициализировать объект.

    class User {

      constructor(name) {
        this.name = name;
      }

      sayHi() {
        alert(this.name);
      }

    }

    // Использование:
    let user = new User("Иван");
    user.sayHi();

#### Что такое класс?

В JavaScript класс – это разновидность функции.

    class User {
      constructor(name) { this.name = name; }
      sayHi() { alert(this.name); }
    }

    // доказательство: User - это функция
    alert(typeof User); // function

Вот что на самом деле делает конструкция class User {...}:

- Создаёт функцию с именем User, которая становится результатом объявления класса. Код функции берётся из метода constructor (она будет пустой, если такого метода нет).
- Сохраняет все методы, такие как sayHi, в User.prototype.

    class User {
      constructor(name) { this.name = name; }
      sayHi() { alert(this.name); }
    }

    // класс - это функция
    alert(typeof User); // function

    // ...или, если точнее, это метод constructor
    alert(User === User.prototype.constructor); // true

    // Методы находятся в User.prototype, например:
    alert(User.prototype.sayHi); // sayHi() { alert(this.name); }

    // в прототипе ровно 2 метода
    alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi

#### Не просто синтаксический сахар

есть причины, по которым class можно считать синтаксическим сахаром для определения конструктора вместе с методами прототипа.

Однако есть важные отличия:

- Во-первых, функция, созданная с помощью class, помечена специальным внутренним свойством [[IsClassConstructor]]: true. Поэтому это не совсем то же самое, что создавать её вручную.
В отличие от обычных функций, конструктор класса не может быть вызван без new.
Кроме того, строковое представление конструктора класса в большинстве движков JavaScript начинается с «class …»
- Методы класса являются неперечислимыми. Определение класса устанавливает флаг enumerable в false для всех методов в "prototype".
И это хорошо, так как если мы проходимся циклом for..in по объекту, то обычно мы не хотим при этом получать методы класса.
- Классы всегда используют use strict. Весь код внутри класса автоматически находится в строгом режиме.

Также в дополнение к основной, описанной выше, функциональности, синтаксис class даёт ряд других интересных возможностей

#### Class Expression

Как и функции, классы можно определять внутри другого выражения, передавать, возвращать, присваивать и т.д.

    let User = class {
      sayHi() {
        alert("Привет");
      }
    };

Если у Class Expression есть имя, то оно видно только внутри класса:

    // "Named Class Expression"
    // (в спецификации нет такого термина, но происходящее похоже на Named Function Expression)
    let User = class MyClass {
      sayHi() {
        alert(MyClass); // имя MyClass видно только внутри класса
      }
    };

    new User().sayHi(); // работает, выводит определение MyClass

    alert(MyClass); // ошибка, имя MyClass не видно за пределами класса

Мы даже можем динамически создавать классы «по запросу»:

    function makeClass(phrase) {
      // объявляем класс и возвращаем его
      return class {
        sayHi() {
          alert(phrase);
        };
      };
    }

    // Создаём новый класс
    let User = makeClass("Привет");

    new User().sayHi(); // Привет

#### Геттеры/сеттеры, другие сокращения

Как и в литеральных объектах, в классах можно объявлять вычисляемые свойства, геттеры/сеттеры и т.д.

Вот пример user.name, реализованного с использованием get/set:

    class User {

      constructor(name) {
        // вызывает сеттер
        this.name = name;
      }

      get name() {
        return this._name;
      }

      set name(value) {
        if (value.length < 4) {
          alert("Имя слишком короткое.");
          return;
        }
        this._name = value;
      }

    }

    let user = new User("Иван");
    alert(user.name); // Иван

    user = new User(""); // Имя слишком короткое.

При объявлении класса геттеры/сеттеры создаются на User.prototype, вот так:

    Object.defineProperties(User.prototype, {
      name: {
        get() {
          return this._name
        },
        set(name) {
          // ...
        }
      }
    });

Пример с вычисляемым свойством в скобках [...]:

    class User {

      ['say' + 'Hi']() {
        alert("Привет");
      }

    }

    new User().sayHi();

#### Свойства классов

    class User {
      name = "Аноним";

      sayHi() {
        alert(`Привет, ${this.name}!`);
      }
    }

    new User().sayHi();

Свойство name не устанавливается в User.prototype. Вместо этого оно создаётся оператором new перед запуском конструктора, это именно свойство объекта.

### Наследование классов

#### Ключевое слово «extends»

опустим, у нас есть класс Animal:

    class Animal {
      constructor(name) {
        this.speed = 0;
        this.name = name;
      }
      run(speed) {
        this.speed = speed;
        alert(`${this.name} бежит со скоростью ${this.speed}.`);
      }
      stop() {
        this.speed = 0;
        alert(`${this.name} стоит неподвижно.`);
      }
    }

    let animal = new Animal("Мой питомец");

class Rabbit, который наследуется от Animal:

    class Rabbit extends Animal {
      hide() {
        alert(`${this.name} прячется!`);
      }
    }

    let rabbit = new Rabbit("Белый кролик");

ючевое слово extends работает по старой доброй механике прототипов. Оно устанавливает Rabbit.prototype.[[Prototype]] в Animal.prototype

После extends разрешены любые выражения

    function f(phrase) {
      return class {
        sayHi() { alert(phrase); }
      };
    }

    class User extends f("Привет") {}

    new User().sayHi(); // Привет

#### Переопределение методов

    class Rabbit extends Animal {
      stop() {
        // ...теперь это будет использоваться для rabbit.stop()
        // вместо stop() из класса Animal
      }
    }

обычно мы не хотим полностью заменить родительский метод, а скорее хотим сделать новый на его основе, изменяя или расширяя его функциональность. Мы делаем что-то в нашем методе и вызываем родительский метод до/после или в процессе.

У классов есть ключевое слово "super" для таких случаев.

- super.method(...) вызывает родительский метод.
- super(...) для вызова родительского конструктора (работает только внутри нашего конструктора).

    class Animal {

      constructor(name) {
        this.speed = 0;
        this.name = name;
      }

      run(speed) {
        this.speed = speed;
        alert(`${this.name} бежит со скоростью ${this.speed}.`);
      }

      stop() {
        this.speed = 0;
        alert(`${this.name} стоит.`);
      }

    }

    class Rabbit extends Animal {
      hide() {
        alert(`${this.name} прячется!`);
      }

      stop() {
        super.stop(); // вызываем родительский метод stop
        this.hide(); // и затем hide
      }
    }

У стрелочных функций нет super

    class Rabbit extends Animal {
      stop() {
        setTimeout(() => super.stop(), 1000); // вызывает родительский stop после 1 секунды
      }
    }

Если бы мы указали здесь «обычную» функцию, была бы ошибка:

    // Unexpected super
    setTimeout(function() { super.stop() }, 1000);

    let rabbit = new Rabbit("Белый кролик");

    rabbit.run(5); // Белый кролик бежит со скоростью 5.
    rabbit.stop(); // Белый кролик стоит. Белый кролик прячется!

#### Переопределение конструктора

Согласно спецификации, если класс расширяет другой класс и не имеет конструктора, то автоматически создаётся такой «пустой» конструктор:

    class Rabbit extends Animal {
      // генерируется для классов-потомков, у которых нет своего конструктора
      constructor(...args) {
        super(...args);
      }
    }

Как мы видим, он просто вызывает конструктор родительского класса. Так будет происходить, пока мы не создадим собственный конструктор.

Давайте добавим конструктор для Rabbit. Он будет устанавливать earLength в дополнение к name:

    class Animal {
      constructor(name) {
        this.speed = 0;
        this.name = name;
      }
      // ...
    }

    class Rabbit extends Animal {

      constructor(name, earLength) {
        this.speed = 0;
        this.name = name;
        this.earLength = earLength;
      }

      // ...
    }

    // Не работает!
    let rabbit = new Rabbit("Белый кролик", 10); // Error: this is not defined.


Конструкторы в наследуемых классах должны обязательно вызывать super(...), и (!) делать это перед использованием this.

В JavaScript существует различие между «функцией-конструктором наследующего класса» и всеми остальными. В наследующем классе соответствующая функция-конструктор помечена специальным внутренним свойством `[[ConstructorKind]]`:"derived".

Разница в следующем:

- Когда выполняется обычный конструктор, он создаёт пустой объект и присваивает его this .
- Когда запускается конструктор унаследованного класса, он этого не делает. Вместо этого он ждёт, что это сделает конструктор родительского класса.

Поэтому, если мы создаём собственный конструктор, мы должны вызвать super, в противном случае объект для this не будет создан, и мы получим ошибку.

    class Animal {

      constructor(name) {
        this.speed = 0;
        this.name = name;
      }

      // ...
    }

    class Rabbit extends Animal {

      constructor(name, earLength) {
        super(name);
        this.earLength = earLength;
      }

      // ...
    }

    // теперь работает
    let rabbit = new Rabbit("Белый кролик", 10);
    alert(rabbit.name); // Белый кролик
    alert(rabbit.earLength); // 10

#### Переопределение полей класса: тонкое замечание

родительский конструктор всегда использует своё собственное значение поля, а не переопределённое.

    class Animal {
      name = 'animal';

      constructor() {
        alert(this.name); // (*)
      }
    }

    class Rabbit extends Animal {
      name = 'rabbit';
    }

    new Animal(); // animal
    new Rabbit(); // animal

Когда родительский конструктор вызывается в производном классе, он использует переопределённый метод.

    class Animal {
      showName() {  // вместо this.name = 'animal'
        alert('animal');
      }

      constructor() {
        this.showName(); // вместо alert(this.name);
      }
    }

    class Rabbit extends Animal {
      showName() {
        alert('rabbit');
      }
    }

    new Animal(); // animal
    new Rabbit(); // rabbit

причина заключается в порядке инициализации полей. Поле класса инициализируется:

- Перед конструктором для базового класса (который ничего не расширяет),
- Сразу после super() для производного класса.

#### Устройство super, [[HomeObject]]

    let animal = {
      name: "Animal",
      eat() {
        alert(`${this.name} ест.`);
      }
    };

    let rabbit = {
      __proto__: animal,
      name: "Кролик",
      eat() {
        // вот как предположительно может работать super.eat()
        this.__proto__.eat.call(this); // (*)
      }
    };

    rabbit.eat(); // Кролик ест.

код работает так, как задумано: выполняется нужный alert.

добавим ещё один объект в цепочку наследования и увидим, как все сломается:

    let animal = {
      name: "Животное",
      eat() {
        alert(`${this.name} ест.`);
      }
    };

    let rabbit = {
      __proto__: animal,
      eat() {
        // ...делаем что-то специфичное для кролика и вызываем родительский (animal) метод
        this.__proto__.eat.call(this); // (*)
      }
    };

    let longEar = {
      __proto__: rabbit,
      eat() {
        // ...делаем что-то, связанное с длинными ушами, и вызываем родительский (rabbit) метод
        this.__proto__.eat.call(this); // (**)
      }
    };

    longEar.eat(); // Error: Maximum call stack size exceeded

обеих линиях (*) и (**) значение this.__proto__ одно и то же: rabbit. В обоих случаях метод rabbit.eat вызывается в бесконечном цикле не поднимаясь по цепочке вызовов.

Для решения этой проблемы в JavaScript было добавлено специальное внутреннее свойство для функций: [[HomeObject]].

Когда функция объявлена как метод внутри класса или объекта, её свойство [[HomeObject]] становится равно этому объекту.

Затем super использует его, чтобы получить прототип родителя и его методы.

    let animal = {
      name: "Животное",
      eat() {         // animal.eat.[[HomeObject]] == animal
        alert(`${this.name} ест.`);
      }
    };

    let rabbit = {
      __proto__: animal,
      name: "Кролик",
      eat() {         // rabbit.eat.[[HomeObject]] == rabbit
        super.eat();
      }
    };

    let longEar = {
      __proto__: rabbit,
      name: "Длинноух",
      eat() {         // longEar.eat.[[HomeObject]] == longEar
        super.eat();
      }
    };

    // работает верно
    longEar.eat();  // Длинноух ест.

Метод, такой как longEar.eat, знает свой [[HomeObject]] и получает метод родителя из его прототипа. Вообще без использования this.

#### Методы не «свободны»

До этого мы неоднократно видели, что функции в JavaScript «свободны», не привязаны к объектам. Их можно копировать между объектами и вызывать с любым this.

Но само существование [[HomeObject]] нарушает этот принцип, так как методы запоминают свои объекты. [[HomeObject]] нельзя изменить, эта связь – навсегда.

Единственное место в языке, где используется [[HomeObject]] – это super. Поэтому если метод не использует super, то мы все ещё можем считать его свободным и копировать между объектами. А вот если super в коде есть, то возможны побочные эффекты.

    let animal = {
      sayHi() {
        alert("Я животное");
      }
    };

    // rabbit наследует от animal
    let rabbit = {
      __proto__: animal,
      sayHi() {
        super.sayHi();
      }
    };

    let plant = {
      sayHi() {
        alert("Я растение");
      }
    };

    // tree наследует от plant
    let tree = {
      __proto__: plant,
      sayHi: rabbit.sayHi // (*)
    };

    tree.sayHi();  // Я животное (?!?)

#### Методы, а не свойства-функции

Свойство `[[HomeObject]]` определено для методов как классов, так и обычных объектов. Но для объектов методы должны быть объявлены именно как method(), а не "method: function()".

Для нас различий нет, но они есть для JavaScript.

В приведённом ниже примере используется синтаксис не метода, свойства-функции. Поэтому у него нет `[[HomeObject]]`, и наследование не работает:

    let animal = {
      eat: function() { // намеренно пишем так, а не eat() { ...
        // ...
      }
    };

    let rabbit = {
      __proto__: animal,
      eat: function() {
        super.eat();
      }
    };

    rabbit.eat();  // Ошибка вызова super (потому что нет [[HomeObject]])

### Статические свойства и методы

#### Статические методы

Мы также можем присвоить метод самому классу. Такие методы называются статическими.

В объявление класса они добавляются с помощью ключевого слова static, например:

    class User {
      static staticMethod() {
        alert(this === User);
      }
    }

    User.staticMethod(); // true

Это фактически то же самое, что присвоить метод напрямую как свойство функции:

    class User { }

    User.staticMethod = function() {
      alert(this === User);
    };

Значением this при вызове User.staticMethod() является сам конструктор класса User (правило «объект до точки»).

использование

Здесь метод Article.compare стоит «над» статьями, как средство для их сравнения. Это метод не отдельной статьи, а всего класса.

Другим примером может быть так называемый «фабричный» метод.

Скажем, нам нужно несколько способов создания статьи:

Создание через заданные параметры (title, date и т. д.).
Создание пустой статьи с сегодняшней датой.
…или как-то ещё.

    class Article {
      constructor(title, date) {
        this.title = title;
        this.date = date;
      }

      static createTodays() {
        // помним, что this = Article
        return new this("Сегодняшний дайджест", new Date());
      }
    }

    let article = Article.createTodays();

    alert( article.title ); // Сегодняшний дайджест

Статические методы также используются в классах, относящихся к базам данных, для поиска/сохранения/удаления вхождений в базу данных, например:

    // предположим, что Article - это специальный класс для управления статьями
    // статический метод для удаления статьи по id:
    Article.remove({id: 12345});

Статические методы недоступны для отдельных объектов

// ...
article.createTodays(); /// Error: article.createTodays is not a function

#### Статические свойства

Статические свойства также возможны, они выглядят как свойства класса, но с static в начале:

    class Article {
      static publisher = "Илья Кантор";
    }

    alert( Article.publisher ); // Илья Кантор

Это то же самое, что и прямое присваивание Article:

    Article.publisher = "Илья Кантор";

#### Наследование статических свойств и методов

метод Animal.compare в коде ниже наследуется и доступен как Rabbit.compare:

    class Animal {

      constructor(name, speed) {
        this.speed = speed;
        this.name = name;
      }

      run(speed = 0) {
        this.speed += speed;
        alert(`${this.name} бежит со скоростью ${this.speed}.`);
      }

      static compare(animalA, animalB) {
        return animalA.speed - animalB.speed;
      }

    }

    // Наследует от Animal
    class Rabbit extends Animal {
      hide() {
        alert(`${this.name} прячется!`);
      }
    }

    let rabbits = [
      new Rabbit("Белый кролик", 10),
      new Rabbit("Чёрный кролик", 5)
    ];

    rabbits.sort(Rabbit.compare);

    rabbits[0].run(); // Чёрный кролик бежит со скоростью 5.

Так что Rabbit extends Animal создаёт две ссылки на прототип:

Функция Rabbit прототипно наследует от функции Animal.
Rabbit.prototype прототипно наследует от Animal.prototype.
В результате наследование работает как для обычных, так и для статических методов.

Давайте это проверим кодом:

    class Animal {}
    class Rabbit extends Animal {}

    // для статики
    alert(Rabbit.__proto__ === Animal); // true

    // для обычных методов
    alert(Rabbit.prototype.__proto__ === Animal.prototype); // true

### Приватные и защищённые методы и свойства

В JavaScript есть два типа полей (свойств и методов) объекта:

- Публичные: доступны отовсюду. Они составляют внешний интерфейс. До этого момента мы использовали только публичные свойства и методы.
- Приватные: доступны только внутри класса. Они для внутреннего интерфейса.
«защищённые» поля, доступные только внутри класса или для дочерних классов (то есть, как приватные, но разрешён доступ для наследующих классов), они не реализованы в JavaScript на уровне языка, но на практике они очень удобны, поэтому их эмулируют.

#### Защищённое свойство «waterAmount»

Давайте для начала создадим простой класс для описания кофеварки:

    class CoffeeMachine {
      waterAmount = 0; // количество воды внутри

      constructor(power) {
        this.power = power;
        alert( `Создана кофеварка, мощность: ${power}` );
      }

    }

    // создаём кофеварку
    let coffeeMachine = new CoffeeMachine(100);

    // добавляем воды
    coffeeMachine.waterAmount = 200;

Прямо сейчас свойства waterAmount и power публичные. Мы можем легко получать и устанавливать им любое значение извне.

Давайте изменим свойство waterAmount на защищённое, чтобы иметь больше контроля над ним. Например, мы не хотим, чтобы кто-либо устанавливал его ниже нуля.

Защищённые свойства обычно начинаются с префикса _.

Это не синтаксис языка: есть хорошо известное соглашение между программистами, что такие свойства и методы не должны быть доступны извне. Большинство программистов следуют этому соглашению.

Так что наше свойство будет называться _waterAmount:

    class CoffeeMachine {
      _waterAmount = 0;

      set waterAmount(value) {
        if (value < 0) throw new Error("Отрицательное количество воды");
        this._waterAmount = value;
      }

      get waterAmount() {
        return this._waterAmount;
      }

      constructor(power) {
        this._power = power;
      }

    }

    // создаём новую кофеварку
    let coffeeMachine = new CoffeeMachine(100);

    // устанавливаем количество воды
    coffeeMachine.waterAmount = -10; // Error: Отрицательное количество воды

#### Свойство только для чтения «power»

Давайте сделаем свойство power доступным только для чтения. Иногда нужно, чтобы свойство устанавливалось только при создании объекта и после этого никогда не изменялось.

Это как раз требуется для кофеварки: мощность никогда не меняется.

Для этого нам нужно создать только геттер, но не сеттер:

    class CoffeeMachine {
      // ...

      constructor(power) {
        this._power = power;
      }

      get power() {
        return this._power;
      }

    }

    // создаём кофеварку
    let coffeeMachine = new CoffeeMachine(100);

    alert(`Мощность: ${coffeeMachine.power}W`); // Мощность: 100W

    coffeeMachine.power = 25; // Error (no setter)

**Геттеры/сеттеры** Здесь мы использовали синтаксис геттеров/сеттеров.

Но в большинстве случаев использование функций get.../set... предпочтительнее:

    class CoffeeMachine {
      _waterAmount = 0;

      setWaterAmount(value) {
        if (value < 0) throw new Error("Отрицательное количество воды");
        this._waterAmount = value;
      }

      getWaterAmount() {
        return this._waterAmount;
      }
    }

    new CoffeeMachine().setWaterAmount(100);

Это выглядит немного длиннее, но функции более гибкие. Они могут принимать несколько аргументов (даже если они нам сейчас не нужны). Итак, на будущее, если нам надо что-то отрефакторить, функции – более безопасный выбор.

С другой стороны, синтаксис get/set короче, решать вам.

**Защищённые поля наследуются**. Если мы унаследуем class MegaMachine extends CoffeeMachine, ничто не помешает нам обращаться к this._waterAmount или this._power из методов нового класса.

Таким образом, защищённые поля, конечно же, наследуются. В отличие от приватных полей, в чём мы убедимся ниже.

#### Приватное свойство «#waterLimit»

Приватные свойства и методы должны начинаться с #. Они доступны только внутри класса.

Например, в классе ниже есть приватное свойство #waterLimit и приватный метод #checkWater для проверки количества воды:

    class CoffeeMachine {
      #waterLimit = 200;

      #checkWater(value) {
        if (value < 0) throw new Error("Отрицательный уровень воды");
        if (value > this.#waterLimit) throw new Error("Слишком много воды");
      }
    }

    let coffeeMachine = new CoffeeMachine();

    // снаружи нет доступа к приватным методам класса
    coffeeMachine.#checkWater(); // Error
    coffeeMachine.#waterLimit = 1000; // Error

На уровне языка # является специальным символом, который означает, что поле приватное. Мы не можем получить к нему доступ извне или из наследуемых классов.

Приватные поля не конфликтуют с публичными. У нас может быть два поля одновременно – приватное #waterAmount и публичное waterAmount.

    class CoffeeMachine {

      #waterAmount = 0;

      get waterAmount() {
        return this.#waterAmount;
      }

      set waterAmount(value) {
        if (value < 0) throw new Error("Отрицательный уровень воды");
        this.#waterAmount = value;
      }
    }

    let machine = new CoffeeMachine();

    machine.waterAmount = 100;
    alert(machine.#waterAmount); // Error

Но если мы унаследуем от CoffeeMachine, то мы не получим прямого доступа к #waterAmount. Мы будем вынуждены полагаться на геттер/сеттер waterAmount:

    class MegaCoffeeMachine extends CoffeeMachine {
      method() {
        alert( this.#waterAmount ); // Error: can only access from CoffeeMachine
      }
    }

Во многих случаях такое ограничение слишком жёсткое. Раз уж мы расширяем CoffeeMachine, у нас может быть вполне законная причина для доступа к внутренним методам и свойствам. Поэтому защищённые свойства используются чаще, хоть они и не поддерживаются синтаксисом языка.

Важно:
Приватные поля особенные.

Как мы помним, обычно мы можем получить доступ к полям объекта с помощью this[name]:

    class User {
      ...
      sayHi() {
        let fieldName = "name";
        alert(`Hello, ${this[fieldName]}`);
      }
    }

С приватными свойствами такое невозможно: `this['#name']` не работает. Это ограничение синтаксиса сделано для обеспечения приватности.

### Расширение встроенных классов

От встроенных классов, таких как Array, Map и других, тоже можно наследовать.

Например, в этом примере PowerArray наследуется от встроенного Array:

    // добавим один метод (можно более одного)
    class PowerArray extends Array {
      isEmpty() {
        return this.length === 0;
      }
    }

    let arr = new PowerArray(1, 2, 5, 10, 50);
    alert(arr.isEmpty()); // false

    let filteredArr = arr.filter(item => item >= 10);
    alert(filteredArr); // 10, 50
    alert(filteredArr.isEmpty()); // false

Обратите внимание на интересный момент: встроенные методы, такие как filter, map и другие возвращают новые объекты унаследованного класса PowerArray. Их внутренняя реализация такова, что для этого они используют свойство объекта constructor.

    arr.constructor === PowerArray

Поэтому при вызове метода arr.filter() он внутри создаёт массив результатов, именно используя arr.constructor, а не обычный массив. Это замечательно, поскольку можно продолжать использовать методы PowerArray далее на результатах.

При помощи специального статического геттера Symbol.species можно вернуть конструктор, который JavaScript будет использовать в filter, map и других методах для создания новых объектов.

Если бы мы хотели, чтобы методы map, filter и т. д. возвращали обычные массивы, мы могли бы вернуть Array в Symbol.species, вот так:

    class PowerArray extends Array {
      isEmpty() {
        return this.length === 0;
      }

      // встроенные методы массива будут использовать этот метод как конструктор
      static get [Symbol.species]() {
        return Array;
      }
    }

    let arr = new PowerArray(1, 2, 5, 10, 50);
    alert(arr.isEmpty()); // false

    // filter создаст новый массив, используя arr.constructor[Symbol.species] как конструктор
    let filteredArr = arr.filter(item => item >= 10);

    // filteredArr не является PowerArray, это Array
    alert(filteredArr.isEmpty()); // Error: filteredArr.isEmpty is not a function

Аналогично работают другие коллекции
Другие коллекции, такие как Map, Set, работают аналогично. Они также используют Symbol.species.

#### Отсутствие статического наследования встроенных классов

Обычно, когда один класс наследует другой, то наследуются и статические методы. Это было подробно разъяснено в главе Статические свойства и методы.

Но встроенные классы – исключение. Они не наследуют статические методы друг друга.

Например, и Array, и Date наследуют от Object, так что в их экземплярах доступны методы из Object.prototype. Но `Array.[[Prototype]]` не ссылается на Object, поэтому нет методов Array.keys() или Date.keys().

### Проверка класса: "instanceof"

## Обработка ошибок

<https://learn.javascript.ru/error-handling>

## Промисы, async/await

<https://learn.javascript.ru/async>

### Введение: колбэки

функция загружает на страницу новый скрипт. Когда в тело документа добавится конструкция `<script src="…">`, браузер загрузит скрипт и выполнит его

    function loadScript(src) {
      let script = document.createElement('script');
      script.src = src;
      document.head.append(script);
    }

    loadScript('/my/script.js');
    // код, написанный после вызова функции loadScript,
    // не будет дожидаться полной загрузки скрипта
    
    // в скрипте есть "function newFunction() {…}"
    newFunction(); // такой функции не существует!

Такие функции называют «асинхронными», потому что действие (загрузка скрипта) будет завершено не сейчас, а потом.

передадим функцию callback вторым аргументом в loadScript, чтобы вызвать её, когда скрипт загрузится:

    function loadScript(src, callback) {
      let script = document.createElement('script');
      script.src = src;
      script.onload = () => callback(script);
      document.head.append(script);
    }

если мы хотим вызвать функцию из скрипта, нужно делать это в колбэке:

    loadScript('/my/script.js', function() {
      // эта функция вызовется после того, как загрузится скрипт
      newFunction(); // теперь всё работает
      ...
    });

    loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
      alert(`Здорово, скрипт ${script.src} загрузился`);
      alert( _ ); // функция, объявленная в загруженном скрипте
    });

#### Колбэк в колбэке

    loadScript('/my/script.js', function(script) {

      loadScript('/my/script2.js', function(script) {

        loadScript('/my/script3.js', function(script) {
          // ...и так далее, пока все скрипты не будут загружены
        });

      })

    });

#### Перехват ошибок

улучшенная версия loadScript, которая умеет отслеживать ошибки загрузки:

    function loadScript(src, callback) {
      let script = document.createElement('script');
      script.src = src;

      script.onload = () => callback(null, script);
      script.onerror = () => callback(new Error(`Не удалось загрузить скрипт ${src}`));

      document.head.append(script);
    }

Живой пример:

    loadScript('/my/script.js', function(error, script) {
      if (error) {
        // обрабатываем ошибку
      } else {
        // скрипт успешно загружен
      }
    });

#### Адская пирамида вызовов

    loadScript('1.js', function(error, script) {

      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('2.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
            // ...
            loadScript('3.js', function(error, script) {
              if (error) {
                handleError(error);
              } else {
                // ...и так далее, пока все скрипты не будут загружены (*)
              }
            });

          }
        })
      }
    });

можем попытаться решить эту проблему, изолируя каждое действие в отдельную функцию,

    loadScript('1.js', step1);

    function step1(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('2.js', step2);
      }
    }

    function step2(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', step3);
      }
    }

    function step3(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...и так далее, пока все скрипты не будут загружены (*)
      }
    };

### Промисы

Синтаксис создания Promise:

    let promise = new Promise(function(resolve, reject) {
      // функция-исполнитель (executor)
    });

Функция, переданная в конструкцию new Promise, называется исполнитель (executor). Когда Promise создаётся, она запускается автоматически. Она должна содержать «создающий» код, который когда-нибудь создаст результат.

Её аргументы resolve и reject – это колбэки, которые предоставляет сам JavaScript. Наш код – только внутри исполнителя.

Когда он получает результат, сейчас или позже – не важно, он должен вызвать один из этих колбэков:

- **resolve(value)** — если работа завершилась успешно, с результатом value.
- **reject(error)** — если произошла ошибка, error – объект ошибки.

Итак, исполнитель запускается автоматически, он должен выполнить работу, а затем вызвать resolve или reject.

У объекта promise, возвращаемого конструктором new Promise, есть внутренние свойства:

**state** («состояние») — вначале **"pending"** («ожидание»), потом меняется на **"fulfilled"** («выполнено успешно») при вызове resolve или на **"rejected"** («выполнено с ошибкой») при вызове reject.
**result** («результат») — вначале **undefined**, далее изменяется на **value** при вызове **resolve(value)** или на **error** при вызове **reject(error)**.

Свойства state и result – это внутренние свойства объекта Promise и мы не имеем к ним прямого доступа. Для обработки результата следует использовать методы .then/.catch/.finally, про них речь пойдёт дальше.

Может быть что-то одно: либо результат, либо ошибка

Все последующие вызовы resolve и reject будут проигнорированы:

    let promise = new Promise(function(resolve, reject) {
      resolve("done");

      reject(new Error("…")); // игнорируется
      setTimeout(() => resolve("…")); // игнорируется
    });

Обычно исполнитель делает что-то асинхронное и после этого вызывает resolve/reject, то есть через какое-то время. Но это не обязательно, resolve или reject могут быть вызваны сразу:

    let promise = new Promise(function(resolve, reject) {
      // задача, не требующая времени
      resolve(123); // мгновенно выдаст результат: 123
    });

#### Потребители: then, catch

Функции-потребители могут быть зарегистрированы (подписаны) с помощью методов .then и .catch.

##### then

Наиболее важный и фундаментальный метод – .then.

    promise.then(
      function(result) { /* обработает успешное выполнение */ },
      function(error) { /* обработает ошибку */ }
    );

Первый аргумент метода .then – функция, которая выполняется, когда промис переходит в состояние «выполнен успешно», и получает результат.

Второй аргумент .then – функция, которая выполняется, когда промис переходит в состояние «выполнен с ошибкой», и получает ошибку.

успешно выполненный промис

    let promise = new Promise(function(resolve, reject) {
      setTimeout(() => resolve("done!"), 1000);
    });

    // resolve запустит первую функцию, переданную в .then
    promise.then(
      result => alert(result), // выведет "done!" через одну секунду
      error => alert(error) // не будет запущена
    );

ошибки в промисе

    let promise = new Promise(function(resolve, reject) {
      setTimeout(() => reject(new Error("Whoops!")), 1000);
    });

    // reject запустит вторую функцию, переданную в .then
    promise.then(
      result => alert(result), // не будет запущена
      error => alert(error) // выведет "Error: Whoops!" спустя одну секунду
    );

Если мы заинтересованы только в результате успешного выполнения задачи, то в then можно передать только одну функцию:

    let promise = new Promise(resolve => {
      setTimeout(() => resolve("done!"), 1000);
    });

    promise.then(alert); // выведет "done!" спустя одну секунду

##### catch

Если мы хотели бы только обработать ошибку, то можно использовать null в качестве первого аргумента: .then(null, errorHandlingFunction). Или можно воспользоваться методом .catch(errorHandlingFunction), который сделает то же самое:

    let promise = new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error("Ошибка!")), 1000);
    });

    // .catch(f) это то же самое, что promise.then(null, f)
    promise.catch(alert); // выведет "Error: Ошибка!" спустя одну секунду

Вызов .catch(f) – это сокращённый, «укороченный» вариант .then(null, f).

##### Очистка: finally

Идея finally состоит в том, чтобы настроить обработчик для выполнения очистки/доведения после завершения предыдущих операций.

    new Promise((resolve, reject) => {
      /* сделать что-то, что займёт время, и после вызвать resolve или может reject */
    })
      // выполнится, когда промис завершится, независимо от того, успешно или нет
      .finally(() => остановить индикатор загрузки)
      // таким образом, индикатор загрузки всегда останавливается, прежде чем мы продолжим
      .then(result => показать результат, err => показать ошибку)

- Обработчик, вызываемый из finally, не имеет аргументов
- Обработчик finally «пропускает» результат или ошибку дальше, к последующим обработчикам
- Обработчик finally также не должен ничего возвращать

##### Пример: loadScript

    function loadScript(src) {
      return new Promise(function(resolve, reject) {
        let script = document.createElement('script');
        script.src = src;

        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Ошибка загрузки скрипта ${src}`));

        document.head.append(script);
      });
    }

Применение:

    let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

    promise.then(
      script => alert(`${script.src} загружен!`),
      error => alert(`Ошибка: ${error.message}`)
    );

    promise.then(script => alert('Ещё один обработчик...'));

### Цепочка промисов

    new Promise(function(resolve, reject) {

      setTimeout(() => resolve(1), 1000); // (*)

    }).then(function(result) { // (**)

      alert(result); // 1
      return result * 2;

    }).then(function(result) { // (***)

      alert(result); // 2
      return result * 2;

    }).then(function(result) {

      alert(result); // 4
      return result * 2;

    });

#### Возвращаем промисы

    new Promise(function(resolve, reject) {

      setTimeout(() => resolve(1), 1000);

    }).then(function(result) {

      alert(result); // 1

      return new Promise((resolve, reject) => { // (*)
        setTimeout(() => resolve(result * 2), 1000);
      });

    }).then(function(result) { // (**)

      alert(result); // 2

      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(result * 2), 1000);
      });

    }).then(function(result) {

      alert(result); // 4

    });

#### Пример: loadScript

    loadScript("/article/promise-chaining/one.js")
      .then(function(script) {
        return loadScript("/article/promise-chaining/two.js");
      })
      .then(function(script) {
        return loadScript("/article/promise-chaining/three.js");
      })
      .then(function(script) {
        // вызовем функции, объявленные в загружаемых скриптах,
        // чтобы показать, что они действительно загрузились
        one();
        two();
        three();
      });

Этот же код можно переписать немного компактнее, используя стрелочные функции:

    loadScript("/article/promise-chaining/one.js")
      .then(script => loadScript("/article/promise-chaining/two.js"))
      .then(script => loadScript("/article/promise-chaining/three.js"))
      .then(script => {
        // скрипты загружены, мы можем использовать объявленные в них функции
        one();
        two();
        three();
      });

#### Более сложный пример: fetch

    let promise = fetch(url);

    fetch('/article/promise-chaining/user.json')
      // .then в коде ниже выполняется, когда удалённый сервер отвечает
      .then(function(response) {
        // response.text() возвращает новый промис,
        // который выполняется и возвращает полный ответ сервера,
        // когда он загрузится
        return response.text();
      })
      .then(function(text) {
        // ...и здесь содержимое полученного файла
        alert(text); // {"name": "iliakan", isAdmin: true}
      });

Мы также применим стрелочные функции для более компактной записи кода:

    // то же самое, что и раньше, только теперь response.json() читает данные в формате JSON
    fetch('/article/promise-chaining/user.json')
      .then(response => response.json())
      .then(user => alert(user.name)); // iliakan, получили имя пользователя

Например, мы можем послать запрос на GitHub, чтобы загрузить данные из профиля пользователя и показать его аватар:

    // Запрашиваем user.json
    fetch('/article/promise-chaining/user.json')
      // Загружаем данные в формате json
      .then(response => response.json())
      // Делаем запрос к GitHub
      .then(user => fetch(`https://api.github.com/users/${user.name}`))
      // Загружаем ответ в формате json
      .then(response => response.json())
      // Показываем аватар (githubUser.avatar_url) в течение 3 секунд (возможно, с анимацией)
      .then(githubUser => {
        let img = document.createElement('img');
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);

        setTimeout(() => img.remove(), 3000); // (*)
      });

Чтобы сделать наш код расширяемым, нам нужно возвращать ещё один промис, который выполняется после того, как завершается показ аватара.

    fetch('/article/promise-chaining/user.json')
      .then(response => response.json())
      .then(user => fetch(`https://api.github.com/users/${user.name}`))
      .then(response => response.json())
      .then(githubUser => new Promise(function(resolve, reject) { // (*)
        let img = document.createElement('img');
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);

        setTimeout(() => {
          img.remove();
          resolve(githubUser); // (**)
        }, 3000);
      }))
      // срабатывает через 3 секунды
      .then(githubUser => alert(`Закончили показ ${githubUser.name}`));

разобьём написанный код на отдельные функции, пригодные для повторного использования:

    function loadJson(url) {
      return fetch(url)
        .then(response => response.json());
    }

    function loadGithubUser(name) {
      return fetch(`https://api.github.com/users/${name}`)
        .then(response => response.json());
    }

    function showAvatar(githubUser) {
      return new Promise(function(resolve, reject) {
        let img = document.createElement('img');
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);

        setTimeout(() => {
          img.remove();
          resolve(githubUser);
        }, 3000);
      });
    }

    // Используем их:
    loadJson('/article/promise-chaining/user.json')
      .then(user => loadGithubUser(user.name))
      .then(showAvatar)
      .then(githubUser => alert(`Показ аватара ${githubUser.name} завершён`));
      // ...

### Промисы: обработка ошибок

примере для fetch указана неправильная ссылка (сайт не существует), и .catch перехватывает ошибку:

    fetch('https://no-such-server.blabla') // ошибка
      .then(response => response.json())
      .catch(err => alert(err)) // TypeError: failed to fetch (текст может отличаться)

Самый лёгкий путь перехватить все ошибки – это добавить .catch в конец цепочки:

    fetch('/article/promise-chaining/user.json')
      .then(response => response.json())
      .then(user => fetch(`https://api.github.com/users/${user.name}`))
      .then(response => response.json())
      .then(githubUser => new Promise((resolve, reject) => {
        let img = document.createElement('img');
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);

        setTimeout(() => {
          img.remove();
          resolve(githubUser);
        }, 3000);
      }))
      .catch(error => alert(error.message));

#### Неявный try…catch

Вокруг функции промиса и обработчиков находится **"невидимый try..catch"**

    new Promise((resolve, reject) => {
      throw new Error("Ошибка!");
    }).catch(alert); // Error: Ошибка!

…Работает так же, как и этот:

    new Promise((resolve, reject) => {
      reject(new Error("Ошибка!"));
    }).catch(alert); // Error: Ошибка!

"Невидимый try..catch" вокруг промиса автоматически перехватывает ошибку и превращает её в отклонённый промис.

Это работает не только в функции промиса, но и в обработчиках.

    new Promise((resolve, reject) => {
      resolve("ок");
    }).then((result) => {
      throw new Error("Ошибка!"); // генерируем ошибку
    }).catch(alert); // Error: Ошибка!

Это происходит для всех ошибок, не только для тех, которые вызваны оператором throw. Например, программная ошибка:

    new Promise((resolve, reject) => {
      resolve("ок");
    }).then((result) => {
      blabla(); // нет такой функции
    }).catch(alert); // ReferenceError: blabla is not defined

#### Пробрасывание ошибок

.catch успешно обрабатывает ошибку:

    // the execution: catch -> then
    new Promise((resolve, reject) => {

      throw new Error("Ошибка!");

    }).catch(function(error) {

      alert("Ошибка обработана, продолжить работу");

    }).then(() => alert("Управление перейдёт в следующий then"));

Обработчик (*) перехватывает ошибку и не может обработать её (например, он знает как обработать только URIError), поэтому ошибка пробрасывается далее:

    // the execution: catch -> catch -> then
    new Promise((resolve, reject) => {

      throw new Error("Ошибка!");

    }).catch(function(error) { // (*)

      if (error instanceof URIError) {
        // обрабатываем ошибку
      } else {
        alert("Не могу обработать ошибку");

        throw error; // пробрасывает эту или другую ошибку в следующий catch
      }

    }).then(function() {
      /* не выполнится */
    }).catch(error => { // (**)

      alert(`Неизвестная ошибка: ${error}`);
      // ничего не возвращаем => выполнение продолжается в нормальном режиме

    });

#### Необработанные ошибки

Скрипт умирает с сообщением в консоли

    new Promise(function() {
      noSuchFunction(); // Ошибка (нет такой функции)
    })
      .then(() => {
        // обработчики .then, один или более
      }); // без .catch в самом конце!

JavaScript-движок отслеживает такие ситуации и генерирует в этом случае глобальную ошибку

В браузере мы можем поймать такие ошибки, используя событие unhandledrejection:

    window.addEventListener('unhandledrejection', function(event) {
      // объект события имеет два специальных свойства:
      alert(event.promise); // [object Promise] - промис, который сгенерировал ошибку
      alert(event.reason); // Error: Ошибка! - объект ошибки, которая не была обработана
    });

    new Promise(function() {
      throw new Error("Ошибка!");
    }); // нет обработчика ошибок

### Promise API

#### Promise.all

Метод Promise.all принимает массив промисов (может принимать любой перебираемый объект, но обычно используется массив) и возвращает новый промис.

Promise.all, представленный ниже, выполнится спустя 3 секунды, его результатом будет массив [1, 2, 3]:

    Promise.all([
      new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
      new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
      new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
    ]).then(alert); // когда все промисы выполнятся, результат будет 1,2,3
    // каждый промис даёт элемент массива

ропустить массив данных через map-функцию, которая для каждого элемента создаст задачу-промис, и затем обернуть получившийся массив в Promise.all.

    let urls = [
      'https://api.github.com/users/iliakan',
      'https://api.github.com/users/remy',
      'https://api.github.com/users/jeresig'
    ];

    // Преобразуем каждый URL в промис, возвращённый fetch
    let requests = urls.map(url => fetch(url));

    // Promise.all будет ожидать выполнения всех промисов
    Promise.all(requests)
      .then(responses => responses.forEach(
        response => alert(`${response.url}: ${response.status}`)
      ));

А вот пример побольше, с получением информации о пользователях GitHub по их логинам из массива (мы могли бы получать массив товаров по их идентификаторам, логика та же):

    let names = ['iliakan', 'remy', 'jeresig'];

    let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

    Promise.all(requests)
      .then(responses => {
        // все промисы успешно завершены
        for(let response of responses) {
          alert(`${response.url}: ${response.status}`); // покажет 200 для каждой ссылки
        }

        return responses;
      })
      // преобразовать массив ответов response в response.json(),
      // чтобы прочитать содержимое каждого
      .then(responses => Promise.all(responses.map(r => r.json())))
      // все JSON-ответы обработаны, users - массив с результатами
      .then(users => users.forEach(user => alert(user.name)));

Если любой из промисов завершится с ошибкой, то промис, возвращённый Promise.all, немедленно завершается с этой ошибкой.

    Promise.all([
      new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
      new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ошибка!")), 2000)),
      new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
    ]).catch(alert); // Error: Ошибка!

Promise.all(iterable) разрешает передавать не-промисы в iterable (перебираемом объекте)

    Promise.all([
      new Promise((resolve, reject) => {
        setTimeout(() => resolve(1), 1000)
      }),
      2,
      3
    ]).then(alert); // 1, 2, 3

#### Promise.allSettled

Promise.all завершается с ошибкой, если она возникает в любом из переданных промисов. Это подходит для ситуаций «всё или ничего», когда нам нужны все результаты для продолжения.

Метод Promise.allSettled всегда ждёт завершения всех промисов. В массиве результатов будет

- **{status:"fulfilled", value:результат}** для успешных завершений,
- **{status:"rejected", reason:ошибка}** для ошибок.

Например, мы хотели бы загрузить информацию о множестве пользователей. Даже если в каком-то запросе ошибка, нас всё равно интересуют остальные.

Используем для этого Promise.allSettled:

    let urls = [
      'https://api.github.com/users/iliakan',
      'https://api.github.com/users/remy',
      'https://no-such-url'
    ];

    Promise.allSettled(urls.map(url => fetch(url)))
      .then(results => { // (*)
        results.forEach((result, num) => {
          if (result.status == "fulfilled") {
            alert(`${urls[num]}: ${result.value.status}`);
          }
          if (result.status == "rejected") {
            alert(`${urls[num]}: ${result.reason}`);
          }
        });
      });

Массив results в строке (*) будет таким:

    [
      {status: 'fulfilled', value: ...объект ответа...},
      {status: 'fulfilled', value: ...объект ответа...},
      {status: 'rejected', reason: ...объект ошибки...}
    ]

#### Promise.race

Метод очень похож на Promise.all, но **ждёт только первый выполненный промис**, из которого берёт результат (или ошибку).

    Promise.race([
      new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
      new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ошибка!")), 2000)),
      new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
    ]).then(alert); // 1

#### Promise.any

Метод очень похож на Promise.race, но **ждёт только первый успешно выполненный промис**, из которого берёт результат.

    Promise.any([
      new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ошибка!")), 1000)),
      new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
      new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
    ]).then(alert); // 1

пример, в котором все промисы отклоняются:

    Promise.any([
      new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ошибка!")), 1000)),
      new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ещё одна ошибка!")), 2000))
    ]).catch(error => {
      console.log(error.constructor.name); // AggregateError
      console.log(error.errors[0]); // Error: Ошибка!
      console.log(error.errors[1]); // Error: Ещё одна ошибка!
    });

#### Promise.resolve/reject

**Promise.resolve(value)** создаёт успешно выполненный промис с результатом value.

То же самое, что:

    let promise = new Promise(resolve => resolve(value));

функция loadCached ниже загружает URL и запоминает (кеширует) его содержимое.

    let cache = new Map();

    function loadCached(url) {
      if (cache.has(url)) {
        return Promise.resolve(cache.get(url)); // (*)
      }

      return fetch(url)
        .then(response => response.text())
        .then(text => {
          cache.set(url,text);
          return text;
        });
    }

**Promise.reject(error)** создаёт промис, завершённый с ошибкой error.

То же самое, что:

    let promise = new Promise((resolve, reject) => reject(error));

### Промисификация

Промисификация – это длинное слово для простого преобразования. Мы берём функцию, которая принимает колбэк и меняем её, чтобы она вместо этого возвращала промис.

    function loadScript(src, callback) {
      let script = document.createElement('script');
      script.src = src;

      script.onload = () => callback(null, script);
      script.onerror = () => callback(new Error(`Ошибка загрузки скрипта ${src}`));

      document.head.append(script);
    }

    let loadScriptPromise = function(src) {
      return new Promise((resolve, reject) => {
        loadScript(src, (err, script) => {
          if (err) reject(err)
          else resolve(script);
        });
      })
    }

    // использование:
    // loadScriptPromise('path/script.js').then(...)

### Микрозадачи

Обработчики промисов .then/.catch/.finally всегда асинхронны.

Даже когда промис сразу же выполнен, код в строках ниже .then/.catch/.finally будет запущен до этих обработчиков.

Вот демо:

    let promise = Promise.resolve();

    promise.then(() => alert("промис выполнен"));

    alert("код выполнен"); // этот alert показывается первым

#### Очередь микрозадач

Но что если порядок имеет значение для нас? Как мы можем вывести код выполнен после промис выполнен?

    Promise.resolve()
      .then(() => alert("промис выполнен!"))
      .then(() => alert("код выполнен"));

#### Необработанные ошибки

"Необработанная ошибка" возникает в случае, если ошибка промиса не обрабатывается в конце очереди микрозадач.

    let promise = Promise.reject(new Error("Ошибка в промисе!"));
    promise.catch(err => alert('поймана!'));

    // не запустится, ошибка обработана
    window.addEventListener('unhandledrejection', event => {
      alert(event.reason);
    });

…Но если мы забудем добавить .catch, то, когда очередь микрозадач опустеет, движок сгенерирует событие:

    let promise = Promise.reject(new Error("Ошибка в промисе!"));

    // Ошибка в промисе!
    window.addEventListener('unhandledrejection', event => alert(event.reason));

А что, если мы поймаем ошибку, но позже? Вот так:

    let promise = Promise.reject(new Error("Ошибка в промисе!"));

    setTimeout(() => promise.catch(err => alert('поймана')), 1000);

    // Ошибка в промисе!
    window.addEventListener('unhandledrejection', event => alert(event.reason));

Теперь, при запуске, мы сначала увидим «Ошибка в промисе!», а затем «поймана».

Если бы мы не знали про очередь микрозадач, то могли бы удивиться: «Почему сработал обработчик unhandledrejection? Мы же поймали ошибку!».

Но теперь мы понимаем, что событие unhandledrejection возникает, когда очередь микрозадач завершена: движок проверяет все промисы и, если какой-либо из них в состоянии «rejected», то генерируется это событие.

В примере выше .catch, добавленный в setTimeout, также срабатывает, но позже, уже после возникновения unhandledrejection, так что это ни на что не влияет.

### Async/await

#### async

У слова async один простой смысл: эта функция всегда возвращает промис. Значения других типов оборачиваются в завершившийся успешно промис автоматически.

Например, эта функция возвратит выполненный промис с результатом 1:

    async function f() {
      return 1;
    }

    f().then(alert); // 1

Можно и явно вернуть промис, результат будет одинаковым:

    async function f() {
      return Promise.resolve(1);
    }

    f().then(alert); // 1

#### Await

    Ключевое слово await заставит интерпретатор JavaScript ждать до тех пор, пока промис справа от await не выполнится. После чего оно вернёт его результат, и выполнение кода продолжится.

    В этом примере промис успешно выполнится через 1 секунду:

    async function f() {

      let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("готово!"), 1000)
      });

      let result = await promise; // будет ждать, пока промис не выполнится (*)

      alert(result); // "готово!"
    }

    f();

Давайте перепишем пример showAvatar() из раздела Цепочка промисов с помощью async/await:

    Нам нужно заменить вызовы .then на await.
    И добавить ключевое слово async перед объявлением функции.

    async function showAvatar() {

      // запрашиваем JSON с данными пользователя
      let response = await fetch('/article/promise-chaining/user.json');
      let user = await response.json();

      // запрашиваем информацию об этом пользователе из github
      let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
      let githubUser = await githubResponse.json();

      // отображаем аватар пользователя
      let img = document.createElement('img');
      img.src = githubUser.avatar_url;
      img.className = "promise-avatar-example";
      document.body.append(img);

      // ждём 3 секунды и затем скрываем аватар
      await new Promise((resolve, reject) => setTimeout(resolve, 3000));

      img.remove();

      return githubUser;
    }

    showAvatar();

await нельзя использовать на верхнем уровне вложенности

await работает с «thenable»–объектами

Асинхронные методы классов

    class Waiter {
      async wait() {
        return await Promise.resolve(1);
      }
    }

    new Waiter()
      .wait()
      .then(alert); // 1


#### Обработка ошибок

Когда промис завершается успешно, await promise возвращает результат. Когда завершается с ошибкой – будет выброшено исключение. Как если бы на этом месте находилось выражение throw.

Такой код:

    async function f() {
      await Promise.reject(new Error("Упс!"));
    }

Делает то же самое, что и такой:

    async function f() {
      throw new Error("Упс!");
    }

Но есть отличие: на практике промис может завершиться с ошибкой не сразу, а через некоторое время. В этом случае будет задержка, а затем await выбросит исключение.

Такие ошибки можно ловить, используя try..catch, как с обычным throw:

    async function f() {

      try {
        let response = await fetch('/no-user-here');
        let user = await response.json();
      } catch(err) {
        // перехватит любую ошибку в блоке try: и в fetch, и в response.json
        alert(err);
      }
    }

    f();

Если у нас нет try..catch, асинхронная функция будет возвращать завершившийся с ошибкой промис (в состоянии rejected). В этом случае мы можем использовать метод .catch промиса, чтобы обработать ошибку:

    async function f() {
      let response = await fetch('http://no-such-url');
    }

    // f() вернёт промис в состоянии rejected
    f().catch(alert); // TypeError: failed to fetch // (*)

Если забыть добавить .catch, то будет сгенерирована ошибка «Uncaught promise error» и информация об этом будет выведена в консоль. Такие ошибки можно поймать глобальным обработчиком, о чём подробно написано в разделе Промисы: обработка ошибок.

async/await отлично работает с Promise.all

Когда необходимо подождать несколько промисов одновременно, можно обернуть их в Promise.all, и затем await:

    // await будет ждать массив с результатами выполнения всех промисов
    let results = await Promise.all([
      fetch(url1),
      fetch(url2),
      ...
    ]);

## Генераторы, продвинутая итерация

<https://learn.javascript.ru/generators-iterators>

### Генераторы

#### Функция-генератор

    function* generateSequence() {
      yield 1;
      yield 2;
      return 3;
    }

Например, здесь мы создаём генератор и получаем первое из возвращаемых им значений:

    function* generateSequence() {
      yield 1;
      yield 2;
      return 3;
    }

    let generator = generateSequence();

    let one = generator.next();

    alert(JSON.stringify(one)); // {value: 1, done: false}

Результатом метода next() всегда является объект с двумя свойствами:

- value: значение из yield.
- done: true, если выполнение функции завершено, иначе false.

`function* f(…)` или `function *f(…)`? - Нет разницы, оба синтаксиса корректны.

#### Перебор генераторов

Возвращаемые ими значения можно перебирать через for..of:

    function* generateSequence() {
      yield 1;
      yield 2;
      return 3;
    }

    let generator = generateSequence();

    for(let value of generator) {
      alert(value); // 1, затем 2
    }

Но обратите внимание: пример выше выводит значение 1, затем 2. Значение 3 выведено не будет!

Это из-за того, что перебор через for..of игнорирует последнее значение, при котором done: true. Поэтому, если мы хотим, чтобы были все значения при переборе через for..of, то надо возвращать их через yield:

    function* generateSequence() {
      yield 1;
      yield 2;
      yield 3;
    }

    let generator = generateSequence();

    for(let value of generator) {
      alert(value); // 1, затем 2, затем 3
    }

Так как генераторы являются перебираемыми объектами, мы можем использовать всю связанную с ними функциональность, например оператор расширения ...:

    function* generateSequence() {
      yield 1;
      yield 2;
      yield 3;
    }

    let sequence = [0, ...generateSequence()];

    alert(sequence); // 0, 1, 2, 3

#### Использование генераторов для перебираемых объектов

    let range = {
      from: 1,
      to: 5,

      *[Symbol.iterator]() { // краткая запись для [Symbol.iterator]: function*()
        for(let value = this.from; value <= this.to; value++) {
          yield value;
        }
      }
    };

    alert( [...range] ); // 1,2,3,4,5

#### Композиция генераторов

    function* generateSequence(start, end) {
      for (let i = start; i <= end; i++) yield i;
    }

    function* generatePasswordCodes() {

      // 0..9
      yield* generateSequence(48, 57);

      // A..Z
      yield* generateSequence(65, 90);

      // a..z
      yield* generateSequence(97, 122);

    }

    let str = '';

    for(let code of generatePasswordCodes()) {
      str += String.fromCharCode(code);
    }

    alert(str); // 0..9A..Za..z

#### yield – дорога в обе стороны

    function* gen() {
      let ask1 = yield "2 + 2 = ?";

      alert(ask1); // 4

      let ask2 = yield "3 * 3 = ?"

      alert(ask2); // 9
    }

    let generator = gen();

    alert( generator.next().value ); // "2 + 2 = ?"

    alert( generator.next(4).value ); // "3 * 3 = ?"

    alert( generator.next(9).done ); // true

#### generator.throw

    function* gen() {
      try {
        let result = yield "2 + 2 = ?"; // (1)

        alert("Выполнение программы не дойдёт до этой строки, потому что выше возникнет исключение");
      } catch(e) {
        alert(e); // покажет ошибку
      }
    }

    let generator = gen();

    let question = generator.next().value;

    generator.throw(new Error("Ответ не найден в моей базе данных")); // (2)

Текущая строка вызывающего кода – это строка с generator.throw, отмечена (2). Таким образом, мы можем отловить её во внешнем коде, как здесь:

    function* generate() {
      let result = yield "2 + 2 = ?"; // Ошибка в этой строке
    }

    let generator = generate();

    let question = generator.next().value;

    try {
      generator.throw(new Error("Ответ не найден в моей базе данных"));
    } catch(e) {
      alert(e); // покажет ошибку
    }

### Асинхронные итераторы и генераторы

    let range = {
      from: 1,
      to: 5,

      // for await..of вызывает этот метод один раз в самом начале
      [Symbol.asyncIterator]() { // (1)
        // ...возвращает объект-итератор:
        // далее for await..of работает только с этим объектом,
        // запрашивая у него следующие значения вызовом next()
        return {
          current: this.from,
          last: this.to,

          // next() вызывается на каждой итерации цикла for await..of
          async next() { // (2)
            // должен возвращать значение как объект {done:.., value :...}
            // (автоматически оборачивается в промис с помощью async)

            // можно использовать await внутри для асинхронности:
            await new Promise(resolve => setTimeout(resolve, 1000)); // (3)

            if (this.current <= this.last) {
              return { done: false, value: this.current++ };
            } else {
              return { done: true };
            }
          }
        };
      }
    };

    (async () => {

      for await (let value of range) { // (4)
        alert(value); // 1,2,3,4,5
      }

    })()


Вот небольшая шпаргалка:

наименование | Итераторы | Асинхронные итераторы
:---:|:---:|:---:
Метод для создания итерируемого объекта	Symbol. |iterator |	Symbol.asyncIterator
next() возвращает |	любое значение|	промис
для цикла используйте |	for..of	| for await..of

Оператор расширения ... не работает асинхронно
Функции, которые требуют обычных синхронных итераторов, не работают с асинхронными.

Например, оператор расширения (три точки ...) не будет работать:

    alert( [...range] ); // Ошибка, нет Symbol.iterator
Это естественно, так как он ожидает Symbol.iterator, как и for..of без await. Ему не подходит Symbol.asyncIterator.

### Асинхронные генераторы

    async function* generateSequence(start, end) {

      for (let i = start; i <= end; i++) {

        // ура, можно использовать await!
        await new Promise(resolve => setTimeout(resolve, 1000));

        yield i;
      }

    }

    (async () => {

      let generator = generateSequence(1, 5);
      for await (let value of generator) {
        alert(value); // 1, потом 2, потом 3, потом 4, потом 5
      }

    })();

Из обычного генератора мы можем получить значения при помощи result = generator.next(). Для асинхронного нужно добавить await, вот так:

    result = await generator.next(); // result = {value: ..., done: true/false}

### Асинхронно перебираемые объекты

Если хотим добавить асинхронные действия в генератор, нужно заменить Symbol.iterator на асинхронный Symbol.asyncIterator:

    let range = {
      from: 1,
      to: 5,

      async *[Symbol.asyncIterator]() { // то же, что и [Symbol.asyncIterator]: async function*()
        for(let value = this.from; value <= this.to; value++) {

          // пауза между значениями, ожидание
          await new Promise(resolve => setTimeout(resolve, 1000));

          yield value;
        }
      }
    };

    (async () => {

      for await (let value of range) {
        alert(value); // 1, потом 2, потом 3, потом 4, потом 5
      }

    })();

### Пример из реальной практики

Есть много онлайн-сервисов, которые предоставляют данные постранично. Например, когда нам нужен список пользователей, запрос возвращает предопределённое количество (например, 100) пользователей – «одну страницу», и URL следующей страницы.

Этот подход очень распространён, и речь не только о пользователях, а о чём угодно. Например, GitHub позволяет получать коммиты таким образом, с разбивкой по страницам:

Нужно сделать запрос на URL в виде `https://api.github.com/repos/<repo>/commits`.
В ответ придёт JSON с 30 коммитами, а также со ссылкой на следующую страницу в заголовке Link.
Затем можно использовать эту ссылку для следующего запроса, чтобы получить дополнительную порцию коммитов, и так далее.
Но нам бы, конечно же, хотелось вместо этого сложного взаимодействия иметь просто объект с коммитами, которые можно перебирать, вот так:

  let repo = 'javascript-tutorial/en.javascript.info'; // репозиторий на GitHub, откуда брать коммиты

  for await (let commit of fetchCommits(repo)) {
    // обработка коммитов
  }

Мы бы хотели сделать функцию fetchCommits(repo), которая будет получать коммиты, делая запросы всякий раз, когда это необходимо. И пусть она сама разбирается со всем, что касается нумерации страниц, для нас это будет просто for await..of.

С асинхронными генераторами это довольно легко реализовать:

    async function* fetchCommits(repo) {
      let url = `https://api.github.com/repos/${repo}/commits`;

      while (url) {
        const response = await fetch(url, { // (1)
          headers: {'User-Agent': 'Our script'}, // GitHub требует заголовок user-agent
        });

        const body = await response.json(); // (2) ответ в формате JSON (массив коммитов)

        // (3) Ссылка на следующую страницу находится в заголовках, извлекаем её
        let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
        nextPage = nextPage && nextPage[1];

        url = nextPage;

        for(let commit of body) { // (4) вернуть коммиты один за другим, до окончания страницы
          yield commit;
        }
      }
    }

Пример использования (показывает авторов коммитов в консоли):

    (async () => {

      let count = 0;

      for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {

        console.log(commit.author.login);

        if (++count == 100) { // остановимся на 100 коммитах
          break;
        }
      }

    })();

## Модули

<https://learn.javascript.ru/modules>

### Что такое модуль?

Модуль – это просто файл. Один скрипт – это один модуль.

Модули могут загружать друг друга и использовать директивы `export` и `import`, чтобы обмениваться функциональностью, вызывать функции одного модуля из другого:

- `export` отмечает переменные и функции, которые должны быть доступны вне текущего модуля.
- `import` позволяет импортировать функциональность из других модулей.

```javascript
// 📁 sayHi.js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
```
…Тогда другой файл может импортировать её и использовать:

```javascript
// 📁 main.js
import {sayHi} from './sayHi.js';

alert(sayHi); // function...
sayHi('John'); // Hello, John!
```

```htm
<!doctype html>
<script type="module">
  import {sayHi} from './say.js';

  document.body.innerHTML = sayHi('John');
</script>
```

```javascript
// say.js
export function sayHi(user) {
  return `Hello, ${user}!`;
}
```

### Основные возможности модулей

**Всегда «use strict»** В модулях всегда используется режим use strict. Например, присваивание к необъявленной переменной вызовет ошибку

**Своя область видимости переменных**. Каждый модуль имеет свою собственную область видимости. Другими словами, переменные и функции, объявленные в модуле, не видны в других скриптах.

**Код в модуле выполняется только один раз при импорте**. Если один и тот же модуль используется в нескольких местах, то его код выполнится только один раз, после чего экспортируемая функциональность передаётся всем импортёрам.

**import.meta**

```htm
<script type="module">
  alert(import.meta.url); // ссылка на html страницу для встроенного скрипта
</script>
```

**В модуле «this» не определён**

```htm
<script>
  alert(this); // window
</script>

<script type="module">
  alert(this); // undefined
</script>
```

### Особенности в браузерах

#### Модули являются отложенными (deferred)

- загрузка внешних модулей, таких как `<script type="module" src="...">`, не блокирует обработку HTML.
- модули, даже если загрузились быстро, ожидают полной загрузки HTML документа, и только затем выполняются.
- сохраняется относительный порядок скриптов: скрипты, которые идут раньше в документе, выполняются раньше.
- как побочный эффект, модули всегда видят полностью загруженную HTML-страницу, включая элементы под ними.

```htm
<script type="module">
  alert(typeof button); // object: скрипт может 'видеть' кнопку под ним
  // так как модули являются отложенными, то скрипт начнёт выполнятся только после полной загрузки страницы
</script>
```

Сравните с обычным скриптом ниже:

```htm
<script>
  alert(typeof button); // Ошибка: кнопка не определена, скрипт не видит элементы под ним
  // обычные скрипты запускаются сразу, не дожидаясь полной загрузки страницы
</script>

<button id="button">Кнопка</button>
```

#### Атрибут async работает во встроенных скриптах

Для не-модульных скриптов атрибут async работает только на внешних скриптах. Скрипты с ним запускаются сразу по готовности, они не ждут другие скрипты или HTML-документ.

Для модулей атрибут async работает на любых скриптах.

```htm
<!-- загружаются зависимости (analytics.js) и скрипт запускается -->
<!-- модуль не ожидает загрузки документа или других тэгов <script> -->
<script async type="module">
  import {counter} from './analytics.js';

  counter.count();
</script>
```

#### Внешние скрипты

- Внешние скрипты с атрибутом type="module" имеют два отличия:

- Внешние скрипты с одинаковым атрибутом src запускаются только один раз:

```htm
<!-- скрипт my.js загрузится и будет выполнен только один раз -->
<script type="module" src="my.js"></script>
<script type="module" src="my.js"></script>
```

Внешний скрипт, который загружается с другого домена, требует указания заголовков CORS. Другими словами, если модульный скрипт загружается с другого домена, то удалённый сервер должен установить заголовок Access-Control-Allow-Origin означающий, что загрузка скрипта разрешена.

```htm
<!-- another-site.com должен указать заголовок Access-Control-Allow-Origin -->
<!-- иначе, скрипт не выполнится -->
<script type="module" src="http://another-site.com/their.js"></script>
```

#### Не допускаются «голые» модули

```javascript
import {sayHi} from 'sayHi'; // Ошибка, "голый" модуль
// путь должен быть, например './sayHi.js' или абсолютный
```

#### Совместимость, «nomodule»

```htm
<script type="module">
  alert("Работает в современных браузерах");
</script>

<script nomodule>
  alert("Современные браузеры понимают оба атрибута - и type=module, и nomodule, поэтому пропускают этот тег script")
  alert("Старые браузеры игнорируют скрипты с неизвестным атрибутом type=module, но выполняют этот.");
</script>
```

### Инструменты сборки

В реальной жизни модули в браузерах редко используются в «сыром» виде. Обычно, мы объединяем модули вместе, используя специальный инструмент, например Webpack и после выкладываем код на рабочий сервер.

Одно из преимуществ использования сборщика – он предоставляет больший контроль над тем, как модули ищутся, позволяет использовать «голые» модули и многое другое «своё», например CSS/HTML-модули.

Сборщик делает следующее:

- Берёт «основной» модуль, который мы собираемся поместить в `<script type="module">` в HTML.
- Анализирует зависимости (импорты, импорты импортов и так далее)
- Собирает один файл со всеми модулями (или несколько файлов, это можно настроить), перезаписывает встроенный import функцией импорта от сборщика, чтобы всё работало. «Специальные» типы модулей, такие как HTML/CSS тоже поддерживаются.
- В процессе могут происходить и другие трансформации и оптимизации кода:
  - Недостижимый код удаляется.
  - Неиспользуемые экспорты удаляются («tree-shaking»).
  - Специфические операторы для разработки, такие как console и debugger, удаляются.
  - Современный синтаксис JavaScript также может быть трансформирован в предыдущий стандарт, с похожей функциональностью, например, с помощью Babel.
  - Полученный файл можно минимизировать (удалить пробелы, заменить названия переменных на более короткие и т.д.).
  - Если мы используем инструменты сборки, то они объединяют модули вместе в один или несколько файлов, и заменяют import/export на свои вызовы. Поэтому итоговую сборку можно подключать и без атрибута type="module", как обычный скрипт:

```htm
<!-- Предположим, что мы собрали bundle.js, используя например утилиту Webpack -->
<script src="bundle.js"></script>
```

Хотя и «как есть» модули тоже можно использовать, а сборщик настроить позже при необходимости.

## Экспорт и импорт

### Экспорт до объявления

```javascript
// экспорт массива
export let months = ['Jan', 'Feb', 'Mar', 'Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// экспорт константы
export const MODULES_BECAME_STANDARD_YEAR = 2015;

// экспорт класса
export class User {
  constructor(name) {
    this.name = name;
  }
}
```

Не ставится точка с запятой после экспорта класса/функции

### Экспорт отдельно от объявления

```javascript
// 📁 say.js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

function sayBye(user) {
  alert(`Bye, ${user}!`);
}

export {sayHi, sayBye}; // список экспортируемых переменных
```

### Импорт

```javascript
// 📁 main.js
import {sayHi, sayBye} from './say.js';

sayHi('John'); // Hello, John!
sayBye('John'); // Bye, John!
```

Но если импортировать нужно много чего, мы можем импортировать всё сразу в виде объекта, используя `import * as <obj>`. Например:

```javascript
// 📁 main.js
import * as say from './say.js';

say.sayHi('John');
say.sayBye('John');
```

### Импорт «как»

```javascript
// 📁 main.js
import {sayHi as hi, sayBye as bye} from './say.js';

hi('John'); // Hello, John!
bye('John'); // Bye, John!
```

### Экспортировать «как»

```javascript
// 📁 say.js
...
export {sayHi as hi, sayBye as bye};
```

Теперь hi и bye – официальные имена для внешнего кода, их нужно использовать при импорте:

```javascript
// 📁 main.js
import * as say from './say.js';

say.hi('John'); // Hello, John!
say.bye('John'); // Bye, John!
```







## Разное

<https://learn.javascript.ru/js-misc>

## Delay, Sleep, Pause & Wait in JavaScript

1. Plain setTimeout

```javascript
console.log('Hello');
setTimeout(() => { console.log('World!'); }, 2000);
```

2. Incremental setTimeout

```javascript
setTimeout(() => { console.log('Hello'); }, 1000);
setTimeout(() => { console.log('World!'); }, 2000);
```

3. Blocking the Event Loop with a Loop

```javascript
console.log('Hello');
const date = Date.now();
let currentDate = null;
do {
  currentDate = Date.now();
} while (currentDate - date < 2000);
console.log('World!');
```

4. Using Promises with setTimeout

```javascript
const sleep = function(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
console.log('Hello');
sleep(2000).then(() => { console.log('World!'); });
```

5. Using async/await with Promises

```javascript
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function delayedGreeting() {
  console.log('Hello');
  await sleep(2000);
  console.log('World!');
  await sleep(2000);
  console.log('Goodbye!');
}

delayedGreeting();
```

## Сетевые запросы

- [Fetch](https://learn.javascript.ru/fetch)
- [FormData](https://learn.javascript.ru/formdata)
- [Fetch: ход загрузки](https://learn.javascript.ru/fetch-progress)
- [Fetch: прерывание запроса](https://learn.javascript.ru/fetch-abort)
- [Fetch: запросы на другие сайты](https://learn.javascript.ru/fetch-crossorigin)
- [Fetch API](https://learn.javascript.ru/fetch-api)
- [Объекты URL](https://learn.javascript.ru/url)
- [XMLHttpRequest](https://learn.javascript.ru/xmlhttprequest)
- [Возобновляемая загрузка файлов](https://learn.javascript.ru/resume-upload)
- [Длинные опросы](https://learn.javascript.ru/long-polling)
- [WebSocket](https://learn.javascript.ru/websocket)
- [Server Sent Events](https://learn.javascript.ru/server-sent-events)

### WebSocket

#### Простой пример

```js
let socket = new WebSocket("ws://javascript.info");
```

Также существует протокол `wss://`, использующий шифрование. Это как HTTPS для веб-сокетов.

>Всегда предпочитайте wss://
>
>Протокол wss:// не только использует шифрование, но и обладает повышенной надёжностью.
>
>Это потому, что данные ws:// не зашифрованы, видны для любого посредника. Старые прокси-серверы не знают о WebSocket, они могут увидеть «странные» заголовки и закрыть соединение.
>
>С другой стороны, wss:// – это WebSocket поверх TLS (так же, как HTTPS – это HTTP поверх TLS), безопасный транспортный уровень шифрует данные от отправителя и расшифровывает на стороне получателя. Пакеты данных передаются в зашифрованном виде через прокси, которые не могут видеть, что внутри, и всегда пропускают их.

Как только объект WebSocket создан, мы должны слушать его события. Их всего 4:

- `open` – соединение установлено,
- `message` – получены данные,
- `error` – ошибка,
- `close` – соединение закрыто.

…А если мы хотим отправить что-нибудь, то вызов socket.send(data) сделает это.

```js
let socket = new WebSocket("wss://javascript.info/article/websocket/demo/hello");

socket.onopen = function(e) {
  alert("[open] Соединение установлено");
  alert("Отправляем данные на сервер");
  socket.send("Меня зовут Джон");
};

socket.onmessage = function(event) {
  alert(`[message] Данные получены с сервера: ${event.data}`);
};

socket.onclose = function(event) {
  if (event.wasClean) {
    alert(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
  } else {
    // например, сервер убил процесс или сеть недоступна
    // обычно в этом случае event.code 1006
    alert('[close] Соединение прервано');
  }
};

socket.onerror = function(error) {
  alert(`[error]`);
};
```

#### Открытие веб-сокета

Когда `new WebSocket(url)` создан, он тут же сам начинает устанавливать соединение.

Браузер, при помощи специальных заголовков, спрашивает сервер: «Ты поддерживаешь Websocket?» и если сервер отвечает «да», они начинают работать по протоколу WebSocket, который уже не является HTTP.

Вот пример заголовков для запроса, который делает new WebSocket("wss://javascript.info/chat").

```http
GET /chat
Host: javascript.info
Origin: https://javascript.info
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
Sec-WebSocket-Version: 13
```

- `Origin` – источник текущей страницы (например https://javascript.info). Объект WebSocket по своей природе не завязан на текущий источник. Нет никаких специальных заголовков или других ограничений. Старые сервера всё равно не могут работать с WebSocket, поэтому проблем с совместимостью нет. Но заголовок Origin важен, так как он позволяет серверу решать, использовать ли WebSocket с этим сайтом.
- `Connection: Upgrade` – сигнализирует, что клиент хотел бы изменить протокол.
- `Upgrade: websocket` – запрошен протокол «websocket».
- `Sec-WebSocket-Key` – случайный ключ, созданный браузером для обеспечения безопасности.
- `Sec-WebSocket-Version` – версия протокола WebSocket, текущая версия 13.

Если сервер согласен переключиться на WebSocket, то он должен отправить в ответ код 101:

```http
101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: hsBlbuDTkk24srzEOTBUlZAlC2g=
```

Здесь `Sec-WebSocket-Accept` – это `Sec-WebSocket-Key`, перекодированный с помощью специального алгоритма. Браузер использует его, чтобы убедиться, что ответ соответствует запросу.

После этого данные передаются по протоколу WebSocket, и вскоре мы увидим его структуру («фреймы»). И это вовсе не HTTP.

#### Расширения и подпротоколы

Могут быть дополнительные заголовки `Sec-WebSocket-Extensions` и `Sec-WebSocket-Protocol`, описывающие расширения и подпротоколы.

Например:

- Sec-WebSocket-Extensions: deflate-frame означает, что браузер поддерживает сжатие данных. Расширение – это что-то, связанное с передачей данных, расширяющее сам протокол WebSocket. Заголовок Sec-WebSocket-Extensions отправляется браузером автоматически со списком всевозможных расширений, которые он поддерживает.
- Sec-WebSocket-Protocol: soap, wamp означает, что мы будем передавать не только произвольные данные, но и данные в протоколах SOAP или WAMP (The WebSocket Application Messaging Protocol" – «протокол обмена сообщениями WebSocket приложений»). То есть этот заголовок описывает не передачу, а формат данных, который мы собираемся использовать. Официальные подпротоколы WebSocket регистрируются в каталоге IANA.

Этот необязательный заголовок ставим мы сами, передавая массив подпротоколов вторым параметром new WebSocket, вот так:

```js
let socket = new WebSocket("wss://javascript.info/chat", ["soap", "wamp"]);
```

Сервер должен ответить перечнем протоколов и расширений, которые он может использовать.

Например, запрос:

```http
GET /chat
Host: javascript.info
Upgrade: websocket
Connection: Upgrade
Origin: https://javascript.info
Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
Sec-WebSocket-Version: 13
Sec-WebSocket-Extensions: deflate-frame
Sec-WebSocket-Protocol: soap, wamp
```

Ответ:

```http
101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: hsBlbuDTkk24srzEOTBUlZAlC2g=
Sec-WebSocket-Extensions: deflate-frame
Sec-WebSocket-Protocol: soap
```

Здесь сервер отвечает, что поддерживает расширение – deflate-frame и может использовать только протокол SOAP из всего списка запрошенных подпротоколов.

#### Передача данных

Поток данных в WebSocket состоит из «фреймов», фрагментов данных, которые могут быть отправлены любой стороной, и которые могут быть следующих видов:

- «текстовые фреймы» – содержат текстовые данные, которые стороны отправляют друг другу.
- «бинарные фреймы» – содержат бинарные данные, которые стороны отправляют друг другу.
- «пинг-понг фреймы» используется для проверки соединения; отправляется с сервера, браузер реагирует на них автоматически.
- также есть «фрейм закрытия соединения» и некоторые другие служебные фреймы.

В браузере мы напрямую работаем только с текстовыми и бинарными фреймами.

Метод `WebSocket .send()` может отправлять и текстовые, и бинарные данные.

Вызов `socket.send(body)` принимает body в виде строки или любом бинарном формате включая `Blob`, `ArrayBuffer` и другие. Дополнительных настроек не требуется, просто отправляем в любом формате.

При получении данных, текст всегда поступает в виде строки. А для бинарных данных мы можем выбрать один из двух форматов: `Blob` или `ArrayBuffer`.

Это задаётся свойством `socket.binaryType`, по умолчанию оно равно "blob", так что бинарные данные поступают в виде Blob-объектов.

`Blob` – это высокоуровневый бинарный объект, он напрямую интегрируется с `<a>`, `<img>` и другими тегами, так что это вполне удобное значение по умолчанию. Но для обработки данных, если требуется доступ к отдельным байтам, мы можем изменить его на "arraybuffer":

```js
socket.binaryType = "arraybuffer";
socket.onmessage = (event) => {
  // event.data является строкой (если текст) или arraybuffer (если двоичные данные)
};
```

#### Ограничение скорости

Представим, что наше приложение генерирует много данных для отправки. Но у пользователя медленное соединение, возможно, он в интернете с мобильного телефона и не из города.

Мы можем вызывать `socket.send(data)` снова и снова. Но данные будут буферизованы (сохранены) в памяти и отправлены лишь с той скоростью, которую позволяет сеть.

Свойство `socket.bufferedAmount` хранит количество байт буферизованных данных на текущий момент, ожидающих отправки по сети.

Мы можем изучить его, чтобы увидеть, действительно ли сокет доступен для передачи.

```js
// каждые 100мс проверить сокет и отправить больше данных,
// только если все текущие отосланы
setInterval(() => {
  if (socket.bufferedAmount == 0) {
    socket.send(moreData());
  }
}, 100);
```

#### Закрытие подключения

Обычно, когда сторона хочет закрыть соединение (браузер и сервер имеют равные права), они отправляют «фрейм закрытия соединения» с кодом закрытия и указывают причину в виде текста.

Метод для этого:

```js
socket.close([code], [reason]);
```

- `code` – специальный WebSocket-код закрытия (не обязателен).
- `reason` – строка с описанием причины закрытия (не обязательна).

Затем противоположная сторона в обработчике события close получит и код code и причину reason, например:

```js
// закрывающая сторона:
socket.close(1000, "работа закончена");

// другая сторона:
socket.onclose = event => {
  // event.code === 1000
  // event.reason === "работа закончена"
  // event.wasClean === true (закрыто чисто)
};
```

`code` – это не любое число, а специальный код закрытия WebSocket.

Наиболее распространённые значения:

- `1000` – по умолчанию, нормальное закрытие,
- `1006` – невозможно установить такой код вручную, указывает, что соединение было потеряно (нет фрейма закрытия).

Есть и другие коды:

- `1001` – сторона отключилась, например сервер выключен или пользователь покинул страницу,
- `1009` – сообщение слишком большое для обработки,
- `1011` – непредвиденная ошибка на сервере,
- `…и` так далее.

Полный список находится в [RFC6455, §7.4.1.](https://datatracker.ietf.org/doc/html/rfc6455#section-7.4.1)

Коды WebSocket чем-то похожи на коды HTTP, но они разные. В частности, любые коды меньше 1000 зарезервированы. Если мы попытаемся установить такой код, то получим ошибку.

```js
// в случае, если соединение сброшено
socket.onclose = event => {
  // event.code === 1006
  // event.reason === ""
  // event.wasClean === false (нет закрывающего кадра)
};
```

#### Состояние соединения

Чтобы получить состояние соединения, существует дополнительное свойство socket.readyState со значениями:

- `0 – «CONNECTING»`: соединение ещё не установлено,
- `1 – «OPEN»`: обмен данными,
- `2 – «CLOSING»`: соединение закрывается,
- `3 – «CLOSED»`: соединение закрыто.

#### Пример чата

Давайте рассмотрим пример чата с использованием WebSocket API и модуля WebSocket сервера Node.js <https://github.com/websockets/ws>. Основное внимание мы, конечно, уделим клиентской части, но и серверная весьма проста.

HTML: нам нужна форма `<form>` для отправки данных и `<div>` для отображения сообщений:

```html
<!-- форма сообщений -->
<form name="publish">
  <input type="text" name="message">
  <input type="submit" value="Отправить">
</form>

<!-- div с сообщениями -->
<div id="messages"></div>
```

От JavaScript мы хотим 3 вещи:

- Открыть соединение.
- При отправке формы пользователем – вызвать `socket.send(message)` для сообщения.
- При получении входящего сообщения – добавить его в `div#messages`.

Вот код:

```js
let socket = new WebSocket("wss://javascript.info/article/websocket/chat/ws");

// отправка сообщения из формы
document.forms.publish.onsubmit = function() {
  let outgoingMessage = this.message.value;

  socket.send(outgoingMessage);
  return false;
};

// получение сообщения - отобразить данные в div#messages
socket.onmessage = function(event) {
  let message = event.data;

  let messageElem = document.createElement('div');
  messageElem.textContent = message;
  document.getElementById('messages').prepend(messageElem);
}
```

Серверный алгоритм действий будет таким:

- Создать `clients = new Set()` – набор сокетов.
- Для каждого принятого веб-сокета – добавить его в набор `clients.add(socket)` и поставить ему обработчик события message для приёма сообщений.
- Когда сообщение получено: перебрать клиентов `clients` и отправить его всем.
- Когда подключение закрыто: `clients.delete(socket)`.

```js
const ws = new require('ws');
const wss = new ws.Server({noServer: true});

const clients = new Set();

http.createServer((req, res) => {
  // в реальном проекте здесь может также быть код для обработки отличных от websoсket-запросов
  // здесь мы работаем с каждым запросом как с веб-сокетом
  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
});

function onSocketConnect(ws) {
  clients.add(ws);

  ws.on('message', function(message) {
    message = message.slice(0, 50); // максимальный размер сообщения 50

    for(let client of clients) {
      client.send(message);
    }
  });

  ws.on('close', function() {
    clients.delete(ws);
  });
}
```

Вы также можете скачать его (верхняя правая кнопка в ифрейме) и запустить локально. Только не забудьте установить Node.js и выполнить команду npm install ws до запуска.

