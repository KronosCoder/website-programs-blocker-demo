// Generate the PowerShell redirect server script content
function generateRedirectServerPS1(redirectUrl) {
    return [
        `$redirectUrl = "${redirectUrl}"`,
        '',
        '# --- HTTP redirect server (port 80) as background job ---',
        '$httpJob = Start-Job -ScriptBlock {',
        '    param($url)',
        '    $listener = [System.Net.HttpListener]::new()',
        '    $listener.Prefixes.Add("http://127.0.0.1:80/")',
        '    try { $listener.Start() } catch { return }',
        '    while ($listener.IsListening) {',
        '        $ctx = $listener.GetContext()',
        '        $ctx.Response.StatusCode = 302',
        '        $ctx.Response.RedirectLocation = $url',
        '        $ctx.Response.Close()',
        '    }',
        '} -ArgumentList $redirectUrl',
        '',
        '# --- HTTPS detection (port 443) ---',
        '# When browser tries HTTPS to a blocked domain (resolves to 127.0.0.1),',
        '# we detect the TCP connection and open redirect URL in browser.',
        '$tcpListener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, 443)',
        'try { $tcpListener.Start() } catch {}',
        '',
        '$lastRedirect = [datetime]::MinValue',
        'while ($true) {',
        '    try {',
        '        if ($tcpListener.Server.IsBound -and $tcpListener.Pending()) {',
        '            $client = $tcpListener.AcceptTcpClient()',
        '            $client.Close()',
        '            if (([datetime]::Now - $lastRedirect).TotalSeconds -gt 10) {',
        '                Start-Process $redirectUrl',
        '                $lastRedirect = [datetime]::Now',
        '            }',
        '        }',
        '    } catch {}',
        '    Start-Sleep -Milliseconds 500',
        '}'
    ].join('\r\n');
}

// Generate block_games.bat content
function generateBlockBat(data, version) {
    const websites = data.websites;
    const programs = data.programs;
    const redirectUrl = data.redirectUrl || '';

    // Get unique process names (Important for Registry Blocking)
    const processNames = [...new Set(programs.map(p => p.processName))];

    let bat = `@echo off
:: ===================================
:: Game Blocker Script ${version}
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

:: Add newline to ensure we don't break existing lines
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

`;

    // If redirect URL is set, create VBS redirect + point IFEO to it
    if (redirectUrl) {
        bat += `:: Create redirect folder (C:\\GameBlocker - no spaces in path)\r\n`;
        bat += `mkdir "C:\\GameBlocker" 2>nul\r\n`;
        bat += `\r\n`;
        bat += `:: Create VBS redirect script (opens redirect URL when blocked program is launched)\r\n`;
        bat += `echo Set WshShell = CreateObject("WScript.Shell") > "C:\\GameBlocker\\redirect.vbs"\r\n`;
        bat += `echo WshShell.Run "${redirectUrl}", 0, False >> "C:\\GameBlocker\\redirect.vbs"\r\n`;
        bat += `\r\n`;
        bat += `echo [OK] Redirect script created at C:\\GameBlocker\\redirect.vbs\r\n`;
        bat += `echo.\r\n`;
        bat += `\r\n`;

        // IFEO Registry Block → opens redirect URL via VBS
        processNames.forEach(proc => {
            bat += `reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\${proc}" /v Debugger /t REG_SZ /d "wscript.exe C:\\GameBlocker\\redirect.vbs " /f >nul 2>&1\r\n`;
        });
    } else {
        // Original behavior: IFEO blocks without redirect
        processNames.forEach(proc => {
            bat += `reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\${proc}" /v Debugger /t REG_SZ /d "rundll32.exe" /f >nul 2>&1\r\n`;
        });
    }

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

    // Firewall
    programs.forEach(p => {
        bat += `netsh advfirewall firewall delete rule name="Block ${p.name}" >nul 2>&1\r\n`;

        if (p.path === '*' || p.path === '') {
            bat += `:: Skipping firewall for ${p.name} (Handled by Registry Block)\r\n`;
            return;
        }

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
`;

    // STEP 5: Website redirect server (only if redirectUrl is set AND there are websites)
    if (redirectUrl && websites.length > 0) {
        // Generate the PS1 script and Base64 encode it to avoid BAT escaping issues
        const psScript = generateRedirectServerPS1(redirectUrl);
        const base64Script = Buffer.from(psScript, 'utf8').toString('base64');

        bat += `
:: ===================================
:: 5. WEBSITE REDIRECT SERVER
:: ===================================
echo [STEP 5] Setting up website redirect server...

mkdir "C:\\GameBlocker" 2>nul

:: Decode and write PowerShell redirect server script (Base64 encoded to avoid escaping issues)
powershell -Command "[IO.File]::WriteAllText('C:\\GameBlocker\\redirect_server.ps1', [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String('${base64Script}')))"

:: Register as scheduled task (runs at logon, hidden, as SYSTEM)
schtasks /create /tn "GameBlockerRedirect" /tr "powershell.exe -WindowStyle Hidden -ExecutionPolicy Bypass -File C:\\GameBlocker\\redirect_server.ps1" /sc onlogon /rl highest /f >nul 2>&1

:: Start the redirect server now
start "" powershell.exe -WindowStyle Hidden -ExecutionPolicy Bypass -File "C:\\GameBlocker\\redirect_server.ps1"

echo [OK] Website redirect server started!
echo [INFO] HTTP websites: will redirect to ${redirectUrl}
echo [INFO] HTTPS websites: will open ${redirectUrl} in a new tab
echo.
`;
    }

    const finalStep = (redirectUrl && websites.length > 0) ? '6' : '5';

    bat += `
:: ===================================
:: ${finalStep}. FINALIZATION
:: ===================================
echo [STEP ${finalStep}] Flushing DNS cache...
ipconfig /flushdns >nul 2>&1

echo ========================================
echo      GAME BLOCKING COMPLETED!
${redirectUrl ? `echo      Redirect URL: ${redirectUrl}` : ''}
echo ========================================
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
    const redirectUrl = data.redirectUrl || '';

    const processNames = [...new Set(programs.map(p => p.processName))];

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

copy "%HOSTS%" "%TEMP_HOSTS%" >nul 2>&1

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
`;

    // STEP 5: Cleanup redirect artifacts
    if (redirectUrl) {
        bat += `
:: ===================================
:: 5. CLEANUP REDIRECT SCRIPTS
:: ===================================
echo [STEP 5] Cleaning up redirect scripts...

:: Kill redirect server PowerShell processes
powershell -Command "Get-Process powershell -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like '*redirect_server*' } | Stop-Process -Force -ErrorAction SilentlyContinue" >nul 2>&1

:: Remove scheduled task
schtasks /delete /tn "GameBlockerRedirect" /f >nul 2>&1

:: Delete all redirect files
if exist "C:\\GameBlocker\\redirect.vbs" del "C:\\GameBlocker\\redirect.vbs" >nul 2>&1
if exist "C:\\GameBlocker\\redirect_server.ps1" del "C:\\GameBlocker\\redirect_server.ps1" >nul 2>&1
if exist "C:\\GameBlocker" rmdir "C:\\GameBlocker" >nul 2>&1

echo [OK] Redirect scripts cleaned up!
echo.
`;
    }

    const finalStep = redirectUrl ? '6' : '5';

    bat += `
:: ===================================
:: ${finalStep}. FINALIZATION
:: ===================================
echo [STEP ${finalStep}] Flushing DNS cache...
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