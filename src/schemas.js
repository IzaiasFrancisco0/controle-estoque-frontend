import { z } from 'zod';

export const produtoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  categoria: z.enum([
    "Alimentos",
    "Frios",
    "Doces",
    "Bebidas",
    "Limpeza",
    "Higiene",
    "Ultilidades",
  ]),
  preco: z.number().positive("Preço deve ser positivo"),
  dataFabricado: z.string().refine(dateStr => !isNaN(Date.parse(dateStr)), {
    message: "Data de fabricação inválida",
  }),
  dataValidade: z.string().refine(dateStr => !isNaN(Date.parse(dateStr)), {
    message: "Data de validade inválida",
  }),
  quantidade: z.number().int().nonnegative("Quantidade não pode ser negativa"),
});
