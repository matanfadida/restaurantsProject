import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const userEmail = useRef();
  const userPassword = useRef();
  const [userEmailIsValid, setUserEmailIsValid] = useState(false);
  const [userPasswordIsValid, setUserPasswordIsValid] = useState(false);
  const [userEmailNotEmail, setUserEmailNotEmail] = useState(false);

  const LoginHandler = async (e) => {
    e.preventDefault();
    const enterdEmail = userEmail.current.value;
    const enterdPassword = userPassword.current.value;

    if(enterdEmail.trim() === '' || enterdPassword.trim() === ''){
      setUserEmailIsValid(true);
      if(enterdPassword.trim() === ''){
        setUserPasswordIsValid(true);
      }
      return;
    }
    if(enterdPassword.trim() === ''){
      setUserPasswordIsValid(true);
      return;
    }
    if(!enterdEmail.include('@')){
      setUserEmailNotEmail(true);
      return;
    }
    const response = await fetch(`/api/auth`, {
      method: "POST",
      body: JSON.stringify({
        email: enterdEmail,
        password: enterdPassword
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Request failed!");
    }
    const result = await response.json();
    if(result === 'ok'){
      navigate('/admin', { replace: true });
    }else{
      console.log('error');
    }
  }

  return (
    <div>
      <form onSubmit={LoginHandler}>
        <div>
          <label>אימייל</label>
          <input ref={userEmail} type="email" placeholder="אימייל"/>
          {userEmailIsValid && <span>אימייל לא יכול להיות ריק</span>}
          {userEmailNotEmail && <span>זה לא אימייל</span>}
        </div>
        <div>
          <label>סיסמה</label>
          <input ref={userPassword} type="password"/>
          {userPasswordIsValid && <span>סיסמה לא יכולה להיות ריקה</span>}
        </div>
        <button>כניסה</button>
      </form>
    </div>
  );
};

export default Login;
