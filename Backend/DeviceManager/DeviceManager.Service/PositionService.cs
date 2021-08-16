using System;
using System.Collections.Generic;
using DeviceManager.IRepository;
using DeviceManager.EntityFramework.Models;
using DeviceManager.ViewModel.ViewModel;
using DeviceManager.ViewModel.Mapping;
using DeviceManager.IService;

namespace DeviceManager.Service
{


    public class PositionService : IPositionService
    {
        private IGenericRepository<Position> _positionRepository;

        public PositionService(IGenericRepository<Position> positionRepository)
        {
            _positionRepository = positionRepository;
        }

        public void Delete(int id)
        {
            _positionRepository.Delete(id);
            _positionRepository.Commit();
        }
        public void Update(int id, PositionViewModel positionVM)
        {
            Position position = new Position();
            position.UpdatePosition(positionVM);

            var newPosition = _positionRepository.Get(id);
            if (!string.IsNullOrEmpty(position.Name))
            {
                newPosition.Name = position.Name;
            }
            if (!string.IsNullOrEmpty(position.LastUpdatedBy))
            {
                newPosition.LastUpdatedBy = position.LastUpdatedBy;
            }
            newPosition.LastUpdatedDay = DateTime.Now.ToString("dd/MM/yyyy");
            _positionRepository.Update(newPosition);
            _positionRepository.Commit();
        }

        public IEnumerable<PositionViewModel> GetAll()
        {
            var positionData = _positionRepository.GetAll();
            var positionVMData = Mapping.Mapper.Map<IEnumerable<PositionViewModel>>(positionData);
            return positionVMData;
        }

        public void Insert(PositionViewModel positionVM)
        {
            Position position = new Position();
            position.UpdatePosition(positionVM);

            position.LastUpdatedDay = DateTime.Now.ToString("dd/MM/yyyy");
            position.CreatedDay = DateTime.Now.ToString("dd/MM/yyyy");
            _positionRepository.Insert(position);
            _positionRepository.Commit();
        }
    }
}
