async function generateImage() {
  const promptInput = document.getElementById('prompt').value.trim();
  if (!promptInput) return alert('Masukkan prompt dulu bro!');

  const negativePrompt = document.getElementById('negative-prompt').value.trim();
  const steps = document.getElementById('steps').value;
  const cfgScale = document.getElementById('cfg-scale').value;
  const seed = document.getElementById('seed').value;
  const format = document.getElementById('format').value;

  const loading = document.getElementById('loading');
  const img = document.getElementById('generated-image');
  const downloadBtn = document.getElementById('download-btn');
  const watermark = document.getElementById('watermark');

  loading.style.display = 'block';
  img.style.display = 'none';
  downloadBtn.style.display = 'none';
  watermark.style.display = 'none';

  const style = currentStyle;
  const ratio = currentRatio;

  let fullPrompt = `${promptInput}, ${style}`;
  if (negativePrompt) fullPrompt += `, --neg ${negativePrompt}`;
  if (cfgScale) fullPrompt += `, cfg scale ${cfgScale}`;
  if (steps) fullPrompt += `, steps ${steps}`;
  if (seed) fullPrompt += `, seed ${seed}`;

  const apiUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?nologo=true&format=${format}&aspectRatio=${ratio}`;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error('Gagal ambil gambar');

    const blob = await res.blob();
    generatedImageUrl = URL.createObjectURL(blob);
    img.src = generatedImageUrl;
    img.style.display = 'block';
    watermark.style.display = 'block';
    downloadBtn.href = generatedImageUrl;
    downloadBtn.style.display = 'inline-block';
    downloadBtn.download = `Tboyo-${Math.floor(Math.random() * 10000)}.${format}`;
  } catch (e) {
    alert('Gagal generate gambar.');
    console.error(e);
  } finally {
    loading.style.display = 'none';
  }
                                            }
  
