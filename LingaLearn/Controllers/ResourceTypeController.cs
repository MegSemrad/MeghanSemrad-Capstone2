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
    public class ResourceTypeController : ControllerBase
    {
        private readonly IResourceTypeRepository _resourceTypeRepository;
        private readonly IUserRepository _userRepository;

        public ResourceTypeController(IResourceTypeRepository resourceTypRepository, IUserRepository userRepository)
        {
            _resourceTypeRepository = resourceTypRepository;
            _userRepository = userRepository;
        }





        [HttpGet("GetResourceTypes")]
        public IActionResult Get()
        {
            return Ok(_resourceTypeRepository.GetResourceTypes());
        }





        private User GetCurrentUser()
        {
            string FirebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(FirebaseUserId);
        }
    }
}
