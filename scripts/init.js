const { rm, mkdir, cp, exec, touch } = require("shelljs");
const Zip = require("adm-zip");
const http = require("http");
const fs = require("fs");

const bridgeUrl = "http://cdn.gtanet.work/bridge-package.zip";
const bridgeDest = "temp/bridge.zip";
const doneFile = ".init";
const csprojDist = "client/csharp/Project.Client.csproj";
const serverSecretDist = "server/Config/Secret.cs";

if (fs.existsSync(doneFile)) return;

rm("-rf", ["temp"]);
mkdir(["temp"]);
mkdir("-p", ["mp/bridge/resources"]);
cp("-r", "mp/bridge/runtime", "temp/_runtime");
mkdir("-p", "mp/client_packages");

function download(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http
    .get(url, function(response) {
      response.pipe(file);
      file.on("finish", function() {
        file.close(cb); // close() is async, call cb after close completes.
      });
    })
    .on("error", function(err) {
      // Handle errors
      fs.unlink(dest); // Delete the file async. (But we don't check the result)
      if (cb) cb(err.message);
    });
}

function unpackArchive() {
  const zip = new Zip(bridgeDest);

  zip.extractAllTo("temp", true);

  cp("-r", "temp/bridge/runtime/*", "mp/bridge/runtime");
  cp("-r", "temp/_runtime/*", "mp/bridge/runtime");
  cp("-r", "temp/bridge/vehicleData.json", "mp/bridge/vehicleData.json");
  rm("-rf", "temp");
  createClientCsproj();
  createServerSecret();

  touch(doneFile);
}

function createClientCsproj() {
  const content = `
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
  `.trim();

  fs.writeFileSync(csprojDist, content);
}

function createServerSecret() {
  const content = `
namespace Project.Server.Config
{
    static class Secret
    {
        public static class Database
        {
            public const string NAME = "aquamarine";
            public const string USERNAME = "postgres";
            public const string PASSWORD = "postgres";
        }

        public static class Core
        {
            public const bool DEBUG = false;
        }
    }
}
  `.trim();

  fs.writeFileSync(serverSecretDist, content);
}

download(bridgeUrl, bridgeDest, unpackArchive);
