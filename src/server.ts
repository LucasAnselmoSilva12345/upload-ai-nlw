import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import { getAllPromptsRoute } from './routes/get-all-prompts';
import { uploadVideoRoute } from './routes/upload-video';
import { createTranscriptionRoute } from './routes/create-transcription';
import { generateAICompletion } from './routes/generate-ai-completion';

const app = fastify();

app.register(fastifyCors, {
  origin: '*',
});

app.register(getAllPromptsRoute);
app.register(uploadVideoRoute);
app.register(createTranscriptionRoute);
app.register(generateAICompletion);

app.listen({ port: 3333 }).then(() => {
  console.log('Server is running...');
});
