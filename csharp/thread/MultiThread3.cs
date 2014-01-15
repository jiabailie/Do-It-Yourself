using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;

namespace lab
{
    public class MultiThread3
    {
        private void print(int o)
        {
            Console.WriteLine(string.Format("MultiThread3:{0}", o));
            Thread.Sleep(1000 * 10);
        }

        public string TestMultiThread()
        {
            for (int i = 0; i < 10; i++)
            {
                int tmp = i;
                ThreadStart start = delegate { print(tmp); };
                new Thread(start).Start();
            }

            return "finish";
        }
    }
}