export const translations = {
    en: {
        // Header
        appTitle: 'Blocker Manager',
        appSubtitle: 'Manage blocked websites & programs • By KronosCoder',
        currentVersion: 'Current Version',

        // Websites Section
        websitesToBlock: 'Websites to Block',
        sites: 'sites',
        enterUrl: 'Enter URL (e.g., games.com)',
        add: 'Add',
        signOut: 'Sign Out',
        signOutConfirmTitle: 'Sign Out?',
        signOutConfirmText: 'Are you sure you want to sign out?',
        yesSignOut: 'Yes, Sign Out',
        githubRepo: 'GitHub Repo',

        // Programs Section
        programsToBlock: 'Programs to Block',
        programs: 'programs',
        addProgram: 'Add Program',

        // Program Modal
        addProgramTitle: 'Add Program to Block',
        selectProgram: 'Select Program (optional)',
        browseExe: 'Browse for .exe file',
        browserNote: "Note: Due to browser security, you'll need to enter the full path manually below",
        programName: 'Program Name',
        programNamePlaceholder: 'e.g., Steam, Epic Games, Roblox',
        fullPath: 'Full Path (optional — for firewall rules)',
        fullPathPlaceholder: 'e.g., C:\\Program Files\\Steam\\steam.exe',
        pathTip: 'Optional: Used for firewall rules only. Use %LOCALAPPDATA% or %ProgramFiles% for system paths',
        processName: 'Process Name',
        processNamePlaceholder: 'e.g., steam.exe',
        processNameTip: 'The .exe filename that Windows runs — this is all that\'s needed to block the program',
        blockingInfo: 'Programs are blocked at the Windows Registry level (IFEO). Only the exe filename is needed — no full path required.',
        advancedOptions: 'Advanced Options (Firewall Path)',
        cancel: 'Cancel',

        // Export Section
        exportTitle: 'Export BAT Files',
        exportDescription: 'Generate block_games.bat and unblock_games.bat with current settings',
        exportButton: 'Export BAT Files',

        // Redirect URL
        redirectUrlLabel: 'Redirect URL (when blocked)',
        redirectUrlDescription: 'When a blocked program or website is accessed, this URL will open in the browser instead',
        redirectUrlPlaceholder: 'https://example.com',
        redirectUrlSaved: 'Redirect URL saved!',
        failedToSaveRedirectUrl: 'Failed to save redirect URL',
        save: 'Save',
        saved: 'Saved!',

        // Export History
        exportHistory: 'Export History',
        exports: 'exports',
        block: 'Block',
        unblock: 'Unblock',
        download: 'Download',

        // Pagination
        page: 'Page',
        of: 'of',

        // Footer
        footerText: 'Game Blocker Manager • Built by KronosCoder',

        // Loading
        loading: 'Loading...',

        // Common
        delete: 'Delete',

        // SweetAlert Messages
        failedToFetchData: 'Failed to fetch data',
        pleaseEnterUrl: 'Please enter a URL',
        pleaseEnterValidUrl: 'Please enter a valid URL',
        addingWebsite: 'Adding website...',
        websiteAddedSuccess: 'Website added successfully!',
        failedToAddWebsite: 'Failed to add website',
        deleteWebsiteTitle: 'Delete Website?',
        deleteWebsiteText: 'Are you sure you want to remove',
        yesDeleteIt: 'Yes, delete it!',
        websiteRemoved: 'Website removed!',
        failedToRemoveWebsite: 'Failed to remove website',
        pleaseEnterProgramName: 'Please enter a program name',
        pleaseEnterProcessName: 'Please enter the process name (e.g., steam.exe)',
        addingProgram: 'Adding program...',
        programAddedSuccess: 'Program added successfully!',
        failedToAddProgram: 'Failed to add program',
        deleteProgramTitle: 'Delete Program?',
        programRemoved: 'Program removed!',
        failedToRemoveProgram: 'Failed to remove program',
        exportBatTitle: 'Export BAT Files?',
        exportBatText: 'This will generate new BAT files with version',
        exportBatNote: 'Files will be saved in server/exports folder',
        yesExport: 'Yes, export!',
        exporting: 'Exporting...',
        generatingBat: 'Generating BAT files...',
        exportSuccess: 'Export Successful!',
        version: 'Version',
        filesCreated: 'Files created',
        exportFailed: 'Export Failed!',
        exportFailedText: 'Failed to export BAT files. Please try again.',
        deleteExportTitle: 'Delete Export?',
        deleteExportText: 'Are you sure you want to delete',
        andItsBatFiles: 'and its BAT files?',
        yesDelete: 'Yes, delete!',
        deleted: 'Deleted',
        failedToDeleteHistory: 'Failed to delete history',
        websiteAlreadyExists: 'This website already exists!',
        programNameExists: 'A program with this name already exists!',
        programProcessExists: 'A program with this process name already exists!',

        // Passphrase Page
        enterPassphrase: 'Enter Passphrase',
        passphraseDescription: 'Please enter the passphrase to access the application.',
        passphrasePlaceholder: 'Passphrase',
        unlock: 'Unlock',
        incorrectPassphrase: 'Incorrect passphrase',
        passphraseRequired: 'Passphrase is required',
        passphraseVerified: 'Passphrase verified!',

        // Room Selection Page
        selectRoom: 'Select Room',
        roomSelectionDescription: 'Choose a room to configure its blocking settings',
        building: 'Building',
        floor: 'Floor',
        room: 'Room',
        rooms: 'rooms',
        currentConfigRoom: 'Current Config Room',
        backToRooms: 'Back to Rooms',
    },
    th: {
        // Header
        appTitle: 'ตัวจัดการบล็อกเกม',
        appSubtitle: 'จัดการเว็บไซต์และโปรแกรมที่ถูกบล็อก • โดย KronosCoder',
        currentVersion: 'เวอร์ชันปัจจุบัน',

        // Websites Section
        websitesToBlock: 'เว็บไซต์ที่จะบล็อก',
        sites: 'เว็บไซต์',
        enterUrl: 'ป้อน URL (เช่น games.com)',
        add: 'เพิ่ม',
        signOut: 'ออกจากระบบ',
        signOutConfirmTitle: 'ออกจากระบบ?',
        signOutConfirmText: 'คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ?',
        yesSignOut: 'ใช่ ออกจากระบบ',
        githubRepo: 'ซอร์สโค้ด',

        // Programs Section
        programsToBlock: 'โปรแกรมที่จะบล็อก',
        programs: 'โปรแกรม',
        addProgram: 'เพิ่มโปรแกรม',

        // Program Modal
        addProgramTitle: 'เพิ่มโปรแกรมที่จะบล็อก',
        selectProgram: 'เลือกโปรแกรม (ไม่บังคับ)',
        browseExe: 'เรียกดูไฟล์ .exe',
        browserNote: 'หมายเหตุ: เนื่องจากข้อจำกัดของเบราว์เซอร์ คุณต้องใส่พาธเต็มด้านล่างด้วยตนเอง',
        programName: 'ชื่อโปรแกรม',
        programNamePlaceholder: 'เช่น Steam, Epic Games, Roblox',
        fullPath: 'พาธเต็ม (ไม่บังคับ — สำหรับ Firewall)',
        fullPathPlaceholder: 'เช่น C:\\Program Files\\Steam\\steam.exe',
        pathTip: 'ไม่บังคับ: ใช้สำหรับ Firewall เท่านั้น ใช้ %LOCALAPPDATA% หรือ %ProgramFiles% สำหรับพาธระบบ',
        processName: 'ชื่อ Process',
        processNamePlaceholder: 'เช่น steam.exe',
        processNameTip: 'ชื่อไฟล์ .exe ที่ Windows รัน — แค่นี้ก็เพียงพอที่จะบล็อกโปรแกรม',
        blockingInfo: 'โปรแกรมถูกบล็อกในระดับ Windows Registry (IFEO) ต้องการแค่ชื่อไฟล์ exe — ไม่จำเป็นต้องใส่พาธเต็ม',
        advancedOptions: 'ตัวเลือกขั้นสูง (พาธสำหรับ Firewall)',
        cancel: 'ยกเลิก',

        // Export Section
        exportTitle: 'ส่งออกไฟล์ BAT',
        exportDescription: 'สร้างไฟล์ block_games.bat และ unblock_games.bat ด้วยการตั้งค่าปัจจุบัน',
        exportButton: 'ส่งออกไฟล์ BAT',

        // Redirect URL
        redirectUrlLabel: 'URL เปลี่ยนเส้นทาง (เมื่อถูกบล็อก)',
        redirectUrlDescription: 'เมื่อมีการเปิดโปรแกรมหรือเว็บไซต์ที่ถูกบล็อก URL นี้จะเปิดขึ้นในเบราว์เซอร์แทน',
        redirectUrlPlaceholder: 'https://example.com',
        redirectUrlSaved: 'บันทึก URL เปลี่ยนเส้นทางแล้ว!',
        failedToSaveRedirectUrl: 'ไม่สามารถบันทึก URL ได้',
        save: 'บันทึก',
        saved: 'บันทึกแล้ว!',

        // Export History
        exportHistory: 'ประวัติการส่งออก',
        exports: 'รายการ',
        block: 'บล็อก',
        unblock: 'ปลดบล็อก',
        download: 'ดาวน์โหลด',

        // Pagination
        page: 'หน้า',
        of: 'จาก',

        // Footer
        footerText: 'ตัวจัดการบล็อกเกม • สร้างโดย KronosCoder',

        // Loading
        loading: 'กำลังโหลด...',

        // Common
        delete: 'ลบ',

        // SweetAlert Messages
        failedToFetchData: 'ไม่สามารถดึงข้อมูลได้',
        pleaseEnterUrl: 'กรุณาป้อน URL',
        pleaseEnterValidUrl: 'กรุณาป้อน URL ที่ถูกต้อง',
        addingWebsite: 'กำลังเพิ่มเว็บไซต์...',
        websiteAddedSuccess: 'เพิ่มเว็บไซต์สำเร็จ!',
        failedToAddWebsite: 'ไม่สามารถเพิ่มเว็บไซต์ได้',
        deleteWebsiteTitle: 'ลบเว็บไซต์?',
        deleteWebsiteText: 'คุณแน่ใจหรือไม่ว่าต้องการลบ',
        yesDeleteIt: 'ใช่ ลบเลย!',
        websiteRemoved: 'ลบเว็บไซต์แล้ว!',
        failedToRemoveWebsite: 'ไม่สามารถลบเว็บไซต์ได้',
        pleaseEnterProgramName: 'กรุณาป้อนชื่อโปรแกรม',
        pleaseEnterProcessName: 'กรุณาป้อนชื่อ Process (เช่น steam.exe)',
        addingProgram: 'กำลังเพิ่มโปรแกรม...',
        programAddedSuccess: 'เพิ่มโปรแกรมสำเร็จ!',
        failedToAddProgram: 'ไม่สามารถเพิ่มโปรแกรมได้',
        deleteProgramTitle: 'ลบโปรแกรม?',
        programRemoved: 'ลบโปรแกรมแล้ว!',
        failedToRemoveProgram: 'ไม่สามารถลบโปรแกรมได้',
        exportBatTitle: 'ส่งออกไฟล์ BAT?',
        exportBatText: 'จะสร้างไฟล์ BAT ใหม่ด้วยเวอร์ชัน',
        exportBatNote: 'ไฟล์จะถูกบันทึกในโฟลเดอร์ server/exports',
        yesExport: 'ใช่ ส่งออกเลย!',
        exporting: 'กำลังส่งออก...',
        generatingBat: 'กำลังสร้างไฟล์ BAT...',
        exportSuccess: 'ส่งออกสำเร็จ!',
        version: 'เวอร์ชัน',
        filesCreated: 'ไฟล์ที่สร้าง',
        exportFailed: 'ส่งออกล้มเหลว!',
        exportFailedText: 'ไม่สามารถส่งออกไฟล์ BAT ได้ กรุณาลองใหม่อีกครั้ง',
        deleteExportTitle: 'ลบการส่งออก?',
        deleteExportText: 'คุณแน่ใจหรือไม่ว่าต้องการลบ',
        andItsBatFiles: 'และไฟล์ BAT ของมัน?',
        yesDelete: 'ใช่ ลบเลย!',
        deleted: 'ลบแล้ว',
        failedToDeleteHistory: 'ไม่สามารถลบประวัติได้',
        websiteAlreadyExists: 'เว็บไซต์นี้มีอยู่แล้ว!',
        programNameExists: 'มีโปรแกรมชื่อนี้อยู่แล้ว!',
        programProcessExists: 'มี Process ชื่อนี้อยู่แล้ว!',

        // Passphrase Page
        enterPassphrase: 'ป้อนรหัสผ่าน',
        passphraseDescription: 'กรุณาป้อนรหัสผ่านเพื่อเข้าใช้งานแอปพลิเคชัน',
        passphrasePlaceholder: 'รหัสผ่าน',
        unlock: 'ปลดล็อก',
        incorrectPassphrase: 'รหัสผ่านไม่ถูกต้อง',
        passphraseRequired: 'กรุณาป้อนรหัสผ่าน',
        passphraseVerified: 'ยืนยันรหัสผ่านสำเร็จ!',

        // Room Selection Page
        selectRoom: 'เลือกห้อง',
        roomSelectionDescription: 'เลือกห้องเพื่อกำหนดค่าการบล็อก',
        building: 'อาคาร',
        floor: 'ชั้น',
        room: 'ห้อง',
        rooms: 'ห้อง',
        currentConfigRoom: 'ห้องที่กำลังตั้งค่า',
        backToRooms: 'กลับไปหน้าเลือกห้อง',
    }
}

