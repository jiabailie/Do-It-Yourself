//ClientList.h 
#ifndef _CLIENTLIST_H_
#define _CLIENTLIST_H_
#include <vector>
#include "CSocket.h" 
#include <assert.h>
class CSocket;
class ClientList
{
public : 
	typedef vector<CSocket*>::iterator Iter;
	 
	void Add(CSocket* socket);

	int Count() const;

	CSocket* operator[](size_t index);

	void Remove(CSocket* socket);

	Iter Find(CSocket* socket); 

	void Clear(); 

	static ClientList* GetInstance()
	{
		static ClientList instance;
		return &instance;
	}

	~ClientList();
private:
	static CRITICAL_SECTION g_cs;
	static vector<CSocket*> _list; 
	ClientList(); 
	ClientList(const ClientList&);
	ClientList& operator=(const ClientList&); 
};
 
#endif
      