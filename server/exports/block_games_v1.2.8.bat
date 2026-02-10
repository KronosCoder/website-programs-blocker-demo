@echo off
:: ===================================
:: Game Blocker Script v1.2.8
:: Methods: Hosts, Firewall, Registry (IFEO)
:: Auto-elevates to Administrator!
:: ===================================

:: ===================================
:: AUTO-ELEVATE TO ADMINISTRATOR
:: ===================================
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Requesting Administrator privileges...
    powershell -Command "Start-Process -Verb RunAs -FilePath '%~f0'"
    exit /b
)

title Game Blocker - Blocking Mode v1.2.8
color 0C
echo.
echo ========================================
echo        GAME BLOCKER - BLOCK MODE
echo             Version: v1.2.8
echo ========================================
echo.

echo [INFO] Running with Administrator privileges...
echo.

:: ===================================
:: 1. BLOCK GAMING WEBSITES (HOSTS)
:: ===================================
echo [STEP 1] Blocking gaming websites...

set HOSTS=%SystemRoot%\System32\drivers\etc\hosts

:: Backup hosts file
copy "%HOSTS%" "%HOSTS%.backup" >nul 2>&1

:: Add newline to ensure we don't break existing lines
echo. >> "%HOSTS%"
echo # ====== GAME BLOCKER v1.2.8 - START ====== >> "%HOSTS%"

echo 127.0.0.1 friv.com >> "%HOSTS%"
echo ::1 friv.com >> "%HOSTS%"
echo 127.0.0.1 www.friv.com >> "%HOSTS%"
echo ::1 www.friv.com >> "%HOSTS%"
echo 127.0.0.1 www.friv.com >> "%HOSTS%"
echo ::1 www.friv.com >> "%HOSTS%"
echo 127.0.0.1 friv.net >> "%HOSTS%"
echo ::1 friv.net >> "%HOSTS%"
echo 127.0.0.1 www.friv.net >> "%HOSTS%"
echo ::1 www.friv.net >> "%HOSTS%"
echo 127.0.0.1 www.friv.net >> "%HOSTS%"
echo ::1 www.friv.net >> "%HOSTS%"
echo 127.0.0.1 y8.com >> "%HOSTS%"
echo ::1 y8.com >> "%HOSTS%"
echo 127.0.0.1 www.y8.com >> "%HOSTS%"
echo ::1 www.y8.com >> "%HOSTS%"
echo 127.0.0.1 www.y8.com >> "%HOSTS%"
echo ::1 www.y8.com >> "%HOSTS%"
echo 127.0.0.1 poki.com >> "%HOSTS%"
echo ::1 poki.com >> "%HOSTS%"
echo 127.0.0.1 www.poki.com >> "%HOSTS%"
echo ::1 www.poki.com >> "%HOSTS%"
echo 127.0.0.1 www.poki.com >> "%HOSTS%"
echo ::1 www.poki.com >> "%HOSTS%"
echo 127.0.0.1 crazygames.com >> "%HOSTS%"
echo ::1 crazygames.com >> "%HOSTS%"
echo 127.0.0.1 www.crazygames.com >> "%HOSTS%"
echo ::1 www.crazygames.com >> "%HOSTS%"
echo 127.0.0.1 www.crazygames.com >> "%HOSTS%"
echo ::1 www.crazygames.com >> "%HOSTS%"
echo 127.0.0.1 kongregate.com >> "%HOSTS%"
echo ::1 kongregate.com >> "%HOSTS%"
echo 127.0.0.1 www.kongregate.com >> "%HOSTS%"
echo ::1 www.kongregate.com >> "%HOSTS%"
echo 127.0.0.1 www.kongregate.com >> "%HOSTS%"
echo ::1 www.kongregate.com >> "%HOSTS%"
echo 127.0.0.1 miniclip.com >> "%HOSTS%"
echo ::1 miniclip.com >> "%HOSTS%"
echo 127.0.0.1 www.miniclip.com >> "%HOSTS%"
echo ::1 www.miniclip.com >> "%HOSTS%"
echo 127.0.0.1 www.miniclip.com >> "%HOSTS%"
echo ::1 www.miniclip.com >> "%HOSTS%"
echo 127.0.0.1 armorgames.com >> "%HOSTS%"
echo ::1 armorgames.com >> "%HOSTS%"
echo 127.0.0.1 www.armorgames.com >> "%HOSTS%"
echo ::1 www.armorgames.com >> "%HOSTS%"
echo 127.0.0.1 www.armorgames.com >> "%HOSTS%"
echo ::1 www.armorgames.com >> "%HOSTS%"
echo 127.0.0.1 newgrounds.com >> "%HOSTS%"
echo ::1 newgrounds.com >> "%HOSTS%"
echo 127.0.0.1 www.newgrounds.com >> "%HOSTS%"
echo ::1 www.newgrounds.com >> "%HOSTS%"
echo 127.0.0.1 www.newgrounds.com >> "%HOSTS%"
echo ::1 www.newgrounds.com >> "%HOSTS%"
echo 127.0.0.1 slither.io >> "%HOSTS%"
echo ::1 slither.io >> "%HOSTS%"
echo 127.0.0.1 www.slither.io >> "%HOSTS%"
echo ::1 www.slither.io >> "%HOSTS%"
echo 127.0.0.1 agar.io >> "%HOSTS%"
echo ::1 agar.io >> "%HOSTS%"
echo 127.0.0.1 www.agar.io >> "%HOSTS%"
echo ::1 www.agar.io >> "%HOSTS%"
echo 127.0.0.1 krunker.io >> "%HOSTS%"
echo ::1 krunker.io >> "%HOSTS%"
echo 127.0.0.1 www.krunker.io >> "%HOSTS%"
echo ::1 www.krunker.io >> "%HOSTS%"
echo 127.0.0.1 diep.io >> "%HOSTS%"
echo ::1 diep.io >> "%HOSTS%"
echo 127.0.0.1 www.diep.io >> "%HOSTS%"
echo ::1 www.diep.io >> "%HOSTS%"
echo 127.0.0.1 store.steampowered.com >> "%HOSTS%"
echo ::1 store.steampowered.com >> "%HOSTS%"
echo 127.0.0.1 www.store.steampowered.com >> "%HOSTS%"
echo ::1 www.store.steampowered.com >> "%HOSTS%"
echo 127.0.0.1 steampowered.com >> "%HOSTS%"
echo ::1 steampowered.com >> "%HOSTS%"
echo 127.0.0.1 www.steampowered.com >> "%HOSTS%"
echo ::1 www.steampowered.com >> "%HOSTS%"
echo 127.0.0.1 steamcommunity.com >> "%HOSTS%"
echo ::1 steamcommunity.com >> "%HOSTS%"
echo 127.0.0.1 www.steamcommunity.com >> "%HOSTS%"
echo ::1 www.steamcommunity.com >> "%HOSTS%"
echo 127.0.0.1 th.y8.com >> "%HOSTS%"
echo ::1 th.y8.com >> "%HOSTS%"
echo 127.0.0.1 www.th.y8.com >> "%HOSTS%"
echo ::1 www.th.y8.com >> "%HOSTS%"
echo 127.0.0.1 e-tech.ac.th >> "%HOSTS%"
echo ::1 e-tech.ac.th >> "%HOSTS%"
echo 127.0.0.1 www.e-tech.ac.th >> "%HOSTS%"
echo ::1 www.e-tech.ac.th >> "%HOSTS%"

