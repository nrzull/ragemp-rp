## Зависимости

- .NET Core
- PostgreSQL
- bash (идёт вместе с git)

## Установка

### Основное

- Запустить `updater.exe` мультиплеера, чтобы он обновился до последней версии
- Скопировать с мультиплеера папку `server-files` в корень репозитория и переименовать в `mp`
- Зайти в `bash` в корне репозитория
- Ввести в терминале `bash init.sh`
- Создать `Aquamarine.Client.csproj` в папке `client` и заполнить следующим:
 
```xml
<Project Sdk="Microsoft.NET.Sdk">
    <PropertyGroup>
        <TargetFramework>netcoreapp2.2</TargetFramework>
    </PropertyGroup>

    <ItemGroup>
        <Reference Include="RAGE">
            <!-- ИЗМЕНИТЬ ПУТЬ -->
            <HintPath>path/to/ragemp/dotnet/rage-sharp.dll</HintPath>
        </Reference>

        <Reference Include="Newtonsoft.Json">
            <!-- ИЗМЕНИТЬ ПУТЬ -->
            <HintPath>path/to/ragemp/dotnet/newtonsoft.json.dll</HintPath>
        </Reference>
    </ItemGroup>
</Project>
```

- Создать `Secret.cs` по пути `server/Config/` и вставить туда следующий код:

```csharp
namespace Aquamarine.Server.Config
{
    class Secret
    {   
        class Database
        {
        public const string NAME = "";
        public const string USERNAME = "";
        public const string PASSWORD = "";
        }

        class Core
        {
          public const bool DEBUG = false;
        }
    }
}
```

### База данных

- Скачать и установить PostgreSQL https://www.postgresql.org/download/windows/
- Зайти в директорию `server` и создать базу данных введя в терминал следующее:

```batch
dotnet ef database update
```

## Запуск

- Зайти в bash в корне репозитория
- Ввести `bash start.sh`
