using System;
using System.Collections.Generic;
using DeviceManager.IRepository;
using DeviceManager.EntityFramework.Models;
using DeviceManager.ViewModel.ViewModel;
using DeviceManager.ViewModel.Mapping;
using DeviceManager.IService;

namespace DeviceManager.Service
{


    public class ProductTypeService : IProductTypeService
    {
        private IGenericRepository<ProductType> _productTypeRepository;
        public ProductTypeService(IGenericRepository<ProductType> productRepository)
        {
            _productTypeRepository = productRepository;
        }

        public void Delete(int id)
        {
            _productTypeRepository.Delete(id);
            _productTypeRepository.Commit();
        }

        public void Update(int id, ProductTypeViewModel productTypeVM)
        {
            ProductType productType = new ProductType();
            productType.UpdateProductType(productTypeVM);

            var newProductType = _productTypeRepository.Get(id);
            if (!string.IsNullOrEmpty(productType.Name))
            {
                newProductType.Name = productType.Name;
            }
            if (!string.IsNullOrEmpty(productType.LastUpdatedBy))
            {
                newProductType.LastUpdatedBy = productType.LastUpdatedBy;
            }
            newProductType.LastUpdatedDay = DateTime.Now.ToString("dd/MM/yyyy");
            _productTypeRepository.Update(newProductType);
            _productTypeRepository.Commit();
        }
        public ProductTypeViewModel Get(int id)
        {
            var productTypeData = _productTypeRepository.Get(id);
            var productTypeVMData = Mapping.Mapper.Map<ProductTypeViewModel>(productTypeData);
            return productTypeVMData;
        }

        public IEnumerable<ProductTypeViewModel> GetAll()
        {
            var productTypeData = _productTypeRepository.GetAll();
            var productTypeVMData = Mapping.Mapper.Map<IEnumerable<ProductTypeViewModel>>(productTypeData);
            return productTypeVMData;
        }

        public void Insert(ProductTypeViewModel productTypeVM)
        {
            ProductType productType = new ProductType();
            productType.UpdateProductType(productTypeVM);

            productType.LastUpdatedDay = DateTime.Now.ToString("dd/MM/yyyy");
            productType.CreatedDay = DateTime.Now.ToString("dd/MM/yyyy");
            _productTypeRepository.Insert(productType);
            _productTypeRepository.Commit();
        }
    }
}
