import { memo, forwardRef, useRef, useEffect } from "react";

import styles from "./Input.module.scss";
function Input(
  { label, name, type, value, onChange, placeholder, error },
  ref
) {
  return (
    <div className={styles.warrap}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        ref={(dom) => (ref.current.domInput = dom)}
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
      />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}

const InputNoRef = ({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  error,
}) => {
  const styleObj = { margin: "0" };
  return (
    <div className={styles.warrap} style={styleObj}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
      />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};
export { InputNoRef };
export default memo(forwardRef(Input));
