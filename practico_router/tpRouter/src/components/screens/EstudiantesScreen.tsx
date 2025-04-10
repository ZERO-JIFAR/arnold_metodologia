import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCursoById } from '../../http/app';
import EstudianteCard from '../ui/EstuduianteCard';

interface Estudiante {
    id: number;
    nombre: string;
    edad: number;
}

const EstudiantesScreen = () => {
    const [searchParams] = useSearchParams();
    const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
    const [nombreCurso, setNombreCurso] = useState('');
    const cursoId = searchParams.get('curso');

    useEffect(() => {
        if (cursoId) {
        getCursoById(Number(cursoId)).then((curso) => {
            setEstudiantes(curso.estudiantes);
            setNombreCurso(curso.nombre);
        });
        }
    }, [cursoId]);

    if (!cursoId) {
        return <p>No se seleccionó ningún curso.</p>;
    }

    return (
        <div>
        <h1>Estudiantes de {nombreCurso}</h1>
        {estudiantes.map((est) => (
            <EstudianteCard key={est.id} estudiante={est} />
        ))}
        </div>
    );
};

export default EstudiantesScreen;
