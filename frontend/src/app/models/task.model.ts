export interface TaskModel {
    id: number,
    titulo: string,
    descricao: string,
    status: 'Pendente' | 'Em Andamento' | 'Concluído'
    createdAt: string
}
