// Generate block_games.bat content
function generateBlockBat(data, version) {
    const websites = data.websites;
    const programs = data.programs;

    // Get unique process names (Important for Registry Blocking)
    const processNames = [...new Set(programs.map(p => p.processName))];

    let bat = `@echo off
:: ===================================
:: Game Blocker Script ${version}
:: Block gaming websites and programs
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

title Game Blocker - Blocking Mode ${version}
color 0C
echo.
echo ========================================
echo        GAME BLOCKER - BLOCK MODE
echo             Version: ${version}
echo ========================================
echo.

echo [INFO] Running with Administrator privileges...
echo.

:: ===================================
:: 1. BLOCK GAMING WEBSITES (HOSTS)
:: ===================================
echo [STEP 1] Blocking gaming websites...

set HOSTS=%SystemRoot%\\System32\\drivers\\etc\\hosts

:: Backup hosts file
copy "%HOSTS%" "%HOSTS%.backup" >nul 2>&1

:: Add gaming websites to hosts file
echo. >> "%HOSTS%"
echo # ====== GAME BLOCKER ${version} - START ====== >> "%HOSTS%"

`;

    // Block IPv4 and IPv6
    websites.forEach(w => {
        bat += `echo 127.0.0.1 ${w.url} >> "%HOSTS%"\r\n`;
        bat += `echo ::1 ${w.url} >> "%HOSTS%"\r\n`;
        if (!w.url.startsWith('www.')) {
            bat += `echo 127.0.0.1 www.${w.url} >> "%HOSTS%"\r\n`;
            bat += `echo ::1 www.${w.url} >> "%HOSTS%"\r\n`;
        }
    });

    bat += `
echo # ====== GAME BLOCKER ${version} - END ====== >> "%HOSTS%"
echo [OK] Websites blocked!
echo.

:: ===================================
:: 2. DISABLE SECURE DNS (DoH)
:: ===================================
echo [STEP 2] Enforcing Browser Policies...

reg add "HKLM\\SOFTWARE\\Policies\\Mozilla\\Firefox" /v DNSOverHTTPS /t REG_DWORD /d 0 /f >nul 2>&1
reg add "HKLM\\SOFTWARE\\Policies\\BraveSoftware\\Brave" /v DnsOverHttpsMode /t REG_SZ /d "off" /f >nul 2>&1
reg add "HKLM\\SOFTWARE\\Policies\\Google\\Chrome" /v DnsOverHttpsMode /t REG_SZ /d "off" /f >nul 2>&1
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Edge" /v DnsOverHttpsMode /t REG_SZ /d "off" /f >nul 2>&1

echo [OK] Browser Secure DNS disabled!
echo.

:: ===================================
:: 3. BLOCK PROGRAMS (REGISTRY HIJACK)
:: ===================================
echo [STEP 3] Blocking Executables (Registry Level)...
echo [INFO] This prevents the game from starting regardless of location.

`;

    // IFEO Registry Block (The most powerful method)
    processNames.forEach(proc => {
        bat += `:: Block ${proc}\r\n`;
        bat += `reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\${proc}" /v Debugger /t REG_SZ /d "rundll32.exe" /f >nul 2>&1\r\n`;
    });

    bat += `
echo [OK] Executables hijacked via Registry!
echo.

:: ===================================
:: 4. BLOCK PROGRAMS (FIREWALL & TASKKILL)
:: ===================================
echo [STEP 4] Applying Firewall Rules & Killing Processes...

`;

    // Taskkill
    processNames.forEach(proc => {
        bat += `taskkill /F /IM ${proc} >nul 2>&1\r\n`;
    });

    // Firewall (Keep as backup)
    programs.forEach(p => {
        // Remove old rule first to prevent duplicates
        bat += `netsh advfirewall firewall delete rule name="Block ${p.name}" >nul 2>&1\r\n`;

        if (p.path.includes('*')) {
            const basePath = p.path.split('*')[0];
            bat += `if exist "${basePath}" (\r\n`;
            bat += `    for /d %%i in ("${basePath}*") do (\r\n`;
            bat += `        if exist "%%i\\${p.processName}" (\r\n`;
            bat += `            netsh advfirewall firewall add rule name="Block ${p.name}" dir=out action=block program="%%i\\${p.processName}" >nul 2>&1\r\n`;
            bat += `        )\r\n`;
            bat += `    )\r\n`;
            bat += `)\r\n`;
        } else {
            bat += `if exist "${p.path}" (\r\n`;
            bat += `    netsh advfirewall firewall add rule name="Block ${p.name}" dir=out action=block program="${p.path}" >nul 2>&1\r\n`;
            bat += `)\r\n`;
        }
    });

    bat += `
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
echo 1. Hosts file updated.
echo 2. Browser DoH disabled.
echo 3. Game EXEs blocked in Registry.
echo 4. Firewall rules active.
echo.
echo IMPORTANT: Please restart your browsers.
timeout /t 5 /nobreak >nul
exit
`;

    return bat;
}

