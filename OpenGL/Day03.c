#define DEBUG1
#define DEBUG2

#include <GL/glut.h>
#include <gl/GL.h>
#include <math.h>
#include <stdio.h>
#include <stdlib.h>

#define Clear() glClear(GL_COLOR_BUFFER_BIT)

const GLfloat Pi = 3.1415926536f;

/* Draw a rectangle with certain color. */
void drawColorRectangle(void)
{
	Clear();
	
	glColor3f(0.27f, 0.7f, 0.0f);
	glRectf(-0.5f, -0.5f, 0.5f, 0.5f);
	
	glFlush();
}

/* Using certain color to clean the screen. */
void clearScreen(void)
{
	glClearColor(1.0f, 1.0f, 1.0f, 0.0f);
	Clear();
	glFlush();
}

/* Draw some shapes using color model. */
void drawUsingColorModel(void)
{
	int i = 0;

#ifdef DEBUG1
	glShadeModel(GL_SMOOTH); // Smooth color
#else
	glShadeModel(GL_FLAT); // Single color
#endif

	Clear();
	glBegin(GL_TRIANGLE_FAN);
	glColor3f(1.0f, 1.0f, 1.0f);
	glVertex2f(0.0f, 0.0f);

	for(i = 0; i <= 16; i++)
	{
#ifdef DEBUG2
		glColor3f(i & 0x04, i & 0x02, i & 0x01);
#else
		glColor4f(i & 0x08, i & 0x04, i & 0x02, i & 0x01);
#endif
		glVertex2f(cos(i * Pi / 4), sin(i * Pi / 4));
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
	glutDisplayFunc(&drawUsingColorModel);
	glutMainLoop();

	return 0;
}
