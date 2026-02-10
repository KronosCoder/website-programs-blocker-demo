@echo off
:: ===================================
:: Game Unblocker Script v1.3.1
:: Auto-elevates to Administrator!
:: ===================================

net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Requesting Administrator privileges...
    powershell -Command "Start-Process -Verb RunAs -FilePath '%~f0'"
    exit /b
)

title Game Blocker - Unblock Mode v1.3.1
color 0A
echo.
echo ========================================
echo       GAME BLOCKER - UNBLOCK MODE
echo             Version: v1.3.1
echo ========================================
echo.

:: ===================================
:: 1. UNBLOCK WEBSITES
:: ===================================
echo [STEP 1] Unblocking websites...

set HOSTS=%SystemRoot%\System32\drivers\etc\hosts
set TEMP_HOSTS=%TEMP%\hosts_temp

:: Working with temp file
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1

:: Remove header/footer comments
findstr /v /c:"GAME BLOCKER v1.3.1" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1

findstr /v /c:"friv.com" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"www.friv.com" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"friv.net" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"www.friv.net" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"y8.com" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"www.y8.com" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"poki.com" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"www.poki.com" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"crazygames.com" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"www.crazygames.com" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"kongregate.com" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"www.kongregate.com" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"miniclip.com" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"www.miniclip.com" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"armorgames.com" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"www.armorgames.com" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"newgrounds.com" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"www.newgrounds.com" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"slither.io" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"www.slither.io" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"agar.io" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"www.agar.io" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"krunker.io" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"www.krunker.io" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"diep.io" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"www.diep.io" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"store.steampowered.com" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"www.store.steampowered.com" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"steampowered.com" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"www.steampowered.com" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"steamcommunity.com" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"www.steamcommunity.com" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"th.y8.com" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"www.th.y8.com" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"e-tech.ac.th" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1
findstr /v /c:"www.e-tech.ac.th" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1

del "%TEMP_HOSTS%" >nul 2>&1
echo [OK] Websites unblocked!
echo.

:: ===================================
:: 2. RESTORE BROWSER POLICIES
:: ===================================
echo [STEP 2] Restoring Browser Settings...

:: Delete Policy Keys (Fixes "Managed by Organization" issue)
reg delete "HKLM\SOFTWARE\Policies\Mozilla\Firefox" /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Policies\Mozilla" /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Policies\BraveSoftware" /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Policies\Google\Chrome" /v DnsOverHttpsMode /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v DnsOverHttpsMode /f >nul 2>&1

echo [OK] Browser settings restored!
echo.

:: ===================================
:: 3. UNBLOCK PROGRAMS (REGISTRY)
:: ===================================
echo [STEP 3] Unblocking Executables (Registry)...

reg delete "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\RobloxPlayerBeta.exe" /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\RobloxPlayerLauncher.exe" /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\steam.exe" /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\EpicGamesLauncher.exe" /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\Origin.exe" /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\EADesktop.exe" /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\Battle.net.exe" /f >nul 2>&1

echo [OK] Executable blocks removed!
echo.

:: ===================================
:: 4. UNBLOCK PROGRAMS (FIREWALL)
:: ===================================
echo [STEP 4] Removing Firewall Rules...

netsh advfirewall firewall delete rule name="Block Roblox Player" >nul 2>&1
netsh advfirewall firewall delete rule name="Block Roblox Launcher" >nul 2>&1
netsh advfirewall firewall delete rule name="Block Steam" >nul 2>&1
netsh advfirewall firewall delete rule name="Block Epic Games Launcher (32-bit)" >nul 2>&1
netsh advfirewall firewall delete rule name="Block Epic Games Launcher (64-bit)" >nul 2>&1
netsh advfirewall firewall delete rule name="Block Origin" >nul 2>&1
netsh advfirewall firewall delete rule name="Block EA Desktop" >nul 2>&1
netsh advfirewall firewall delete rule name="Block Battle.net" >nul 2>&1

echo [OK] Firewall rules removed!
echo.

:: ===================================
:: 5. FINALIZATION
:: ===================================
echo [STEP 5] Flushing DNS cache...
ipconfig /flushdns >nul 2>&1

echo ========================================
echo     GAME UNBLOCKING COMPLETED!
echo ========================================
echo.
echo PLEASE RESTART YOUR BROWSERS.
echo.
timeout /t 5 /nobreak >nul
exit
