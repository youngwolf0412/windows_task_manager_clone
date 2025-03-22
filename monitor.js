const os = require("node:os");

function monitor() {
  // Take a snapshot
  // Take another snapshot after a second

  const oldCpus = os.cpus();

  setTimeout(() => {
    const newCpus = os.cpus();
    const usage = newCpus.map((cpu, index) => {
      return {
        core: index,
        usage: calculateCPU(oldCpus[index], newCpus[index]) + "%",
      };
    });
    console.clear();
    console.table(usage);
    const usedMemory = (
      (os.totalmem() - os.freemem()) /
      (1024 * 1024 * 1024)
    ).toFixed(1);
    console.log(`Memory used:${usedMemory}`);
  }, 1000);
}

function calculateCPU(oldCpu, newCpu) {
  const oldTotal = Object.values(oldCpu.times).reduce((a, b) => a + b);
  const newTotal = Object.values(newCpu.times).reduce((a, b) => a + b);

  const idle = newCpu.times.idle - oldCpu.times.idle;

  const total = newTotal - oldTotal;
  const used = total - idle;

  return ((100 * used) / total).toFixed(1);
}

setInterval(monitor, 1000);
