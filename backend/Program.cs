using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Repositories;
using backend.Services;

var builder = WebApplication.CreateBuilder(args);

//Conexão definida no appsettings.josn
var ConnectionString = builder.Configuration.GetConnectionString("DefaultCon");

//Definição de Banco
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite(ConnectionString));

//Injeção de Dependências
builder.Services.AddScoped<ITaskRepository, TaskRepository>();
builder.Services.AddScoped<ITaskService, TaskService>();

//Adiciona Controles
builder.Services.AddControllers();


builder.Services.AddEndpointsApiExplorer(); 
//Gera a documentação Swagger
builder.Services.AddSwaggerGen(); 

//Configura CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
     app.UseSwagger();       
    app.UseSwaggerUI();     // cria a interface web interativa
}

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
