using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using LingaLearn.Models;
using LingaLearn.Repositories;

namespace LingaLearn.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class LanguageProficiencyController : ControllerBase
    {
        private readonly ILanguageProficiencyRepository _languageProficiencyRepository;

        public LanguageProficiencyController(ILanguageProficiencyRepository languageProficiencyRepository)
        {
            _languageProficiencyRepository = languageProficiencyRepository;
        }


       [HttpGet]
        public IActionResult Get()
        {
            return Ok(_languageProficiencyRepository.GetAll());
        }
    }
}