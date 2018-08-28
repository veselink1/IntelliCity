using HtmlAgilityPack;
using SmartCity.Utilities;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace SmartCity.DataSource
{
    public static class News
    {
        private static string address = @"http://faragency.bg/bg/{0}/index{1}.html";

        public static async Task<IEnumerable<Item>> GetData(int page,int category)
        {
            string url = string.Format(address ,GetCategory(category) ,page);
            var doc = new HtmlDocument();
            doc.LoadHtml(await NetworkUtilities.LoadData(url, 65001));
            var findclasses = doc.DocumentNode
                .Descendants("div")
                .Where(d =>
                   d.Attributes.Contains("class")
                   &&
                   d.Attributes["class"].Value.Contains("f_news")
                );
            List<Item> NList = new List<Item>();
            foreach (var element in findclasses)
            {
                Item item = new Item
                {
                    Title = element.ChildNodes[0].ChildNodes[1].InnerText,
                    Picture = @"http://faragency.bg/" + element.ChildNodes[0].ChildNodes[0].Attributes["src"].Value,
                    Date = element.ChildNodes[1].ChildNodes[0].InnerText.Replace(".", "/"),
                    Description = element.ChildNodes[2].InnerText.Replace("/r/n", ""),
                    Link = @"http://faragency.bg/" + element.ChildNodes[0].Attributes["href"].Value
                };
                NList.Add(item);
            }
            return NList;
        }

        private static string GetCategory(int category)
        {
            switch(category)
            {
                case 0:
                    return "burgas";
                case 1:
                    return "region";
                case 2:
                    return "biznes";
                case 3:
                    return "krimi1";
                case 4:
                    return "lyubopitno";
                case 6:
                    return "sport";
                case 7:
                    return "aytos";
                default:
                    return "lyubopitno";

            }
        }

        public class Item
        {
            public string Title { get; set; }
            public string Picture { get; set; }
            public string Date { get; set; }
            public string Description { get; set; }
            public string Link { get; set; }
        }
    }
}
