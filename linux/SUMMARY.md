# Linux

## Операторы объединения команд в Linux & | ; && ! || &&-|| \ ()

### Оператор амперсанда (&)

& — команда выполняется в фоновом режиме. Нужно ввести команду с пробелом и ‘&‘. Можно выполнить более одной команды в фоновом режиме за один раз.

`ping c5 disweb.ru &`

Запуск двух команд в фоновом режиме одновременно:

`sudo apt update & sudo apt upgrade &`

### Оператор точка с запятой (;)

Оператор точка с запятой позволяет запускать несколько команд за один раз, и выполнение команды происходит последовательно.

`sudo apt update ; sudo apt upgrade ; mkdir test`

### Оператор AND (&&)

Оператор AND (&&) будет выполнять вторую команду только в том случае, если при выполнении первой команды SUCCEEDS, т.е. состояние выхода первой команды равно «0» — программа выполнена успешно. Эта команда очень полезна при проверке состояния выполнения последней команды.

Например, я хочу посетить сайт sedicomm.com с помощью команды links в терминале, но перед этим мне нужно проверить, является ли хост доступным или нет.

`ping -c3 www.sedicomm.com && links www.sedicomm.com`

### Оператор OR (||)

Оператор OR (||) очень похож на оператор «else» в программировании. Вышеуказанный оператор позволяет вам выполнять вторую команду только в случае сбоя при выполнении первой команды, то есть состояние выхода первой команды равно «1» — программа выполнена НЕ успешно».

Например, я хочу выполнить «apt-get update» из учетной записи без полномочий root, и если первая команда не будет выполнена, тогда будет выполнена вторая команда «links www.sedicomm.com».

`sudo apt update || links sedicomm.com`

Что, если первая команда выполнена успешно, со статусом выхода «0«? Очевидно! Вторая команда не будет выполнена.

`mkdir test || links sedicomm.com`

### Оператор NOT (!)

Оператор NOT (!) очень похож на оператор «кроме«. Эта команда выполнит все, кроме предоставленного условия. Чтобы понять как это работает, создайте каталог «sedicomm» в вашем домашнем каталоге и перейдите к нему с помощью команды «cd«.

`mkdir sedicomm`
`cd sedicomm`

Затем создайте несколько типов файлов в папке «sedicomm».

`touch a.doc b.doc a.pdf b.pdf a.xml b.xml a.html b.html`

Смотрите, мы создали все новые файлы в папке «sedicomm».

`ls a.doc a.html a.pdf a.xml a.doc b.html b.pdf b.xml`

Теперь удалите все файлы, за исключением файла «html»одновременно, умным способом.

`rm -r !(*.html)`

Просто чтобы проверить, последнее исполнение. Перечислите все доступные файлы с помощью команды ls.

`ls a.html b.html`

### Оператор AND-OR (&& — ||)

Вышеуказанный оператор фактически является комбинацией оператора «AND» и «OR». Это очень похоже на утверждение «если-еще».

Например, давайте сделаем ping на disweb.ru, если успешно то выведем на экран ‘Verified‘, если ping не успешный, то выведен на экран ‘Host Down‘.

`ping -c3 disweb.ru && echo "Verified" || echo "Host Down"`

Пример вывода

PING disweb.ru (62.109.11.132) 56(84) bytes of data.
64 bytes from srv1.hoverhost.ru (62.109.11.132): icmp_seq=1 ttl=61 time=0.906 ms
64 bytes from srv1.hoverhost.ru (62.109.11.132): icmp_seq=2 ttl=61 time=0.800 ms
64 bytes from srv1.hoverhost.ru (62.109.11.132): icmp_seq=3 ttl=61 time=0.791 ms

--- disweb.ru ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2002ms
rtt min/avg/max/mdev = 0.791/0.832/0.906/0.057 ms
Verified

### Оператор потока PIPE (|)

Этот оператор потока PIPE очень полезен, когда выходные данные первой команды действуют как входные данные для второй команды. Например, направьте вывод команды «ls -l» на «less» и посмотрите вывод всего скрипта.

`ls -l | less`

### Оператор комбинации команд {}

Объедините две или более команд, вторая команда зависит от выполнения первой команды.

Например, проверьте, доступен ли каталог «bin», и выведите соответствующий вывод.

`[ -d"bin" ] || { echo Directory does not exist, creating directory now.; mkdir bin; } && echo Directory exists.`

