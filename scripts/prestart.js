const { exec } = require("shelljs");

exec("cd ui && npm install && cd ..");
exec("cd server && dotnet restore && cd ..");
