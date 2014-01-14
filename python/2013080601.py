#################################################################################################################
# A tokenizer or scanner analyzes a string to categorize groups of characters.  		                #
# This is a useful first step in writing a compiler or interpreter.				                #
# The text categories are specified with regular expressions.							#
# The technique is to combine those into a single master regular expression and to loop over successive matches #
#################################################################################################################

import collections
import re

Token = collections.namedtuple('Token', ['typ', 'value', 'line', 'column'])

def tokenize(s):
	keywords = {'IF', 'THEN', 'ENDIF', 'FOR', 'NEXT', 'GOSUB', 'RETURN'}
	token_specification = [
		('NUMBER', r'\d+(\.\d*)?'), # Integer or decimal number
		('ASSIGN', r':='),          # Assignment operator
		('END',    r';'),           # Statement terminator
		('ID',     r'[A-Za-z]+'),   # Identifiers
		('OP',     r'[+*\/\-]'),    # Arithmetic operators
		('NEWLINE',r'\n'),          # Line endings
		('SKIP',   r'[ \t]'),       # Skip over spaces and tabs
	]

	tok_regex = '|'.join('(?P<%s>%s)' % pair for pair in token_specification)
	get_token = re.compile(tok_regex).match
	line = 1
	pos = line_start = 0
	mo = get_token(s)

	while mo is not None:
		typ = mo.lastgroup
		if typ == 'NEWLINE':
			line_start = pos
			line += 1
		elif typ != 'SKIP':
			val = mo.group(typ)
			if typ == 'ID' and val in keywords:
				typ = val
			yield Token(typ, val, line, mo.start() - line_start)
		pos = mo.end()
		mo = get_token(s, pos)
	if pos != len(s):
		raise RuntimeError('Unexpected character %r on line %d' % (s[pos], line))

statements = '''
	IF quantity THEN
		total := total + price * quantity;
		tax := price * 0.05
	ENDIF;
'''

for token in tokenize(statements):
	print (token)
