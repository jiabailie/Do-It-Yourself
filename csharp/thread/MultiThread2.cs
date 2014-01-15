using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;

namespace lab
{
    public class MultiThread2
    {
        private delegate void PrintDelegate(int o);
        private void print(int o)
        {
            Console.WriteLine(string.Format("MultiTHread2:{0}", o));
            Thread.Sleep(1000 * 10);
        }
        public string TestMultiThread()
        {
            for (int i = 0; i < 10; i++)
            {
                PrintDelegate pd = new PrintDelegate(print);
                pd.BeginInvoke(i, null, null);
            }
            return "finish";
        }
    }
}
