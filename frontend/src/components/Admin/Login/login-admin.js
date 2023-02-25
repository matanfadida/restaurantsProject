import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const LoginHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/auth`, {
      method: "POST"
    });
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const result = await response.json();
      navigate("/admin");
  }

  return (
    <div>
      <form onSubmit={LoginHandler}>
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
