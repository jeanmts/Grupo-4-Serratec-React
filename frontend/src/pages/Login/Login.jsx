import { Link, useNavigate } from "react-router-dom";
import * as styles from "./Login.module.css";
import Signup from "../Signup/Signup";
import Button from "../../components/Button/Button";
import { useForm } from "react-hook-form";
import api from "../../service/api";
import { useContext, useEffect, useState } from "react";
import "../../Global.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const [errorSignIn, setErrorSignIn] = useState("");
  const { userName, setUserName } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/produtos");
    }
  }, []);

  const handleLogin = async (dados) => {
    try {
      if (!dados.username || !dados.password) {
        return;
      }
      const response = await api.post("/auth/login", { ...dados });
      console.log(response.data.token);
      if (response?.data) {
        const { token } = response.data;
        setUserName(dados.username);
        localStorage.setItem("username", dados.userName);
        console.log(localStorage.getItem("username"));
        localStorage.setItem("token", token);

        const { data } = await api.get("/users");
        console.log("Dado, ", data);
        const userFiltrado = data.filter(
          (user) => dados.username == user.username
        );
        console.log("UserFiltrado Login: ", userFiltrado);
        localStorage.setItem("id", userFiltrado[0].id);

        navigate("/produtos");
      } else {
        console.log("Nenhum dado retornado da API");
      }
    } catch (error) {
      setErrorSignIn("Erro: " + error);
    }
  };

  return (
    <>
      <header>
        <Header op1={"Produtos"} op2={"Carrinho"} op3={"Cadastro"} />
      </header>
      <main id="main" className={styles.mainLogin}>
        <div className={styles.containerMain} tabIndex={0}>
          <h1 className={styles.titleLogin}>Login</h1>
          <form
            onSubmit={handleSubmit(handleLogin)}
            aria-label="Formulário para login do usuario"
          >
            <div className="mb-3" tabIndex={0}>
              <label
                htmlFor="exampleInputEmail1"
                className="form-label"
                aria-placeholder="Digite o seu usuario!"
              >
                Usuario
              </label>
              <input
                tabIndex={0}
                {...register("username", {
                  required: "O usuario é obrigatorio!",
                })}
                aria-invalid={errors.userName ? "true" : "false"}
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Digite o seu usuario!"
                required
              />
            </div>
            <div className="mb-3" tabIndex={0}>
              <label
                htmlFor="exampleInputPassword1"
                className="form-label"
                aria-placeholder="Digite a sua senha"
              >
                Senha
              </label>
              <input
                tabIndex={0}
                {...register("password", { required: "A senha é obrigatoria" })}
                aria-invalid={errors.password ? "true" : "false"}
                placeholder="Digite a sua senha"
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                required
              />
            </div>
            <Button tabIndex={0} texto="Login" />
          </form>
          {errorSignIn ? (
            <span className={styles.spanErro}>{errorSignIn}</span>
          ) : null}
          <p tabIndex={0}>
            Não tem uma conta
            <Link to="/cadastro" tabIndex={0}>
              Cadastre-se
            </Link>
          </p>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Login;
