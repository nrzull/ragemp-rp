rm -rf mp/client_packages/*
rm -rf mp/bridge/resources/*
cp -r client/javascript/* mp/client_packages
cp -r client/csharp mp/client_packages/cs_packages
rm -rf mp/client_packages/cs_packages/*.csproj
rm -rf mp/client_packages/cs_packages/bin
rm -rf mp/client_packages/cs_packages/obj
cd ui && npx webpack && cd ..
cd server && dotnet build && cd ..
cp -r server/compiled/* mp/bridge/resources
cp server/Config/meta.xml mp/bridge/resources/netcoreapp2.0/meta.xml
cp server/Config/settings.xml mp/bridge/settings.xml
cp server/Config/conf.json mp/conf.json
cd mp && start server.exe && cd ..
