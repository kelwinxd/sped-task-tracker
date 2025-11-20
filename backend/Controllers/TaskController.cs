namespace backend.Controllers;
using Microsoft.AspNetCore.Mvc;
using backend.DTOs;
using backend.Services;


[ApiController]
[Route("api/[controller]")]
public class TaskController : ControllerBase
{
    private readonly ITaskService _service;

    public TaskController (ITaskService service)
    {
        _service = service;
    }

    [HttpGet]

    public async Task<IActionResult> GetAll()
    {
        var tasks = await _service.GetAllAsync();
        return Ok(tasks);
    }

    [HttpGet("{id}")]

    public async Task<IActionResult> GetById(int id)
    {
        var task = await _service.GetByIdAsync(id);
        if(task is null) return NotFound();

        return Ok(task);

    }

    [HttpPost]

    public async Task<IActionResult> Create(CreateTaskDto dto)
    {
        var task = await _service.CreateAsync(dto);

        return CreatedAtAction(nameof(GetById), new {id = task.Id}, task );

    }

    [HttpPost("{id}")]

    public async Task<IActionResult> Update(int id, UpdateTaskDto dto)
    {
        var updatedTask = await _service.UpdateAsync(id, dto);

        return updatedTask ? NoContent() : NotFound();


    }

    [HttpDelete("{id}")]

    public async Task<IActionResult> Delete(int id)
    {
        var deletedTask = await _service.DeleteAsync(id);

        return deletedTask ? NoContent() : NotFound();
    }


}