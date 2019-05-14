@echo off
mkdir temp
cp -r mp/bridge/runtime temp/_runtime
cd temp && curl -LO https://cdn.gtanet.work/bridge-package.zip && cd ..
cd temp && tar -xvf bridge-package.zip && cd ..
cp -r temp/bridge/runtime/* mp/bridge/runtime
cp -r temp/_runtime/* mp/bridge/runtime
cp -r temp/bridge/vehicleData.json mp/bridge/vehicleData.json
rm -rf temp
