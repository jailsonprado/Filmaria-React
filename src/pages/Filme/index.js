import {useEffect, useState}  from 'react'
import './filme-info.css';
import { useParams, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-toastify';

export default function Filme(){
    const { id } = useParams();
    const [filme, setFilme] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        async function loadFilmes(){
            const response = await api.get(`r-api/?api=filmes/${id}`)
            if(response.data.length === 0){
                history.replace('/');
                return;
            }

            setFilme(response.data);
            setLoading(false)
        }
        
        loadFilmes()

        return () => {
            console.log('componente desmontado')
        }


    },[id, history])

    function salvafilme(){

        const minhaLista = localStorage.getItem('filmes');

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some( (filmeSalvo) => filmeSalvo.id === filme.id )
    
        if(hasFilme){
            toast.error('Você já possui esse filme salvo.');
          return;
          //Para execuçao do código aqui...
        }
    

        filmesSalvos.push(filme);
        localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
        toast.success('Filme salvo com sucesso!')
    }

    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando filme...</h1>
            </div>
        )
    }

    return(
        <div className="filme-info">
            <h1>{filme.nome}</h1>
            <img src={filme.foto} alt={filme.nome} />

            <h3>Sinopse</h3>
            {filme.sinopse}

            <div className="botoes">
                <button onClick={salvafilme} >Salvar</button>
                <button>
                    <a 
                        target="blank"
                        href={`https://www.youtube.com/results?search_query=${filme.nome} Trailer`} >
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}