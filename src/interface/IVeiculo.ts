export default interface IVeiculo {
    id: number,
    tipo: string, 
    cor: string, 
    marca: string, 
    modelo: string, 
    ano_fabricacao: string, 
    estado: string,
    km_rodados: number, 
    passagem_por_leilao: string,
    formas_de_pagamento: string,
}