#ifndef __CSOCKET_H__
#define __CSOCKET_H__
#include <windows.h>
#include "SocketEnum.h"
#include <iostream>
using namespace std;

#include "ClientList.h"

class CSocket
{
public:
	CSocket(SocketEnum::SocketType _socketType = SocketEnum::Tcp);
	~CSocket();
	bool Connect(const char* ip,int port);		
	int Send(char* pBuf,int len);	
	int Receive(int strLen);	
	bool SetBlocking(bool isBlocking);
	bool ShutDown(SocketEnum::ShutdownMode mode);
	char* GetData();
	SocketEnum::SocketError GetSocketError();
	void SetSocketHandle(SOCKET socket);
	void Close(); 
	bool operator=(const CSocket* socket);
	bool IsExit();

private: 
	void SetSocketError(SocketEnum::SocketError error);	
	void SetSocketError(void);
	bool IsSocketValid(void);
	SOCKET csocket;
	bool isConnected;	
	struct sockaddr_in serverAddress; 
	char* buffer;	
	int sendCount;	
	int recvCount;	
	bool isBlocking;
	SocketEnum::SocketError socketError;
	SocketEnum::SocketType socketType; 
	WSADATA wsa;
};
#endif