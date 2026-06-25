import { useForm } from "react-hook-form";
import axios from "axios";

function Login() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (dados) => {
    try {
      const resposta = await axios.post(
        "http://localhost:3000/login",
        dados
      );
      
      // Aqui, se der certo, o ideal depois será salvar que o usuário logou (ex: no localStorage) 
      // e redirecionar ele para a Home!
      alert(resposta.data.mensagem);

    } catch {
      alert("Login inválido. Verifique seu email e senha.");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h2>Entrar no MicroTweet</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '300px' }}>
        
        <input
          placeholder="Email"
          type="email"
          {...register("email")}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          required
        />
        
        <input
          type="password"
          placeholder="Senha"
          {...register("senha")}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          required
        />
        
        <button type="submit" style={{ padding: '10px', backgroundColor: '#1DA1F2', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
          Entrar
        </button>
      </form>

      <p style={{ marginTop: '20px' }}>
        Não tem conta? <a href="/cadastro" style={{ color: '#1DA1F2', textDecoration: 'none' }}>Cadastre-se</a>
      </p>
    </div>
  );
}

export default Login;