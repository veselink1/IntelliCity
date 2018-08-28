using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace SmartCity.Utilities
{
    public static class NetworkUtilities
    {

        public static async Task<string> LoadData(string url,int codePage)
        {
            HttpClient client = new HttpClient();
            HttpResponseMessage response = await client.GetAsync(url);
            byte[] bytes = await response.Content.ReadAsByteArrayAsync();
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
            Encoding encoding = Encoding.GetEncoding(codePage);
            string responseString = encoding.GetString(bytes, 0, bytes.Length);
            return responseString;
        }
    }
}
