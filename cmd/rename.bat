@echo off
for /l %%i in (0, 1, 35) do md %%i
for /d %%i in (dir *) do ren %%i [the name you want]
@echo on
