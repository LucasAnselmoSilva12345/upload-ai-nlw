import { GithubLogo } from '@phosphor-icons/react';
import { Button } from './components/ui/button';
import { Separator } from '@radix-ui/react-separator';
import { Textarea } from './components/ui/textarea';

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">upload.ai</h1>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Desenvolvido por Lucas Anselmo
          </span>

          <Separator orientation="vertical" className="h-6" />

          <Button className="flex items-center gap-2 text-neutral-100">
            GitHub
            <GithubLogo size={16} weight="regular" />
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6 flex gap-6">
        <section className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea
              className="resize-none p-4 leading-relaxed"
              placeholder="Inclua o prompt para a IA..."
            />
            <Textarea
              className="resize-none p-4 leading-relaxed"
              placeholder="Resultado gerado pela IA"
              readOnly
            />
          </div>

          <p className="text-sm text-muted-foreground">
            Lembre-se: Você pode utilizar a variável{' '}
            <code className="text-emerald-400">{'{transcription}'}</code> no seu
            prompt para adicionar a descrição do vídeo selecionado
          </p>
        </section>
        <aside className="w-80"></aside>
      </main>
    </div>
  );
}
