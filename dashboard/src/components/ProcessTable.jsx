const STATE_STYLES = {
  RUNNING:
    'bg-green-500/15 text-green-400 border border-green-500/30',

  READY:
    'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30',

  BLOCKED:
    'bg-red-500/15 text-red-400 border border-red-500/30',

  TERMINATED:
    'bg-gray-700/40 text-gray-400 border border-gray-600/40',

  NEW:
    'bg-blue-500/15 text-blue-400 border border-blue-500/30',
};

export default function ProcessTable({
  processes,
  selectedPid,
  onSelect
}) {

  const procs = Object.values(processes);

  if (procs.length === 0) {
    return (
      <div className="text-gray-500 text-center py-10">
        No hay procesos activos.<br />

        <span className="text-gray-600 text-sm">
          Usa <code className="text-gray-400">run</code> en miniOS
          para lanzar uno.
        </span>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-800">

      <table className="w-full text-sm">

        {/* HEADER */}
        <thead className="bg-gray-900/80 backdrop-blur">
          <tr className="text-gray-400 border-b border-gray-800">

            <th className="text-left py-3 px-3 w-6"></th>

            <th className="text-left py-3 px-3 font-medium">
              PID
            </th>

            <th className="text-left py-3 px-3 font-medium">
              Nombre
            </th>

            <th className="text-left py-3 px-3 font-medium">
              Estado
            </th>

            <th className="text-right py-3 px-3 font-medium">
              CPU (ms)
            </th>

            <th className="text-right py-3 px-3 font-medium">
              Switches
            </th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>

          {procs.map(proc => (

            <tr
              key={proc.pid}
              onClick={() => onSelect(proc.pid)}
              className={`
                border-b border-gray-900
                cursor-pointer
                transition-all duration-150
                hover:bg-gray-800/70
                ${selectedPid === proc.pid
                  ? 'bg-gray-800/80'
                  : 'bg-transparent'}
              `}
            >

              {/* Color */}
              <td className="py-3 px-3">

                <div
                  className="w-3 h-3 rounded-full shadow"
                  style={{
                    backgroundColor:
                      proc.color || '#6b7280'
                  }}
                />

              </td>

              {/* PID */}
              <td className="py-3 px-3 font-mono text-gray-300">
                {proc.pid}
              </td>

              {/* Name */}
              <td className="py-3 px-3 text-gray-200 font-medium">
                {proc.name}
              </td>

              {/* State */}
              <td className="py-3 px-3">

                <span
                  className={`
                    inline-flex items-center
                    rounded-full px-2.5 py-1
                    text-xs font-semibold
                    tracking-wide
                    ${STATE_STYLES[proc.state] ||
                      'text-gray-400'}
                  `}
                >
                  {proc.state}
                </span>

              </td>

              {/* CPU */}
              <td className="
                py-3 px-3 text-right
                font-mono text-cyan-300
              ">
                {(proc.cpuTime || 0).toFixed(1)}
              </td>

              {/* Switches */}
              <td className="
                py-3 px-3 text-right
                font-mono text-purple-300
              ">
                {proc.switches || 0}
              </td>

            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
}