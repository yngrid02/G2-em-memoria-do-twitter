import { useState } from 'react';
import './home.css';

function Home() {
  const [novoPost, setNovoPost] = useState('');
  
  // Criando mais posts de usuários para popular o Feed conforme solicitado
  const [posts, setPosts] = useState([
    { id: 1, usuario: "Marianne (Professora)", texto: "Lembrete: A entrega da G2 deve conter todas as rotas e validações funcionando!", curtido: false },
    { id: 2, usuario: "Pedro_Tech", texto: "Estilizando o layout do MicroTweet para ficar idêntico ao X. O roxo #4f46e5 ficou sensacional.", curtido: true },
    { id: 3, usuario: "Dev_Junior", texto: "Alguém mais sofrendo para conectar o Axios com o banco SQLite no backend? 🚀", curtido: false },
    { id: 4, usuario: "React_Fan", texto: "Dica de React: Sempre use chaves (keys) únicas ao renderizar listas com .map().", curtido: false }
  ]);

  const publicar = () => {
    if (novoPost.trim() === '') return;
    
    const novo = {
      id: Date.now(),
      usuario: "Você",
      texto: novoPost,
      curtido: false
    };
    
    setPosts([novo, ...posts]);
    setNovoPost('');
  };

  const toggleCurtir = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, curtido: !post.curtido } : post
    ));
  };

  return (
    <div className="home-layout">
      {/* O FEED PRINCIPAL */}
      <div className="home">
        <h1>MicroTweet</h1>

        {/* Caixa de Novo Post usando a sua tag textarea */}
        <div className="novo-post">
          <textarea 
            placeholder="O que está acontecendo?" 
            value={novoPost}
            onChange={(e) => setNovoPost(e.target.value)}
          />
          <button onClick={publicar}>Publicar</button>
        </div>

        {/* Lista de Posts */}
        <div className="feed">
          {posts.map((post) => (
            <div key={post.id} className="post">
              <h3>@{post.usuario}</h3>
              <p>{post.texto}</p>
              <button onClick={() => toggleCurtir(post.id)}>
                {post.curtido ? '❤️ Descurtir' : '🤍 Curtir'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* BARRA LATERAL (Para preencher o espaço e direcionar melhor a tela) */}
      <div className="sidebar-trends">
        <h3>O que está acontecendo</h3>
        <div className="trend-item">
          <span>Tendência em DSPW</span>
          <p>#G2ReactEExpress</p>
        </div>
        <div className="trend-item">
          <span>Tecnologia · Tendência</span>
          <p>SQLite3</p>
        </div>
        <div className="trend-item">
          <span>Assuntos do Momento</span>
          <p>Ulbra Torres</p>
        </div>
      </div>
    </div>
  );
}

export default Home;