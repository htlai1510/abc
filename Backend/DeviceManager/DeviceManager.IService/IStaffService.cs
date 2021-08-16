using System.Collections.Generic;
using DeviceManager.ViewModel.ViewModel;
using Microsoft.AspNetCore.Http;
using System;
using System.Linq.Expressions;
using DeviceManager.EntityFramework.Models;

namespace DeviceManager.IService
{
    public interface IStaffService
    {
        void Insert(StaffViewModel staffVM);
        void Update(int id, StaffViewModel staffVM);
        void Delete(int id);
        void UploadImage(IFormFileCollection files);
        IEnumerable<StaffViewModel> Find(Expression<Func<Staff, bool>> predicate);
        StaffViewModel LogIn(string username, string password);
        IEnumerable<StaffViewModel> GetAll();
        StaffViewModel Get(int id);
    }
}
