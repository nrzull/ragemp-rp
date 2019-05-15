rm -rf mp/client_packages/*
rm -rf mp/bridge/resources/*
cd server && dotnet build && cd ..
cp -r server/compiled/* mp/bridge/resources
cp -r client/javascript/* mp/client_packages
cp -r client/csharp mp/client_packages/cs_packages
rm -rf mp/client_packages/cs_packages/*.csproj
rm -rf mp/client_packages/cs_packages/bin
rm -rf mp/client_packages/cs_packages/obj
cp server/Config/conf.json mp/conf.json
cp server/Config/settings.xml mp/bridge/settings.xml
cp server/Config/meta.xml mp/bridge/resources/netcoreapp2.0/meta.xml
cd mp && start server.exe && cd ..
