#include <stdio.h>
#include <string.h>
#include <windows.h>

char *ALLOWED_DIRECTORY = "C:\\UserContent";
char *DISALLOWED_EXTENSION = ".exe";

char strDirectory[128];
char strFile[128];
char strFullPath[MAX_PATH + 1];
char strContent[1024];

void GrabUserInputs()
{
	//Prompt user for strDirectory, strFile and StrContents:
	printf("Please enter a directory, up to 128 characters: "); 
	fgets(strDirectory, 128, stdin); 
	strDirectory[strlen(strDirectory)-1] = '\0';

	printf("Please enter a file, up to 128 characters: "); 
	fgets(strFile, 128, stdin); 
	strFile[strlen(strFile)-1] = '\0';

	printf("Please enter text to write to file, 1024 characters max:\n"); 
	fgets(strContent, 1024, stdin); 
	strContent[strlen(strContent)-1] = '\0';
}

BOOL ValidateAndBuildStrFullPath()
{
	/*
		====================  YOUR CODE GOES HERE  ====================
		You may also change or remove the last two lines
		of this function. Good luck :-)
		===============================================================
	*/
	sprintf(strFullPath, "%s\\%s", strDirectory, strFile);
	return TRUE;
}

void CreateFileAndWriteContent()
{
		//Call Windows API to write to file:
		DWORD dwBytesWritten = 0;
		DWORD dwBytesToWrite = (DWORD)strlen(strContent);
		HANDLE *hFile  = CreateFile(strFullPath, GENERIC_WRITE, 0, NULL, CREATE_ALWAYS, FILE_ATTRIBUTE_NORMAL, NULL);
		WriteFile(hFile, strContent, dwBytesToWrite, &dwBytesWritten, NULL);
		CloseHandle(hFile);
		printf("\nWrote %lu bytes to %s\nHave a nice day!\n", dwBytesWritten, strFullPath);
}

int main(int argc, const char *argv[])
{
	GrabUserInputs(); 

	if (ValidateAndBuildStrFullPath()) CreateFileAndWriteContent(); 
	else printf("\nPLEASE DO NOT HACK US!\n");
}

