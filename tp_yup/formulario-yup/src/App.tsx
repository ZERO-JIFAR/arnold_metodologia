import { useState } from 'react';
import { Input } from './components/input';
import { Button } from './components/button';
import styles from './styles/Form.module.css';
import * as yup from 'yup';
import Swal from 'sweetalert2';

const schema = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio').min(3, 'Mínimo 3 caracteres'),
  email: yup.string().required('El correo es obligatorio').email('Correo inválido'),
  password: yup.string().required('La contraseña es obligatoria').min(6, 'Mínimo 6 caracteres'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
});

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    try {
      await schema.validateAt(name, { ...formData, [name]: value });
      setErrors((prev) => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    } catch (error: any) {
      setErrors((prev) => ({ ...prev, [name]: error.message }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      Swal.fire('Formulario enviado correctamente', '', 'success');
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      setErrors({});
    } catch (error: any) {
      const newErrors: Record<string, string> = {};
      error.inner.forEach((err: any) => {
        if (err.path) newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <Input label="Nombre" name="name" value={formData.name} handleChange={handleChange} error={errors.name} />
      <Input label="Correo" name="email" type="email" value={formData.email} handleChange={handleChange} error={errors.email} />
      <Input label="Contraseña" name="password" type="password" value={formData.password} handleChange={handleChange} error={errors.password} />
      <Input label="Repetir Contraseña" name="confirmPassword" type="password" value={formData.confirmPassword} handleChange={handleChange} error={errors.confirmPassword} />
      <Button disabled={hasErrors} text="Enviar" />
    </form>
  );
}
