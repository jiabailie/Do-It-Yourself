#include <cstdio>
#include <string>
#include <vector>
#include <map>
#include <iostream>
#include <sstream>

using namespace std;

bool strCmp(string s1, string s2)
{
	bool res = true;
	if(s1.length() == s2.length())
	{
		for(int i = 0; i < (int)s1.length() && i < (int)s2.length(); i++)
		{
			if(s1[i] != s2[i]) { res = false; break; }
		}
	}
	else { res = false; }
	return res;
}

int main()
{
    int i = 0;
    int t = 0;
    int n = 0, m = 0;
    int j = 0, k = 0, z = 0;
    char dic1[105];
    char dic2[105];

    vector<string> res;
    vector<string> sent;
    map<string, string> dic;
    map<string, string>::iterator it;

    cin >> t;
    for(i = 0; i < t; i++)
    {
	res.clear();
	sent.clear();
	dic.clear();

	cin >> n >> m;
        for(j = 0; j < m; j++)
        {
		cin >> dic1 >> dic2;
		dic[dic1] = dic2;
	}
	getchar();
	cin.getline(dic1, sizeof(dic1));
		
	stringstream ss;
	ss << dic1;
	while(ss >> dic2)
	{
		sent.push_back(dic2);
	}

	for(k = 1; k < n; k++)
	{
		res.clear();
		for(j = 0; j < (int)sent.size(); j++)
		{
			for(it = dic.begin(); it != dic.end(); it++)
			{
				if(strCmp(sent[j], it->first))
				{
					res.push_back(it->second);
					break;
				}
			}
			if(it == dic.end())
			{
				res.push_back(sent[j]);
			}
		}
		sent.clear();
		for(j = 0; j < (int)res.size(); j++) { sent.push_back(res[j]); }
	}

	cout << "Case #" << (i + 1) << ": ";
	for(j = 0; j < (int)res.size(); j++)
	{
		cout << res[j];
		if(j != (int)res.size() - 1) { cout << " "; }
	}
	cout << endl;
    }
	return 0;
}
