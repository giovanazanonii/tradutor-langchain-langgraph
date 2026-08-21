import { useTradutor } from "./hooks/useTradutor";

function App() {
  const {
    idiomas,
    idiomaOrigem,
    setIdiomaOrigem,
    idiomaDestino,
    setIdiomaDestino,
    texto,
    setTexto,
    traducao,
    menuOrigemAberto,
    setMenuOrigemAberto,
    menuDestinoAberto,
    setMenuDestinoAberto,
    carregando,
    inverterIdiomas,
  } = useTradutor();

  return (
    <main className="page">
      <div className="background"></div>

      <section className="container">
        <header className="header">
          <h1>Tradutor</h1>

          <p>Traduza qualquer texto instantaneamente</p>
        </header>

        <div className="translator-card">
          <div className="translator-top">
            <div className="language language-left">
              <span>IDIOMA</span>

              <button
                className="language-button"
                onClick={() => setMenuOrigemAberto(!menuOrigemAberto)}
              >
                {idiomaOrigem}
                <span className="arrow">{menuOrigemAberto ? "⌃" : "⌄"}</span>
              </button>
              {menuOrigemAberto && (
                <div className="language-menu">
                  {idiomas.map((idioma) => (
                    <button
                      key={idioma}
                      className="language-option"
                      onClick={() => {
                        setIdiomaOrigem(idioma);
                        setMenuOrigemAberto(false);
                      }}
                    >
                      {idioma}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="swap-button" onClick={inverterIdiomas}>
              ⇆
            </button>

            <div className="language language-right">
              <span>TRADUZIR PARA</span>

              <button
                className="language-button"
                onClick={() => setMenuDestinoAberto(!menuDestinoAberto)}
              >
                {idiomaDestino}
                <span className="arrow">{menuDestinoAberto ? "⌃" : "⌄"}</span>
              </button>

              {menuDestinoAberto && (
                <div className="language-menu">
                  {idiomas.map((idioma) => (
                    <button
                      key={idioma}
                      className="language-option"
                      onClick={() => {
                        setIdiomaDestino(idioma);
                        setMenuDestinoAberto(false);
                      }}
                    >
                      {idioma}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="translator-body">
            <div className="text-column">
              <textarea
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Escreva o texto aqui..."
              />

              <div className="counter">{texto.length}/5000</div>
            </div>

            <div className="text-column">
              <textarea
                value={carregando ? "Traduzindo..." : traducao}
                placeholder="Traduzir para..."
                readOnly
              />
            </div>
          </div>
        </div>

        <footer className="footer">
          Projeto desenvolvido por{" "}
          <a
            href="https://github.com/betinalimaj"
            target="_blank"
            rel="noopener noreferrer"
          >
            Betina Lima
          </a>
          {" • "}
          <a
            href="https://github.com/github-colega1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Giovana Zanoni
          </a>
          {" • "}
          <a
            href="https://github.com/leozhxl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Leo Henrique Candido
          </a>{" "}
          © 2026
        </footer>
      </section>
    </main>
  );
}

export default App;
