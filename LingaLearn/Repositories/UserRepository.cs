using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using LingaLearn.Models;
using LingaLearn.DbUtils;



namespace LingaLearn.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {

        public UserRepository(IConfiguration configuration) : base(configuration) { }



        public List<User> GetAllUsers()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT u.Id, u.UserName, u.Email, u.FirebaseUserId
                    FROM [User] u";

                    User user = null;
                    var reader = cmd.ExecuteReader();

                    var users = new List<User>();
                    while (reader.Read())
                    {
                        user = new User()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                            Email = reader.GetString(reader.GetOrdinal("Email")),
                            UserName = reader.GetString(reader.GetOrdinal("UserName")),
                        };

                        users.Add(user);
                    }
                    reader.Close();
                    return users;
                }
            }
        }





        //public User GetByFirebaseUserId(string firebaseUserId)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //                SELECT u.Id, u.UserName, u.Email, u.FirebaseUserId
        //                FROM User u
        //                WHERE u.FirebaseUserId = @FirebaseuserId";

        //            DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

        //            User user = null;

        //            var reader = cmd.ExecuteReader();
        //            if (reader.Read())
        //            {
        //                user = new User()
        //                {
        //                    Id = DbUtils.GetInt(reader, "Id"),
        //                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
        //                    UserName = DbUtils.GetString(reader, "UserName"),
        //                    Email = DbUtils.GetString(reader, "Email")
        //                };
        //            }
        //            reader.Close();

        //            return user;
        //        }
        //    }
        //}
    }
}