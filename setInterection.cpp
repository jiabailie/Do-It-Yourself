#include <cstdio>
#include <iostream>
#include <vector>
#include <algorithm>
#include <functional>

using namespace std;

void GetIntersection( const vector<int>& vectorA, const vector<int>& vectorB, vector<int>& vectorC )
{
  int i = 0;
	int sta = 0;
	int end = 0;
	int mid = 0;
	bool f = false;
	int la = (int)vectorA.size();
	int lb = (int)vectorB.size();
	vector<int> tmp;

	for(i = 0; i < la; i++)
	{
		tmp.push_back(vectorA[i]);
	}
	sort(tmp.begin(), tmp.end());
	for(i = 0; i < lb; i++)
	{
		if(vectorB[i] >= tmp[0] && vectorB[i] <= tmp[la - 1])
		{
			f = false;
			sta = 0;
			end = la - 1;
			mid = sta + end / 2;
			while(true)
			{
				if(vectorB[i] == tmp[mid])
				{
					f = true;
					break;
				}
				if(vectorB[i] > tmp[mid])
				{
					sta = mid + 1;
					mid = sta + (end - sta) / 2;
				}
				if(vectorB[i] < tmp[mid])
				{
					end = mid - 1;
					mid = sta + (end - sta) / 2;
				}
				if(sta > end)
				{
					break;
				}
			}
			if(f)
			{
				vectorC.push_back(vectorB[i]);
			}
		}
	}
}

int main()
{
	vector<int> a, b, c;
	a.push_back(3);
	a.push_back(2);
	a.push_back(1);
	b.push_back(2);
	b.push_back(3);
	b.push_back(5);

	GetIntersection(a, b, c);

	return 0;
}
