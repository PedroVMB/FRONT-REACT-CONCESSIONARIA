import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
} from "@mui/material";
import CustomTextField from "../../components/text-field";
import { useParams } from "react-router-dom";
import IVeiculo from "../../interface/IVeiculo";
import { http } from "../../http";

export const FormRegisterVehicle = () => {
  const parametros = useParams();

  const [veiculo, setVeiculo] = useState<IVeiculo>({
    tipo: "",
    cor: "",
    marca: "",
    modelo: "",
    ano_fabricacao: 0, // Tipo corrigido para number
    estado: "",
    km_rodados: 0, // Tipo corrigido para number
    passagem_por_leilao: "",
    formas_de_pagamento: "",
  });

  useEffect(() => {
    if (parametros.id) {
      http.get<IVeiculo>(`veiculos/${parametros.id}`).then((resposta) => {
        setVeiculo(resposta.data);
      });
    }
  }, [parametros]);

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (parametros.id) {
      http.put(`veiculos/${parametros.id}`, veiculo).then(() => {
        alert("Veiculo atualizado com sucesso!");
      });
    } else {
      http.post("veiculos", veiculo).then(() => {
        alert("Novo veiculo cadastrado com sucesso!");
      });
    }
  };

  return (
    <Card>
      <CardHeader title="Adicionar Veiculo" />
      <CardContent>
        <form onSubmit={aoSubmeterForm}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label="Tipo"
                value={veiculo.tipo}
                onChange={(evento) =>
                  setVeiculo({ ...veiculo, tipo: evento.target.value })
                }
                placeholder="Carro ou moto"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label="Cor"
                value={veiculo.cor}
                onChange={(evento) =>
                  setVeiculo({ ...veiculo, cor: evento.target.value })
                }
                placeholder="Preto, branco, vermelho, etc..."
                required
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label="Marca"
                value={veiculo.marca}
                onChange={(evento) =>
                  setVeiculo({ ...veiculo, marca: evento.target.value })
                }
                placeholder="Kawasaki, Toyota, Chevrolet, etc..."
                required
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label="Modelo"
                value={veiculo.modelo}
                onChange={(evento) =>
                  setVeiculo({ ...veiculo, modelo: evento.target.value })
                }
                placeholder="ret, sedan, etc"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label="Ano de Fabricação"
                value={veiculo.ano_fabricacao}
                onChange={(evento) =>
                  setVeiculo({
                    ...veiculo,
                    ano_fabricacao: parseInt(evento.target.value),
                  })
                }
                placeholder="2001, 2019, 2023"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label="Estado"
                value={veiculo.estado}
                onChange={(evento) =>
                  setVeiculo({ ...veiculo, estado: evento.target.value })
                }
                placeholder="Novo ou seminovo"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label="Km rodados"
                value={veiculo.km_rodados} 
                onChange={(evento) =>
                  setVeiculo({
                    ...veiculo,
                    km_rodados: parseInt(evento.target.value),
                  })
                }
                required
                placeholder="41000, 30000, etc"
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label="Passou por leilão?"
                value={veiculo.passagem_por_leilao}
                onChange={(evento) =>
                  setVeiculo({
                    ...veiculo,
                    passagem_por_leilao: evento.target.value,
                  })
                }
                placeholder="Sim ou não"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label="Forma de pagamento"
                value={veiculo.formas_de_pagamento}
                onChange={(evento) =>
                  setVeiculo({
                    ...veiculo,
                    formas_de_pagamento: evento.target.value,
                  })
                }
                placeholder="A vista ou parcelado"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  gap: 5,
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Button type="submit" variant="contained">
                  Adicionar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};
