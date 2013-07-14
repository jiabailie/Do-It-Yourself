#include <cstdio>
#include <vector>
#include <string>
#include <iostream>
#include <queue>

using namespace std;

class CASObject
{
  string                   m_name;                    // name of the object. This is NOT unique.
  vector<CASObject*>       m_parentList;              // list of pointers to parent objects
  vector<CASObject*>       m_childList;               // list of pointers to child objects
  long                     m_level;                   // level
  long                     m_objectID;                // each object has a UNIQUE object ID.

public:
	CASObject( const char* name ) : m_name( name ), m_level( 0 ){}
	~CASObject(){}

	void        SetName( const string& name){ m_name = name; }
	string      GetName() const { return m_name; }
	void        SetLevel( long level){ m_level = level; }
	long        GetLevel() const { return m_level; }
	void        SetObjectID( long id){ m_objectID = id; }
	long        GetObjectID() const { return m_objectID; }

	void        AddParent(CASObject* object){ m_parentList .push_back( object ); }
	long        GetNumParents() const { return (long)m_parentList.size(); }
	CASObject*  GetParent( int n ) const { return m_parentList[ n ]; }
	void        AddChild(CASObject* object){ m_childList .push_back( object ); }
	long        GetNumChildren() const { return (long)m_childList.size(); }
	CASObject*  GetChild( int n ) const { return m_childList[ n ]; }
};

void bfsChangeLevel(CASObject* root);

void AssignLevel( vector<CASObject*>& allObjectList )
{
	for(vector<CASObject*>::iterator it = allObjectList.begin(); it != allObjectList.end(); it++)
	{
		/* find the objects which have no parents, and set its level as 0 */
		if((*it)->GetNumParents() == 0)
		{
			bfsChangeLevel((*it));
		}
	}
}

/* using the idea of bfs to change the objects level */
void bfsChangeLevel(CASObject* root)
{
	long lI = 0;
	long lNumTmpChild = 0;
	long lParentLevel = 0;
	CASObject* casTmp = 0;
	CASObject* casSubTmp = 0;
	queue<CASObject*> casQueue;

	/* set the root object's level as 0 and push it into the queue */
	root->SetLevel(0);
	casQueue.push(root);

	while(!casQueue.empty())
	{
		casTmp = casQueue.front();
		casQueue.pop();

		/* get the children number of current object */
		lNumTmpChild = casTmp->GetNumChildren();

		if(lNumTmpChild > 0)
		{
			lParentLevel = casTmp->GetLevel();

			for(lI = 0; lI < lNumTmpChild; lI++)
			{
				casSubTmp = casTmp->GetChild((int)lI);

				/* if the child's level is larger than its level should be (parent's level + 1), ignore it, else change it */
				if(casSubTmp->GetLevel() < lParentLevel + 1)
				{
					casSubTmp->SetLevel(lParentLevel + 1);
				}
				casQueue.push(casSubTmp);
			}
		}
	}
}

void test()
{
	vector<CASObject*> allObjectList;
	CASObject* e1 = new CASObject("A");
	CASObject* e2 = new CASObject("A");
	CASObject* e3 = new CASObject("B");
	CASObject* e4 = new CASObject("B");
	CASObject* e5 = new CASObject("C");
	CASObject* e6 = new CASObject("D");
	CASObject* e7 = new CASObject("E");

	e1->AddChild(e3);
	e2->AddChild(e4);
	e3->AddChild(e5);
	e4->AddChild(e6);
	e5->AddChild(e6);
	e6->AddChild(e7);

	e7->AddParent(e6);
	e6->AddParent(e5);
	e6->AddParent(e4);
	e5->AddParent(e3);
	e4->AddParent(e2);
	e3->AddParent(e1);

	allObjectList.push_back(e1);
	allObjectList.push_back(e2);
	allObjectList.push_back(e3);
	allObjectList.push_back(e4);
	allObjectList.push_back(e5);
	allObjectList.push_back(e6);
	allObjectList.push_back(e7);

	AssignLevel(allObjectList);

	cout << e1->GetName() << " " << e1->GetLevel() << endl;
	cout << e2->GetName() << " " << e2->GetLevel() << endl;
	cout << e3->GetName() << " " << e3->GetLevel() << endl;
	cout << e4->GetName() << " " << e4->GetLevel() << endl;
	cout << e5->GetName() << " " << e5->GetLevel() << endl;
	cout << e6->GetName() << " " << e6->GetLevel() << endl;
	cout << e7->GetName() << " " << e7->GetLevel() << endl;
}

int main()
{
	test();
	return 0;
}
