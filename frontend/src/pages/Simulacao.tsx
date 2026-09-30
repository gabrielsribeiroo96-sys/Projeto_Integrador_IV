import { useState } from 'react'
import FormularioCredito from '../components/FormularioCredito/FormularioCredito'
import ResultadoCredito from '../components/ResultadoCredito/ResultadoCredito'
import { analisarCredito } from '../services/creditoApi'
import type {
  Cliente,
  ResultadoCredito as ResultadoCreditoType,
} from '../types/credito'

function Simulacao() {
  const [resultado, setResultado] =
    useState<ResultadoCreditoType | null>(null)

  const [erro, setErro] = useState<string | null>(null)

  const [carregando, setCarregando] = useState(false)

  async function handleSubmit(cliente: Cliente) {
    setCarregando(true)
    setErro(null)
    setResultado(null)

    try {
      const dados = await analisarCredito(cliente)

      setResultado(dados)
    } catch {
      setErro('Não foi possível consultar a análise de crédito.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <>
      <FormularioCredito
        onSubmit={handleSubmit}
        carregando={carregando}
      />

      {carregando && (
        <div className="card">
          <p className="carregando">
            Consultando análise de crédito...
          </p>
        </div>
      )}

      {erro && (
        <div className="card">
          <p className="erro">{erro}</p>
        </div>
      )}

      {resultado && (
        <ResultadoCredito resultado={resultado} />
      )}
    </>
  )
}

export default Simulacao