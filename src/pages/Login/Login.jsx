import { Link, useNavigate } from "react-router-dom";
import * as styles from "./Login.module.css";
import Signup from "../Signup/Signup";
import Button from "../../components/Button/Button";
import { useForm } from "react-hook-form";
import api from "../../service/api";
import { useEffect, useState } from "react";
import "../../Global.css"
const Login = () => {
  const navigate = useNavigate();
    const [errorSignIn, setErrorSignIn]  = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  const handleLogin = async (dados) => {
    try {
      if (!dados.username || !dados.password) {
        return;
      }
      const response = await api.post("/auth/login", { ...dados });

      const { token } = response.data;

      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
      setErrorSignIn("Erro: " + error.response.data)
    }
  };

  return (
    <main id="main" className={styles.mainLogin}>
      <div className={styles.containerMain}>
        <h1 className={styles.titleLogin}>Login</h1>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label"
              aria-placeholder="Digite o seu email"
            >
              Usuario
            </label>
            <input
              {...register("username", {
                required: "O usuario é obrigatorio!",
              })}
              aria-invalid={errors.userName ? "true" : "false"}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="email@mailcom"
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label"
              aria-placeholder="Digite a sua senha"
            >
              Senha
            </label>
            <input
              {...register("password", { required: "A senha é obrigatoria" })}
              aria-invalid={errors.password ? "true" : "false"}
              placeholder="Digite a sua senha"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          <Button texto="Login" />
        </form>
         {errorSignIn ? <span className={styles.spanErro}>{errorSignIn}</span> : null  }
        <p>
          Não tem uma conta<Link to="/signup">Cadastre-se</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
