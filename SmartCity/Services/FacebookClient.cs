using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace SmartCity.Services
{
    public class FacebookClient
    {
        private readonly HttpClient _httpClient;

        public FacebookClient()
        {
            _httpClient = new HttpClient { BaseAddress = new Uri("https://graph.facebook.com/v2.9/") };
        }

        public async Task<Dictionary<string, object>> GetAccountAsync(string accessToken, params string[] fields)
        {
            string fieldsParam = String.Join(',', fields);
            var response = await _httpClient.GetAsync($"me?access_token={accessToken}&fields={fieldsParam}");
            var result = await response.Content.ReadAsStringAsync();
            var account = JsonConvert.DeserializeObject<Dictionary<string, object>>(result);
            return account;
        }
    }
}
