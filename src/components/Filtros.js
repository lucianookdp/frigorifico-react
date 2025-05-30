import React, { useEffect, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import "../styles/Filtros.css";

const Filtros = ({ produtos, onFiltroAtualizado, classeExtra = "" }) => {
  const [categoriaAtual, setCategoriaAtual] = useState("Todas");
  const [textoAtual, setTextoAtual] = useState("");

  const normalizeTexto = (texto) => {
    return texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  useEffect(() => {
    let ativo = true;

    const aplicarFiltro = () => {
      const produtosFiltrados = produtos.filter((produto) => {
        const correspondeCategoria =
          categoriaAtual === "Todas" || produto.categoria === categoriaAtual;

        const tituloNormalizado = normalizeTexto(produto.titulo);
        const textoNormalizado = normalizeTexto(textoAtual);

        const correspondeNome = tituloNormalizado.includes(textoNormalizado);

        return correspondeCategoria && correspondeNome;
      });

      if (ativo) {
        onFiltroAtualizado(produtosFiltrados);
      }
    };

    aplicarFiltro();

    return () => {
      ativo = false;
    };
  }, [produtos, categoriaAtual, textoAtual, onFiltroAtualizado]);

  const resetarFiltros = () => {
    setCategoriaAtual("Todas");
    setTextoAtual("");
  };

  return (
    <div className={`filtros-container ${classeExtra}`}>
      <select
        value={categoriaAtual}
        onChange={(e) => setCategoriaAtual(e.target.value)}
        className="filtro-categoria"
      >
        <option value="Todas">Todas as Categorias</option>
        <option value="Carne Bovina">Carne Bovina</option>
        <option value="Carne Suína">Carne Suína</option>
        <option value="Aves">Aves</option>
      </select>

      <input
        type="text"
        placeholder="Buscar por nome..."
        value={textoAtual}
        onChange={(e) => setTextoAtual(e.target.value)}
        className="filtro-nome"
      />

      <button
        className="btn-resetar-filtros"
        onClick={resetarFiltros}
        title="Limpar Filtros"
      >
        <FiRefreshCcw size={18} />
      </button>
    </div>
  );
};

export default Filtros;
