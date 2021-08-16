using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DeviceManager.EntityFramework.Models
{
    public partial class ComputerManagerContext : DbContext
    {
        public ComputerManagerContext()
        {
        }

        public ComputerManagerContext(DbContextOptions<ComputerManagerContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Brand> Brand { get; set; }
        public virtual DbSet<Device> Device { get; set; }
        public virtual DbSet<Location> Location { get; set; }
        public virtual DbSet<Position> Position { get; set; }
        public virtual DbSet<ProductType> ProductType { get; set; }
        public virtual DbSet<Staff> Staff { get; set; }
        public virtual DbSet<Tracking> Tracking { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=./;Database=ComputerManager;Trusted_Connection=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Brand>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CreatedBy)
                    .HasColumnName("createdBy")
                    .HasMaxLength(50);

                entity.Property(e => e.CreatedDay)
                    .HasColumnName("createdDay")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedBy)
                    .HasColumnName("lastUpdatedBy")
                    .HasMaxLength(50);

                entity.Property(e => e.LastUpdatedDay)
                    .HasColumnName("lastUpdatedDay")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(20);
            });

            modelBuilder.Entity<Device>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CreatedBy)
                    .HasColumnName("createdBy")
                    .HasMaxLength(50);

                entity.Property(e => e.CreatedDay)
                    .HasColumnName("createdDay")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.IdBrand).HasColumnName("idBrand");

                entity.Property(e => e.IdProductType).HasColumnName("idProductType");

                entity.Property(e => e.Image)
                    .HasColumnName("image")
                    .HasMaxLength(100);

                entity.Property(e => e.LastUpdatedBy)
                    .HasColumnName("lastUpdatedBy")
                    .HasMaxLength(50);

                entity.Property(e => e.LastUpdatedDay)
                    .HasColumnName("lastUpdatedDay")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50);

                entity.Property(e => e.Seri)
                    .IsRequired()
                    .HasColumnName("seri")
                    .HasMaxLength(50);

                entity.HasOne(d => d.IdBrandNavigation)
                    .WithMany(p => p.Device)
                    .HasForeignKey(d => d.IdBrand)
                    .HasConstraintName("FK__Device__idBranch__17C286CF");

                entity.HasOne(d => d.IdProductTypeNavigation)
                    .WithMany(p => p.Device)
                    .HasForeignKey(d => d.IdProductType)
                    .HasConstraintName("FK__Device__lastUpda__16CE6296");
            });

            modelBuilder.Entity<Location>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Belong).HasColumnName("belong");

                entity.Property(e => e.CreatedBy)
                    .HasColumnName("createdBy")
                    .HasMaxLength(50);

                entity.Property(e => e.CreatedDay)
                    .HasColumnName("createdDay")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedBy)
                    .HasColumnName("lastUpdatedBy")
                    .HasMaxLength(50);

                entity.Property(e => e.LastUpdatedDay)
                    .HasColumnName("lastUpdatedDay")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Level).HasColumnName("level");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(20);
            });

            modelBuilder.Entity<Position>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CreatedBy)
                    .HasColumnName("createdBy")
                    .HasMaxLength(50);

                entity.Property(e => e.CreatedDay)
                    .HasColumnName("createdDay")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedBy)
                    .HasColumnName("lastUpdatedBy")
                    .HasMaxLength(50);

                entity.Property(e => e.LastUpdatedDay)
                    .HasColumnName("lastUpdatedDay")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(30);
            });

            modelBuilder.Entity<ProductType>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CreatedBy)
                    .HasColumnName("createdBy")
                    .HasMaxLength(50);

                entity.Property(e => e.CreatedDay)
                    .HasColumnName("createdDay")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedBy)
                    .HasColumnName("lastUpdatedBy")
                    .HasMaxLength(50);

                entity.Property(e => e.LastUpdatedDay)
                    .HasColumnName("lastUpdatedDay")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(20);
            });

            modelBuilder.Entity<Staff>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Address)
                    .HasColumnName("address")
                    .HasMaxLength(100);

                entity.Property(e => e.Age).HasColumnName("age");

                entity.Property(e => e.CreatedBy)
                    .HasColumnName("createdBy")
                    .HasMaxLength(50);

                entity.Property(e => e.CreatedDay)
                    .HasColumnName("createdDay")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Fullname)
                    .IsRequired()
                    .HasColumnName("fullname")
                    .HasMaxLength(50);

                entity.Property(e => e.Gender)
                    .HasColumnName("gender")
                    .HasMaxLength(5);

                entity.Property(e => e.IdLocation).HasColumnName("idLocation");

                entity.Property(e => e.IdPosition).HasColumnName("idPosition");

                entity.Property(e => e.Image)
                    .HasColumnName("image")
                    .HasMaxLength(100);

                entity.Property(e => e.LastUpdatedBy)
                    .HasColumnName("lastUpdatedBy")
                    .HasMaxLength(50);

                entity.Property(e => e.LastUpdatedDay)
                    .HasColumnName("lastUpdatedDay")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.NumberPhone)
                    .HasColumnName("numberPhone")
                    .HasMaxLength(10);

                entity.Property(e => e.Password)
                    .HasColumnName("password")
                    .HasMaxLength(50);

                entity.Property(e => e.Permission).HasColumnName("permission");

                entity.Property(e => e.Username)
                    .HasColumnName("username")
                    .HasMaxLength(50);

                entity.HasOne(d => d.IdLocationNavigation)
                    .WithMany(p => p.Staff)
                    .HasForeignKey(d => d.IdLocation)
                    .HasConstraintName("FK_staff_location");

                entity.HasOne(d => d.IdPositionNavigation)
                    .WithMany(p => p.Staff)
                    .HasForeignKey(d => d.IdPosition)
                    .HasConstraintName("FK__Staff__idPositio__0A688BB1");
            });

            modelBuilder.Entity<Tracking>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CreatedBy)
                    .HasColumnName("createdBy")
                    .HasMaxLength(50);

                entity.Property(e => e.CreatedDay)
                    .HasColumnName("createdDay")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.EndTime)
                    .HasColumnName("endTime")
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.IdDevice).HasColumnName("idDevice");

                entity.Property(e => e.IdStaff).HasColumnName("idStaff");

                entity.Property(e => e.LastUpdatedBy)
                    .HasColumnName("lastUpdatedBy")
                    .HasMaxLength(50);

                entity.Property(e => e.LastUpdatedDay)
                    .HasColumnName("lastUpdatedDay")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.StartTime)
                    .HasColumnName("startTime")
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Status).HasColumnName("status");

                entity.HasOne(d => d.IdDeviceNavigation)
                    .WithMany(p => p.Tracking)
                    .HasForeignKey(d => d.IdDevice)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Tracking__idDevi__1E6F845E");

                entity.HasOne(d => d.IdStaffNavigation)
                    .WithMany(p => p.Tracking)
                    .HasForeignKey(d => d.IdStaff)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Tracking__lastUp__1D7B6025");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
