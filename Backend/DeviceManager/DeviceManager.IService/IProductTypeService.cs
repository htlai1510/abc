using System.Collections.Generic;
using DeviceManager.ViewModel.ViewModel;

namespace DeviceManager.IService
{
    public interface IProductTypeService
    {
        void Insert(ProductTypeViewModel productTypeVM);
        void Delete(int id);
        void Update(int id, ProductTypeViewModel productTypeVM);
        IEnumerable<ProductTypeViewModel> GetAll();
        ProductTypeViewModel Get(int id);
    }
}
