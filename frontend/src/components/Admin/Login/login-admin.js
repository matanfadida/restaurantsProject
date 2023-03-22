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
    if(!enterdEmail.includes('@')){
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
        <div class="form-group">
          <label for="exampleInputEmail1">אימייל</label>
          <input ref={userEmail} type="email" placeholder="אימייל" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          {userEmailIsValid && <span>אימייל לא יכול להיות ריק</span>}
          {userEmailNotEmail && <span>זה לא אימייל</span>}
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">סיסמה</label>
          <input ref={userPassword} type="password" class="form-control" id="exampleInputPassword1"/>
          {userPasswordIsValid && <span>סיסמה לא יכולה להיות ריקה</span>}
        </div>
        <button class="btn btn-primary">כניסה</button>
      </form>
    </div>
  );
};

export default Login;
