using System.Collections.Generic;
using DeviceManager.ViewModel.ViewModel;

namespace DeviceManager.IService
{
    public interface IBrandService
    {
        void Insert(BrandViewModel brandVM);
        void Delete(int id);
        void Update(int id, BrandViewModel brandVM);
        IEnumerable<BrandViewModel> GetAll();
        BrandViewModel Get(int id);
    }
}
