@echo off

set tmp_dir="%~dp0..\2_temp_workspace"

if not exist %tmp_dir% mkdir %tmp_dir%
cd %tmp_dir%

call "C:\PortableApps\msysgit\bin\PortableGit\git-bash.bat"

rem :: ==========================================
rem :: order of scripts to run from within bash:
rem :: ==========================================
rem :: "../1_scripts/3. git - create new branch.sh"
rem :: "../1_scripts/4. git - commit and upload.sh"
rem :: ==========================================
