using HtmlAgilityPack;
using SmartCity.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartCity.DataSource
{

    public static class Air
    {
        private static string address = @"http://air.burgas.bg/bg/air/index/6/?date={0}-{1}-{2}&hour={3}";

        //Condition Info
        // -1 - Only Text
        //  0 - N/A
        //  1 - Very Good
        //  2 - Good
        //  3 - Average
        //  4 - Bad

        //Table Info
        //Долно Езерово - 0
        //Меден Рудник - 1
        //Бургас OPSIS - 2
        //МОБИЛНА СТАНЦИЯ - 3

        //Row Info
        // SO2 - 0
        // NO2 - 1
        // O3 - 2
        // H2S - 3
        // PM10 - 4
        // Benzene - 5  
        // Styrene - 6
        // Total - 7
        public static async Task<object> GetData()
        {
            string url = string.Format(address, DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, DateTime.Now.Hour - 1);
            var doc = new HtmlDocument();
            doc.LoadHtml(await NetworkUtilities.LoadData(url, 65001));
            var findclasses = doc.DocumentNode
                .Descendants("div")
                .First(d =>
                   d.Attributes.Contains("class")
                   &&
                   d.Attributes["class"].Value.Contains("statsTable ")
                );
            List<List<Cell>> table = new List<List<Cell>>
                {
                    GetRow(findclasses.ChildNodes[1].ChildNodes[7]),
                    GetRow(findclasses.ChildNodes[1].ChildNodes[11]),
                    GetRow(findclasses.ChildNodes[1].ChildNodes[15]),
                    GetRow(findclasses.ChildNodes[1].ChildNodes[19])
                };
            int totalCondition = 0;
            if (findclasses.ChildNodes[3].ChildNodes[3].Attributes["src"].Value.Contains("white")) totalCondition = 0;
            if (findclasses.ChildNodes[3].ChildNodes[3].Attributes["src"].Value.Contains("green")) totalCondition = 1;
            if (findclasses.ChildNodes[3].ChildNodes[3].Attributes["src"].Value.Contains("yellow")) totalCondition = 2;
            if (findclasses.ChildNodes[3].ChildNodes[3].Attributes["src"].Value.Contains("orange")) totalCondition = 3;
            if (findclasses.ChildNodes[3].ChildNodes[3].Attributes["src"].Value.Contains("red")) totalCondition = 4;
            return new { table = table, totalCondition = totalCondition };
        }
        private class Cell
        {
            public int Condition { get; set; }
            public double Value { get; set; }
        }

        private static List<Cell> GetRow(HtmlNode element)
        {
            List<Cell> row = new List<Cell>();
            foreach (var td in element.ChildNodes)
            {
                if (td.Name != "#text")
                {
                    Cell cell = new Cell();
                    if (!((td.ChildNodes.Count == 1) && (td.ChildNodes[0].Name == "#text")))
                    {
                        if (td.ChildNodes[0].Attributes["src"].Value.Contains("white")) cell.Condition = 0;
                        if (td.ChildNodes[0].Attributes["src"].Value.Contains("green")) cell.Condition = 1;
                        if (td.ChildNodes[0].Attributes["src"].Value.Contains("yellow")) cell.Condition = 2;
                        if (td.ChildNodes[0].Attributes["src"].Value.Contains("orange")) cell.Condition = 3;
                        if (td.ChildNodes[0].Attributes["src"].Value.Contains("red")) cell.Condition = 4;
                    }
                    else cell.Condition = -1;
                    if ((td.InnerText != null) && (td.InnerText != ""))
                    {
                        if (row.Count != 3)
                            cell.Value = double.Parse(td.InnerText.Replace("ug/m3", "").Replace(" ", ""));
                        else
                            cell.Value = double.Parse(td.InnerText.Replace("mg/m3", "").Replace(" ", "")) * 1000;
                    }
                    else
                    {
                        cell.Value = 0;
                    }
                    row.Add(cell);
                }
            }
            return row;
        }
    }
}
