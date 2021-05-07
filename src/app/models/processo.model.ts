export class Processo {
  nome: string;
  chegada: number;
  inicio?: number;
  termino?: number;
  tempoExecucao: number;
  tempoRestante: number;
  esperando?: number;
  tempoEs1?: number;
  es1?: number;
  tempoEs2?: number;
  es2?: number;
}
