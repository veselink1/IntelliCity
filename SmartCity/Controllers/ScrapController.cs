using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SmartCity.Models;
using SmartCity.DataSource;
using SmartCity.Services;

namespace SmartCity.Controllers
{
    [Route("api/data")]
    public class ScrapController : Controller
    {

        private readonly IWeatherProvider _weather;

        public ScrapController(IWeatherProvider weather)
        {
            _weather = weather;
        }

        [HttpGet("evn")]
        public async Task<object> GetEVNData()
        {
            try
            {
                return new { data = await EVN.GetData() };
            }
            catch (Exception e)
            {
                return new { error = e.Message };
            }
        }

        [HttpGet("vik")]
        public async Task<object> GetVIKData()
        {
            try
            {
                return new { data = await VIK.GetData() };
            }
            catch (Exception e)
            {
                return new { error = e.Message };
            }
        }

        [HttpGet("weather")]
        public async Task<object> GetWeatherInfo()
        {
            GeoCoords burgasCoords = new GeoCoords
            {
                Latitude = 42.5048,
                Longitude = 27.4626
            };

            return await _weather.GetWeatherInfoAsync(burgasCoords);
        }

        [HttpGet("air")]
        public async Task<object> GetAirData()
        {
            try
            {
                return new { data = await Air.GetData() };
            }
            catch (Exception e)
            {
                return new { error = e.Message };
            }
        }

        [HttpGet("news")]
        public async Task<object> GetNewsData(int page, int category)
        {
            try
            {
                return new { data = await News.GetData(page, category) };
            }
            catch (Exception e)
            {
                return new { error = e.Message };
            }
        }

        [HttpGet("heating")]
        public async Task<object> GetHeatingData()
        {
            try
            {
                return new { data = await Heating.GetData() };
            }
            catch (Exception e)
            {
                return new { error = e.Message };
            }
        }
    }
}