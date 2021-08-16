using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DeviceManager.IService;
using DeviceManager.ViewModel.ViewModel;
using System.Linq;

namespace DeviceManager.Controller.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class StaffController : BaseController
    {
        private readonly IStaffService _staffService;
        public StaffController(IStaffService staffService)
        {
            _staffService = staffService;
        }

        [HttpPost]
        public IActionResult UploadImage()
        {
            return CreateResponse(() =>
            {
                IFormFileCollection files = Request.Form.Files;
                _staffService.UploadImage(files);
                return Ok();
            });
        }

        [HttpGet]
        public IActionResult GetAll()

        {
            return CreateResponse(() =>
            {
                var staffs = _staffService.GetAll();
                return Ok(staffs);
            });
        }


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return CreateResponse(() =>
            {
                var staff = _staffService.Get(id);
                return Ok(staff);
            });
        }

        [HttpGet("{gender}")]
        public IActionResult FindByGender(string gender)
        {
            return CreateResponse(() =>
            {
                var staff = _staffService.Find(x => x.Gender != gender);
                return Ok(staff);
            });
        }

        [HttpPost]
        public IActionResult Insert([FromBody] StaffViewModel staffVM)
        {
            return CreateResponse(() =>
            {
                _staffService.Insert(staffVM);
                return Ok(staffVM);
            });
        }


        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] StaffViewModel staffVM)
        {
            return CreateResponse(() =>
            {
                _staffService.Update(id, staffVM);
                return Ok();
            });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            return CreateResponse(() =>
            {
                _staffService.Delete(id);
                return Ok();
            });
        }
    }
}
