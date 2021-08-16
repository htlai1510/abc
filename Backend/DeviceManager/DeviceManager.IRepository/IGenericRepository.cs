using DeviceManager.EntityFramework.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace DeviceManager.IRepository
{
	public interface IGenericRepository<TEntity> where TEntity : class
	{
		ComputerManagerContext DbContext { get; }
		TEntity Get(int id);
		void Insert(TEntity entity);
		void Update(TEntity entity);
		void Delete(int id);
		IEnumerable<TEntity> GetAll();
		IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate);
		int Commit();
	}
}
