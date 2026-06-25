import { useForm } from "react-hook-form";
import axios from "axios";

function Login(){

const {register,handleSubmit}=useForm();

const onSubmit=async(dados)=>{

try{

const resposta=await axios.post(

"http://localhost:3000/login",

dados

);

alert(resposta.data.mensagem);

}catch{

alert("Login inválido");

}

};

return(

<form onSubmit={handleSubmit(onSubmit)}>

<input

placeholder="Email"

{...register("email")}

/>

<input

type="password"

placeholder="Senha"

{...register("senha")}

/>

<button>

Entrar

</button>

</form>

);

}

export default Login;
