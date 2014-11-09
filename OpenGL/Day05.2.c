#include <gl/glut.h>
#include <stdio.h>
#include <math.h>

#define WIDTH 400
#define HEIGHT 400
#define ColoredVertex(c, v) do { glColor3fv(c); glVertex3fv(v); } while(0)

#define d1
#define d2
#undef  d1
#undef  d2

GLfloat angle = 0.0f;

void Display(void)
{
	glClear(GL_COLOR_BUFFER_BIT);

	glEnable(GL_BLEND);

#ifdef	d1
	glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
#elif	d2
	glBlendFunc(GL_ONE, GL_ONE);
#else
	glBlendFunc(GL_ONE, GL_ZERO);
#endif

	glColor4f(1, 0, 0, 0.5);
	glRectf(-1, -1, 0.5, 0.5);
	glColor4f(0, 1, 0, 0.5);
	glRectf(-0.5, -0.5, 1, 1);

	glutSwapBuffers();
}

int main(int argc, char* argv[])
{
	glutInit(&argc, argv);

	glutInitDisplayMode(GLUT_RGBA | GLUT_DOUBLE);

	glutInitWindowPosition(200, 200);
	glutInitWindowSize(WIDTH, HEIGHT);

	glutCreateWindow("OpenGL Day05");

	glutDisplayFunc(&Display);

	glutMainLoop();

	return 0;
}
