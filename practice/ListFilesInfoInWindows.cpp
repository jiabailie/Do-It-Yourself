#include <vector>
#include <string.h>
#include <cstdio>
#include <io.h>
#include <conio.h>
#include <direct.h>

using namespace std;

int main()
{
    struct _finddata_t c_file;
    intptr_t hFile;

    char path[1024] = "D:\\Lab";
    if (_chdir(path))
    {
        printf("Unable to locate the directory: %s\n", path);
        exit(1);
    }

    // Find first file in current directory 
    if ((hFile = _findfirst("*.*", &c_file)) == -1L)
    {
        printf("No *.c files in current directory!\n");
    }
    else
    {
        printf("Listing of all items\n\n");
        printf("RDO HID SYS ARC  FILE         DATE %25c SIZE\n", ' ');
        printf("--- --- --- ---  ----         ---- %25c ----\n", ' ');
        do {
            char buffer[30];
            printf((c_file.attrib & _A_RDONLY) ? " Y  " : " N  ");
            printf((c_file.attrib & _A_HIDDEN) ? " Y  " : " N  ");
            printf((c_file.attrib & _A_SYSTEM) ? " Y  " : " N  ");
            printf((c_file.attrib & _A_ARCH) ? " Y  " : " N  ");
            printf(" %-12s %.24s  %9ld\n",
                c_file.name, buffer, c_file.size);
        } while (_findnext(hFile, &c_file) == 0);
        _findclose(hFile);
    }
    return 0;
}
