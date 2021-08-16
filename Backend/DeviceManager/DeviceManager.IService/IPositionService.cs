using System.Collections.Generic;
using DeviceManager.ViewModel.ViewModel;

namespace DeviceManager.IService
{
    public interface IPositionService
    {
        void Insert(PositionViewModel positionVM);
        void Delete(int id);
        void Update(int id, PositionViewModel positionVM);
        IEnumerable<PositionViewModel> GetAll();
    }
}
