import React, { useState } from 'react';
import '../assets/styles.css'; // Certifique-se de que o CSS está configurado

const Carrinho = () => {
    const [carrinho, setCarrinho] = useState([]);
    const [nomeItem, setNomeItem] = useState('');
    const [quantidadeItem, setQuantidadeItem] = useState(1);
    const [precoItem, setPrecoItem] = useState('');
    const [codigoDesconto, setCodigoDesconto] = useState('');
    const [total, setTotal] = useState(0);

    const atualizarTabelaCarrinho = () => {
        let total = 0;
        carrinho.forEach(item => {
            const subtotal = item.quantidade * item.preco;
            total += subtotal;
        });
        setTotal(total);
    };

    const adicionarItem = (event) => {
        event.preventDefault();
        const quantidade = parseInt(quantidadeItem);
        const preco = parseFloat(precoItem);

        const itemExistente = carrinho.find(item => item.nome === nomeItem);
        if (itemExistente) {
            itemExistente.quantidade += quantidade;
            setCarrinho([...carrinho]);
        } else {
            setCarrinho([...carrinho, { nome: nomeItem, quantidade, preco }]);
        }

        // Resetar os campos
        setNomeItem('');
        setQuantidadeItem(1);
        setPrecoItem('');
        atualizarTabelaCarrinho();
    };

    const removerItem = (indice) => {
        const novoCarrinho = carrinho.filter((_, i) => i !== indice);
        setCarrinho(novoCarrinho);
        atualizarTabelaCarrinho();
    };

    const aplicarDesconto = (event) => {
        event.preventDefault();
        let desconto = 0;
        if (codigoDesconto === 'DESC10') {
            desconto = 0.10;
        } else if (codigoDesconto === 'DESC20') {
            desconto = 0.20;
        } else {
            alert('Código de desconto inválido.');
            return;
        }

        const novoTotal = total * (1 - desconto);
        setTotal(novoTotal);
        alert(`Desconto de ${desconto * 100}% aplicado!`);

        // Resetar o campo de desconto
        setCodigoDesconto('');
    };

    return (
        <div className="container">
            <h1>Gerenciador de Carrinho</h1>
            <form id="formItem" onSubmit={adicionarItem}>
                <input
                    type="text"
                    placeholder="Nome do Item"
                    value={nomeItem}
                    onChange={(e) => setNomeItem(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Quantidade"
                    value={quantidadeItem}
                    onChange={(e) => setQuantidadeItem(e.target.value)}
                    min="1"
                    required
                />
                <input
                    type="number"
                    placeholder="Preço Unitário"
                    value={precoItem}
                    onChange={(e) => setPrecoItem(e.target.value)}
                    min="0"
                    required
                />
                <button type="submit">Adicionar</button>
            </form>

            <form id="formDesconto" onSubmit={aplicarDesconto}>
                <input
                    type="text"
                    placeholder="Código de Desconto"
                    value={codigoDesconto}
                    onChange={(e) => setCodigoDesconto(e.target.value)}
                />
                <button type="submit">Aplicar Desconto</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Quantidade</th>
                        <th>Preço Unitário</th>
                        <th>Subtotal</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {carrinho.map((item, index) => (
                        <tr key={index}>
                            <td>{item.nome}</td>
                            <td>{item.quantidade}</td>
                            <td>R$ {item.preco.toFixed(2)}</td>
                            <td>R$ {(item.quantidade * item.preco).toFixed(2)}</td>
                            <td>
                                <button onClick={() => removerItem(index)}>Remover</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Total: R$ {total.toFixed(2)}</h2>
        </div>
    );
};

export default Carrinho;