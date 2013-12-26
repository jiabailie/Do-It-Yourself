#ifndef __ENUMTYPE_H__
#define __ENUMTYPE_H__

struct SocketEnum
{
	typedef enum 
	{
		Invalid,
		Tcp,
		Udp
	}SocketType;

	typedef enum 
	{
		Error = -1,
		Success = 0,
		InvalidSocket,
		InvalidAddress,
		InvalidPort,
		ConnectionRefused,
		Timedout,
		Ewouldblock, 
		Notconnected,
		Einprogress, 
		Interrupted, 
		ConnectionAborted, 
		ProtocolError,
		InvalidBuffer,
		ConnectionReset,
		AddressInUse,
		InvalidPointer ,
		WSAStartupError,
		BindError,
		ListenError,
		UnknownError
	} SocketError;

	typedef enum 
	{
		Receives = 0,
		Sends = 1,
		Both = 2
	} ShutdownMode;
};
#endif __ENUMTYPE_H__