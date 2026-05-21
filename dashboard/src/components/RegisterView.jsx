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

export default function RegisterView({
  processes,
  selectedPid,
  events
}) {

  if (!selectedPid) {
    return (
      <div className="
        text-gray-500
        text-center
        py-10
      ">
        Selecciona un proceso<br />

        <span className="text-sm text-gray-600">
          para inspeccionar sus registros.
        </span>
      </div>
    );
  }

  const proc = processes[selectedPid];

  if (!proc) {
    return (
      <div className="
        text-gray-500
        text-center
        py-10
      ">
        Proceso {selectedPid} no encontrado.
      </div>
    );
  }

  // Último snapshot de registros
  const regEvents = events.filter(
    e => e.type === 'REGISTERS' &&
         e.pid === selectedPid
  );

  const lastRegs =
    regEvents.length > 0
      ? regEvents[regEvents.length - 1]
      : null;

  return (
    <div className="space-y-5">

      {/* HEADER */}
      <div className="
        rounded-xl
        border border-gray-800
        bg-gray-900/70
        p-4
      ">

        <div className="
          flex items-start
          justify-between
          mb-4
        ">

          <div>

            <div className="
              text-xs uppercase
              tracking-widest
              text-gray-500
              mb-1
            ">
              Process Inspector
            </div>

            <h3 className="
              text-xl font-bold
              text-white
            ">
              PID {proc.pid}
            </h3>

            <div className="
              text-gray-400
              mt-1
            ">
              {proc.name}
            </div>

          </div>

          <span
            className={`
              inline-flex items-center
              rounded-full
              px-3 py-1
              text-xs font-semibold
              ${STATE_STYLES[proc.state]}
            `}
          >
            {proc.state}
          </span>

        </div>

        {/* METRICS */}
        <div className="
          grid grid-cols-2 gap-3
        ">

          <div className="
            rounded-lg
            bg-gray-950/80
            border border-gray-800
            p-3
          ">
            <div className="
              text-xs text-gray-500 mb-1
            ">
              CPU TIME
            </div>

            <div className="
              text-cyan-300
              text-lg
              font-mono
              font-semibold
            ">
              {(proc.cpuTime || 0).toFixed(1)}
              <span className="text-sm ml-1">
                ms
              </span>
            </div>
          </div>

          <div className="
            rounded-lg
            bg-gray-950/80
            border border-gray-800
            p-3
          ">
            <div className="
              text-xs text-gray-500 mb-1
            ">
              CONTEXT SWITCHES
            </div>

            <div className="
              text-purple-300
              text-lg
              font-mono
              font-semibold
            ">
              {proc.switches || 0}
            </div>
          </div>

        </div>
      </div>

      {/* REGISTERS */}
      <div className="
        rounded-xl
        border border-gray-800
        bg-gray-900/70
        p-4
      ">

        <div className="
          text-xs uppercase
          tracking-widest
          text-gray-500
          mb-4
        ">
          CPU Registers
        </div>

        {lastRegs ? (

          <div className="
            space-y-3
            font-mono text-sm
          ">

            <div className="
              flex items-center
              justify-between
              rounded-lg
              border border-gray-800
              bg-gray-950/80
              px-3 py-2
            ">
              <span className="text-green-400">
                Program Counter
              </span>

              <span className="text-white">
                {lastRegs.pc}
              </span>
            </div>

            <div className="
              flex items-center
              justify-between
              rounded-lg
              border border-gray-800
              bg-gray-950/80
              px-3 py-2
            ">
              <span className="text-blue-400">
                Stack Pointer
              </span>

              <span className="text-white">
                {lastRegs.sp}
              </span>
            </div>

          </div>

        ) : (

          <div className="
            rounded-lg
            border border-gray-800
            bg-gray-950/80
            p-4
            text-sm
            text-gray-500
          ">
            No hay registros disponibles.

            <div className="
              mt-2
              text-xs text-gray-600
            ">
              En macOS, SIP limita ptrace().
              En Linux/WSL2 los registros
              aparecerán automáticamente.
            </div>
          </div>

        )}

      </div>
    </div>
  );
}