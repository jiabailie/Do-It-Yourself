#ifndef __CSOCKET_H__
#define __CSOCKET_H__
#include <windows.h>
#include <iostream>
#include "SocketEnum.h"
using namespace std; 

class CSocket
{
public:
	void Close(); 

	bool IsExit();

	void SetSocketHandle(SOCKET socket);	

	int Send(char* pBuf,int len);

	int Receive(int strLen);		

	const char* GetData() const;

	bool Connect(const char* ip,int port);

	bool SetBlocking(bool isBlocking);

	bool ShutDown(SocketEnum::ShutdownMode mode);

	SocketEnum::SocketError GetSocketError();

	CSocket(SocketEnum::SocketType _socketType = SocketEnum::Tcp);

	~CSocket();

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