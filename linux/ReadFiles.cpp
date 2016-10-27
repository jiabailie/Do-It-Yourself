#include <sys/types.h>
#include <dirent.h>
#include <errno.h>
#include <vector>
#include <cstring>
#include <iostream>
#include <fstream>
#include <streambuf>

using namespace std;

int GetFilenamesInDirectory (string dir, vector<string> &vecFilesPath)
{
    DIR *pDirectory;
    struct dirent *pParentDirectory;
    if((pDirectory  = opendir(dir.c_str())) == NULL)
    {
        cout << "Error(" << errno << ") opening " << dir << endl;
        return errno;
    }

    while ((pParentDirectory = readdir(pDirectory)) != NULL) 
    {
        if (strcmp(pParentDirectory->d_name, "..") != 0 && strcmp(pParentDirectory->d_name, ".") != 0)
        {
            vecFilesPath.push_back(string(pParentDirectory->d_name));
        }
    }
    closedir(pDirectory);
    return 0;
}

int GetFileContents(string dir, vector<string>& vecFilesPath, vector<string>& vecFilesContent)
{
    char buffer[1024];
    vecFilesContent.clear();
    for(int i = 0; i < vecFilesPath.size(); ++i)
    {
        sprintf(buffer, "%s%s", dir.c_str(), vecFilesPath[i].c_str());

        ifstream inFile(buffer);

        string content;

        inFile.seekg(0, std::ios::end);
        content.reserve(inFile.tellg());
        inFile.seekg(0, std::ios::beg);

        content.assign(std::istreambuf_iterator<char>(inFile), std::istreambuf_iterator<char>());

        vecFilesContent.push_back(content);
    }
    return 0;
}

int main()
{
    string dir = string("/mnt/hgfs/lab/");
    vector<string> vecFilesPath;
    vector<string> vecFilesContent;

    int nStatus = GetFilenamesInDirectory(dir,vecFilesPath);

    for (unsigned int i = 0;i < vecFilesPath.size();i++) 
    {
        cout << vecFilesPath[i] << endl;
    }

    nStatus = GetFileContents(dir,vecFilesPath, vecFilesContent);

    for (unsigned int i = 0;i < vecFilesContent.size();i++) 
    {
        cout << vecFilesPath[i] << endl;
    }

    return 0;
}
