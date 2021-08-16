using System;
using DeviceManager.ViewModel.ViewModel;
using DeviceManager.EntityFramework.Models;
using AutoMapper;

namespace DeviceManager.ViewModel.Mapping
{
    public static class Mapping
    {
        private static readonly Lazy<IMapper> Lazy = new Lazy<IMapper>(() =>
        {
            var config = new MapperConfiguration(cfg => {
                // This line ensures that internal properties are also mapped over.
                cfg.ShouldMapProperty = p => p.GetMethod.IsPublic || p.GetMethod.IsAssembly;
                cfg.AddProfile<MappingProfile>();
            });
            var mapper = config.CreateMapper();
            return mapper;
        });

        public static IMapper Mapper => Lazy.Value;
    }

    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Brand, BrandViewModel>();
            CreateMap<Device, DeviceViewModel>();
            CreateMap<Position, PositionViewModel>();
            CreateMap<ProductType, ProductTypeViewModel>();
            CreateMap<Staff, StaffViewModel>();
            CreateMap<Location, LocationViewModel>();
            CreateMap<Tracking, TrackingViewModel>();
        }
    }
}
