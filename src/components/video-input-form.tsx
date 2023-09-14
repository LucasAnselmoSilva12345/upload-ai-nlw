import { ChangeEvent, FormEvent, useMemo, useRef, useState } from 'react';
import { Separator } from './ui/separator';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { t } from 'i18next';
import { Button } from './ui/button';
import { FilmReel, SpinnerGap } from '@phosphor-icons/react';
import { getFFmpeg } from '@/lib/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

export function VideoInputForm() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const promptInputRef = useRef<HTMLTextAreaElement>(null);

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget;

    if (!files) {
      return;
    }

    const selectedFile = files[0];
    setVideoFile(selectedFile);
  }

  async function convertVideoToAudio(video: File) {
    const ffmpeg = await getFFmpeg();
    await ffmpeg.writeFile('input.mp4', await fetchFile(video));

    ffmpeg.on('log', (log) => {
      console.log(log);
    });

    ffmpeg.on('progress', (progress) => {
      console.log('Converter progress: ' + Math.round(progress.progress * 100));
    });

    await ffmpeg.exec([
      '-i',
      'input.mp4',
      '-map',
      '0:a',
      '-b:a',
      '20k',
      '-acodec',
      'libmp3lame',
      'output.mp3',
    ]);

    const data = await ffmpeg.readFile('output.mp3');

    const audioFileBlob = new Blob([data], { type: 'audio/mpeg' });
    const audioFile = new File([audioFileBlob], 'audio.mp3', {
      type: 'audio/mpeg',
    });

    console.log('Converter finished');

    return audioFile;
  }

  async function handleUploadVideo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const prompt = promptInputRef.current?.value;

    if (!videoFile) {
      return;
    }

    const audioFile = await convertVideoToAudio(videoFile);
    console.log(audioFile, prompt);
  }

  const previewURL = useMemo(() => {
    if (!videoFile) {
      return null;
    }

    return URL.createObjectURL(videoFile);
  }, [videoFile]);

  return (
    <form onSubmit={handleUploadVideo} className="space-y-6">
      <label
        htmlFor="video"
        className="relative cursor-pointer border flex rounded-md aspect-video border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/60"
      >
        {previewURL ? (
          <video
            src={previewURL}
            controls={false}
            className="pointer-events-none absolute inset-0"
          />
        ) : (
          <>
            <FilmReel size={16} weight="regular" />
            {t('SelectedUploadVideo')}
          </>
        )}
      </label>

      <input
        type="file"
        name=""
        id="video"
        accept="video/mp4"
        className="sr-only"
        onChange={handleFileSelected}
      />

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="transcription_prompt">{t('TranscriptionPrompt')}</Label>
        <Textarea
          ref={promptInputRef}
          id="transcription_prompt"
          className="h-20 leading-relaxed resize-none"
          placeholder={t('keywords')}
        />
      </div>

      <Button
        type="submit"
        className="w-full text-neutral-100 flex items-center justify-center gap-1"
      >
        {t('LoadVideo')} <SpinnerGap size={16} weight="regular" />
      </Button>
    </form>
  );
}
