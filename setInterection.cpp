#include <cstdio>
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

void GetIntersection( const vector<int>& vectorA, const vector<int>& vectorB, vector<int>& vectorC )
{
	int i = 0;
	int sta = 0;
	int end = 0;
	int mid = 0;
	bool flg = false;
	int la = (int)vectorA.size();
	int lb = (int)vectorB.size();
	vector<int> tmp(vectorA);

	/* clear vectorC's content */
	if(!vectorC.empty())
	{
		vectorC.clear();
	}

	/* sort the elements in tmp */
	sort(tmp.begin(), tmp.end());

	/* using binary search to find if vectorB[i] is also in vectorA */
	for(i = 0; i < lb; i++)
	{
		if(vectorB[i] >= tmp[0] && vectorB[i] <= tmp[la - 1])
		{
			flg = false;
			sta = 0;
			end = la - 1;
			mid = sta + end / 2;
			while(true)
			{
				if(vectorB[i] == tmp[mid])
				{
					flg = true;
					break;
				}
				if(vectorB[i] > tmp[mid])
				{
					sta = mid + 1;
				}
				if(vectorB[i] < tmp[mid])
				{
					end = mid - 1;
				}
				if(sta > end)
				{
					break;
				}
				mid = sta + (end - sta) / 2;
			}
			/* if vectorB[i] is being found in tmp */
			if(flg)
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
	a.push_back(56);
	b.push_back(2);
	b.push_back(3);
	b.push_back(56);
	c.push_back(19);

	GetIntersection(a, b, c);

	for(vector<int>::iterator it = c.begin(); it != c.end(); it++)
	{
		cout << (*it) << " ";
	}

	return 0;
}
