import axios from 'axios';
import {useState} from 'react';
import './Inicio.css';
import { PropsDados } from '../../types/Clima';
import { Tempo } from '../../types/Clima';
import NotFound from '../../components/NotFound';

import { CgSearch } from 'react-icons/cg';
import {CgPin} from 'react-icons/cg'
import {BsWind} from 'react-icons/bs'
import {WiHumidity} from 'react-icons/wi'

export default function Inicio() {
    const apiKey = 'aec73cfed9d58ea1385802a8a6fe1198';
    const [cidade, setCidade] = useState('');
    const [dados, setDados] = useState<Tempo>(); 
    const [dataHora, setDataHora] = useState('');
    const [loading, setLoading] = useState(false);

    const pegarCidadeInput = (event:any) => {
        setCidade(event.target.value)
    }
    
    const apiClima = async () => {
        setLoading(true);
        const response = await axios.get<PropsDados>(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiKey}&lang=pt_br`);
        const tempo:Tempo = {
            coordenada: {latitude:response.data.coord.lat, longitude:response.data.coord.long},
            nome: response.data.name,
            temperatura: response.data.main.temp,
            pais: response.data.sys.country,
            vento: response.data.wind.speed,
            descricao: response.data.weather[0].description,
            umidade: response.data.main.humidity
        }
        geraDiaDaSemana()
        setDados(tempo);      
        setLoading(false);  
    }
    
    const geraDiaDaSemana = ():any => {
        let hora = (new Date)
        let dia = (new Date()).toString().slice(0, 3);
        switch(dia) {
            case 'Mon':
                dia = 'segunda-feira'
                break;
            case 'Tue':
                dia = 'terça-feira'
                break;
            case 'Wed':
                dia = 'quarta-feira'
                break;
            case 'Thu':
                dia = 'quinta-feira'
                break;
            case 'Fri':
                dia = 'sexta-feira'
                break;
            case 'Sat':
                dia = 'sábado'
                break;
            case 'Sun':
                dia = 'domingo'
                break;
        }
        let diaHora = `${dia}, ${hora.getHours()}:${hora.getMinutes()<= 9? '0'+`${hora.getMinutes()}`:`${hora.getMinutes()}`}`
        setDataHora(diaHora);
    }


    return (
        
        <div className="container__pai">
                <div className="form">
                    <h3 className='form__titulo'>Confira o clima!</h3>
                    <div className="form__input__container">
                        <input  className='inputCidade' type="text" value={cidade} placeholder='Digite o nome da cidade' onChange={pegarCidadeInput} />
                        <CgSearch className='botaoProcurar' type='Submit' onClick={apiClima}/>
                    </div>
                </div>
            {dados && (
                <>
                <meta  name='viewport'  content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
                <div className='wather'>
                    <h2 className='nome__pais'>
                        <CgPin size={24}/>
                        <span className='wather__nome' id='wather__nome'>{dados.nome} </span>
                        <img src={`https://flagsapi.com/${dados.pais}/flat/16.png`} alt="pais" /> 
                    </h2>
                    <p className='wather__data'><span>{dataHora}</span></p>
                    <p className='wather__temperatura'><span>{dados.temperatura.toFixed(0)}</span> &deg;C</p>
                    <div className='descricaoTempo'>
                        <p className='descricao'><span>{dados.descricao[0].toUpperCase()+dados.descricao.slice(1)}</span></p>
                    </div>
                    <div className='umidade__vento'>
                        <div className='umidade'>
                            <WiHumidity/>
                            <span>{dados.umidade}%</span>
                        </div>
                        <div className='vento'>
                            <BsWind/>
                            <span> {dados.vento.toFixed(0)}Km/h</span>
                        </div>
                    </div>
                </div>
                </>
            )}
            {loading && <p className='Loading'>Carregando...</p>}
        </div>
    );
}