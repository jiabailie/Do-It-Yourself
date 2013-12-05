@echo off

: create 36 file folder, using %%i as the folder name
for /l %%i in (0, 1, 35) do md %%i

: rename all file folders under this directory, but you should input the new name one by one
for /d %%i in (dir *) do ren %%i [the name you want]

@echo on
