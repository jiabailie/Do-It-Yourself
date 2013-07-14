#include <cstdio>
#include <cstring>
#include <vector>
#include <map>
#include <iostream>
#include <sstream>
#include <bitset>

using namespace std;

int path[100001];
int cost[100001];
int graph[100001][2][2];

void solve(int n, int* a, int* b, int* len)
{
  int i = 0, j = 0;
	int change = 0;
	while(1)
	{
		change = 0;
		for(i = 0; i < n - 1; i++)
		{
			for(j = 0; j < n - 1; j++)
			{
				if((a[i] == a[j]) && (b[i] == b[j])) { continue; }
				if(a[i] == a[j])
				{
					change = 1;
					if(b[i] > b[j]) { a[i] = b[j]; len[i] = len[i] - len[j]; }
					if(b[i] < b[j]) { a[j] = b[i]; len[j] = len[j] - len[i]; }
				}
				if(b[i] == b[j])
				{
					change = 1;
					if(a[i] > a[j])	{ b[j] = a[i]; len[j] = len[j] - len[i]; }
					if(a[i] < a[j])	{ b[i] = a[j]; len[i] = len[i] - len[j]; }
				}
			}
		}
		if(!change) { break; }
	}
}

int triangle(vector<int> judge)
{
	int flag = 0;
	int len = (int)judge.size();
	int i = 0, j = 0, k = 0;
	for(i = 0; i <= len - 3 && !flag; i++)
	{
		for(j = i + 1; j <= len - 2 && !flag; j++)
		{
			for(k = j + 1; k <= len - 1 && !flag; k++)
			{
				if((judge[i] + judge[j] > judge[k]) &&  
				   (judge[i] + judge[k] > judge[j]) && 
				   (judge[j] + judge[k] > judge[i]))
				{
					flag = 1;
				}
			}
		}
	}
	return flag;
}

int main()
{
	int t = 0;
	int n = 0, m = 0;
	int s = 0, e = 0;
	int head = 0, sta = 0;
	int i = 0, j = 0, k = 0;
	int a = 0, b = 0, len = 0;

	bitset<100008> used;
	vector<int> judge;
	vector<int> res;

	scanf("%d", &t);
	for(i = 0; i < t; i++)
	{
		judge.clear();
		res.clear();
		used.reset();

		scanf("%d", &n);

		memset(path, 0, sizeof(path));
		memset(cost, 0, sizeof(cost));
		memset(graph, 0, sizeof(graph));

		for(j = 0; j < n - 1; j++)
		{
			scanf("%d %d %d", &a, &b, &len);
			if(graph[a][0][0] == 0) { graph[a][0][0] = b; graph[a][0][1] = len; }
			else                    { graph[a][1][0] = b; graph[a][1][1] = len; }
			if(graph[b][0][0] == 0) { graph[b][0][0] = a; graph[b][0][1] = len; }
			else                    { graph[b][1][0] = a; graph[b][1][1] = len; }
			used[a] = ~used[a];
			used[b] = ~used[b];
		}

		for(j = 1; j <= n; j++)
		{
			if(used[j]) { head = sta = j; break; }
		}

		used.reset();
		for(j = 0; j < n - 1; j++)
		{
			used[sta] = 1;
			for(k = 0; k < 2; k++)
			{
				if(used[graph[sta][k][0]] == 0)
				{
					path[sta] = graph[sta][k][0];
					cost[sta] = graph[sta][k][1];
					sta = graph[sta][k][0];
					break;
				}
			}
		}

		scanf("%d", &m);
		for(j = 0; j < m; j++)
		{
			scanf("%d %d", &s, &e);
			judge.clear();
			sta = head;
			while(sta != s && sta != e) { sta = path[sta]; }
			judge.push_back(cost[sta]);
			sta = path[sta];
			while(sta != s && sta != e)
			{
				judge.push_back(cost[sta]);
				sta = path[sta];
			}
			res.push_back(triangle(judge));
		}
		printf("Case #%d:\n", (i + 1));
		for(j = 0; j < m; j++)
		{
			printf(res[j] ? "Yes\n" : "No\n");
		}
	}

	return 0;
}
