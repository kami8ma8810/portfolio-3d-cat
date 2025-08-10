export function detectWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    return !!gl
  } catch {
    return false
  }
}

export function detectLowPerformance(): boolean {
  // CPU コア数をチェック
  const cores = navigator.hardwareConcurrency || 1
  if (cores <= 2) return true
  
  // メモリをチェック（利用可能な場合）
  const memory = (navigator as any).deviceMemory
  if (memory && memory < 4) return true
  
  // モバイルデバイスの検出
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  
  return isMobile
}

export function getDeviceCapabilities() {
  return {
    webgl: detectWebGLSupport(),
    webgl2: (() => {
      try {
        const canvas = document.createElement('canvas')
        return !!canvas.getContext('webgl2')
      } catch {
        return false
      }
    })(),
    cores: navigator.hardwareConcurrency || 1,
    memory: (navigator as any).deviceMemory || 'unknown',
    isLowPerf: detectLowPerformance(),
  }
}