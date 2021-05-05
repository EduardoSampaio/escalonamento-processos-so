export class Processo {
  nome: string;
  chegada: number;
  proxInicio: number;
  proxTermino: number;
  tempoExecucao: number;
  tempoRestante: number;
  entradaSaida?: Array<EntradaSaida>;
}


export class EntradaSaida {
  tempoInicio: number;
  tempoTotal: number;
  tempoRestante: number;
}
