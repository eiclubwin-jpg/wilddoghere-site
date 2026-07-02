WildDogHere CMS - Windows First Steps
====================================

1. Install Node.js LTS first:
   https://nodejs.org/

2. Double-click:
   WINDOWS-SETUP.cmd

   Do not use open-wilddog-cms.command on Windows.
   .command files are for macOS only.

3. The setup will:
   - check Node.js LTS and try to install it with winget if missing
   - install project dependencies
   - confirm or change the CMS account
   - create windows\WildDogHereCMS.exe

4. Open the CMS:
   Double-click windows\WildDogHereCMS.exe

4b. Optional: create one self-extracting Windows exe package:
    Double-click WINDOWS-CREATE-EXE.cmd
    Output: dist\WildDogHere-CMS-Windows.exe
    The self-extracting exe installs to %USERPROFILE%\WildDogHere-CMS by default.

5. Login with the default account unless you changed it during setup:
   username: wilddoghere
   password: WildDogHere2026!

6. Optional verification:
   Double-click WINDOWS-VERIFY.cmd

6b. Optional account change later:
    Double-click WINDOWS-CHANGE-ACCOUNT.cmd

7. After editing articles, update the live website from Git:
   git add .
   git commit -m "Update WildDogHere articles"
   git push origin main

Notes:
- This is a local CMS for editing site content.
- The live website remains a static Next.js site deployed by Vercel.
- The exe is a Windows launcher for the local CMS and must stay with this project folder.
- The self-extracting exe contains the project files, but Windows still needs Node.js LTS installed.
