#include <iostream>
#include <cstdlib>
#include <vector>
#include <stack>
#include <cmath>
#include <map>

using namespace std;

enum tErroCode
{
  kErrorCode_NoError = 0,
  kErrorCode_DevideByZero = 1,
  kErrorCode_InvalitExpressionFound = 2
};

double Calculate(const char* pszCalcExpr, tErroCode& errorCode)
{
	unsigned int i = 0;
	int c1 = 0, c2 = 0, n = 0;
	double m = 0.0, mm = 0.0;
	double n1 = 0, n2 = 0;
	map<char, int> compare;
	compare['+'] = 1;
	compare['-'] = 1;
	compare['*'] = 2;
	compare['/'] = 2;

	vector<char>s;
	stack<char,vector<char>>symbol;
	stack<char,vector<double>>result;
	vector<char>number;	

	for(i = 0; i < strlen(pszCalcExpr); i++)
	{
		if(((pszCalcExpr[i] >= '0') && (pszCalcExpr[i] <= '9')) || (pszCalcExpr[i] == '.'))
		{
			number.push_back(pszCalcExpr[i]);
		}
		if(pszCalcExpr[i] == '(')
		{
			symbol.push('(');
			i++;
			while(pszCalcExpr[i] != ')')
			{
				if(((pszCalcExpr[i] >= '0') && (pszCalcExpr[i] <= '9')) || (pszCalcExpr[i] == '.'))
				{
					number.push_back(pszCalcExpr[i]); 
				}
				if((pszCalcExpr[i] == '+') || (pszCalcExpr[i] == '-') || 
				   (pszCalcExpr[i] == '*') || (pszCalcExpr[i] == '/'))
				{
					c1 = compare[pszCalcExpr[i]];
					c2 = 0;
					if(symbol.size() > 0 && 
					  ((symbol.top() == '+') || (symbol.top() == '-') || 
					   (symbol.top() == '*') || (symbol.top() == '/')))
					{
						c2 = compare[symbol.top()];
					}

					if(c1 > c2)   
					{
						symbol.push(pszCalcExpr[i]);
						number.push_back(' ');
					}
					else
					{	
						while(1)
						{
							c1 = compare[pszCalcExpr[i]];
							c2 = 0;
							if(symbol.size() > 0 && 
							 ((symbol.top() == '+') || (symbol.top() == '-') || 
							  (symbol.top() == '*') || (symbol.top() == '/')))
							{
								c2 = compare[symbol.top()];
							}
							if(c1 > c2)
							{
								symbol.push(pszCalcExpr[i]);
								number.push_back(' ');
								break;
							}
							else
							{
								number.push_back(' ');				
								number.push_back(symbol.top());
								symbol.pop();
							}
						}
					}
				}
				i++;
			}
			if(pszCalcExpr[i] == ')')
			{
				number.push_back(' ');
			}
			do
			{   
				number.push_back(symbol.top());
				number.push_back(' ');
				symbol.pop();
			}while(symbol.top() != '(');

			symbol.pop();
			number.pop_back();
		}

		if((pszCalcExpr[i] == '+') || 
		   (pszCalcExpr[i] == '-') || 
		   (pszCalcExpr[i] == '*') || 
		   (pszCalcExpr[i] == '/'))
		{
			c1 = compare[pszCalcExpr[i]];
			c2 = 0;
			if(symbol.size() > 0 && 
			 ((symbol.top() == '+') || (symbol.top() == '-') || 
			  (symbol.top() == '*') || (symbol.top() == '/')))
			{
				c2 = compare[symbol.top()];
			}
			if(c1 > c2)
			{   
				symbol.push(pszCalcExpr[i]);
				number.push_back(' ');
			}
			else
			{	
				while(1)
				{
					c1 = compare[pszCalcExpr[i]];
					c2 = 0;
					if(symbol.size() > 0 && 
					 ((symbol.top() == '+') || (symbol.top() == '-') || 
					  (symbol.top() == '*') || (symbol.top() == '/')))
					{
						c2 = compare[symbol.top()];
					}
					if(c1 > c2)
					{
						symbol.push(pszCalcExpr[i]);
						number.push_back(' ');
						break;
					}
					else
					{
						number.push_back(' ');				
						number.push_back(symbol.top());
						symbol.pop();
					}
				}
			}
		}
	}
	char sym = symbol.top();
	while(symbol.size() > 0)
	{
		number.push_back(' ');
		number.push_back(symbol.top());
		symbol.pop();
	}
	
	for(i = 0; i < number.size(); i++)
	{
		m = 0.0;
		mm = 0.0;
		while((number[i] >= '0') && (number[i] <= '9'))
		{
			m = m * 10 + (number[i] - '0');
			i++;
			if(number[i] == ' ')
			{
				result.push(m);
			}
			else if(number[i] == '.')
			{
				i++;
				n = 1;
				mm = number[i] - '0';
				i++;
				while((number[i] >= '0') && (number[i] <= '9'))
				{   
					n++;
					mm = mm * 10 + (number[i] - '0');
					i++;
				}
				if(number[i] == ' ')
				{
					result.push(m + mm / pow(10.0,n));
				}
			}
		}
		if((number[i] == '+') || (number[i] == '-') || (number[i] == '/') || (number[i] == '*'))
		{
			n1 = result.top();
			result.pop();
			n2 = result.top();
			result.pop();
			switch(number[i])
			{
			case '+':
				result.push(n2 + n1);
				break;
			case '-':
				result.push(n2 - n1);
				break;
			case '*':
				result.push(n2 * n1);
				break;
			case '/':
				if(n1 == 0) { errorCode = kErrorCode_DevideByZero; }
				result.push(n2 / n1);
				break;
			}
		}
	}
	return result.top();
}

int main()
{
	char* express = new char[1000];
	tErroCode error = kErrorCode_NoError;

	cin >> express;

	cout << Calculate(express, error);

	return 0;
}
