using System;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.IO;

/// <summary>
/// Download Web elements.
/// </summary>
public class WebDownLoad
{
    private CookieContainer cookie = new CookieContainer();

    private string contentType = "application/x-www-form-urlencoded";

    private string accept = "image/gif, image/x-xbitmap, image/jpeg, image/pjpeg, application/x-shockwave-flash, " +
        "application/x-silverlight, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/msword, " +
        "application/x-ms-application, application/x-ms-xbap, application/vnd.ms-xpsdocument, application/xaml+xml, application/x-silverlight-2-b1, */*";

    private string userAgent = "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 2.0.50727; .NET CLR 3.0.04506.648; .NET CLR 3.5.21022)";

    /// <summary>
    /// Download a web page, and return its source code.
    /// </summary>
    /// <param name="url">page's link.</param>
    /// <returns>Html source code.</returns>
    public string DownloadWebPage(string url)
    {
        HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
        request.UserAgent = userAgent;
        request.ContentType = contentType;
        request.CookieContainer = cookie;
        request.Accept = accept;
        request.Method = "get";

        WebResponse response = request.GetResponse();
        Stream responseStream = response.GetResponseStream();
        Encoding encoding = null;
        for (int i = 0; i < response.Headers.Count; i++)
        {
            Match m = Regex.Match(response.Headers[i].ToString(), "(?i)(?<=charset=)[^ ]+");
            if (!m.Success) continue;
            encoding = Encoding.GetEncoding(m.Value);
            break;
        }
        StreamReader reader = new StreamReader(responseStream, encoding);
        String html = reader.ReadToEnd();
        response.Close();

        return html;
    }

    /// <summary>
    /// Download a web file and save it.
    /// </summary>
    /// <param name="url">File's link.</param>
    /// <param name="savepath">Saving location and file name(full path).</param>
    /// <returns></returns>
    public bool DownloadWebFile(string url, string savepath)
    {
        try
        {
            Uri uri = new Uri(url);
            HttpWebRequest request = (HttpWebRequest)HttpWebRequest.Create(uri);
            request.Method = "GET";
            request.ContentType = "application/x-www-form-urlencoded";

            HttpWebResponse response = (HttpWebResponse)request.GetResponse();

            long totalBytes = 0;
            if (response.ContentLength > 0)
            {
                Stream stream = response.GetResponseStream();
                Stream save = new FileStream(savepath, FileMode.Create);

                byte[] data = new byte[1024];
                int dsize = stream.Read(data, 0, (int)data.Length);
                while (dsize > 0)
                {
                    totalBytes += dsize;
                    save.Write(data, 0, dsize);
                    dsize = stream.Read(data, 0, (int)data.Length);
                }

                save.Close();
                stream.Close();

                return true;
            }
        }
        catch (Exception)
        {
            return false;
        }
        return true;
    }
}