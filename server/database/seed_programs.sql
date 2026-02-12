-- ============================================================
-- Seed programs for ALL rooms (Building 9, Floors 2-4)
-- Same program list, duplicated across every room
-- ============================================================

INSERT INTO programs (name, path, process_name, room_id)
SELECT p.name, p.path, p.process_name, r.id
FROM (
    VALUES
        ('Roblox Player', '%LOCALAPPDATA%\Roblox\Versions\*\RobloxPlayerBeta.exe', 'RobloxPlayerBeta.exe'),
        ('Roblox Launcher', '%LOCALAPPDATA%\Roblox\Versions\*\RobloxPlayerLauncher.exe', 'RobloxPlayerLauncher.exe'),
        ('Steam', '%ProgramFiles(x86)%\Steam\steam.exe', 'steam.exe'),
        ('Epic Games Launcher (32-bit)', '%ProgramFiles(x86)%\Epic Games\Launcher\Portal\Binaries\Win32\EpicGamesLauncher.exe', 'EpicGamesLauncher.exe'),
        ('Epic Games Launcher (64-bit)', '%ProgramFiles%\Epic Games\Launcher\Portal\Binaries\Win64\EpicGamesLauncher.exe', 'EpicGamesLauncher.exe'),
        ('Origin', '%ProgramFiles%\Origin\Origin.exe', 'Origin.exe'),
        ('EA Desktop', '%ProgramFiles%\EA\EA Desktop\EA Desktop\EADesktop.exe', 'EADesktop.exe'),
        ('Battle.net', '%ProgramFiles(x86)%\Battle.net\Battle.net.exe', 'Battle.net.exe'),
        ('WaveLink', '', 'WaveLink.exe')
) AS p(name, path, process_name)
CROSS JOIN rooms r;
