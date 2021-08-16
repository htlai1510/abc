using DeviceManager.EntityFramework.Models;
using DeviceManager.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using DeviceManager.ViewModel.Mapping;
using DeviceManager.ViewModel.ViewModel;
using DeviceManager.IService;
using System.Security.Claims;
using System.Linq.Expressions;

namespace DeviceManager.Service
{


    public class StaffService : IStaffService
    {
        private IGenericRepository<Staff> _staffRepository;
        private IWebHostEnvironment _hostEnvironment;

        public StaffService(IGenericRepository<Staff> staffRepository, IWebHostEnvironment hostEnvironment)
        {
            _staffRepository = staffRepository;
            _hostEnvironment = hostEnvironment;
        }



        public StaffViewModel Get(int id)
        {
            var staffData = _staffRepository.Get(id);
            var staffVMData = Mapping.Mapper.Map<StaffViewModel>(staffData);
            return staffVMData;
        }

        public IEnumerable<StaffViewModel> GetAll()
        {
            var staffData = _staffRepository.GetAll();
            var staffVMData = Mapping.Mapper.Map<IEnumerable<StaffViewModel>>(staffData);
            return staffVMData;
        }



        public IEnumerable<StaffViewModel> Find(Expression<Func<Staff, bool>> predicate)
        {
            var staffData = _staffRepository.Find(predicate);
            var staffVMData = Mapping.Mapper.Map<IEnumerable<StaffViewModel>>(staffData);
            return staffVMData;
        }

        public StaffViewModel LogIn(string username, string password)
        {
            var result = _staffRepository.Find(x => x.Username == username && x.Password == password).FirstOrDefault();
            if (result != null)
                return Mapping.Mapper.Map<StaffViewModel>(result); ;
            return null;
        }

        
        public void Insert(StaffViewModel staffVM)
        {
            Staff staff = new Staff();
            staff.UpdateStaff(staffVM);

            staff.LastUpdatedDay = DateTime.Now.ToString("dd/MM/yyyy");
            staff.CreatedDay = DateTime.Now.ToString("dd/MM/yyyy");
            _staffRepository.Insert(staff);
            _staffRepository.Commit();
        }

        public void Update(int id, StaffViewModel staffVM)
        {
            Staff staff = new Staff();
            staff.UpdateStaff(staffVM);

            var newStaff = _staffRepository.Get(id);
            if (!string.IsNullOrEmpty(staff.Image))
            {
                newStaff.Image = staff.Image;
            }
            if (!string.IsNullOrEmpty(staff.Fullname))
            {
                newStaff.Fullname = staff.Fullname;
            }
            if (!string.IsNullOrEmpty(staff.Username))
            {
                newStaff.Username = staff.Username;
            }
            if (!string.IsNullOrEmpty(staff.Password))
            {
                newStaff.Password = staff.Password;
            }
            if (staff.Age != null)
            {
                newStaff.Age = staff.Age;
            }
            if (!string.IsNullOrEmpty(staff.Gender))
            {
                newStaff.Gender = staff.Gender;
            }
            if (!string.IsNullOrEmpty(staff.Address))
            {
                newStaff.Address = staff.Address;
            }
            if (!string.IsNullOrEmpty(staff.NumberPhone))
            {
                newStaff.NumberPhone = staff.NumberPhone;
            }
            if (staff.IdPosition != null)
            {
                newStaff.IdPosition = staff.IdPosition;
            }
            if (staff.IdLocation != null)
            {
                newStaff.IdLocation = staff.IdLocation;
            }
            if (!string.IsNullOrEmpty(staff.LastUpdatedBy))
            {
                newStaff.LastUpdatedBy = staff.LastUpdatedBy;
            }
            newStaff.LastUpdatedDay = DateTime.Now.ToString("dd/MM/yyyy");
            _staffRepository.Update(newStaff);
            _staffRepository.Commit();
        }

        public void Delete(int id)
        {
            _staffRepository.Delete(id);
            _staffRepository.Commit();
        }

        public void UploadImage(IFormFileCollection files)
        {
            string fileName = "";

            if (files.Count > 0)
            {
                var file = files[0];

                fileName = string.Format("{0}", Path.GetFileName(file.FileName));

                var path = Path.Combine(_hostEnvironment.WebRootPath, "images/staff/" + fileName);

                using (Stream fileStream = new FileStream(path, FileMode.Create))
                {
                    file.CopyTo(fileStream);
                }

            }
        }
    }
}