// Generate unblock_games.bat content
function generateUnblockBat(data, version) {
    const websites = data.websites;
    const programs = data.programs;

    // We need process names for unblocking registry keys too
    const processNames = [...new Set(programs.map(p => p.processName))];

    // Get all URLs
    const allUrlsToRemove = [];
    websites.forEach(w => {
        allUrlsToRemove.push(w.url);
        if (!w.url.startsWith('www.')) {
            allUrlsToRemove.push('www.' + w.url);
        }
    });
    const uniqueUrls = [...new Set(allUrlsToRemove)];

    let bat = `@echo off
:: ===================================
:: Game Unblocker Script ${version}
:: Auto-elevates to Administrator!
:: ===================================

net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Requesting Administrator privileges...
    powershell -Command "Start-Process -Verb RunAs -FilePath '%~f0'"
    exit /b
)

title Game Blocker - Unblock Mode ${version}
color 0A
echo.
echo ========================================
echo       GAME BLOCKER - UNBLOCK MODE
echo             Version: ${version}
echo ========================================
echo.

:: ===================================
:: 1. UNBLOCK WEBSITES
:: ===================================
echo [STEP 1] Unblocking websites...

set HOSTS=%SystemRoot%\\System32\\drivers\\etc\\hosts
set TEMP_HOSTS=%TEMP%\\hosts_temp

:: Clean up Hosts file logic
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1

:: Remove header/footer comments
findstr /v /c:"GAME BLOCKER ${version}" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul
copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1

`;

    uniqueUrls.forEach(url => {
        bat += `findstr /v /c:"${url}" "%TEMP_HOSTS%" > "%HOSTS%" 2>nul\r\n`;
        bat += `copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1\r\n`;
    });

    bat += `
del "%TEMP_HOSTS%" >nul 2>&1
echo [OK] Websites unblocked!
echo.

:: ===================================
:: 2. RESTORE BROWSER POLICIES
:: ===================================
echo [STEP 2] Restoring Browser Settings...

:: Delete Policy Keys (Fixes "Managed by Organization" issue)
reg delete "HKLM\\SOFTWARE\\Policies\\Mozilla\\Firefox" /f >nul 2>&1
reg delete "HKLM\\SOFTWARE\\Policies\\Mozilla" /f >nul 2>&1
reg delete "HKLM\\SOFTWARE\\Policies\\BraveSoftware" /f >nul 2>&1
reg delete "HKLM\\SOFTWARE\\Policies\\Google\\Chrome" /v DnsOverHttpsMode /f >nul 2>&1
reg delete "HKLM\\SOFTWARE\\Policies\\Microsoft\\Edge" /v DnsOverHttpsMode /f >nul 2>&1

echo [OK] Browser settings restored!
echo.

:: ===================================
:: 3. UNBLOCK PROGRAMS (REGISTRY)
:: ===================================
echo [STEP 3] Unblocking Executables (Registry)...

`;

    // Remove IFEO Registry Block
    processNames.forEach(proc => {
        bat += `reg delete "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\${proc}" /f >nul 2>&1\r\n`;
    });

    bat += `
echo [OK] Executable blocks removed!
echo.

:: ===================================
:: 4. UNBLOCK PROGRAMS (FIREWALL)
:: ===================================
echo [STEP 4] Removing Firewall Rules...

`;

    programs.forEach(p => {
        bat += `netsh advfirewall firewall delete rule name="Block ${p.name}" >nul 2>&1\r\n`;
    });

    bat += `
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
`;

    return bat;
}

module.exports = {
    generateBlockBat,
    generateUnblockBat
};