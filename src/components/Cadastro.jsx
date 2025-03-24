import { useEffect, useState } from 'react';

function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    const storageValue = localStorage.getItem(key);
    if (storageValue) {
      return JSON.parse(storageValue);
    }
    return typeof initialValue === 'function' ? initialValue() : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export function Cadastro() {
  const [input, setInput] = useState('');
  const [tarefas, setTarefas] = useLocalStorage('@tarefas', [
    'Pagar a conta de luz',
    'Estudar Programação',
    'Enviar a tarefa',
  ]);
  const [nome, _] = useLocalStorage('@nome', () =>
    prompt('Qual é o seu nome?')
  );
  const [corFundo, setCorFundo] = useLocalStorage('@corFundo', 'white');

  useEffect(() => {
    document.body.style.backgroundColor = corFundo;
  }, [corFundo]);

  function handleRegistro(e) {
    e.preventDefault();
    if (input.trim()) {
      setTarefas((old) => [...old, input]);
      setInput('');
    }
  }

  function handleCorChange(e) {
    setCorFundo(e.target.value);
  }

  return (
    <div>
      <h1>{nome}, sua lista de tarefas:</h1>
      <form onSubmit={handleRegistro}>
        <label>Nome da tarefa: </label>
        <br />
        <input
          placeholder="Digite uma tarefa"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <br />
        <button type="submit">Registro</button>
      </form>
      <br />
      <ul>
        {tarefas.map((tarefa, index) => (
          <li key={index}>{tarefa}</li>
        ))}
      </ul>
      <br />

      <div>
        <p>Escolha a cor de fundo:</p>
        <label>
          <input
            type="radio"
            name="corFundo"
            value="white"
            checked={corFundo === 'white'}
            onChange={handleCorChange}
          />
          Branco
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="corFundo"
            value="lightyellow"
            checked={corFundo === 'lightyellow'}
            onChange={handleCorChange}
          />
          Amarelo claro
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="corFundo"
            value="lightblue"
            checked={corFundo === 'lightblue'}
            onChange={handleCorChange}
          />
          Azul claro
        </label>
      </div>
    </div>
  );
}
