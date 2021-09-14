import './styles.css';

export const Button = ({ text, click, disabled }) => (
  <button
    className='button'
    onClick={click}
    disabled={disabled}
  >
    {text}
  </button>
);