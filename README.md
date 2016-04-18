# chatikbot

## Команды для бота

Команда для бота представляет собой класс, реализующий метод `respond(isDirect, text, message, context)`

`isDirect` - сообщение направлено напрямую боту с помощью реплая на сообщение или если сообщение начинается со слова `бот`
`text` - текст сообщения боту. Если исходное сообщение начиналось со слова `бот`, то оно будет исключено из текста вместе
со следующими за ним знаками пунктуации и пробелами
`message` - исходное сообщение со всеми параметрами (https://core.telegram.org/bots/api#message)
`context` - общий контекст выполнения события. Содержит поля, устанавливаемые AWS Lambda, а также словарь `commands`,
с помощью которого команды могут получать доступ к другим командам. Можно также использовать для передачи состояния, если
команда выполняет другую команду.

Метод `respond` сам определяет, стоит ли даенной команде обрабатывать сообщение. Самый очевидный сценарий -
проверять значения из переменных, которые передаются в функцию, в них доступен как текст сообщения,
так и прочая информация о сообщении (например, отправитель).

Для того, чтобы реализовать команду бота, необходимо создать модуль в `handlers\commands`, который экспортирует
класс обработчика команды. Модуль необходимо зарегистрировать в словаре в `handlers\commands\index.js`.
Команды выполняются по порядку в соответствии с этим словарем. Обработка команд прекращается, как только одна
из команд вернет Promise или строку. Если команда ничего не возвращает (или возвращает нечто, что приводится к false в JS),
обрабатывается следующая команда.

Если команда возвращает Promise, то в бот отправляет в чат результат разрешения Promise или сообщение об ошибке.
Если команда возвращает строку, в чат отправляется строка.
Если команда возрвращает Promise, но Promise не разрешается в какой-либо объект (`return Promise.resolve()`), в чат ничего
не отправляется - в данном случае предполагается, что команда берет отправку сообщения на себя.

Таким образом можно реализовать простой прямой ответ текстом, асинхронный запрос куда-то и ответ результатом и кастомную
отправку сообщения с помощью Telegram Bot API. Для доступа к Telegram Bot API можно использовать модуль `handlers/Bot.js`,
он автоматически инициализирует обертку `telegram-bot-api` токеном из конфига.

Команда также должна заполнить поля с описанием для отображения в спарвке по командам

`name` - название команды. Отображается болдом в списке команд
`description` - описание команды, что она делает.
`help` - словарь из пар "параметры команды": "действие". Здесь описываются параметрам прямых команд боту, на которые он реагирует.

### Пример

`handlers/commands/Cat.js`

    // Конструктор
    function Cat() {
        // Имя команды
        this.name = 'Коты';
        
        // Описание команды 
        this.description = 'Постит случайного котика';
        
        // Справка по принимаемым параметрам
        this.help = { 
            'кота|кошку': 'Случайный котик в чат из The Cat API' 
        };
    }

    // Обработчик (последние два параметра не используются, их можно опустить)
    Cat.prototype.respond = function (isDirect, text) {
        // Если сообщение направили напрямую нам
        if (isDirect) {
            // И оно содержит текст "кота", "котика" или "кошку"
            if (/ко(та|тика|шку)/i.test(text)) {
                // Вернуть случайную картинку
                return "http://thecatapi.com/api/images/get?format=src&type=jpg&_="+Math.random();
            }
        }
    };

    // Экспортировать обработчик в модуле
    module.exports = Cat;
    
`handlers/commands/index.js`

    var Remind = require('./Remind')
      , Start = require('./Start')
      , Talk = require('./Talk') 
      , Cat = require('./Cat')
      , Go = require('./Go');

    module.exports = {
        Start: new Start(),
        Remind: new Remind(),
        Cat: new Cat(),
        Go: new Go(),
        Talk: new Talk()
    };
    
 Обработчик этой команды будет вызван, если команды `Start` и `Remind` пропустят обработку.

## Предустановленные модули

    "promise": "~7.1.1",
    "lodash": "~4.11.1",
    "request": "~2.72.0",
    "telegram-bot-api": "~1.0.0"

## Конфигурация

Конфигурация располагается в модуле `config.js`. Шаблон файла конфига в `config.js.example`

`config.bot.id` - идентификатор бота
`config.bot.token` - токен API

## Установка

1. Создать файл config.js

2. Установить зависимости

    `$ npm install --production`
    
3. Содержимое директории упаковать в ZIP-архив и загрузить на AWS Lambda, среда исполнения: Node JS 4.3.
   Обработчик `index.echoHandler` настраивается на функцию с API Endpoint типа POST, обработчик `index.scheduleHandler`
   настраивается на функцию с источником события CloudWatch Events - Schedule.
4. Создать в DynamoDB таблицу `chats` с Primary Key `chat_id` - строка
5. Установить для бота Web Hook, указывающий на API Endpoint функции с обработчиком `echoHandler`

    `curl --data "url=https://<ENDPOINT>" "https://api.telegram.org/bot<TOKEN>/setWebhook"`

## Тестирование (TODO)

    $ npm install -g mocha
    $ npm install 
    $ mocha
