import { useState } from "react";
import { getContract } from "../../blockchain/contract";

export default function Blockchain() {
  const [status, setStatus] = useState("");
  const days = 7;

  async function handleMarkCompleted() {
    try {
      const contract = await getContract();
      const tx = await contract.markWorkCompleted(days);
      await tx.wait();
      setStatus("✅ Trabalho marcado como concluído!");
    } catch (e) {
      setStatus(`❌ Erro: ${e.message}`);
    }
  }

  async function handleAutoRelease() {
    try {
      const contract = await getContract();
      const tx = await contract.autoRelease();
      await tx.wait();
      setStatus("💰 Pagamento liberado automaticamente!");
    } catch (e) {
      setStatus(`❌ Erro: ${e.message}`);
    }
  }

  return (
    <div className="p-4 bg-gray-100 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">TechSync Escrow Demo</h1>

      <button
        onClick={handleMarkCompleted}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg mr-2"
      >
        Marcar como Concluído
      </button>

      <button
        onClick={handleAutoRelease}
        className="px-4 py-2 bg-green-600 text-white rounded-lg"
      >
        Liberar Automaticamente
      </button>

      <p className="mt-4 text-gray-700">{status}</p>
    </div>
  );
}
