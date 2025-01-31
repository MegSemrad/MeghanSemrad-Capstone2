﻿using Microsoft.AspNetCore.Mvc;
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





        [HttpGet("GetResourceByResourceId/{ResourceId}")]
        public IActionResult GetResource(int ResourceId)
        {
            return Ok(_resourceRepository.GetResourceByResourceId(ResourceId));
        }





        [HttpPost("CreateResource")]
        public IActionResult Resource(Resource resource)
        {
            var currentUser = GetCurrentUser();
            resource.UserId = currentUser.Id;
            _resourceRepository.AddResource(resource);
            return CreatedAtAction("Get", new { LanguageId = resource.LanguageId }, resource);
        }





        [HttpPut("Edit/{resourceId}")]
        public IActionResult Put(int resourceId, Resource resource)
        {
            if (resourceId != resource.Id)
            {
                return BadRequest();
            }
            var currentUser = GetCurrentUser();
            resource.UserId = currentUser.Id;
            _resourceRepository.Update(resource);
            return NoContent();
        }





        [HttpDelete("Delete/{resourceId}")]
        public IActionResult Delete(int resourceId)
        {
            _resourceRepository.Delete(resourceId);
            return NoContent();
        }





        private User GetCurrentUser()
        {
            string FirebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(FirebaseUserId);
        }
    }
}
