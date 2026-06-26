import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Cadastro.css";

function Cadastro() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (dados) => {

    try {

      const resposta = await axios.post(
        "http://localhost:3000/cadastro",
        dados
      );

      alert(resposta.data.mensagem);

    } catch (erro) {

      alert("Erro");

    }

  };

  return (

    <form onSubmit={handleSubmit(onSubmit)}>

      <h1>Cadastro</h1>

      <input
        placeholder="Nome"
        {...register("nome", {
          required: "Informe o nome"
        })}
      />

      <p>{errors.nome?.message}</p>

      <input
        placeholder="Email"
        {...register("email", {
          required: "Informe o email"
        })}
      />

      <p>{errors.email?.message}</p>

      <input
        type="password"
        placeholder="Senha"
        {...register("senha", {
          required: "Informe a senha",
          minLength: {
            value: 8,
            message: "A senha deve ter no mínimo 8 caracteres"
          }
        })}
      />

      <p>{errors.senha?.message}</p>

      <input
        type="password"
        placeholder="Confirmar senha"
        {...register("confirmarSenha", {
          validate: (v, dados) =>
            v === dados.senha || "As senhas não coincidem"
        })}
      />

      <p>{errors.confirmarSenha?.message}</p>

      <button type="submit">
        Cadastrar
      </button>

      <p className="link">
        Já possui uma conta?{" "}
        <Link to="/">Entrar</Link>
      </p>

    </form>

  );

}

export default Cadastro;