
import { useState, useRef, useCallback, useEffect } from 'react';
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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Cleanup on unmount or surahId change
  useEffect(() => {
    return cleanup;
  }, [surahId, cleanup]);

  const playVerse = useCallback(async (verseNumber: number) => {
    try {
      setAudioState(prev => ({ 
        ...prev, 
        isLoading: true, 
        error: null,
        currentVerse: verseNumber 
      }));

      // Stop current audio if playing
      cleanup();

      // Try to get the best audio URL
      const audioUrl = await quranApiService.getBestAudioUrl(surahId, verseNumber, reciterId);
      console.log('Attempting to play audio from:', audioUrl);
      
      const audio = new Audio();
      audioRef.current = audio;

      // Set up event listeners before setting src
      audio.onloadstart = () => {
        console.log('Audio load started');
        setAudioState(prev => ({ ...prev, isLoading: true }));
      };

      audio.oncanplay = () => {
        console.log('Audio can play');
        setAudioState(prev => ({ ...prev, isLoading: false }));
      };

      audio.onplay = () => {
        console.log('Audio started playing');
        setAudioState(prev => ({ 
          ...prev, 
          isPlaying: true, 
          isLoading: false 
        }));
      };

      audio.onpause = () => {
        console.log('Audio paused');
        setAudioState(prev => ({ ...prev, isPlaying: false }));
      };

      audio.onended = () => {
        console.log('Audio ended');
        setAudioState(prev => ({ 
          ...prev, 
          isPlaying: false, 
          currentVerse: null 
        }));
        audioRef.current = null;
      };

      // Enhanced error handler with multiple fallbacks
      let fallbackAttempts = 0;
      const maxFallbacks = 3;
      
      const handleAudioError = async () => {
        fallbackAttempts++;
        console.log(`Audio error, trying fallback ${fallbackAttempts}/${maxFallbacks}`);
        
        if (fallbackAttempts <= maxFallbacks && audioRef.current) {
          let fallbackUrl: string;
          
          switch (fallbackAttempts) {
            case 1:
              const reciterFolder = quranApiService.getReciterFolder(reciterId);
              fallbackUrl = quranApiService.getAlternativeAudioUrl(surahId, verseNumber, reciterFolder);
              break;
            case 2:
              fallbackUrl = quranApiService.getFallbackAudioUrl(surahId, verseNumber);
              break;
            case 3:
              fallbackUrl = quranApiService.getAudioUrl(surahId, verseNumber, 7); // Default to Mishary
              break;
            default:
              fallbackUrl = audioUrl;
          }
          
          console.log(`Trying fallback audio from: ${fallbackUrl}`);
          audioRef.current.src = fallbackUrl;
          
          try {
            await audioRef.current.play();
          } catch (playError) {
            console.error('Play error:', playError);
            if (fallbackAttempts >= maxFallbacks) {
              throw playError;
            }
          }
        } else {
          throw new Error('All audio sources failed');
        }
      };

      audio.onerror = handleAudioError;

      // Set source and attempt to play
      audio.src = audioUrl;
      
      // Set a timeout for loading
      timeoutRef.current = setTimeout(() => {
        if (audioRef.current && audioState.isLoading) {
          setAudioState(prev => ({ 
            ...prev, 
            isLoading: false,
            error: 'Timeout saat memuat audio' 
          }));
        }
      }, 15000); // 15 second timeout

      await audio.play();
    } catch (error) {
      console.error('Error playing audio:', error);
      setAudioState(prev => ({ 
        ...prev, 
        isPlaying: false, 
        currentVerse: null,
        isLoading: false,
        error: 'Audio tidak tersedia untuk ayat ini' 
      }));
    }
  }, [surahId, reciterId, cleanup]);

  const pauseAudio = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
    }
  }, []);

  const stopAudio = useCallback(() => {
    cleanup();
    setAudioState(prev => ({ 
      ...prev, 
      isPlaying: false, 
      currentVerse: null,
      error: null 
    }));
  }, [cleanup]);

  return {
    ...audioState,
    playVerse,
    pauseAudio,
    stopAudio,
  };
};
