import {serve} from '@hono/node-server'
import {Hono} from 'hono'
import ollama from 'ollama';

const app = new Hono()

app.get('/', (c) => {
    return c.text('Hello Hono!')
})

const messageHistory = [
    {role: 'system', content: `You're a Turkish speaking assistant! Please write your responses in Turkish.`},
]

app.post('/generate', async (c) => {

    const body = await c.req.json();

    const prompt = body.prompt;

    messageHistory.push( {role: 'user', content: prompt});

    const response = await ollama.chat({
        model: 'gemma2:2b',
        messages:messageHistory,
    })

    console.log(response.message.content);
    messageHistory.push( {role: 'assistant', content: response.message.content});
    return c.json({message: response.message.content});
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
    fetch: app.fetch,
    port
})
