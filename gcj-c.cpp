#include <iostream>
#include <fstream>
#include <cmath>
#include <cstring>
#include <cstdio>
#include <cstdlib>
#include <vector>
#include <climits>

using namespace std;

#define MAX_NUM 110

// whether s1 >= s2
int bige(char s1[], char s2[])
{
	int ret = 1;
	int l1 = strlen(s1);
	int l2 = strlen(s2);
	if(l1 > l2)	{ ret = 1; }
	if(l1 < l2) { ret = 0;	}
	if(l1 == l2)
	{
		for(int i = 0; i < l1; i++)
		{
			if(s1[i] > s2[i]) {	ret = 1; break; }
			if(s1[i] < s2[i]) {	ret = 0; break; }
		}
	}

	return ret;
}

//两个大数比较大小
int big(char s1[], char s2[])
{
	int q = 0;
	while (s1[q] == '0')
	{
		q++;
	}
	strcpy(s1, s1 + q);
	if (strlen(s1) == 0)
	{
		s1[0] = '0';
		s1[1] = 0;
	}

	q = 0;
	while (s2[q] == '0')
	{
		q++;
	}
	strcpy(s2, s2 + q);
	if (strlen(s2) == 0)
	{
		s2[0] = '0';
		s2[1] = 0;
	}

	int len1 = strlen(s1);
	int len2 = strlen(s2);
	if (len1 > len2)
	{
		return 1;
	}
	else if (len1 < len2)
	{
		return 0;
	}
	else
	{
		for (int i = 0; i < len1; i++)
		{
			if (s1[i] > s2[i])
			{
				return 1;
			}
			else if (s1[i] < s2[i])
			{
				return 0;
			}
		}
	}

	return 0;
}

//一个大数乘以t
void mul(char s[], int t, char re[])
{
	int left = 0, len;

	int k = 0;
	int j = 0;
	for (int i = strlen(s) - 1; i >= 0; i--)
	{
		k = t * (s[i] - '0') + left;
		re[j++] = (k % 10) + '0';
		left = k / 10;
	}
	while (left > 0)
	{
		re[j++] = (left % 10) + '0';
		left /= 10;
	}
	re[j] = 0;
	len = strlen(re);

	char c;
	for (int i = 0; i < len / 2; i++)
	{
		c = re[i];
		re[i] = re[len - 1 - i];
		re[len - 1 - i] = c;
	}
}

//两个大数相减
void sub(char a[], char b[])
{
	int left, len1, len2;
	int temp;
	len1 = strlen(a) - 1;
	len2 = strlen(b) - 1;
	left = 0;

	while (len2 >= 0)
	{
		temp = a[len1] - b[len2] + left;
		if (temp < 0)
		{
			temp += 10;
			left = -1;
		}
		else
		{
			left = 0;
		}

		a[len1] = temp + '0';
		len1--;
		len2--;
	}

	while (len1 >= 0)
	{
		temp = a[len1] - '0' + left;
		if (temp < 0)
		{
			temp += 10;
			left = -1;
		}
		else
		{
			left = 0;
		}
		a[len1] = temp + '0';
		len1--;
	}

	int j = 0;
	while (a[j] == '0')
	{
		j++;
	}
	strcpy(a, a + j);
	if (strlen(a) == 0)
	{
		a[0] = '0';
		a[1] = 0;
	}
}

//大数开方
void sqr(char s[], char re[])
{
	char temp[MAX_NUM];
	char left[MAX_NUM];
	char p[MAX_NUM];
	int i, j, len1, len2, q;

	len1 = strlen(s);

	if(len1 == 1 && s[0] == '1')
	{
		re[0] = '1';
		re[1] = 0;
		return;
	}
	if (len1 % 2 == 0)
	{
		left[0] = s[0];
		left[1] = s[1];
		left[2] = 0;
		j = 2;
	}
	else
	{
		left[0] = s[0];
		left[1] = 0;
		j = 1;
	}

	re[0] = '0';
	re[1] = 0;
	q = 0;
	while (j <= len1)
	{
		mul(re, 20, temp);
		len2 = strlen(temp);
		for (i = 9; i >= 0; i--)
		{
			temp[len2 - 1] = i + '0';
			mul(temp, i, p);
			if (! big(p, left))
			{
				break;
			}
		}

		re[q++] = i + '0';
		re[q] = 0;
		sub(left, p);
		len2 = strlen(left);
		left[len2] = s[j];
		left[len2 + 1] = s[j + 1];
		left[len2 + 2] = 0;
		j += 2;
	}
}