echo # ====== GAME BLOCKER v1.2.8 - END ====== >> "%HOSTS%"
echo [OK] Websites blocked!
echo.

:: ===================================
:: 2. DISABLE SECURE DNS (DoH)
:: ===================================
echo [STEP 2] Enforcing Browser Policies...

reg add "HKLM\SOFTWARE\Policies\Mozilla\Firefox" /v DNSOverHTTPS /t REG_DWORD /d 0 /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\BraveSoftware\Brave" /v DnsOverHttpsMode /t REG_SZ /d "off" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Google\Chrome" /v DnsOverHttpsMode /t REG_SZ /d "off" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v DnsOverHttpsMode /t REG_SZ /d "off" /f >nul 2>&1

echo [OK] Browser Secure DNS disabled!
echo.

:: ===================================
:: 3. BLOCK PROGRAMS (REGISTRY HIJACK)
:: ===================================
echo [STEP 3] Blocking Executables (Registry Level)...

reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\RobloxPlayerBeta.exe" /v Debugger /t REG_SZ /d "rundll32.exe" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\RobloxPlayerLauncher.exe" /v Debugger /t REG_SZ /d "rundll32.exe" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\steam.exe" /v Debugger /t REG_SZ /d "rundll32.exe" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\EpicGamesLauncher.exe" /v Debugger /t REG_SZ /d "rundll32.exe" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\Origin.exe" /v Debugger /t REG_SZ /d "rundll32.exe" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\EADesktop.exe" /v Debugger /t REG_SZ /d "rundll32.exe" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\Battle.net.exe" /v Debugger /t REG_SZ /d "rundll32.exe" /f >nul 2>&1

