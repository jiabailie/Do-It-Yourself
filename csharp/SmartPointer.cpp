/*
 * References: msdn.microsoft.com/en-us/library/vstudio/hh279674.aspx 
 */
#include <cstdio>
#include <memory>
#include <string>
#include <iostream>
#include <vector>
#include <functional>
#include <algorithm>
#include <iterator>

using namespace std;

struct MediaAsset
{
	string NAME;
	string WORD;
	virtual string name() { return NAME; }
	virtual string word() { return WORD; }
};

struct Song : public MediaAsset
{
	Song() {}
	Song(string _name, string _word)
	{
		NAME = _name;
		WORD = _word;
	}
};

struct Photo : public MediaAsset
{

	Photo() {}
	Photo(string _name, string _word)
	{
		NAME = _name;
		WORD = _word;
	}
};

void UseRawPointer()
{
	Song* song = new Song("Nothing to know", "Nothing to sing");
	cout << song->name() << endl;
	delete song;
}

void UseSmartPointer()
{
	unique_ptr<Song> song(new Song("Nothing to know", "Nothing to sing"));
	string s = song->name();
	cout << s << endl;
}

void UseSharedPointer1()
{
	auto sp1 = make_shared<Song>("Nothing to know", "Nothing to sing");

	shared_ptr<Song> sp2(new Song("Nothing to know", "Nothing to sing"));

	shared_ptr<Song> sp3(nullptr);

	sp3 = make_shared<Song>("Nothing to know", "Nothing to sing");

	cout << sp1->name() << endl;
	cout << sp2->name() << endl;
	cout << sp3->name() << endl;
}

void UseSharedPointer2()
{
	vector<shared_ptr<Song> > v;
	v.push_back(make_shared<Song>("Song A name", "Song A word"));
	v.push_back(make_shared<Song>("Song B name", "Song B word"));
	v.push_back(make_shared<Song>("Song C name", "Song C word"));

	vector<shared_ptr<Song> > t;
	remove_copy_if(v.begin(), v.end(), back_inserter(t), [] (shared_ptr<Song> s) -> bool
	{
		return s->name().compare("Song A name") == 0;
	});

	for(vector<shared_ptr<Song> >::iterator it = t.begin(); it != t.end(); it++)
	{
		cout << (*it)->name() << endl;
	}
}

void UseSharedPointer3()
{
	vector<shared_ptr<MediaAsset> > assets;

	assets.push_back(shared_ptr<Song>(new Song("Song A name", "Song A word")));
	assets.push_back(shared_ptr<Song>(new Song("Song B name", "Song B word")));
	assets.push_back(shared_ptr<Photo>(new Photo("Photo A name", "Photo A word")));

	vector<shared_ptr<MediaAsset> > photos;

	copy_if(assets.begin(), assets.end(), back_inserter(photos), [] (shared_ptr<MediaAsset> p) -> bool
	{
		shared_ptr<Photo> tmp = dynamic_pointer_cast<Photo>(p);
		return tmp.get() != nullptr;
	});

	for(vector<shared_ptr<MediaAsset> >::iterator it = photos.begin(); it != photos.end(); it++)
	{
		cout << (*it)->name() << endl;
	}
}

int main()
{
	UseRawPointer();
	cout << endl;
	UseSmartPointer();
	cout << endl;
	UseSharedPointer1();
	cout << endl;
	UseSharedPointer2();
	cout << endl;
	UseSharedPointer3();
	return 0;
}
