import styles from '../styles/Form.module.css';

interface ButtonProps {
  disabled: boolean;
  text: string;
}

export const Button: React.FC<ButtonProps> = ({ disabled, text }) => {
  return (
    <button className={disabled ? styles.btnDisabled : styles.btn} disabled={disabled}>
      {text}
    </button>
  );
};
