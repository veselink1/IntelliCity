using SmartCity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartCity.Services
{
    public class SmartDBManager
    {
        private readonly SmartContext _db;

        public SmartDBManager(SmartContext db)
        {
            _db = db;
        }

        public async Task<User> GetUserAsync(string email, bool registerIfMissing = false)
        {
            User user = _db.User.FirstOrDefault(x => x.Email.ToString() == email);

            // The user is not registered, therefore
            // he/she is now being added to the DB.
            if (user == null)
            {
                user = new User
                {
                    Email = email,
                };

                // Return the newly-inserted user.
                return (await _db.User.AddAsync(user)).Entity;
            }

            // Return the user we found.
            return user;
        }
    }
}
