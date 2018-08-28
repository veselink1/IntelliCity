using HtmlAgilityPack;
using Newtonsoft.Json;
using SmartCity.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace SmartCity.DataSource
{
    public static class EVN
    {
        private static string url = @"http://elyug.bg/oldservices/ec_ep/abschaltung_bg/abschaltung1.asp";
        public static async Task<object> GetData()
        {
            var doc = new HtmlDocument();
            doc.LoadHtml(await NetworkUtilities.LoadData(url, 1251));
            var data = doc.DocumentNode.SelectNodes("//body/table/tr");
            List<List<string>> tables = new List<List<string>>();
            List<string> table = new List<string>();
            foreach (var element in data)
            {
                if (element.Attributes.Count != 0)
                {
                    string row = element.ChildNodes[3].InnerHtml;
                    string[] rows;
                    switch (table.Count)
                    {
                        case 1:
                            row = row.Replace("<strong>", "").Replace("</strong>", "");
                            break;
                        case 2:
                            row = row.Replace("\r\n", " ").Replace("  ", " ");
                            break;
                        case 3:
                            row = row.Replace(" ", "");
                            rows = row.Split("-");
                            table.Add(rows[0]);
                            row = rows[1];
                            break;
                        case 5:
                            rows = row.Replace(" ", "").Replace("г.", "").Split("&nbsp;&#1076;&#1086;\r\n");
                            table.Add(rows[0]);
                            row = rows[1];
                            break;
                    }
                    table.Add(row);
                }
                else
                {
                    if (table.Count != 0) tables.Add(table);
                    table = new List<string>();
                }
            }
            return tables;
        }

    }
}
