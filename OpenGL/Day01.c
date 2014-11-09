#include <GL/glut.h>
#include <math.h>
#define Clear() glClear(GL_COLOR_BUFFER_BIT)

const int n = 5;
const GLfloat R = 0.5f;
const GLfloat Pi = 3.1415926536f;
const GLfloat factor = 0.1f;

/* Draw a circle. */
void drawCircle(void)
{
	int i = 0;

	Clear();
	glBegin(GL_POLYGON);

	for(i = 0; i < n; i++)
	{
		glVertex2f(R * cos(2 * Pi * i / n), R * sin(2 * Pi * i / n));
	}

	glEnd();
	glFlush();
}

/* Draw a polygon. */
void drawPolygon(void)
{
	int i = 0, j = 0;
	int m = 5, s = 2; // The polygon has m nodes, and line step is 2.

	Clear();
	glBegin(GL_LINE_LOOP);

	for(i = 0; i < m; i++)
	{
		j = (1 + s * i) % m;
		glVertex2f(R * cos(2 * Pi * j / m), R * sin(2 * Pi * j / m));
	}

	glEnd();
	glFlush();
}

/* Draw sin image. */
void drawSin(void)
{
	GLfloat x = 0;

	Clear();
	glBegin(GL_LINES);

	glVertex2f(-1.0f, 0.0f);
	glVertex2f(1.0f, 0.0f);
	glVertex2f(0.0f, -1.0f);
	glVertex2f(0.0f, 1.0f);

	glEnd();
	glBegin(GL_LINE_STRIP);

	for(x = -1.0f / factor; x < 1.0f / factor; x += 0.01f)
	{
		glVertex2f(x * factor, sin(x) * factor);
	}

	glEnd();
	glFlush();
}

int main(int argc, char* argv[])
{
	glutInit(&argc, argv);
	
	glutInitDisplayMode(GLUT_RGB | GLUT_SINGLE);
	glutInitWindowPosition(100, 100);
	glutInitWindowSize(400, 400);
	
	glutCreateWindow("The first OpenGL programme.");
	glutDisplayFunc(&drawSin);
	glutMainLoop();

	return 0;
}
