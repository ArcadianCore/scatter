@echo off
::
:: Lascivia Aliases
::
:: In the windows registry, place the path to this batch file in:
::      HKEY_CURRENT_USER\SOFTWARE\Microsoft\Command Processor\AutoRun
::
:: (or, use another batch file that calls this one)

set "RELATIVE_PATH_TO_PROJECT_ROOT=..\..\.."

:: ------------------
rem Get the Project Root Folder
set "TEMP_DIR_LAS=%CD%"
cd /d "%~dp0\%RELATIVE_PATH_TO_PROJECT_ROOT%"
set "LASCIVIA_PROJECT_ROOT=%CD%"
cd /d "%TEMP_DIR_LAS%"
set "DIST_FOLDER=%LASCIVIA_PROJECT_ROOT%\build\pack"
set "PACK_FOLDER=%DIST_FOLDER%\Lascivia-win32-x64"
set "PACKED_GAME_FILE=%PACK_FOLDER%/Lascivia.exe"

:: ------------------

set "GAME_FOLDER=%LASCIVIA_PROJECT_ROOT%"
set TEST_REPORT_PATH="%LASCIVIA_PROJECT_ROOT%/test/results"
set TEST_REPORT_FILENAME='test-report.all.xml'
set ASAR_FILE='asar-contents.txt'

:: echo. Loading Aliases...
doskey /macrofile=%LASCIVIA_PROJECT_ROOT%\build\lib\aliases\aliases.doskey

rem echo LASCIVIA_PROJECT_ROOT: %LASCIVIA_PROJECT_ROOT%
rem echo. Aliases loaded.
