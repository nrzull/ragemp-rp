## Зависимости

- .NET Core
- bash (идёт вместе с git)

## Установка

- Запустить `updater.exe` мультиплеера, чтобы он обновился до последней версии
- Скопировать с мультиплеера папку `server-files` в корень репозитория и переименовать в `mp`
- Зайти в `bash` в корне репозитория
- Ввести в терминале `bash init.sh`
- Создать `client.csproj` в папке `client` и заполнить следующим:

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

## Запуск

- Зайти в bash в корне репозитория
- Ввести `bash start.sh`
