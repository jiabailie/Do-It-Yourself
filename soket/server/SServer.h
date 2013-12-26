#ifndef __SSERVER_H__
#define __SSERVER_H__
#include <windows.h>
#include "SocketEnum.h"
#include "CSocket.h"
class SServer
{
public:
	bool Start(int port);
	CSocket* Accept(); 
	void SetSocketError(SocketEnum::SocketError error);
	~SServer();
	void Close();
	bool ShutDown(SocketEnum::ShutdownMode mode);
private: 
	SOCKET ssocket;
	char* buffer;
	struct sockaddr_in serverAddress;
	SocketEnum::SocketError socketError;
	bool isStart;
	WSADATA wsa;
};
#endif __SSERVER_H__