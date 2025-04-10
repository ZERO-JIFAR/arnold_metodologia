import { useEffect, useState } from 'react';
import CursoCard from '../ui/CursoCard';
import { getCursos } from '../../http/app';

interface Estudiante {
    id: number;
    nombre: string;
    edad: number;
}

interface Curso {
    id: number;
    nombre: string;
    estudiantes: Estudiante[];
}

const CursosScreen = () => {
    const [cursos, setCursos] = useState<Curso[]>([]);

useEffect(() => {
    getCursos().then(setCursos);
}, []);

    return (
        <div>
            <h1>Cursos</h1>
            {cursos.map((curso) => (
            <CursoCard key={curso.id} curso={curso} />
        ))}
        </div>
    );
};

export default CursosScreen;
