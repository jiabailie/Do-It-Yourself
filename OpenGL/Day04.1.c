/* A moving Solar system. */
#define DEBUG1
#define DEBUG2
#include <GL/glut.h>
#include <gl/GL.h>
#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#define Clear() glClear(GL_COLOR_BUFFER_BIT)

const GLfloat Pi = 3.1415926536f;

static int day = 56;

/* Calculate the frame frequency. */
double calFrequency(void)
{
	static int count = 0;
	static double save = 0.0;
	static clock_t last = 0, current = 0;
	double timegap = 0.0;

	count++;
	if(count <= 50)
	{
		return save;
	}

	count = 0;
	last = current;
	current = clock();
	timegap = (current - last) / (double)CLK_TCK;
	save = 50.0 / timegap;

	return save;
}

void drawSolarSystem(void)
{
	double FPS = calFrequency();
	printf("FPS = %f\n", FPS);

	glEnable(GL_DEPTH_TEST);
	glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

	glMatrixMode(GL_PROJECTION);
	glLoadIdentity();
	gluPerspective(75, 1, 1, 40000000);
	glMatrixMode(GL_MODELVIEW);
	glLoadIdentity();
	gluLookAt(0, -20000000, 20000000, 0, 0, 0, 0, 0, 1);

	// draw the sun
	glColor3f(1.0f, 0.0f, 0.0f);
	glutSolidSphere(6960000, 20, 20);

	// draw the earth
	glColor3f(0.0f, 0.0f, 1.0f);
	glRotatef(day / 360.0 * 360.0, 0.0f, 0.0f, -1.0f);
	glTranslatef(15000000, 0.0f, 0.0f);
	glutSolidSphere(1594500, 20, 20);

	// draw the moon
	glColor3f(1.0f, 1.0f, 0.0f);
	glRotatef(day / 30.0 * 360.0 - day / 360.0 * 360.0, 0.0f, 0.0f, -1.0f);
	glTranslatef(3800000, 0.0f, 0.0f);
	glutSolidSphere(434500, 20, 20);

	glFlush();

	glutSwapBuffers();
}

void sysIdle(void)
{
	int i = 0;
	day = (day + 1) % 360;

	for(i = 0; i < 30000000; i++) { }
	drawSolarSystem();
}

int main(int argc, char* argv[])
{
	glutInit(&argc, argv);

	glutInitDisplayMode(GLUT_RGB | GLUT_DOUBLE);
	glutInitWindowPosition(0, 0);
	glutInitWindowSize(1000, 1000);

	glutCreateWindow("The moving solar system.");
	glutDisplayFunc(&drawSolarSystem);
	glutIdleFunc(&sysIdle);

	glutMainLoop();

	return 0;
}
