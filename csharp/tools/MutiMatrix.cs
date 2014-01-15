/* Using cache architecture, to minimize the cache miss rate to speed up the calculation of matix multiplication. */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace lab.Tech
{
    public class MultiMatrix
    {
        public static void generateMatrix(int n, ref int[,] a)
        {
            int i = 0, j = 0;
            Random r = new Random();
            for (i = 0; i < n; i++)
            {
                for (j = 0; j < n; j++)
                {
                    a[i, j] = r.Next(0, 10000);
                }
            }
        }
        public static void multiply1(int n, int[,] A, int[,] B)
        {
            int i = 0, j = 0, k = 0;
            int[,] ret = new int[n, n];
            for (i = 0; i < n; i++)
            {
                for (j = 0; j < n; j++)
                {
                    for (k = 0; k < n; k++)
                    {
                        ret[i, j] += A[i, k] * B[k, j];
                    }
                }
            }
        }
        public static void multiply2(int n, int[,] A, int[,] B)
        {
            int i = 0, j = 0, k = 0;
            int[,] ret = new int[n, n];
            int[,] tB = new int[n, n];

            for (i = 0; i < n; i++)
            {
                for (j = 0; j < n; j++)
                {
                    tB[i, j] = B[j, i];
                }
            }
            for (i = 0; i < n; i++)
            {
                for (j = 0; j < n; j++)
                {
                    for (k = 0; k < n; k++)
                    {
                        ret[i, j] += A[i, k] * tB[j, k];
                    }
                }
            }
        }
        public static void compare()
        {
            int n = 1024;
            int[,] A = new int[n, n];
            int[,] B = new int[n, n];

            TimeSpan s1;
            TimeSpan s2;

            generateMatrix(n, ref A);
            generateMatrix(n, ref B);

            DateTime t1 = DateTime.Now;
            multiply1(n, A, B);
            DateTime t2 = DateTime.Now;

            s1 = t2 - t1;

            t1 = DateTime.Now;
            multiply2(n, A, B);
            t2 = DateTime.Now;

            s2 = t2 - t1;

            Console.WriteLine(s1.ToString());
            Console.WriteLine(s2.ToString());
        }
    }
}
