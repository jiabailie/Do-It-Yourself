/* A moving and lightening Solar system. */
#include <GL/glut.h>
#include <gl/GL.h>

#define Clear() glClear(GL_COLOR_BUFFER_BIT)

#define WIDTH 1000
#define HEIGHT 1000

static GLfloat angle = 0.0f;

void lightSolarSystem(void)
{
	glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

	glMatrixMode(GL_PROJECTION);
	glLoadIdentity();
	gluPerspective(90.0f, 1.0f, 1.0f, 20.0f);
	glMatrixMode(GL_MODELVIEW);
	glLoadIdentity();
	gluLookAt(0.0, 5.0, -10.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);

	// the sun
	{
	GLfloat sun_light_position[4] = {0.0f, 0.0f, 0.0f, 1.0f};
	GLfloat sun_light_ambient[4] = {0.0f, 0.0f, 0.0f, 1.0f};
	GLfloat sun_light_diffuse[4] = {1.0f, 1.0f, 1.0f, 1.0f};
	GLfloat sun_light_specular[4] = {1.0f, 1.0f, 1.0f, 1.0f};

	glLightfv(GL_LIGHT0, GL_POSITION,sun_light_position);
	glLightfv(GL_LIGHT0, GL_AMBIENT,sun_light_ambient);
	glLightfv(GL_LIGHT0, GL_DIFFUSE,sun_light_diffuse);
	glLightfv(GL_LIGHT0, GL_SPECULAR,sun_light_specular);

	glEnable(GL_LIGHT0);
	glEnable(GL_LIGHTING);
	glEnable(GL_DEPTH_TEST);
	}

	{
	GLfloat sun_mat_ambient[4] = {0.0f, 0.0f, 0.0f, 1.0f};
	GLfloat sun_mat_diffuse[4] = {0.0f, 0.0f, 0.0f, 1.0f};
	GLfloat sun_mat_specular[4] = {0.0f, 0.0f, 0.0f, 1.0f};
	GLfloat sun_mat_emission[4] = {0.5f, 0.0f, 0.0f, 1.0f};
	GLfloat sun_mat_shininess = 0.0f;

	glMaterialfv(GL_FRONT, GL_AMBIENT, sun_mat_ambient);
	glMaterialfv(GL_FRONT, GL_DIFFUSE, sun_mat_diffuse);
	glMaterialfv(GL_FRONT, GL_SPECULAR, sun_mat_specular);
	glMaterialfv(GL_FRONT, GL_EMISSION, sun_mat_emission);
	glMaterialf(GL_FRONT, GL_SHININESS, sun_mat_shininess);

	glutSolidSphere(2.0, 40, 32);
	}

	// the earth
	{
	GLfloat earth_mat_ambient[4] = {0.0f, 0.0f, 0.5f, 1.0f};
	GLfloat earth_mat_diffuse[4] = {0.0f, 0.0f, 0.5f, 1.0f};
	GLfloat earth_mat_specular[4] = {0.0f, 1.0f, 0.0f, 1.0f};
	GLfloat earth_mat_emission[4] = {0.0f, 0.1f, 0.1f, 1.0f};
	GLfloat earth_mat_shininess = 15.0f;

	glMaterialfv(GL_FRONT, GL_AMBIENT, earth_mat_ambient);
	glMaterialfv(GL_FRONT, GL_DIFFUSE, earth_mat_diffuse);
	glMaterialfv(GL_FRONT, GL_SPECULAR, earth_mat_specular);
	glMaterialfv(GL_FRONT, GL_EMISSION, earth_mat_emission);
	glMaterialf(GL_FRONT, GL_SHININESS, earth_mat_shininess);

	glRotatef(angle, 0.0f, -1.0f, 0.0f);
	glTranslatef(5.0f, 0.0f, 0.0f);
	glutSolidSphere(2.0, 40, 32);
	}

	glutSwapBuffers();
}

void doIdle(void)
{
	int i = 0;
	angle += 1.0f;
	if(angle >= 360.0f)
	{
		angle = 0.0f;
	}

	for(i = 0; i < 10000000; i++) { }

	lightSolarSystem();
}

int main(int argc, char* argv[])
{
	glutInit(&argc, argv);
	
	glutInitDisplayMode(GLUT_RGBA | GLUT_DOUBLE);

	glutInitWindowPosition(10, 10);

	glutInitWindowSize(WIDTH, HEIGHT);

	glutCreateWindow("Show something under the light.");

	glutDisplayFunc(&lightSolarSystem);

	glutIdleFunc(&doIdle);

	glutMainLoop();

	return 0;
}
