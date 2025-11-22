using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Repositories;
using backend.Services;

var builder = WebApplication.CreateBuilder(args);

var ConnectionString = builder.Configuration.GetConnectionString("DefaultCon");

builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite(ConnectionString));

//Injeção de Dependências
builder.Services.AddScoped<ITaskRepository, TaskRepository>();
builder.Services.AddScoped<ITaskService, TaskService>();

//Adiciona Controles
builder.Services.AddControllers();


builder.Services.AddEndpointsApiExplorer(); // necessário para descobrir os endpoints
builder.Services.AddSwaggerGen();           // gera a documentação Swagger

// Configura CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        // Permite que o Angular em localhost:4200 acesse a API
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
     app.UseSwagger();       // gera o JSON da documentação
    app.UseSwaggerUI();     // cria a interface web interativa
}

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
