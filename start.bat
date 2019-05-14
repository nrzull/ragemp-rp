@echo off
rm -rf mp/client_packages/*
rm -rf mp/bridge/resources/*
cd server && dotnet build && cd ..
cp -r client/javascript/* mp/client_packages
cp -r client/csharp mp/client_packages/cs_packages
cp server/config/conf.json mp/conf.json
cp server/config/settings.xml mp/bridge/settings.xml
cp server/config/meta.xml mp/bridge/resources/netcoreapp2.0/meta.xml
cd mp && start server.exe && cd ..
