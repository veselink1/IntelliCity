using HtmlAgilityPack;
using SmartCity.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace SmartCity.DataSource
{
    public static class VIK
    {
        private static string url = @"http://vik-burgas.com/page/53-Rajon-Burgas";

        public static async Task<IEnumerable<string>> GetData()
        {
            var doc = new HtmlDocument();
            doc.LoadHtml(await NetworkUtilities.LoadData(url, 65001));
            var container = doc.DocumentNode
                .Descendants("div")
                .First(d =>
                    d.Attributes.Contains("class")
                    &&
                    d.Attributes["class"].Value.Contains("span9")
                );

            return container.ChildNodes
                .Select(node => node.InnerText)
                .Select(text => Regex
                    .Replace(text, @"\s{2,}", " ")
                    .Trim())
                .Where(text => text.Length > 0)
                // Skip the title node (Район Бургас).
                .Skip(1)
                // And the useless ending comment.
                .SkipLast(1);
        }
    }
}
