@echo off
@.\TinyCCompiler\tcc.exe .\createfile.c > nul
if not errorlevel 1 (
	cls
	.\createfile.exe
)
@echo. 
pause