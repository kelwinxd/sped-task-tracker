namespace backend.Repositories;
using backend.Models;
using backend.Data;
using Microsoft.EntityFrameworkCore;

public class TaskRepository : ITaskRepository
{
    private readonly AppDbContext _context;

    public TaskRepository(AppDbContext context)
    {
        _context = context;
    }

    //Liste Todos as Tasks
    public async Task<List<TaskItem>> GetAllAsync() => 
    await _context.Tasks.ToListAsync();

    public async Task<TaskItem?> GetByIdAsync(int id) => 
    await _context.Tasks.FindAsync(id);

    public async Task<TaskItem> CreateAsync(TaskItem item)
    {
        _context.Tasks.Add(item);
        await _context.SaveChangesAsync();
        return item;
    }

    public async Task UpdateAsync(TaskItem item)
    {
        _context.Tasks.Update(item);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(TaskItem item)
    {
        _context.Tasks.Remove(item);
        await _context.SaveChangesAsync();
    }

   
}