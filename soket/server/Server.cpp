#include <windows.h>
#include <process.h>
#include <iostream>
using namespace std;
#pragma comment(lib,"ws2_32.lib") 
#include "SServer.h"
#include "CSocket.h"
#include <vector>
#include "ClientList.h"

const int BUF_LEN = 1024;

void recv(PVOID pt)
{
	CSocket* csocket = (CSocket*)pt;
	if(csocket != NULL)
	{
		int count = csocket->Receive(BUF_LEN); 
		if(count == 0)
		{  
			ClientList* list = ClientList::GetInstance(); 
			list->Remove(csocket);
			cout << "One user off, online users:" << list->Count() << endl;
			_endthread();
		}
	} 
}

void sends(PVOID pt)
{
	ClientList* list = (ClientList*)pt;
	while(1)
	{
		char* buf = new char[BUF_LEN] ;
		cin>>buf;
		int bufSize = 0;
		while(buf[bufSize++] != '\0'); 
		for(int i = list->Count() - 1; i >= 0; i--)
		{
			(*list)[i]->Send(buf, bufSize);  
		} 
		delete buf;
	}
}
 
int main(int argc, char* argv[])
{
	SServer server;
	bool isStart = server.Start(1986);
	if(isStart)
	{
		cout<<"server start success..."<<endl;
	}else
	{
		cout<<"server start error"<<endl;
	} 
	ClientList* list = ClientList::GetInstance();
	_beginthread(sends, 0, list);
	while(1)
	{
		CSocket* csocket = server.Accept();
		
		list->Add(csocket);
		cout << "New user on, online users:" << list->Count() << endl;
		_beginthread(recv, 0, csocket);
	}

	getchar();
	return 0;
}