
import { useState, useRef, useCallback } from 'react';
import { quranApiService } from '@/services/quranApi';

interface AudioState {
  isPlaying: boolean;
  currentVerse: number | null;
  isLoading: boolean;
  error: string | null;
}

export const useQuranAudio = (surahId: string, reciterId: number = 7) => {
  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    currentVerse: null,
    isLoading: false,
    error: null,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playVerse = useCallback(async (verseNumber: number) => {
    try {
      setAudioState(prev => ({ ...prev, isLoading: true, error: null }));

      // Stop current audio if playing
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const audioUrl = quranApiService.getAudioUrl(surahId, verseNumber, reciterId);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      // Set up event listeners
      audio.onloadstart = () => {
        setAudioState(prev => ({ ...prev, isLoading: true }));
      };

      audio.oncanplay = () => {
        setAudioState(prev => ({ ...prev, isLoading: false }));
      };

      audio.onplay = () => {
        setAudioState(prev => ({ 
          ...prev, 
          isPlaying: true, 
          currentVerse: verseNumber,
          isLoading: false 
        }));
      };

      audio.onpause = () => {
        setAudioState(prev => ({ ...prev, isPlaying: false }));
      };

      audio.onended = () => {
        setAudioState(prev => ({ 
          ...prev, 
          isPlaying: false, 
          currentVerse: null 
        }));
        audioRef.current = null;
      };

      audio.onerror = () => {
        // Try alternative audio source
        const alternativeUrl = quranApiService.getAlternativeAudioUrl(surahId, verseNumber);
        audio.src = alternativeUrl;
        
        audio.onerror = () => {
          setAudioState(prev => ({ 
            ...prev, 
            isPlaying: false, 
            currentVerse: null,
            isLoading: false,
            error: 'Audio tidak tersedia untuk ayat ini' 
          }));
          audioRef.current = null;
        };
      };

      await audio.play();
    } catch (error) {
      console.error('Error playing audio:', error);
      setAudioState(prev => ({ 
        ...prev, 
        isPlaying: false, 
        currentVerse: null,
        isLoading: false,
        error: 'Gagal memutar audio' 
      }));
    }
  }, [surahId, reciterId]);

  const pauseAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setAudioState(prev => ({ 
      ...prev, 
      isPlaying: false, 
      currentVerse: null 
    }));
  }, []);

  return {
    ...audioState,
    playVerse,
    pauseAudio,
    stopAudio,
  };
};
