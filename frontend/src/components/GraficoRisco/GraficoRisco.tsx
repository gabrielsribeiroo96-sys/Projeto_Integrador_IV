import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

interface GraficoRiscoProps {
  baixoRisco: number
  medioRisco: number
  altoRisco: number
}

function GraficoRisco({
  baixoRisco,
  medioRisco,
  altoRisco,
}: GraficoRiscoProps) {
  const dados = [
    {
      categoria: 'Baixo risco',
      quantidade: baixoRisco,
    },
    {
      categoria: 'Médio risco',
      quantidade: medioRisco,
    },
    {
      categoria: 'Alto risco',
      quantidade: altoRisco,
    },
  ]

  return (
    <section className="card grafico-card">
      <h2>Distribuição de risco</h2>

      <div className="grafico-container">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={dados}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="categoria" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar
              dataKey="quantidade"
              name="Quantidade"
              fill="#2563eb"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

export default GraficoRisco