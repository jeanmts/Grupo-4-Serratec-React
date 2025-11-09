import * as styles from "./Button.module.css"

const Button = ({ texto }) => {
  return <button className={styles.btn}>{texto}</button>;
};

export default Button;
