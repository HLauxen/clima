export interface PropsDados {
    coord: {lat: number, long:number},
    main: {temp:number, humidity:number},
    name: string,
    sys: {country: string},
    weather: {main: string, description: string}[],
    wind: {speed: number}
}

export interface Tempo {
    coordenada: {latitude: number, longitude:number},
    temperatura: number,
    nome: string,
    pais: string,
    vento: number,
    descricao: string,
    umidade: number
};