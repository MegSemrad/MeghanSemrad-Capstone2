using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using LingaLearn.Models;
using LingaLearn.Utils;

namespace LingaLearn.Repositories
{
    public class UserRepository : BaseRepository
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
                       SELECT u.id, u.FirstName, u.LastName, u.DisplayName, u.Email, u.FirebaseUserId,
                              u.CreateDateTime, u.ImageLocation, u.UserTypeId,
                              ut.[Name] AS UserTypeName
                         FROM UserProfile u
                              LEFT JOIN UserType ut ON u.UserTypeId = ut.id";

                User user = null;
                var reader = cmd.ExecuteReader();

                var users = new List<User>();
                while (reader.Read())
                {
                    user = new User()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("Id")),
                        FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                        FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                        LastName = reader.GetString(reader.GetOrdinal("LastName")),
                        DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                        Email = reader.GetString(reader.GetOrdinal("Email")),
                        CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                        ImageLocation = DbUtils.GetNullableString(reader, "ImageLocation"),
                        UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                        UserType = new UserType()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                            Name = reader.GetString(reader.GetOrdinal("UserTypeName"))
                        },
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
    //                    SELECT up.Id, Up.FirebaseUserId, up.FirstName, up.LastName, up.DisplayName, 
    //                           up.Email, up.CreateDateTime, up.ImageLocation, up.UserTypeId,
    //                           ut.Name AS UserTypeName
    //                      FROM UserProfile up
    //                           LEFT JOIN UserType ut on up.UserTypeId = ut.Id
    //                     WHERE FirebaseUserId = @FirebaseuserId";

    //            DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

    //            User user = null;

    //            var reader = cmd.ExecuteReader();
    //            if (reader.Read())
    //            {
    //                user = new User()
    //                {
    //                    Id = DbUtils.GetInt(reader, "Id"),
    //                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
    //                    FirstName = DbUtils.GetString(reader, "FirstName"),
    //                    LastName = DbUtils.GetString(reader, "LastName"),
    //                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
    //                    Email = DbUtils.GetString(reader, "Email"),
    //                    CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
    //                    ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
    //                    UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
    //                    UserType = new UserType()
    //                    {
    //                        Id = DbUtils.GetInt(reader, "UserTypeId"),
    //                        Name = DbUtils.GetString(reader, "UserTypeName"),
    //                    }
    //                };
    //            }
    //            reader.Close();

    //            return user;
    //        }
    //    }
    //}


    //public UserProfile GetUserProfileById(int id)
    //{
    //    using (var conn = Connection)
    //    {
    //        conn.Open();
    //        using (var cmd = conn.CreateCommand())
    //        {
    //            cmd.CommandText = @"
    //                      SELECT up.Id AS UserProfileId, Up.FirebaseUserId, up.FirstName, up.LastName, up.DisplayName, 
    //                           up.Email, up.CreateDateTime, up.ImageLocation, up.UserTypeId,
    //                           ut.Name AS UserTypeName
    //                      FROM UserProfile up
    //                           LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                               
    //                     WHERE up.Id = @Id";

    //            DbUtils.AddParameter(cmd, "@Id", id);

    //            UserProfile userProfile = null;

    //            var reader = cmd.ExecuteReader();
    //            if (reader.Read())
    //            {
    //                userProfile = new UserProfile()
    //                {
    //                    Id = DbUtils.GetInt(reader, "UserProfileId"),
    //                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
    //                    FirstName = DbUtils.GetString(reader, "FirstName"),
    //                    LastName = DbUtils.GetString(reader, "LastName"),
    //                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
    //                    Email = DbUtils.GetString(reader, "Email"),
    //                    CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
    //                    ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
    //                    UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
    //                    UserType = new UserType()
    //                    {
    //                        Id = DbUtils.GetInt(reader, "UserTypeId"),
    //                        Name = DbUtils.GetString(reader, "UserTypeName"),
    //                    }
    //                };
    //            }
    //            reader.Close();

    //            return userProfile;
    //        }
    //    }
    //}

    //public void Add(UserProfile userProfile)
    //{
    //    using (var conn = Connection)
    //    {
    //        conn.Open();
    //        using (var cmd = conn.CreateCommand())
    //        {
    //            cmd.CommandText = @"INSERT INTO UserProfile (FirebaseUserId, FirstName, LastName, DisplayName, 
    //                                                             Email, CreateDateTime, ImageLocation, UserTypeId)
    //                                    OUTPUT INSERTED.ID
    //                                    VALUES (@FirebaseUserId, @FirstName, @LastName, @DisplayName, 
    //                                            @Email, @CreateDateTime, @ImageLocation, @UserTypeId)";
    //            DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
    //            DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
    //            DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
    //            DbUtils.AddParameter(cmd, "@DisplayName", userProfile.DisplayName);
    //            DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
    //            DbUtils.AddParameter(cmd, "@CreateDateTime", userProfile.CreateDateTime);
    //            DbUtils.AddParameter(cmd, "@ImageLocation", userProfile.ImageLocation);
    //            DbUtils.AddParameter(cmd, "@UserTypeId", userProfile.UserTypeId);

    //            userProfile.Id = (int)cmd.ExecuteScalar();
    //        }
    //    }
    //}
}
}