### Оператор приоритета ()

Оператор позволяет выполнить команду в порядке приоритета.

`Command_x1 && Command_x2 || Command_x3 && Command_x4`

В приведенной выше псевдокоманде, что если Command_x1 завершится неудачно? Ни один из Command_x2, Command_x3, Command_x4 не будет выполнен, для этого мы используем оператор приоритета вот так:

`(Command_x1 && Command_x2) || (Command_x3 && Command_x4)`

В вышеприведенном скрипте, если Command_x1 завершается ошибкой, Command_x2 также завершается ошибкой, но все же выполнение Command_x3 и Command_x4 зависит от состояния выхода Command_x3.

### Оператор конкатенации (\)

Оператор конкатенации (\), как указывает имя, используется для объединения больших команд в нескольких строках оболочки. Например, команда ниже откроет текстовый файл test(1).txt.

`nano test\(1\).txt`

## Перенаправление ввода/вывода в Linux

### Потоки

Стандартный ввод при работе пользователя в терминале передается через клавиатуру.

Стандартный вывод и стандартная ошибка отображаются на дисплее терминала пользователя в виде текста.

Ввод и вывод распределяется между тремя стандартными потоками:

- stdin — стандартный ввод (клавиатура),
- stdout — стандартный вывод (экран),
- stderr — стандартная ошибка (вывод ошибок на экран).

Потоки также пронумерованы:

- stdin — 0,
- stdout — 1,
- stderr — 2.

Из стандартного ввода команда может только считывать данные, а два других потока могут использоваться только для записи. Данные выводятся на экран и считываются с клавиатуры, так как стандартные потоки по умолчанию ассоциированы с терминалом пользователя. Потоки можно подключать к чему угодно: к файлам, программам и даже устройствам. В командном интерпретаторе bash такая операция называется перенаправлением:

- `< file` — использовать файл как источник данных для стандартного потока ввода.
- `> file` — направить стандартный поток вывода в файл. Если файл не существует, он будет создан, если существует — перезаписан сверху.
- `2> file` — направить стандартный поток ошибок в файл. Если файл не существует, он будет создан, если существует — перезаписан сверху.
- `>>file` — направить стандартный поток вывода в файл. Если файл не существует, он будет создан, если существует — данные будут дописаны к нему в конец.
- `2>>file` — направить стандартный поток ошибок в файл. Если файл не существует, он будет создан, если существует — данные будут дописаны к нему в конец.
- `&>file` или `>&file` — направить стандартный поток вывода и стандартный поток ошибок в файл. Другая форма записи: `>file 2>&1`.

### Стандартный ввод

Стандартный входной поток обычно переносит данные от пользователя к программе. Программы, которые предполагают стандартный ввод, обычно получают входные данные от устройства типа клавиатура. Стандартный ввод прекращается по достижении EOF (конец файла), который указывает на то, что данных для чтения больше нет.

EOF вводится нажатием сочетания клавиш `Ctrl+D`.

Рассмотрим работу со стандартным выводом на примере команды `cat` (от CONCATENATE, в переводе «связать» или «объединить что-то»).

**Cat** обычно используется для объединения содержимого двух файлов.

**Cat** отправляет полученные входные данные на дисплей терминала в качестве стандартного вывода и останавливается после того как получает EOF.

В открывшейся строке введите, например, 1 и нажмите клавишу Enter. На дисплей выводится 1. Введите a и нажмите клавишу Enter. На дисплей выводится a.

Дисплей терминала выглядит следующим образом:

    test@111:~/stream$ cat
    1
    1
    a
    a

Для завершения ввода данных следует нажать сочетание клавиш Ctrl + D.

### Стандартный вывод

Стандартный вывод записывает данные, сгенерированные программой. Когда стандартный выходной поток не перенаправляется в какой-либо файл, он выводит текст на дисплей терминала.

При использовании без каких-либо дополнительных опций, команда echo выводит на экран любой аргумент, который передается ему в командной строке:

    echo Пример

Аргументом является то, что получено программой, в результате на дисплей терминала будет выведено:

    Пример

Команда объединяет три файла: file1, file2 и file3 в один файл bigfile:

    cat file1 file1 file1 > bigfile

### Стандартная ошибка

