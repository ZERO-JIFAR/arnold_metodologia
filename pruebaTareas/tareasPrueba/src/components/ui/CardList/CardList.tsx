import { FC } from "react";
import { ITarea } from "../../../types/ITarea"
import styles from "./CardList.module.css"
import { useTareas } from "../../../hooks/useTareas";
import defaultImage from "../../../img/default.jpg";

type ICardList = {
    tarea: ITarea;
    handleOpenModalEdit:(tarea: ITarea)=> void 
};

export const CardList: FC<ICardList> = ({tarea, handleOpenModalEdit}) => {
    const {eliminarTarea} = useTareas(); 
    const eliminarTareaById = () => {
        eliminarTarea(tarea.id!)
    }
    const editarTarea = () => {
        handleOpenModalEdit(tarea)
    }

    return (
        <div className={styles.containerCard}>
            <img 
                src={tarea.imagen ? tarea.imagen : defaultImage} 
                alt="Imagen de la tarea" 
                className={styles.imagenTarea} 
            />
            <div>
                <h3>Titulo: {tarea.titulo}</h3>
                <p>Descripcion: {tarea.descripcion}</p>
                <p>N° de tomos: {tarea.numTomos}</p>
                <p>Tomos Leidos: {tarea.tomosLeidos}</p>
                <p>Fecha de emision: {tarea.fechaLimite}</p>
            </div>
            <div className={styles.actionCard}>
                <button onClick={eliminarTareaById} className={styles.botonEliminar}>
                    <b>Eliminar</b>
                </button>
                <button onClick={editarTarea} className={styles.botonEditar}>
                    <b>Editar</b>
                </button>
            </div>
        </div>
    );
};
