import { PauseIcon, PlayIcon, Volume1Icon, Volume2Icon, VolumeOffIcon } from 'lucide-react';
import React from 'react';

import { Button, Card, CardHeader, Slider } from '@/components/ui';
import { cn } from '@/lib/utils.ts';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  defaultIsPlaying?: boolean;
  defaultVolume?: number;
  src: string;
  title: string;
}

export const AudioPlayer = ({
  src,
  title,
  defaultVolume = 1,
  defaultIsPlaying = false,
  className,
  ...props
}: Props) => {
  const audioRef = React.useRef<HTMLAudioElement>(null); // Reference to the audio element
  const [isPlaying, setIsPlaying] = React.useState<boolean>(defaultIsPlaying);
  const [progress, setProgress] = React.useState<number>(0);
  const [duration, setDuration] = React.useState<number>(0);
  const [volume, setVolume] = React.useState<number>(defaultVolume);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setProgress(value);
  };

  const handleVolumeChange = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = value;
    setVolume(value);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Card className={cn('audio-player rounded-md bg-muted', className)} title={title} {...props}>
      <CardHeader className='flex-row items-center gap-3 space-y-0 p-2'>
        <audio
          ref={audioRef}
          src={src}
          onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        />

        <div className='controls'>
          <Button className='rounded-full' size='iconSm' onClick={handlePlayPause}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </Button>
        </div>

        <div className='seek-bar flex-1'>
          <Slider
            max={duration}
            value={[progress]}
            onValueChange={(value) => handleSeek(value[0])}
          />
        </div>

        <div className='flex items-center gap-0.5'>
          <span className='text-sm'>{formatTime(progress)}</span>/
          <span className='text-sm text-muted-foreground'>{formatTime(duration)}</span>
        </div>

        <div className='flex w-20 gap-1'>
          {volume === 0 && <VolumeOffIcon />}
          {volume > 0 && volume < 0.5 && <Volume1Icon />}
          {volume >= 0.5 && <Volume2Icon />}
          <Slider
            max={1}
            step={0.01}
            value={[volume]}
            onValueChange={(value) => handleVolumeChange(value[0])}
          />
        </div>
      </CardHeader>
    </Card>
  );
};