Стандартная ошибка записывает ошибки, возникающие в ходе исполнения программы. Как и в случае стандартного вывода, по умолчанию этот поток выводится на терминал дисплея.

При запуске без аргументов ls выводит содержимое в пределах текущего каталога.

Введем команду ls с каталогом % в качестве аргумента:

    ls %

В результате должно выводиться содержимое соответствующей папки. Но так как каталога % не существует, на дисплей терминала будет выведен следующий текст стандартной ошибки:

    ls: cannot access %: No such file or directory

### Перенаправление потока

Linux включает в себя команды перенаправления для каждого потока.

Команды со знаками > или < означают перезапись существующего содержимого файла:

- `>` — стандартный вывод,
- `<` — стандартный ввод,
- `2>` — стандартная ошибка.

Команды со знаками >> или << не перезаписывают существующее содержимое файла, а присоединяют данные к нему:

- `>>` — стандартный вывод,
- `<<` — стандартный ввод,
- `2>>` — стандартная ошибка.

В приведенном примере команда cat используется для записи в файл file1, который создается в результате цикла:

    cat > file1
    a
    b
    c

Для завершения цикла нажмите сочетание клавиш Ctrl + D.

Если файла file1 не существует, то в текущем каталоге создается новый файл с таким именем.

Для просмотра содержимого файла file1 введите команду:

    cat file1

В результате на дисплей терминала должно быть выведено следующее:

    a
    b
    c

Для перезаписи содержимого файла введите следующее:

    cat > file1
    1
    2
    3

Для завершения цикла нажмите сочетание клавиш `Ctrl + D`.

В результате на дисплей терминала должно быть выведено следующее:

      1
      2
      3

Предыдущего текста в текущем файле больше не существует, так как содержимое файла было переписано командой `>`.

Для добавления нового текста к уже существующему в файле с помощью двойных скобок `>>` выполните команду:

    cat >> file1
    a
    b
    c

Для завершения цикла нажмите сочетание клавиш Ctrl + D.

Откройте `file1` снова и в результате на дисплее монитора должно быть отражено следующее:

    1
    2
    3
    a
    b
    c

### Каналы

Каналы используются для перенаправления потока из одной программы в другую. Стандартный вывод данных после выполнения одной команды перенаправляется в другую через канал. Данные первой программы, которые получает вторая программа, не будут отображаться. На дисплей терминала будут выведены только отфильтрованные данные, возвращаемые второй командой.

Введите команду:

    ls | less

В результате каждый файл текущего каталога будет размещен на новой строке:

    file1
    file2
    t1
    t2

Перенаправлять данные с помощью каналов можно как из одной команды в другую, так и из одного файла к другому, а перенаправление с помощью > и >> возможно только для перенаправления данных в файлах.

Для сохранения имен файлов, содержащих строку «LOG», используется следующая команда:

    dir /catalog | find "LOG" > loglist

Вывод команды dir отсылается в команду-фильтр find. Имена файлов, содержащие строку «LOG», хранятся в файле loglist в виде списка (например, Config.log, Logdat.svd и Mylog.bat).

При использовании нескольких фильтров в одной команде рекомендуется разделять их с помощью знака канала |.

Фильтры

Фильтры представляют собой стандартные команды Linux, которые могут быть использованы без каналов:

- `find` — возвращает файлы с именами, которые соответствуют передаваемому аргументу.
- `grep` — возвращает только строки, содержащие (или не содержащие) заданное регулярное выражение.
- `tee` — перенаправляет стандартный ввод как стандартный вывод и один или несколько файлов.
- `tr` — находит и заменяет одну строку другой.
- `wc` — подсчитывает символы, линии и слова.

Как правило, все нижеприведенные команды работают как фильтры, если у них нет аргументов (опции могут быть):

