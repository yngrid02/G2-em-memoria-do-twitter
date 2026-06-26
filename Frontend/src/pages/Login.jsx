import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Cadastro.css";

function Login() {

  const { register, handleSubmit } = useForm();

  const onSubmit = async (dados) => {

    try {

      const resposta = await axios.post(
        "http://localhost:3000/login",
        dados
      );

      alert(resposta.data.mensagem);

    } catch {

      alert("Login inválido");

    }

  };

  return (

    <form onSubmit={handleSubmit(onSubmit)}>

      <h1>Login</h1>

      <input
        placeholder="Email"
        {...register("email")}
      />

      <input
        type="password"
        placeholder="Senha"
        {...register("senha")}
      />

      <button type="submit">
        Entrar
      </button>

      <p className="link">
        Não possui uma conta?{" "}
        <Link to="/cadastro">Cadastre-se</Link>
      </p>

    </form>

  );

}

export default Login;