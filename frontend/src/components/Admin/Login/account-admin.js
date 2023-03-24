import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = useRef();
  const userPassword = useRef();
  const [userEmailIsValid, setUserEmailIsValid] = useState(false);
  const [userPasswordIsValid, setUserPasswordIsValid] = useState(false);
  const [userEmailNotEmail, setUserEmailNotEmail] = useState(false);
  const [signup, setSignup] = useState(false);

  useEffect(() => {
    console.log(location.pathname);
    if(location.pathname.includes('signup')){
      setSignup(true);
    }
  }, [location.pathname])

  const AccountHandler = async (e) => {
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
    if(signup){
      const response = await fetch(`/api/auth/signup`, {
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
        navigate('/admin/login', { replace: true });
      }else{
        navigate('/admin/signup', { replace: true });
        console.log('error');
      }
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
    console.log(result);
    if(result === 'succeeded'){
      navigate('/admin', { replace: true });
    }else{
      navigate('/admin/login', { replace: true });
      console.log('error');
    }
  }

  return (
    <div>
      <form onSubmit={AccountHandler}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">אימייל</label>
          <input ref={userEmail} type="email" placeholder="אימייל" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          {userEmailIsValid && <span>אימייל לא יכול להיות ריק</span>}
          {userEmailNotEmail && <span>זה לא אימייל</span>}
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">סיסמה</label>
          <input ref={userPassword} type="password" className="form-control" id="exampleInputPassword1"/>
          {userPasswordIsValid && <span>סיסמה לא יכולה להיות ריקה</span>}
        </div>
        <button className="btn btn-primary">{signup ? "הוסף" : "כניסה"}</button>
      </form>
    </div>
  );
};

export default Account;
