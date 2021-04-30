using LingaLearn.Models;
using System.Collections.Generic;

namespace LingaLearn.Repositories
{
    public interface IUserRepository
    {
        void Add(User user);
        List<User> GetAllUsers();
        User GetByFirebaseUserId(string firebaseUserId);
        User GetUserById(int id);
    }
}