void addone(char s[])
{
	int c = 1, t = 0;
	int l = strlen(s);
	for(int i = l - 1; i >= 0; i--)
	{
		t = (s[i] - '0') + c;
		s[i] = (t % 10) + '0';
		c = t / 10;
	}
	if(c > 0)
	{
		for(t = l; l > 0; l--) { s[t] = s[t - 1]; }
		s[0] = c + '0';
	}
}

int palindrome(char s[])
{
	int ret = 1;
	int i = 0, j = strlen(s) - 1;
	for(; i < j; i++, j--)
	{
		if(s[i] != s[j]) { ret = 0; break; }
	}
	return ret;
}

int main()
{
	int t = 0;
	int la = 0, lb = 0;
	int i = 0, j = 0;
	int m = 0, n = 0;
	char a[MAX_NUM];
	char b[MAX_NUM];
	char ha[MAX_NUM];
	char hb[MAX_NUM];
	char re[MAX_NUM];
	char sqr1[MAX_NUM];
	char sqr2[MAX_NUM];
	char mid1[MAX_NUM];
	char mid2[MAX_NUM];

	FILE* in = freopen("E:\\Practice\\GCJ\\file\\C.in", "r", stdin);
	FILE* out = freopen("E:\\Practice\\GCJ\\file\\C.out", "w", stdout);

	fscanf(in, "%d", &t);

	for(i = 0; i < t; i++)
	{
		fscanf(in, "%s %s", &a, &b);
		la = strlen(a);
		lb = strlen(b);
		memset(ha, 0, sizeof(char) * MAX_NUM);
		memset(hb, 0, sizeof(char) * MAX_NUM);
		memset(re, 0, sizeof(char) * MAX_NUM);
		re[0] = '0';
		strncpy(ha, a, (la >> 1) + 1);
		strncpy(hb, b, (lb >> 1) + 1);
		while(bige(hb, ha))
		{
			memset(mid1, 0, sizeof(char) * MAX_NUM);
			memset(mid2, 0, sizeof(char) * MAX_NUM);
			memset(sqr1, 0, sizeof(char) * MAX_NUM);
			memset(sqr2, 0, sizeof(char) * MAX_NUM);
			strcpy(mid1, ha);
			strcpy(mid2, ha);
			int len = strlen(ha);
			for(j = 0, m = len * 2 - 1, n = len * 2 - 2; j < len; j++, m--, n--)
			{
				mid1[m] = ha[j];
				mid2[n] = ha[j];
			}
			int c1 = mid1[len * 2 - 1] - '0';
			int c2 = mid2[len * 2 - 2] - '0';
			if(len * 2 <= lb && c1 != 2 && c1 != 3 && c1 != 7)
			{
				if(bige(mid1, a) && bige(b, mid1))
				{
					sqr(mid1, sqr1);
					j = 0;
					while (sqr1[j] == '0') { j++; }  
					strcpy(sqr1, sqr1 + j); 
					int c3 = sqr1[strlen(sqr1) - 1] - '0';
					c3 = (c3 * c3) % 10;
					if(c3 == c1 && palindrome(sqr1)) 
					{ 
						addone(re); 
					}
				}
			}
			if(len * 2 - 1 <= lb && c2 != 2 && c2 != 3 && c2 != 7)
			{
				if(bige(mid2, a) && bige(b, mid2))
				{
					sqr(mid2, sqr2);
					j = 0;
					while (sqr2[j] == '0') { j++; }  
					strcpy(sqr2, sqr2 + j); 
					int c4 = sqr2[strlen(sqr2) - 1] - '0';
					c4 = (c4 * c4) % 10;
					if(c4 == c2 && palindrome(sqr2)) 
					{ 
						addone(re); 
					}
				}
			}
			addone(ha);
		}
		fprintf(out, "Case #%d: %s\n", (i + 1), re);
	}

	fclose(out);
	fclose(in);
	return 0;
}
