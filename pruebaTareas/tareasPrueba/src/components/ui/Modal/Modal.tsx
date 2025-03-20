import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { tareaStore } from "../../../store/tareaStore";
import styles from "./Modal.module.css";
import { ITarea } from "../../../types/ITarea";
import { useTareas } from "../../../hooks/useTareas";

type IModal = {
    handleCloseModal: VoidFunction
}

const intialState: ITarea = {
    titulo: "",
    descripcion: "",
    numTomos: 0,
    tomosLeidos: 0,
    fechaLimite: "",
    imagen: "",
}

export const Modal:FC<IModal> = ({handleCloseModal}) => {
    const tareaActiva = tareaStore ((state)=> state.tareaActiva);
    const setTareaActiva = tareaStore ((state)=> state.setTareaActiva);


    const {crearTarea, putTareaEditar} = useTareas()

    const [formValues, setFormValues] = useState <ITarea>(intialState)

    useEffect (() => {
        if (tareaActiva) setFormValues(tareaActiva);
    }, []);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = e.target;
        setFormValues((prev) => ({... prev,
            [name]: name === "numTomos" || name === "tomosLeidos" ? Number(value) : value
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (tareaActiva){
            putTareaEditar(formValues);
        }else{
            crearTarea({ ... formValues, id: new Date().toDateString() })
        }
        setTareaActiva(null)
        handleCloseModal()
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
    
            reader.onload = () => {
                setFormValues((prev) => ({ ...prev, imagen: reader.result as string }));
            };
    
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={styles.containerPrincipalModal}>
            <div className={styles.countentPopUp}>
                <div>
                    <h3>{tareaActiva ? "Editar tarea":"Crear tarea"}</h3>
                </div>
                <form onSubmit={handleSubmit} className={styles.formCountent}>
                    <div>
                        <input 
                            placeholder="Ingrese un titulo" 
                            type="text" 
                            required 
                            onChange={handleChange}
                            value={formValues.titulo}
                            autoComplete="off" 
                            name="titulo"
                        />
                        <textarea 
                            placeholder="Ingrese una descripcion" 
                            required 
                            onChange={handleChange}
                            value={formValues.descripcion}
                            name="descripcion"
                        />
                        <input 
                            type="number" 
                            value={formValues.numTomos}
                            required 
                            onChange={handleChange}
                            autoComplete="off" 
                            name="numTomos"
                        />
                        <input 
                            type="number" 
                            value={formValues.tomosLeidos}
                            required 
                            onChange={handleChange}
                            autoComplete="off" 
                            name="tomosLeidos"
                        />
                        <input 
                            type="date" 
                            value={formValues.fechaLimite}
                            required 
                            onChange={handleChange}
                            autoComplete="off" 
                            name="fechaLimite"
                        />
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageChange} 
                        />

                    </div>
                    <div className={styles.buttonCard}>
                        <button onClick={handleCloseModal}>Cancelar</button>
                        <button type="submit">
                            {tareaActiva ? "Editar tarea" : "Crear tarea"}
                        </button>
                    </div>
                </form>
            </div>
        </div>//Made in Arnold
    );
};
