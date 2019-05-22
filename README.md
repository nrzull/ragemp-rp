## Зависимости

- .NET Core
- PostgreSQL
- Node.JS

## Установка

### Основное

- Запустить `updater.exe` мультиплеера, чтобы он обновился до последней версии
- Добавить `enable-clientside-cs.txt` в директорию с мультиплеером
- Скопировать с мультиплеера папку `server-files` в корень репозитория и переименовать в `mp`
- Запустить `npm run init`
- Настроить `client/csharp/Project.Client.csproj`
- Настроить `server/Config/Secret.cs`

### База данных

- Скачать и установить PostgreSQL https://www.postgresql.org/download/windows/
- Зайти в директорию `server` и создать базу данных введя в терминал следующее:

```batch
dotnet ef database update
```

## Запуск

- Ввести `npm start`
