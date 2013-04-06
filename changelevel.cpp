#include <cstdio>
#include <vector>
#include <string>

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

void changeLevel(long level, CASObject* root)
{
  long i = 0;
	long numChild = root->GetNumChildren();
	CASObject* child;

	root->SetLevel(level);
	if(numChild > 0)
	{
		for(i = 0; i < numChild; i++)
		{
			child = root->GetChild((int)i);
			if(level + 1 > child->GetLevel())
			{
				changeLevel(level + 1, child);
			}
		}
	}
}

void AssignLevel( vector<CASObject*>& allObjectList )
{
	for(vector<CASObject*>::iterator it = allObjectList.begin(); it != allObjectList.end(); it++)
	{
		if((*it)->GetNumParents() == 0)
		{
			changeLevel(0, (*it));
		}
	}
}
