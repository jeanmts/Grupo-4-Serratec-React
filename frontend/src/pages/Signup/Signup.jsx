import Button from "../../components/Button/Button";
import * as styles from "./Signup.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import api from "../../service/api";
import { Link, useNavigate } from "react-router-dom";
import "../../Global.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const Signup = () => {
  const [errorSignIn, setErrorSignIn] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = async (dados) => {
    try {
      if (dados.password != dados.confirmPassWord) {
        setErrorSignIn("Senha e confirmar senha não são iguais!");
        return;
      }

      const { username, password, email } = dados;
      await api.post("/users", { username, password, email });

      navigate("/login");
    } catch (error) {
      setErrorSignIn("Erro: " + error.response.data);
    }
  };

  return (
    <>
      <header >
       <Header op1= "Login" op3= "Produtos"/>
      </header>
      <main className={styles.mainSignup} >
        <div className={styles.containerMain} tabIndex={0}>
          <h1 className="title-login">Cadastrar</h1>
          <form onSubmit={handleSubmit(handleRegister)} tabIndex={0} aria-label="Formulário para cadastro de usuarios">
            <div className={styles.form}>
              <div className="mb-3" tabIndex={0}>
                <label
                tabIndex={0}
                  htmlFor="exampleInputEmail1"
                  className="form-label"
                  aria-placeholder="Digite um nome de usuario!"
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
                  placeholder="usuario"
                />

                <label
                tabIndex={0}
                  htmlFor="exampleInputEmail2"
                  className="form-label"
                  aria-placeholder="Digite o seu email"
                >
                  Email
                </label>
                <input
                tabIndex={0}
                  {...register("email", {
                    required: "O email é obrigatorio!",
                  })}
                  aria-invalid={errors.email ? "true" : "false"}
                  type="email"
                  className="form-control"
                  id="exampleInputEmail2"
                  aria-describedby="emailHelp"
                  placeholder="email@mailcom"
                />
              </div>

              <div className="mb-3" tabIndex={0}> 
                <label
                tabIndex={0}
                  htmlFor="exampleInputPassword3"
                  className="form-label"
                  aria-placeholder="Digite a sua senha"
                >
                  Senha
                </label>
                <input
                tabIndex={0}
                  {...register("password", {
                    required: "O usuario é obrigatorio!",
                  })}
                  aria-invalid={errors.userName ? "true" : "false"}
                  placeholder="Digite a sua senha"
                  type="password"
                  className="form-control"
                  id="exampleInputPassword3"
                />

                <label
                tabIndex={0}
                  htmlFor="exampleInputPassword4"
                  className="form-label"
                  aria-placeholder="Digite a sua senha"
                >
                  Confirmar Senha
                </label>
                <input
                tabIndex={0}
                  {...register("confirmPassWord", {
                    required: "O usuario é obrigatorio!",
                  })}
                  aria-invalid={errors.confirmPassWord ? "true" : "false"}
                  placeholder="Confirme a sua senha"
                  type="password"
                  className="form-control"
                  id="exampleInputPassword4"
                />
                {errorSignIn ? (
                  <span className={styles.spanErro}>{errorSignIn}</span>
                ) : null}
              </div>
              <Button texto="Cadastrar" tabIndex={0}/>
              <p tabIndex={0}>
                Ja possui uma conta ?<Link to={"/login"} tabIndex={0}>Acesse</Link>
              </p>
            </div>
          </form>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Signup;
