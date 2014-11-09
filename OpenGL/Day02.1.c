#define DEBUG
#include <GL/glut.h>
#include <math.h>
#define Clear() glClear(GL_COLOR_BUFFER_BIT)

/* Draw different size of points. */
void drawPoint(void)
{
	Clear();
	
	glPointSize(5.0f); // size of points by pixels.
	glBegin(GL_POINTS);
	
	glVertex2f(0.0f, 0.0f);
	glVertex2f(0.5f, 0.5f);
	
	glEnd();
	glFlush();
}

/* Draw dash lines. */
void drawDashlines(void)
{
	Clear();
	
	glEnable(GL_LINE_STIPPLE);
	glLineStipple(1, 0xAAAA);
	/*
	glLineStipple(factor, pattern)
	factor = {1, 2, 3, 4};
	pattern = {0x00FF, 0x0C0F, 0xAAAA};
	*/
	glLineWidth(2.0f);
	glBegin(GL_LINES);
	
	glVertex2f(0.0f, 0.0f);
	glVertex2f(0.5f, 0.5f);
	
	glEnd();
	glFlush();
}

/* Another example to draw a polygon. */
void drawPolygon(void)
{
	Clear();

	glPolygonMode(GL_FRONT, GL_FILL);
	glPolygonMode(GL_BACK, GL_LINE);

#ifdef DEBUG
	glFrontFace(GL_CW);
#else
	glFrontFace(GL_CCW);
#endif
	glBegin(GL_POLYGON);
	glVertex2f(-0.5f, -0.5f);
	glVertex2f(0.0f, -0.5f);
	glVertex2f(0.0f, 0.0f);
	glVertex2f(-0.5f, 0.0f);
	glEnd();

	glBegin(GL_POLYGON);
	glVertex2f(0.0f, 0.0f);
	glVertex2f(0.0f, 0.5f);
	glVertex2f(0.5f, 0.5f);
	glVertex2f(0.5f, 0.0f);
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
	glutDisplayFunc(&drawPolygon);
	glutMainLoop();

	return 0;
}
