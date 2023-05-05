import classes from './Button.module.css'

const ButtonGroup = () => {
  const [focus, setFocus] = useState();

  return (
    <div className={classes.button}>
      <button>בהכנה</button>
      <button>מוכן</button>
    </div>
  );
};

export default ButtonGroup;
