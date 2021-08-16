using DeviceManager.ViewModel.ViewModel;
using Microsoft.AspNetCore.Mvc;
using DeviceManager.IService;
using Microsoft.AspNetCore.Http;

namespace DeviceManager.Controller.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]

    public class DeviceController : BaseController
    {
        private readonly IDeviceService _deviceService;
        public DeviceController(IDeviceService deviceService)
        {
            _deviceService = deviceService;
        }

        [HttpPost]
        public IActionResult UploadImage()
        {
            return CreateResponse(() =>
            {
                IFormFileCollection files = Request.Form.Files;
                _deviceService.UploadImage(files);
                return Ok();
            });
        }



        [HttpGet]
        public IActionResult abc()

        {
            return CreateResponse(() =>
            {
                var devices = _deviceService.CountDeviceByFloor();
                return Ok(devices);
            });
        }

        [HttpGet("{idStaff}")]
        public IActionResult GetDeviceUsingByUser(int idStaff)

        {
            return CreateResponse(() =>
            {
                var devices = _deviceService.GetDeviceUsingByUser(idStaff);
                return Ok(devices);
            });
        }

        [HttpGet("{idStaff}")]
        public IActionResult GetDeviceBorrowingByUser(int idStaff)

        {
            return CreateResponse(() =>
            {
                var devices = _deviceService.GetDeviceBorrowingByUser(idStaff);
                return Ok(devices);
            });
        }

        [HttpGet("{idStaff}")]
        public IActionResult GetDeviceEmptyByUser(int idStaff)

        {
            return CreateResponse(() =>
            {
                var tracking = _deviceService.GetDeviceEmptyByUser(idStaff);
                return Ok(tracking);
            });
        }


        [HttpGet]
        public IActionResult CountDevice()

        {
            return CreateResponse(() =>
            {
                var devices = _deviceService.CountDevice();
                return Ok(devices);
            });
        }

        [HttpGet]
        public IActionResult GetDeviceUsing()

        {
            return CreateResponse(() =>
            {
                var devices = _deviceService.GetDeviceUsing();
                return Ok(devices);
            });
        }


        [HttpGet]
        public IActionResult GetDeviceBorrow()

        {
            return CreateResponse(() =>
            {
                var devices = _deviceService.GetDeviceBorrow();
                return Ok(devices);
            });
        }

        [HttpGet]
        public IActionResult GetDeviceEmpty()

        {
            return CreateResponse(() =>
            {
                var devices = _deviceService.GetDeviceEmpty();
                return Ok(devices);
            });
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return CreateResponse(() =>
            {
                var device = _deviceService.Get(id);
                return Ok(device);
            });
        }

        [HttpGet]
        public IActionResult GetAll()

        {
            return CreateResponse(() =>
            {
                var devices = _deviceService.GetAll();
                return Ok(devices);
            });
        }

        [HttpPost]
        public IActionResult Insert([FromBody] DeviceViewModel deviceVM)
        {
            return CreateResponse(() =>
            {
                _deviceService.Insert(deviceVM);
                return Ok();
            });
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] DeviceViewModel deviceVM)
        {
            return CreateResponse(() =>
            {
                _deviceService.Update(id, deviceVM);
                return Ok();
            });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            return CreateResponse(() =>
            {
                _deviceService.Delete(id);
                return Ok();
            });
        }
    }
}
