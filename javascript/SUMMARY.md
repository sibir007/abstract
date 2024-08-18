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

https://learn.javascript.ru/task/calculator-constructor### Клонирование и объединение, Object.assign