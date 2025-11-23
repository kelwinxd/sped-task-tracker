namespace backend.DTOs;

public class UpdateTaskDto
{
    //Usuario poderá enviar na Edição apenas o que for definido aqui
    public string Status { get; set; } = string.Empty;
    public string Descricao {get;set;} = string.Empty;

    
}