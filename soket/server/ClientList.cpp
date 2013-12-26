#include "ClientList.h"
typedef vector<CSocket*>::iterator Iter; 

ClientList::ClientList()
{
	InitializeCriticalSection(&g_cs);
}

ClientList::~ClientList()
{
	DeleteCriticalSection(&g_cs);
}

void ClientList::Add(CSocket* socket)
{
	if(socket != NULL)
	{
		EnterCriticalSection(&g_cs);
		_list.push_back(socket);
		LeaveCriticalSection(&g_cs); 
	}
}

int ClientList::Count() const
{
	return _list.size();
}

CSocket* ClientList::operator[](size_t index)
{ 
	assert(index >= 0 && index < _list.size()); 
	return _list[index];
}

void ClientList::Remove(CSocket* socket)
{ 
	Iter iter = Find(socket);
	EnterCriticalSection(&g_cs);
	if(iter != _list.end())
	{ 
		delete *iter; 
		_list.erase(iter);
	}
	LeaveCriticalSection(&g_cs);
}

Iter ClientList::Find(CSocket* socket)
{
	EnterCriticalSection(&g_cs);
	Iter iter = _list.begin();
	while(iter != _list.end())
	{
		if(*iter == socket)
		{
			return iter;
		}
		iter++;
	}
	LeaveCriticalSection(&g_cs);  
	return iter;
}

void ClientList::Clear()
{
	EnterCriticalSection(&g_cs);
	for(int i = _list.size() - 1; i >= 0; i--)
	{
		delete _list[i];
	}
	_list.clear();
	LeaveCriticalSection(&g_cs);  
}

CRITICAL_SECTION ClientList::g_cs;
vector<CSocket*> ClientList::_list ;