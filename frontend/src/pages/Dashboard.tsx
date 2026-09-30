import { useEffect, useState } from 'react'
import GraficoRisco from '../components/GraficoRisco/GraficoRisco'
import { buscarDashboard } from '../services/dashboardApi'
import type { DashboardResumo } from '../types/dashboard'

function Dashboard() {
  const [dados, setDados] = useState<DashboardResumo | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    async function carregarDashboard() {
      try {
        setCarregando(true)
        setErro(null)

        const resultado = await buscarDashboard()

        setDados(resultado)
      } catch {
        setErro('Não foi possível carregar os dados do dashboard.')
      } finally {
        setCarregando(false)
      }
    }

    carregarDashboard()
  }, [])

  if (carregando) {
    return (
      <section className="card">
        <h2>Dashboard</h2>

        <p className="carregando">
          Carregando dados do dashboard...
        </p>
      </section>
    )
  }

  if (erro) {
    return (
      <section className="card">
        <h2>Dashboard</h2>

        <p className="erro">{erro}</p>
      </section>
    )
  }

  if (!dados) {
    return null
  }

  return (
    <>
      <section className="card">
        <h2>Dashboard</h2>

        <p>
          Visão geral dos resultados da análise de crédito.
        </p>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <strong>Total de análises</strong>
            <span>{dados.total_analises}</span>
          </div>

          <div className="dashboard-card">
            <strong>Baixo risco</strong>
            <span>{dados.baixo_risco}</span>
          </div>

          <div className="dashboard-card">
            <strong>Médio risco</strong>
            <span>{dados.medio_risco}</span>
          </div>

          <div className="dashboard-card">
            <strong>Alto risco</strong>
            <span>{dados.alto_risco}</span>
          </div>

          <div className="dashboard-card">
            <strong>Inadimplência média</strong>
            <span>
              {dados.inadimplencia_media.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              %
            </span>
          </div>

          <div className="dashboard-card">
            <strong>Volume total de crédito</strong>
            <span>
              R${' '}
              {dados.volume_credito_total.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </section>

      <GraficoRisco
        baixoRisco={dados.baixo_risco}
        medioRisco={dados.medio_risco}
        altoRisco={dados.alto_risco}
      />
    </>
  )
}

export default Dashboard