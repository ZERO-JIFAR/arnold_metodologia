import styles from '../styles/Form.module.css';

interface InputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, name, type = 'text', value, handleChange, error }) => {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        className={error ? styles.inputError : ''}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
