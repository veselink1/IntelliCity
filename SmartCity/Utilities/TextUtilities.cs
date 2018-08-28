using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace SmartCity.Utilities
{
    public static class TextUtilities
    {
        public static string ToUnicode(string text)
        {
            Encoding unicode = Encoding.Unicode;
            byte[] unicodeBytes = unicode.GetBytes(text);
            return (unicode.GetString(unicodeBytes, 0, unicodeBytes.Length));
        }

        public static string ExtractText(HtmlNode node)
        {
            var sb = new StringBuilder();
            foreach (var textNode in node.Descendants().Where(x => x.NodeType == HtmlNodeType.Text))
            {
                if (textNode.ParentNode.Name != "script" || textNode.ParentNode.Name != "style")
                {
                    sb.Append(textNode.InnerText);
                }
            }

            var text = sb.ToString();
            return Regex
                .Replace(text, @"\s{2,}", " ")
                .Trim();
        }
    }
}