- `cat` — считывает данные со стандартного потока ввода и передает их на стандартный поток вывода. Без опций работает как простой повторитель. С опциями может фильтровать пустые строки, нумеровать строки и делать другую подобную работу.
- `head` — показывает первые 10 строк (или другое заданное количество), считанных со стандартного потока ввода.
- `tail` — показывает последние 10 строк (или другое заданное количество), считанные со стандартного потока ввода. Важный частный случай tail -f, который в режиме слежения показывает концовку файла. Это используется, в частности, для просмотра файлов журнальных сообщений.
- `cut` — вырезает столбец (по символам или полям) из потока ввода и передает на поток вывода. В качестве разделителей полей могут использоваться любые символы.
- sort — сортирует данные в соответствии с какими-либо критериями, например, арифметически по второму столбцу.
- `uniq` — удаляет повторяющиеся строки. Или (с ключом -с) не просто удалить, а написать сколько таких строк было. Учитываются только подряд идущие одинаковые строки, поэтому часто данные сортируются перед тем как отправить их на вход программе.
- `bc` — вычисляет каждую отдельную строку потока и записывает вместо нее результат вычисления.
- `hexdump` — показывает шестнадцатеричное представление данных, поступающих на стандартный поток ввода.
- `strings` — выделяет и показывает в стандартном потоке (или файле) то, что напоминает строки. Всё что не похоже на строковые последовательности, игнорируется. Команда полезна в сочетании с grep для поиска интересующих строковых последовательностей в бинарных файлах.
- `sed` — обрабатывает текст в соответствии с заданным скриптом. Наиболее часто используется для замены текста в потоке: sed s/было/стало/g.
- `awk` — обрабатывает текст в соответствии с заданным скриптом. Как правило, используется для обработки текстовых таблиц, например, вывод ps aux и т.д.
- `sh -s` — текст, который передается на стандартный поток ввода sh -s. может интерпретироваться как последовательность команд shell. На выход передается результат их исполнения.
- `ssh` — средство удаленного доступа ssh, может работать как фильтр, который подхватывает данные, переданные ему на стандартный поток ввода, затем передает их на удаленный хост и подает на вход процессу программы, имя которой было передано ему в качестве аргумента. Результат выполнения программы (то есть то, что она выдала на стандартный поток вывода) передается со стандартного вывода ssh.

Если в качестве аргумента передается файл, команда-фильтр считывает данные из этого файла, а не со стандартного потока ввода (есть исключения, например, команда tr, обрабатывающая данные, поступающие исключительно через стандартный поток ввода).

Команда tee, как правило, используется для просмотра выводимого содержимого при одновременном сохранении его в файл.

    wc ~/stream | tee file2

Допускается перенаправление нескольких потоков в один файл:

    ls -z >> file3 2>&1

В результате сообщение о неверной опции «z» в команде ls будет записано в файл t2, поскольку stderr перенаправлен в файл.

Для просмотра содержимого файла file3 введите команду cat:

    cat file3

В результате на дисплее терминала отобразиться следующее:

    ls: invalid option -- 'z'
    Try 'ls --help' for more information.

## Как запустить процесс в фоне Linux

Для выполнения команды в фоновом режиме достаточно добавить в конце символ амперсанда (&):

    command &

В фоновом режиме можно одновременно запускать сразу два, три, четыре процесса и даже больше.

Работая в фоновом режиме, команда все равно продолжает выводить сообщения в терминал, из которого была запущена. Для этого она использует потоки stdout и stderr,  которые можно закрыть при помощи следующего синтаксиса:

    command > /dev/null 2>&1 &

Здесь `>/dev/null 2>&1` обозначает, что stdout будет перенаправлен на `/dev/null`, а stderr — к stdout.

Узнать состояние всех остановленных и выполняемых в фоновом режиме задач в рамках текущей сессии терминала можно при помощи утилиты jobs c использованием опции -l:

    jobs -l

В любое время можно вернуть процесс из фонового режима на передний план. Для этого служит команда fg:

    fg

Если в фоновом режиме выполняется несколько программ, следует также указывать номер. Например:

    fg %1

Для завершения фонового процесса применяют команду kill с номером программы:

    kill %1

### Как перевести процесс в фоновый режим

Если изначально процесс был запущен обычным способом, его можно перевести в фоновый режим, выполнив следующие действия:

- Остановить выполнение команды, нажав комбинацию клавиш `Ctrl+Z`.
- Перевести процесс в фоновый режим при помощи команды `bg`.

    bg

### Работа процессов в фоне

Закрытие терминала путем нажатия на крестик в верхнем углу экрана влечет за собой завершение всех фоновых процессов. Впрочем, есть несколько способов сохранить их  после того как связь с интерактивной оболочкой прервется. Первый способ — это удаление задачи из очереди заданий при помощи команды disown:

    disown

Как и в предыдущих случаях, при наличии нескольких одновременно выполняемых процессов следует  указывать номер того, относительно которого будет выполнено действие:

    disown %1

