import { MagicWand } from '@phosphor-icons/react';
import { Button } from './components/ui/button';
import { Separator } from './components/ui/separator';
import { Textarea } from './components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select';
import { Slider } from './components/ui/slider';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './components/LanguageSwitcher/LanguageSwitcher';
import { ThemeProvider } from './components/theme-provider';
import { ModeToggle } from './components/mode-toggle';
import { VideoInputForm } from './components/video-input-form';
import { PromptSelect } from './components/prompt-select';
import { useState } from 'react';
import { useCompletion } from 'ai/react';

export function App() {
  const { t } = useTranslation();
  const [temperature, setTemperature] = useState(0.5);
  const [videoId, setVideoId] = useState<string | null>(null);

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: 'http://localhost:3333/ai/complete',
    body: {
      videoId,
      temperature,
    },
    headers: {
      'Content-type': 'application/json',
    },
  });

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex flex-col">
        <header className="px-6 py-3 flex items-center justify-between border-b">
          <h1 className="text-xl font-bold">upload.ai</h1>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
          </div>
          <ModeToggle />
        </header>

        <main className="flex-1 p-6 flex flex-col md:flex-row gap-6">
          <section className="flex flex-col flex-1 gap-4">
            <div className="grid grid-rows-2 gap-4 flex-1">
              <Textarea
                className="resize-none p-4 leading-relaxed"
                placeholder={t('textAreaIncludePrompt')}
                value={input}
                onChange={handleInputChange}
              />
              <Textarea
                className="resize-none p-4 leading-relaxed"
                placeholder={t('textAreaResultPrompt')}
                readOnly
                value={completion}
              />
            </div>

            <p className="text-sm text-emerald-700">{t('ReminderMessage')}</p>
          </section>

          <aside className="w-full md:w-80 space-y-6">
            <VideoInputForm onVideoUploaded={setVideoId} />

            <Separator />

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label>{t('Prompt')}</Label>
                <PromptSelect onPromptSelected={setInput} />
                <span className="block text-xs text-muted-foreground">
                  {t('CustomizeOption')}
                </span>
              </div>

              <div className="space-y-2">
                <Label>{t('Model')}</Label>
                <Select disabled defaultValue="gpt3.5">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                  </SelectContent>
                </Select>
                <span className="block text-xs text-muted-foreground">
                  {t('CustomizeOption')}
                </span>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>{t('Temperature')}</Label>
                <Slider
                  min={0}
                  max={1}
                  step={0.1}
                  value={[temperature]}
                  onValueChange={(value) => setTemperature(value[0])}
                />

                <span className="block text-xs text-muted-foreground leading-relaxed">
                  {t('HigherValuesCreative')}
                </span>
              </div>

              <Separator />

              <Button
                disabled={isLoading}
                type="submit"
                className="w-full text-neutral-100 flex items-center justify-center gap-1"
              >
                {t('Run')} <MagicWand size={16} weight="regular" />
              </Button>
            </form>
          </aside>
        </main>
      </div>
    </ThemeProvider>
  );
}
