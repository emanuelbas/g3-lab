@echo off

echo   ___  ____    __     __   ____  
echo  / __)( __ \  (  )   / _\ (  _ \ 
echo ( (_ \ (__ (  / (_/\/    \ ) _ ( 
echo  \___/(____/  \____/\_/\_/(____/ 
echo            ____   __  ____   __  
echo           (___ \ /  \(___ \ /  \ 
echo   _        / __/(  0 )/ __/(_/ / 
echo  (_)      (____) \__/(____) (__) 
echo ....................................
echo Levantando Express y Angular en localhost:4200
echo .
echo Si rompe, correr estos comandos manualmente y verificar la consola:
echo "npm run dev"
echo "cd src/client/frontend && ng serve --proxy-config proxy.config.json"
echo .
echo .
echo Recuerda que no pueden haber varios abiertos a la vez
pause

start "Angular" cmd /c windows-ng.cmd
npm run dev
