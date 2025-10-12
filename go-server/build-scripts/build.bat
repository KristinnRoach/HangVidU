@echo off
echo Building HangVidU for all platforms...

if not exist ..\executables mkdir ..\executables

set GOOS=windows
set GOARCH=amd64
go build -ldflags="-s -w" -o ..\executables\HangVidU-Windows.exe ..\server.go
echo ✅ Windows build complete

set GOOS=darwin
set GOARCH=amd64
go build -ldflags="-s -w" -o ..\executables\HangVidU-Mac-Intel ..\server.go
echo ✅ Mac Intel build complete

set GOOS=darwin
set GOARCH=arm64
go build -ldflags="-s -w" -o ..\executables\HangVidU-Mac-M1 ..\server.go
echo ✅ Mac M1/M2/M3 build complete

set GOOS=linux
set GOARCH=amd64
go build -ldflags="-s -w" -o ..\executables\HangVidU-Linux ..\server.go
echo ✅ Linux build complete

echo.
echo 🎉 All builds complete! Check the go-server\executables\ folder
