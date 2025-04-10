const API_URL = 'http://localhost:3000';

export const getCursos = async () => {
    const response = await fetch(`${API_URL}/cursos`);
    return response.json();
};

export const getCursoById = async (id: number) => {
    const response = await fetch(`${API_URL}/cursos/${id}`);
    return response.json();
};
