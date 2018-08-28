using HtmlAgilityPack;
using SmartCity.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace SmartCity.DataSource
{
    public static class Heating
    {
        private static string url = @"https://toplo-bs.com/index.php?limitstart=0";

        public static async Task<IEnumerable<object>> GetData()
        {
            var doc = new HtmlDocument();
            doc.LoadHtml(await NetworkUtilities.LoadData(url, 65001));
            var panes = doc.DocumentNode
                .Descendants("table")
                .First(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("blog"))
                .Descendants("div")
                .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("contentpaneopen"));

            var data = panes.Select(pane =>
            {
                var heading = pane.ChildNodes.First(child =>
                    child.Attributes.Contains("class")
                    && child.Attributes["class"].Value.Contains("contentheading"));

                var content = pane.ChildNodes.First(child =>
                    child.Attributes.Contains("class")
                    && child.Attributes["class"].Value.Contains("article-content"));

                return new
                {
                    Title = TextUtilities.ExtractText(heading),
                    Content = TextUtilities.ExtractText(content)
                };
            });

            return data;
        }
    }
}
