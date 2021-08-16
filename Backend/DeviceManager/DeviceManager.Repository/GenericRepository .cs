using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using DeviceManager.EntityFramework.Models;
using Microsoft.EntityFrameworkCore;
using DeviceManager.IRepository;


namespace DeviceManager.Repository
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        private ComputerManagerContext _dbContext;

        public ComputerManagerContext DbContext
        {
            get { return _dbContext ?? (_dbContext = new ComputerManagerContext()); }
        }

        public GenericRepository(ComputerManagerContext cmContext)
        {
            _dbContext = cmContext;
        }

        public void Delete(int id)
        {
            TEntity entity = Get(id);
            DbContext.Set<TEntity>().Remove(entity);
        }

        public IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate)
        {
            return DbContext.Set<TEntity>().Where(predicate);
        }

        public TEntity Get(int id)
        {
            return DbContext.Set<TEntity>().Find(id);
        }
        public void InsertRange(IEnumerable<TEntity> entities)
        {
            DbContext.AddRange(entities);
        }

        public void Update(TEntity entity)
        {
            DbContext.Set<TEntity>().Update(entity);
        }

        public void Insert(TEntity entity)
        {
            DbContext.Set<TEntity>().Add(entity);
        }

        public IEnumerable<TEntity> GetAll()
        {
            return DbContext.Set<TEntity>().ToList();
        }

        public int Commit()
        {
            return DbContext.SaveChanges();
        }
    }
}
