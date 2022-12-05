const Login = () => {
  return (
    <div>
      <form>
        <div>
          <label>אימייל</label>
          <input type="email" placeholder="אימייל" />
        </div>
        <div>
          <label>סיסמא</label>
          <input type="password" />
        </div>
        <button>כניסה</button>
      </form>
    </div>
  );
};

export default Login;