Убедиться, что задачи больше нет в списке заданий, можно, использовав уже знакомую утилиту jobs -l. А чтобы просмотреть перечень всех запущенных процессов (в том числе и отключенных) применяется команда

    ps aux

Второй способ сохранить запущенные процессы после прекращения работы терминала — команда nohup. Она выполняет другую команду, которая была указана в качестве аргумента, при этом игнорирует все сигналы SIGHUP (те, которые получает процесс при закрытии терминала). Для запуска команды в фоновом режиме нужно написать команду в виде:

    nohup command &

### Как убить процесс Linux

Управление процессами в операционной системе Linux осуществляется с помощью сигналов. В том числе и завершение любого процесса. Сигналы передает система, но также их может передавать пользователь с помощью специальных команд или даже сочетаний клавиш в терминале. Когда процессу приходит сигнал о необходимости завершиться, он должен выполнить некоторые подготовительные действия.

Необходимо завершить дочерние процессы, удалить временные файлы, сокеты и так далее. Но в зависимости от сложности ситуации процесс может реагировать не на все сигналы. Рассмотрим основные сигналы, которые используются для завершения процесса:

**SIGINT** - самый безобидный сигнал завершения, означает Interrupt. Он отправляется процессу, запущенному из терминала с помощью сочетания клавиш `Ctrl+C`. Процесс правильно завершает все свои действия и возвращает управление;
**SIGQUIT** - это еще один сигнал, который отправляется с помощью сочетания клавиш, программе, запущенной в терминале. Он сообщает ей что нужно завершиться и программа может выполнить корректное завершение или проигнорировать сигнал. В отличие от предыдущего, она генерирует дамп памяти. Сочетание клавиш `Ctrl+/`;
**SIGHUP** - сообщает процессу, что соединение с управляющим терминалом разорвано, отправляется, в основном, системой при разрыве соединения с интернетом;
**SIGTERM** - немедленно завершает процесс, но обрабатывается программой, поэтому позволяет ей завершить дочерние процессы и освободить все ресурсы;
**SIGKILL** - тоже немедленно завершает процесс, но, в отличие от предыдущего варианта, он не передается самому процессу, а обрабатывается ядром. Поэтому ресурсы и дочерние процессы остаются запущенными.

Важно понимать, что нужно дать процессу возможность завершиться корректно. Желательно, чтобы порты и сокеты были освобождены, закрыты и удаленны временные файлы. Поэтому никогда не передавайте сразу SIGKILL. Передавайте сигналы завершения в последовательности, как они перечислены выше.

Сначала `Ctrl+C`, если это возможно, затем SIGTERM - он хоть и завершает процесс, но делает эту культурно, и только в крайнем случае SIGKILL. А теперь рассмотрим как убить процесс по pid Linux на практике.

    kill -сигнал pid_процесса

Сигнал представляет собой один из выше перечисленных сигналов для завершения процесса. По умолчанию, если этот параметр не указан, используется сигнал SIGTERM, что является очень правильно. Также нам нужно указать какой процесс нужно завершить. Для этого используется уникальный идентификатор процесса - PID.

Допустим, у нас выполняется утилита ping. Мы хотим ее завершить с помощью kill. Тогда, сначала мы узнаем ее идентификатор с помощью команды ps:

    ps aux | grep ping

В первой строчке отобразится сама утилита ping, а во второй сама программа ps. Берем нужный PID и завершаем процесс с помощью SIGTERM:

    kill 20446

Или:

    kill -TERM 20446

И только если после этой команды процесс продолжил висеть, а это вы можете проверить, выполнив ps. Только теперь можно выполнить SIGKILL:

    kill -KILL 20446

#### Как завершить процесс с помощью pkill

Утилита pkill - это оболочка для kill, она ведет себя точно так же, и имеет тот же синтаксис, только в качестве идентификатора процесса ей нужно передать его имя. Утилита сканирует директорию proc и находит PID первого процесса с таким именем, затем отправляет ему SIGTERM. Таким образом, вы можете убить процесс по имени Linux. Например, если мы хотим завершить тот же ping:

    pkill ping

Также можно вручную задать тип сигнала:

    pkill -TERM ping

Вместо ps, вы можете использовать утилиту pgrep для поиска pid процесса, убедимся что наша программа завершена:

    pgrep ping