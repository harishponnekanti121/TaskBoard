using Microsoft.AspNetCore.Mvc;
using TaskboardAPI.Models;

namespace TaskboardAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private static readonly List<TaskItem> Tasks = new()
        {
            new TaskItem { Id = 1, Title = "Sample Task", Status = "Pending" }
        };

        [HttpGet]
        public IActionResult Get() => Ok(Tasks);

        [HttpPost]
        public IActionResult Add(TaskItem task)
        {
            task.Id = Tasks.Count + 1;
            Tasks.Add(task);
            return Ok(Tasks);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, TaskItem updatedTask)
        {
            var task = Tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return NotFound();

            task.Title = updatedTask.Title;
            task.Status = updatedTask.Status;
            return Ok(task);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var task = Tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return NotFound();

            Tasks.Remove(task);
            return Ok(Tasks);
        }
    }
}
