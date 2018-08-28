using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SmartCity.Models;
using Microsoft.AspNetCore.Authorization;

namespace SmartCity.Controllers
{
    [Route("api/userdata")]
    public class UserDataController : Controller
    {
        private SmartContext _context;
        public UserDataController(SmartContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpPost("postwidget")]
        public object PostWidget([FromBody] Widget widget)
        {
            try
            {
                var email = HttpContext.User.Claims.First().Value;
                var user = _context.User.First(x => x.Email == email);
                widget.UserID = user.ID;
                _context.Widget.Add(widget);
                _context.SaveChanges();
                widget = _context.Widget.OrderByDescending(x => x.ID).First(x => x.UserID == user.ID);
                return new { widget = widget };
            }
            catch(Exception ex)
            {
                return new { error = ex.Message };
            }
        }

        [Authorize]
        [HttpGet("getwidget")]
        public object GetWidget(int widgetID)
        {
            try
            {
                var email = HttpContext.User.Claims.First().Value;
                var user = _context.User.First(x => x.Email == email);
                var widget = _context.Widget.Where(x => x.UserID == user.ID).First(x => x.ID == widgetID);
                return new { widget = widget };
            }
            catch (Exception ex)
            {
                return new { error = ex.Message };
            }
        }

        [Authorize]
        [HttpPost("deletewidget")]
        public object DeleteWidget([FromBody] Widget widget)
        {
            try
            {
                var email = HttpContext.User.Claims.First().Value;
                var user = _context.User.First(x => x.Email == email);
                widget = _context.Widget.Where(x => x.UserID == user.ID).First(x => x.ID == widget.ID);
                _context.Widget.Remove(widget);
                _context.SaveChanges();
                return new { success = true };
            }
            catch (Exception ex)
            {
                return new { error = ex.Message };
            }
        }

        [Authorize]
        [HttpPost("editwidget")]
        public object EditWidget([FromBody] Widget widget)
        {
            try
            {
                var email = HttpContext.User.Claims.First().Value;
                var user = _context.User.First(x => x.Email == email);
                var oldWidget = _context.Widget.Where(x => x.UserID == user.ID).First(x => x.ID == widget.ID);
                oldWidget.WidgetData = widget.WidgetData;
                _context.Widget.Update(oldWidget);
                _context.SaveChanges();
                return new { success = true };
            }
            catch (Exception ex)
            {
                return new { error = ex.Message };
            }
        }
    }
}