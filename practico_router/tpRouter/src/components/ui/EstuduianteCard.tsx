interface Props {
    estudiante: {
        id: number;
        nombre: string;
        edad: number;
    };
}

const EstudianteCard = ({ estudiante }: Props) => {
    return (
        <div style={{ border: '1px solid lightgray', margin: '5px', padding: '8px' }}>
            <p><strong>{estudiante.nombre}</strong> — Edad: {estudiante.edad}</p>
        </div>
    );
};

export default EstudianteCard;