echo [OK] Executables hijacked via Registry!
echo.

:: ===================================
:: 4. BLOCK PROGRAMS (FIREWALL & TASKKILL)
:: ===================================
echo [STEP 4] Applying Firewall Rules & Killing Processes...

taskkill /F /IM RobloxPlayerBeta.exe >nul 2>&1
taskkill /F /IM RobloxPlayerLauncher.exe >nul 2>&1
taskkill /F /IM steam.exe >nul 2>&1
taskkill /F /IM EpicGamesLauncher.exe >nul 2>&1
taskkill /F /IM Origin.exe >nul 2>&1
taskkill /F /IM EADesktop.exe >nul 2>&1
taskkill /F /IM Battle.net.exe >nul 2>&1
netsh advfirewall firewall delete rule name="Block Roblox Player" >nul 2>&1
if exist "%LOCALAPPDATA%\Roblox\Versions\" (
    for /d %%i in ("%LOCALAPPDATA%\Roblox\Versions\*") do (
        if exist "%%i\RobloxPlayerBeta.exe" (
            netsh advfirewall firewall add rule name="Block Roblox Player" dir=out action=block program="%%i\RobloxPlayerBeta.exe" >nul 2>&1
        )
    )
)
netsh advfirewall firewall delete rule name="Block Roblox Launcher" >nul 2>&1
if exist "%LOCALAPPDATA%\Roblox\Versions\" (
    for /d %%i in ("%LOCALAPPDATA%\Roblox\Versions\*") do (
        if exist "%%i\RobloxPlayerLauncher.exe" (
            netsh advfirewall firewall add rule name="Block Roblox Launcher" dir=out action=block program="%%i\RobloxPlayerLauncher.exe" >nul 2>&1
        )
    )
)
netsh advfirewall firewall delete rule name="Block Steam" >nul 2>&1
if exist "%ProgramFiles(x86)%\Steam\steam.exe" (
    netsh advfirewall firewall add rule name="Block Steam" dir=out action=block program="%ProgramFiles(x86)%\Steam\steam.exe" >nul 2>&1
)
netsh advfirewall firewall delete rule name="Block Epic Games Launcher (32-bit)" >nul 2>&1
if exist "%ProgramFiles(x86)%\Epic Games\Launcher\Portal\Binaries\Win32\EpicGamesLauncher.exe" (
    netsh advfirewall firewall add rule name="Block Epic Games Launcher (32-bit)" dir=out action=block program="%ProgramFiles(x86)%\Epic Games\Launcher\Portal\Binaries\Win32\EpicGamesLauncher.exe" >nul 2>&1
)
netsh advfirewall firewall delete rule name="Block Epic Games Launcher (64-bit)" >nul 2>&1
if exist "%ProgramFiles%\Epic Games\Launcher\Portal\Binaries\Win64\EpicGamesLauncher.exe" (
    netsh advfirewall firewall add rule name="Block Epic Games Launcher (64-bit)" dir=out action=block program="%ProgramFiles%\Epic Games\Launcher\Portal\Binaries\Win64\EpicGamesLauncher.exe" >nul 2>&1
)
netsh advfirewall firewall delete rule name="Block Origin" >nul 2>&1
if exist "%ProgramFiles%\Origin\Origin.exe" (
    netsh advfirewall firewall add rule name="Block Origin" dir=out action=block program="%ProgramFiles%\Origin\Origin.exe" >nul 2>&1
)
netsh advfirewall firewall delete rule name="Block EA Desktop" >nul 2>&1
if exist "%ProgramFiles%\EA\EA Desktop\EA Desktop\EADesktop.exe" (
    netsh advfirewall firewall add rule name="Block EA Desktop" dir=out action=block program="%ProgramFiles%\EA\EA Desktop\EA Desktop\EADesktop.exe" >nul 2>&1
)
netsh advfirewall firewall delete rule name="Block Battle.net" >nul 2>&1
if exist "%ProgramFiles(x86)%\Battle.net\Battle.net.exe" (
    netsh advfirewall firewall add rule name="Block Battle.net" dir=out action=block program="%ProgramFiles(x86)%\Battle.net\Battle.net.exe" >nul 2>&1
)

echo [OK] Firewall rules set!
echo.

:: ===================================
:: 5. FINALIZATION
:: ===================================
echo [STEP 5] Flushing DNS cache...
ipconfig /flushdns >nul 2>&1

echo ========================================
echo      GAME BLOCKING COMPLETED!
echo ========================================
echo.
echo IMPORTANT: Please restart your browsers.
timeout /t 5 /nobreak >nul
exit
