module.exports = async function handler(req, res) {
  console.log('=== NEW REQUEST ===');
  console.log('ALL ENV KEYS:', Object.keys(process.env).filter(k => !k.startsWith('npm_')));
  console.log('KEY EXISTS:', !!process.env.HUGGINGFACE_API_KEY);

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { imageBase64, prompt } = req.body;
  if (!imageBase64 || !prompt) {
    return res.status(400).json({ error: 'imageBase64 aur prompt dono chahiye' });
  }

  try {
    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/timbrooks/instruct-pix2pix",
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: prompt,
          parameters: { image: imageBase64 },
          options: { wait_for_model: true },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: errText });
    }

    const buffer = await response.arrayBuffer();
    const base64Result = Buffer.from(buffer).toString('base64');
    res.status(200).json({ image: `data:image/jpeg;base64,${base64Result}` });
  } catch (err) {
    console.error('FULL ERROR:', err);
    res.status(500).json({ error: err.message, details: err.cause?.message || 'no cause' });
  }
}
