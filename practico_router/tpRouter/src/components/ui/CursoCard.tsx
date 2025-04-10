import { useNavigate } from 'react-router-dom';

interface Props {
    curso: {
        id: number;
        nombre: string;
        estudiantes: { id: number; nombre: string; edad: number }[];
    };
}

const CursoCard = ({ curso }: Props) => {
    const navigate = useNavigate();

    const handleVerEstudiantes = () => {
        navigate(`/estudiantes?curso=${curso.id}`);
    };

    return (
        <div style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
        <h3>{curso.nombre}</h3>
        <p>Alumnos: {curso.estudiantes.length}</p>
        <button onClick={handleVerEstudiantes}>Ver Estudiantes</button>
        </div>
    );
};

export default CursoCard;
