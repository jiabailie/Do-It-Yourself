#include <iostream>
#include <cstdlib>
#include <vector>
#include <stack>
#include <cmath>
#include <map>
#include <cstring>

using namespace std;

enum tErroCode
{
  kErrorCode_NoError = 0,
  kErrorCode_DevideByZero = 1,
  kErrorCode_InvalitExpressionFound = 2,
  kErrorCode_Overflow = 3
};

double Calculate(const char* pszCalcExpr, tErroCode& errorCode)
{
	unsigned int i = 0;
	int c1 = 0, c2 = 0;
	int len = 0, n = 0;
	double m = 0.0, mm = 0.0;
	double n1 = 0, n2 = 0;
	double ret = 0;
	map<char, int> compare;

	vector<char>s;
	stack<char,vector<char> >symbol;
	stack<char,vector<double> >result;
	vector<char>number;

	/* the priority of * and / is higher than + - */
	compare['+'] = 1;
	compare['-'] = 1;
	compare['*'] = 2;
	compare['/'] = 2;

	/* initialize the errorCode as 0 */
	errorCode = kErrorCode_NoError;

	len = strlen(pszCalcExpr);

	/****************************** the main loop which generates the vectors ******************************/
	for(i = 0; i < len && errorCode == kErrorCode_NoError; i++)
	{
		if((i == len - 1 || i == 0) && ((pszCalcExpr[i] == '+') || (pszCalcExpr[i] == '-') || (pszCalcExpr[i] == '*') || (pszCalcExpr[i] == '/')))
		{
			errorCode = kErrorCode_InvalitExpressionFound;
			break;
		}

		if(((pszCalcExpr[i] >= '0') && (pszCalcExpr[i] <= '9')) || (pszCalcExpr[i] == '.'))
		{
			number.push_back(pszCalcExpr[i]);
		}

		/* if encounter left brackets */
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

					/* c1 is * or /, and c2 is + or - */
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

			/* if there is no right brackets */
			if(i == len)
			{
				errorCode = kErrorCode_InvalitExpressionFound;
				break;
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

	/****************************** if the formula has no error, calculate the result ******************************/
	if(errorCode == kErrorCode_NoError)
	{
		char sym = symbol.top();
		while(symbol.size() > 0)
		{
			number.push_back(' ');
			number.push_back(symbol.top());
			symbol.pop();
		}

		for(i = 0; i < number.size() && errorCode == kErrorCode_NoError; i++)
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
						result.push(m + mm / pow(10.0, n));
					}
				}
			}
			/* calculate the value and judge if the results overflow */
			if((number[i] == '+') || (number[i] == '-') || (number[i] == '/') || (number[i] == '*'))
			{
				/* if there are no enough parameters to calculate */
				if(result.size() < 2)
				{
					errorCode = kErrorCode_InvalitExpressionFound;
					break;
				}

				n1 = result.top();
				result.pop();

				n2 = result.top();
				result.pop();

				switch(number[i])
				{
				case '+':
				    if((n1 > 0 && n2 > 0 && n1 + n2 < 0) || (n1 < 0 && n2 < 0 && n1 + n2 > 0)) { errorCode = kErrorCode_Overflow; }
				    else                                                                       { result.push(n2 + n1); }
				    break;
				case '-':
				    result.push(n2 - n1);
				    break;
				case '*':
				    m = n1 * n2;
				    if(m / n1 != n2) { errorCode = kErrorCode_Overflow; }
				    else             { result.push(n2 * n1); }
				    break;
				case '/':
				    if(n1 == 0) { errorCode = kErrorCode_DevideByZero; }
				    else        { result.push(n2 / n1); }
				    break;
				}
			}
		}

		if(errorCode == kErrorCode_NoError)
		{
			ret = result.top();
		}
	}

	return ret;
}

int main()
{
	char* express = new char[1000];
	tErroCode error = kErrorCode_NoError;

	cin >> express;

	cout << Calculate(express, error);
	cout << endl << error;

	return 0;
}
