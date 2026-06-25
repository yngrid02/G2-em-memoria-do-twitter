import { useForm } from "react-hook-form";
import axios from "axios";
import "./Cadastro.css";

function Cadastro(){

const {register,handleSubmit,formState:{errors}}=useForm();

const onSubmit=async(dados)=>{

try{

const resposta=await axios.post(

"http://localhost:3000/cadastro",

dados

);

alert(resposta.data.mensagem);

}catch(erro){

alert("Erro");

}

};

return(

<form onSubmit={handleSubmit(onSubmit)}>

<input
placeholder="Nome"
{...register("nome",{

required:"Informe o nome"

})}
/>

<p>{errors.nome?.message}</p>

<input
placeholder="Email"
{...register("email",{

required:"Informe o email"

})}
/>

<p>{errors.email?.message}</p>

<input
type="password"
placeholder="Senha"
{...register("senha",{

required:"Informe a senha",

minLength:8

})}
/>

<p>{errors.senha?.message}</p>

<input
type="password"
placeholder="Confirmar senha"
{...register("confirmarSenha",{

validate:(v,dados)=>

v===dados.senha||

"As senhas não coincidem"

})}
/>

<button>

Cadastrar

</button>

</form>

);

}

export default Cadastro;
