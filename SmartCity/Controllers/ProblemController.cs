using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SmartCity.Models;
using Microsoft.AspNetCore.Authorization;

namespace SmartCity.Controllers
{
    [Route("api/problem")]
    public class ProblemController : Controller
    {
        private SmartContext _context;
        public ProblemController(SmartContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpPost("add")]
        public object AddProblem([FromBody] Problem problem)
        {
            try
            {
                var email = HttpContext.User.Claims.First().Value;
                var user = _context.User.First(x => x.Email == email);
                problem.UserID = user.ID;
                _context.Problem.Add(problem);
                _context.SaveChanges();
                problem = _context.Problem.OrderByDescending(x => x.ID).First(x => x.UserID == user.ID);
                return new { problem = problem };
            }
            catch(Exception ex)
            {
                return new { error = ex.Message };
            }
        }
        
        [Authorize]
        [HttpGet("get/{offset}/{count}")]
        public object GetLatestProblems(int count, int offset)
        {
            try
            {
                var problems = _context.Problem
                    .OrderBy(x => x.Date)
                    .Skip(offset)
                    .Take(count);

                return new { problems = problems };
            }
            catch(Exception ex)
            {
                return new { error = ex.Message };
            }
        }
        
        [Authorize]
        [HttpGet("get/{id}")]
        public object GetProblemById(int id)
        {
            try
            {
                var problem = _context.Problem.FirstOrDefault(x => x.ID == id);
                if (problem != null) 
                {
                    return new { problem = problem };
                }
                else 
                {
                    return new { error = "Couldn't find a problem with the specified ID." };
                }
            }
            catch(Exception ex)
            {
                return new { error = ex.Message };
            }
        }
        
        [Authorize]
        [HttpGet("get/{id}/image")]
        public object GetProblemImageById(int id)
        {
            try
            {
                var problem = _context.Problem.FirstOrDefault(x => x.ID == id);
                if (problem != null) 
                {
                    return File(problem.Image, "image/png");
                }
                else 
                {
                    return new { error = "Couldn't find a problem with the specified ID." };
                }
            }
            catch(Exception ex)
            {
                return new { error = ex.Message };
            }
        }

    }
}