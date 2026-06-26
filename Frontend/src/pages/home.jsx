import { useState } from "react";
import "./Home.css";

function Home() {
  const [texto, setTexto] = useState("");

  const [posts, setPosts] = useState([
    {
      id: 1,
      autor: "Yngrid",
      texto: "Meu primeiro post!",
      curtido: false,
    },
    {
      id: 2,
      autor: "Pedro",
      texto: "Olá, pessoal!",
      curtido: false,
    },
  ]);

  function publicar() {
    if (texto.trim() === "") return;

    const novoPost = {
      id: Date.now(),
      autor: "Você",
      texto: texto,
      curtido: false,
    };

    setPosts([novoPost, ...posts]);
    setTexto("");
  }

  function curtir(id) {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? { ...post, curtido: !post.curtido }
          : post
      )
    );
  }

  return (
    <div className="home">

      <h1>Home</h1>

      <div className="novo-post">

        <textarea
          placeholder="O que estou pensando?"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />

        <button onClick={publicar}>
          Publicar
        </button>

      </div>

      <div className="lista-posts">

        {posts.map((post) => (

          <div className="post" key={post.id}>

            <h3>{post.autor}</h3>

            <p>{post.texto}</p>

            <button onClick={() => curtir(post.id)}>
              {post.curtido ? "💙 Descurtir" : "🤍 Curtir"}
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Home;