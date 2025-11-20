using backend.Models;
using backend.DTOs;
namespace backend.Services;

public interface ITaskService
{
    Task<List<TaskItem>> GetAllAsync();
    Task<TaskItem?> GetByIdAsync(int id);
    Task<TaskItem> CreateAsync(CreateTaskDto dto);
    Task<bool> UpdateAsync(int id,UpdateTaskDto dto);
    Task<bool> DeleteAsync(int id);
}