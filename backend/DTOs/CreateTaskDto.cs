namespace backend.DTOs;

public class CreateTaskDto
{
    //Usuario poderá enviar na Criação apenas o que for definido aqui
    public string Titulo { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;

    
}