import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/generate', (c) => {
  return c.json({message:"Generate"})
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})


/**
 * olllama list : modelleri listeler.
ollama run <model-adı> : modellei çalıştırır.
/bye: ollamadan çıkar.
ollama help: komutları gösterir.
 */