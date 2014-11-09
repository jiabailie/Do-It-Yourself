/* This program is designed to display an image, then getting a snapshot to save as a bitmap image.
 * But, as a result, the saved image has some problem, it will be all black.
 * Thus, it needs some modification later.
 */
#include <stdio.h>
#include <stdlib.h>
#include <gl\glut.h>

#define WindowWidth  500
#define WindowHeight 500

#define BMP_HEADER_LENGTH 54

void grab(void)
{
	FILE* pDummyFile = 0;
	FILE* pWritingFile = 0;
	GLubyte* pPixelData = 0;

	GLubyte BMP_Header[BMP_HEADER_LENGTH];
	GLint i = 0, j = 0;
	GLint PixelDataLength = 0;

	i = WindowWidth * 3;
	while(i % 4)
	{
		i++;
	}

	PixelDataLength = i * WindowHeight;

	pPixelData = (GLubyte*)malloc(PixelDataLength);
	if(!pPixelData)
	{
		exit(0);
	}

	pDummyFile = fopen("E:/Projects/clab/img/dummy.bmp", "rb");
	if(!pDummyFile)
	{
		exit(0);
	}

	pWritingFile = fopen("E:/Projects/clab/img/grab.bmp", "wb");
	if(!pWritingFile)
	{
		exit(0);
	}

	glPixelStorei(GL_UNPACK_ALIGNMENT, 4);
	glReadPixels(0, 0, WindowWidth, WindowHeight, GL_BGR_EXT, GL_UNSIGNED_BYTE, pPixelData);

	fread(BMP_Header, sizeof(BMP_Header), 1, pDummyFile);
	fwrite(BMP_Header, sizeof(BMP_Header), 1, pWritingFile);

	fseek(pWritingFile, 0x0012, SEEK_SET);

	i = WindowWidth;
	j = WindowHeight;

	fwrite(&i, sizeof(i), 1, pWritingFile);
	fwrite(&j, sizeof(j), 1, pWritingFile);

	fseek(pWritingFile, 0, SEEK_END);
	fwrite(pPixelData, PixelDataLength, 1, pWritingFile);

	fclose(pDummyFile);
	fclose(pWritingFile);
	free(pPixelData);
}

void display(void)
{
	glClear(GL_COLOR_BUFFER_BIT);

	glBegin(GL_TRIANGLES);
		glColor3f(1.0f, 0.0f, 0.0f); glVertex2f(0.0f, 0.0f);
		glColor3f(0.0f, 1.0f, 0.0f); glVertex2f(1.0f, 0.0f);
		glColor3f(0.0f, 0.0f, 1.0f); glVertex2f(0.5f, 1.0f);
	glEnd();

	glPixelZoom(-0.5f, -0.5f);
	glRasterPos2i(1, 1);
	glCopyPixels(WindowWidth / 2, WindowHeight / 2,
		WindowWidth / 2, WindowHeight / 2, GL_COLOR);

	glutSwapBuffers();
	grab();
}

int main(int argc, char* argv[])
{
	glutInit(&argc, argv);

	glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGBA);

	glutInitWindowPosition(0, 0);

	glutInitWindowSize(WindowWidth, WindowHeight);

	glutCreateWindow("Snapshot");

	glutDisplayFunc(&display);

	glutMainLoop();

	return 0;
}
