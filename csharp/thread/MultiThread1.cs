using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;

namespace lab
{
    public class MultiThread1
    {
        public string TestMultiThread()
        {
            for (int i = 0; i < 10; i++)
            {
                PrintClass p = new PrintClass(i);
                p.DoPrint();
            }

            return "finish";
        }
    }

    public class PrintClass
    {
        public int o = 0;
        private Thread thread = null;
        public PrintClass(int _o)
        {
            o = _o;
        }

        public void Print()
        {
            Console.WriteLine(string.Format("MultiTHread1:{0}", o));
            Thread.Sleep(1000 * 10);
        }

        public void DoPrint()
        {
            thread = new Thread(new ThreadStart(Print));
            thread.Start();
        }
    }
}
