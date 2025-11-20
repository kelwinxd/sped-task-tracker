namespace backend.Services;
using backend.Models;
using backend.DTOs;
using backend.Repositories;

public class TaskService : ITaskService
{
    private readonly ITaskRepository _repo;

    public TaskService(ITaskRepository repo)
    {
        _repo = repo;
    }

    public Task<List<TaskItem>> GetAllAsync() => _repo.GetAllAsync();
    public Task<TaskItem?> GetByIdAsync(int id) => _repo.GetByIdAsync(id);
    public async Task<TaskItem> CreateAsync(CreateTaskDto dto)
    {
        var task = new TaskItem
        {
            Titulo = dto.Titulo,
            Descricao = dto.Descricao,
            Status = "Pendente"
        };

        return await _repo.CreateAsync(task);

    }

    public async Task<bool> UpdateAsync(int id,UpdateTaskDto dto)
    {
        var task = await _repo.GetByIdAsync(id);
        if(task is null) return false;

        task.Descricao = dto.Descricao;
        task.Status = dto.Status;

        await _repo.UpdateAsync(task);

        return true;

    }

    public async Task<bool> DeleteAsync(int id)
    {
        var task = await _repo.GetByIdAsync(id);
        if(task is null) return false;

        await _repo.DeleteAsync(task);

        return true;
    }
}