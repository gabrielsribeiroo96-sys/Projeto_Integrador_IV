import type { DashboardResumo } from '../types/dashboard'

const API_URL = import.meta.env.VITE_API_URL

function validarDashboard(dados: unknown): dados is DashboardResumo {
  if (!dados || typeof dados !== 'object') {
    return false
  }

  const dashboard = dados as Record<string, unknown>

  return (
    typeof dashboard.total_analises === 'number' &&
    typeof dashboard.baixo_risco === 'number' &&
    typeof dashboard.medio_risco === 'number' &&
    typeof dashboard.alto_risco === 'number' &&
    typeof dashboard.inadimplencia_media === 'number' &&
    typeof dashboard.volume_credito_total === 'number'
  )
}

export async function buscarDashboard(): Promise<DashboardResumo> {
  const response = await fetch(`${API_URL}/api/dashboard/`)

  if (!response.ok) {
    throw new Error('Erro ao consultar os dados do dashboard.')
  }

  const dados: unknown = await response.json()

  if (!validarDashboard(dados)) {
    throw new Error('Resposta da API do dashboard inválida.')
  }

  return dados
}