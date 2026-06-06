"use client";

export default function VehicleSystems() {
  return (
    <div className="w-full max-w-5xl bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 overflow-y-auto max-h-[70vh] custom-scrollbar shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-8">Other Vehicle Systems</h2>
      
      <div className="space-y-12">
        {/* Electrical System */}
        <section>
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">⚡</span> Electrical System
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-card p-4">
              <h4 className="font-bold text-white mb-1">Battery</h4>
              <p className="text-sm text-zinc-400">Stores power for starting the engine and running electronics.</p>
            </div>
            <div className="glass-card p-4">
              <h4 className="font-bold text-white mb-1">Starter Motor</h4>
              <p className="text-sm text-zinc-400">Uses battery power to rotate the engine initially.</p>
            </div>
            <div className="glass-card p-4">
              <h4 className="font-bold text-white mb-1">Alternator</h4>
              <p className="text-sm text-zinc-400">Charges the battery while the engine is running.</p>
            </div>
            <div className="glass-card p-4">
              <h4 className="font-bold text-white mb-1">ECU</h4>
              <p className="text-sm text-zinc-400">Engine Control Unit manages sensors and actuators.</p>
            </div>
          </div>
        </section>

        {/* Brake System */}
        <section>
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">🛑</span> Brake System
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-card p-4">
              <h4 className="font-bold text-white mb-1">Disc Brake</h4>
              <p className="text-sm text-zinc-400">Brake pads squeeze a rotating disc (rotor) to slow down the wheel.</p>
            </div>
            <div className="glass-card p-4">
              <h4 className="font-bold text-white mb-1">Drum Brake</h4>
              <p className="text-sm text-zinc-400">Brake shoes push outwards against a spinning drum.</p>
            </div>
          </div>
        </section>

        {/* Steering & Suspension */}
        <section>
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">🛞</span> Steering & Suspension
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-card p-4">
              <h4 className="font-bold text-white mb-1">Rack & Pinion</h4>
              <p className="text-sm text-zinc-400">Converts rotational motion of the steering wheel into linear motion.</p>
            </div>
            <div className="glass-card p-4">
              <h4 className="font-bold text-white mb-1">Shock Absorbers</h4>
              <p className="text-sm text-zinc-400">Dampens road bumps and keeps the tires in contact with the road.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
