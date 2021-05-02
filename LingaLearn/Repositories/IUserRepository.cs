using LingaLearn.Models;
using System.Collections.Generic;

namespace LingaLearn.Repositories
{
    public interface IUserRepository
    {
        List<User> GetAllUsers();
        User GetByFirebaseUserId(string firebaseUserId);
        User GetUserById(int id);
        void Add(User user);
    }
}