/**
 * Call a running webservice using its url, namespace, classname and methodname.
 * eg. WebServiceHelper.InvokeWebService("http://localhost/Facade.asmx", "TestRunner.Facade", "Facade", "OrcishPigeon", 
 *                                       new object[] { "<Request><Header RequestType=\"System.TestRunner.Refresh\" /></Request>" });
 */
using System;
using System.IO;
using System.Net;
using System.Xml;
using System.Web.Services;
using System.Data;
using System.Web.Services.Description;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Security.Permissions;
using Microsoft.CSharp;

public class WebServiceHelper
{
    public static object InvokeWebService(string url, string @namespace, string classname, string methodname, object[] args)
    {
        try
        {
            System.Net.WebClient wc = new System.Net.WebClient();
            System.IO.Stream stream = wc.OpenRead(url + "?WSDL");
            System.Web.Services.Description.ServiceDescription sd = System.Web.Services.Description.ServiceDescription.Read(stream);
            System.Web.Services.Description.ServiceDescriptionImporter sdi = new System.Web.Services.Description.ServiceDescriptionImporter();
            sdi.AddServiceDescription(sd, "", "");
            System.CodeDom.CodeNamespace cn = new System.CodeDom.CodeNamespace(@namespace);
            System.CodeDom.CodeCompileUnit ccu = new System.CodeDom.CodeCompileUnit();
            ccu.Namespaces.Add(cn);
            sdi.Import(cn, ccu);

            Microsoft.CSharp.CSharpCodeProvider csc = new Microsoft.CSharp.CSharpCodeProvider();
            System.CodeDom.Compiler.ICodeCompiler icc = csc.CreateCompiler();

            System.CodeDom.Compiler.CompilerParameters cplist = new System.CodeDom.Compiler.CompilerParameters();
            cplist.GenerateExecutable = false;
            cplist.GenerateInMemory = true;
            cplist.ReferencedAssemblies.Add("System.dll");
            cplist.ReferencedAssemblies.Add("System.XML.dll");
            cplist.ReferencedAssemblies.Add("System.Web.Services.dll");
            cplist.ReferencedAssemblies.Add("System.Data.dll");

            System.CodeDom.Compiler.CompilerResults cr = icc.CompileAssemblyFromDom(cplist, ccu);
            if (true == cr.Errors.HasErrors)
            {
                System.Text.StringBuilder sb = new System.Text.StringBuilder();
                foreach (System.CodeDom.Compiler.CompilerError ce in cr.Errors)
                {
                    sb.Append(ce.ToString());
                    sb.Append(System.Environment.NewLine);
                }
                throw new Exception(sb.ToString());
            }
            System.Reflection.Assembly assembly = cr.CompiledAssembly;
            Type t = assembly.GetType(@namespace + "." + classname, true, true);
            object obj = Activator.CreateInstance(t);
            System.Reflection.MethodInfo mi = t.GetMethod(methodname);
            return mi.Invoke(obj, args);
        }
        catch (Exception ex)
        {
            throw new Exception(ex.InnerException.Message, new Exception(ex.InnerException.StackTrace));
        } 
    }
}