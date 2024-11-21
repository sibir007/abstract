# Шпаргалка с командами для Windows, Linux и macOS (Терминал, VirtualEnv и Git)

Основные команды
Удаление папки

Windows:

rmdir /s /q папка_для_удаления

Linux и macOS:

rm -rf папка_для_удаления

Создание папки

Windows:

mkdir новая_папка

Linux и macOS:

mkdir новая_папка

Создание виртуального окружения python через venv

Windows:

python -m venv venv

Linux и macOS:

python3 -m venv venv

Виртуальное окружение python через venv
venv на Windows идет "из коробки". Для установки на Linux и macOS возможно потребуется ввести команды:

sudo apt install -y python3-venv
sudo apt install -y build-essential libssl-dev libffi-dev python3-dev

Активация на Windows:

venv\Scripts\activate

Активация на Linux и macOS:

source venv/bin/activate

Деактивация (Linux, macOS и Windows):

deactivate

Команды Git
Инициация Git репозитория

git init

Привязка удаленного репозитория

git remote add origin ссылка_на_репозиторий

Отвязываем репозиторий

git remote rm origin ссылка_на_репозиторий

Привязываем другой репозиторий

git remote set-url origin git@github.com:username/projectname.git

Установка ветки по умолчанию

git config --global init.defaultBranch main

Клонирование репозитория

git clone ссылка_на_репозиторий

Просмотр состояния репозитория

git status

Добавление файлов в индекс

git add имя_файла_или_папки

Коммит изменений

git commit -m "сообщение коммита"

Обновление локального репозитория (pull)

git pull origin main

Отправка изменений в удаленный репозиторий (push)

git push origin main

Создание новой ветки и переключение на нее

git checkout -b новая_ветка

Просмотр списка веток

git branch

Переключение на существующую ветку

git checkout имя_ветки

Слияние веток

git merge имя_ветки

Создание репозитория на GitHub через командную строку

Для этого нужно использовать GitHub CLI. Сначала установите его, а затем выполните следующие команды:
Установка GitHub CLI

Windows (через winget):

winget install --id GitHub.cli

macOS (через Homebrew):

brew install gh

Linux (через пакетный менеджер):

Пример для Ubuntu:

sudo apt install gh

Авторизация в GitHub CLI

gh auth login

Создание репозитория

Публичный репозиторий:

gh repo create имя_репозитория --public

Приватный репозиторий:

gh repo create имя_репозитория --private

Другие полезные команды для Shell
Просмотр содержимого текущей директории

Windows:

dir

Linux и macOS:

ls

Переключение директории

cd путь_к_папке

Копирование файлов

Windows:

copy исходный_файл целевой_файл

Linux и macOS:

cp исходный_файл целевой_файл

Перемещение файлов

Windows:

move исходный_файл целевой_файл

Linux и macOS:

mv исходный_файл целевой_файл

Вывод содержимого файла

Windows:

type имя_файла

Linux и macOS:

cat имя_файла

Создание и редактирование файлов

Windows:

echo текст > имя_файла
notepad имя_файла

Linux и macOS:

echo "текст" > имя_файла
nano имя_файла

Блок терминальных команд для Ubuntu (использую чаще всего)
Обновление и установка программного обеспечения

    Обновление списка пакетов

    sudo apt update

    Эта команда обновляет список доступных пакетов и их версий, но не устанавливает и не обновляет никаких пакетов.

    Обновление установленных пакетов

    sudo apt upgrade

    Эта команда обновляет все установленные пакеты до самых новых версий, которые доступны в репозиториях.

    Установка пакетов

    sudo apt install <имя_пакета>

    Эта команда устанавливает указанный пакет. Например, чтобы установить браузер Firefox, выполните:

    sudo apt install firefox

    Удаление пакетов

    sudo apt remove <имя_пакета>

    Эта команда удаляет указанный пакет, но сохраняет его конфигурационные файлы.

    Полное удаление пакетов

    sudo apt purge <имя_пакета>

    Эта команда удаляет указанный пакет вместе с его конфигурационными файлами.

    Очистка ненужных пакетов

    sudo apt autoremove

    Эта команда удаляет ненужные пакеты, которые были установлены как зависимости и больше не требуются.

Управление системными службами

    Запуск службы

    sudo systemctl start <имя_службы>

    Эта команда запускает указанную службу. Например:

    sudo systemctl start apache2

    Остановка службы

    sudo systemctl stop <имя_службы>

    Перезапуск службы

    sudo systemctl restart <имя_службы>

    Проверка статуса службы

    sudo systemctl status <имя_службы>

    Включение службы при загрузке

    sudo systemctl enable <имя_службы>

    Отключение службы при загрузке

    sudo systemctl disable <имя_службы>

Не забудьте добавить эту шпаргалку в закладки и оценить ее лайком, если она оказалась полезной для вас.