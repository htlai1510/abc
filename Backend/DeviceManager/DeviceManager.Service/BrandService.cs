using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using DeviceManager.EntityFramework.Models;
using DeviceManager.IRepository;
using DeviceManager.ViewModel.Mapping;
using DeviceManager.ViewModel.ViewModel;
using DeviceManager.IService;

namespace DeviceManager.Service
{


    public class BrandService : IBrandService
    {
        private IGenericRepository<Brand> _brandRepository;

        public BrandService(IGenericRepository<Brand> brandRepository)
        {
            _brandRepository = brandRepository;
        }

        public void Delete(int id)
        {
            _brandRepository.Delete(id);
            _brandRepository.Commit();
        }
        public void Update(int id, BrandViewModel brandVM)
        {
            Brand brand = new Brand();
            brand.UpdateBrand(brandVM);

            var newBrand = _brandRepository.Get(id);
            if (!string.IsNullOrEmpty(brand.Name))
            {
                newBrand.Name = brand.Name;
            }
            if (!string.IsNullOrEmpty(brand.LastUpdatedBy))
            {
                newBrand.LastUpdatedBy = brand.LastUpdatedBy;
            }
            newBrand.LastUpdatedDay = DateTime.Now.ToString("dd/MM/yyyy");
            _brandRepository.Update(newBrand);
            _brandRepository.Commit();
        }

        public BrandViewModel Get(int id)
        {
            var brandData = _brandRepository.Get(id);
            var brandVMData = Mapping.Mapper.Map<BrandViewModel>(brandData);
            return brandVMData;
        }

        public IEnumerable<BrandViewModel> GetAll()
        {
            var brandData =  _brandRepository.GetAll();
            var brandVMData = Mapping.Mapper.Map<IEnumerable<BrandViewModel>>(brandData);
            return brandVMData;
        }

        public void Insert(BrandViewModel brandVM)
        {
            Brand brand = new Brand();
            brand.UpdateBrand(brandVM);

            brand.LastUpdatedDay = DateTime.Now.ToString("dd/MM/yyyy");
            brand.CreatedDay = DateTime.Now.ToString("dd/MM/yyyy");
            _brandRepository.Insert(brand);
            _brandRepository.Commit();
        }
    }
}
