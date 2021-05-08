using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using LingaLearn.Models;
using LingaLearn.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace LingaLearn.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ResourceController : ControllerBase
    {

        private readonly IResourceRepository _resourceRepository;
        private readonly IUserRepository _userRepository;

        public ResourceController(IResourceRepository resourceRepository, IUserRepository userRepository)
        {
            _resourceRepository = resourceRepository;
            _userRepository = userRepository;
        }





        [HttpGet("GetResourcesByLanguageId/{LanguageId}")]
        public IActionResult Get(int LanguageId)
        {
            return Ok(_resourceRepository.GetResourcesByLanguageId(LanguageId));
        }





        private User GetCurrentUser()
        {
            string FirebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(FirebaseUserId);
        }
    }
}
