using LingaLearn.Models;
using System.Collections.Generic;

namespace LingaLearn.Repositories
{
    public interface IUserRepository
    {
        List<User> GetAllUsers();
        //User GetByFirebaseUserId(string firebaseUserId);
    }
}