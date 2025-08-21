
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

      const audioUrl = quranApiService.getAudioUrl(surahId, verseNumber, reciterId);
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

      // Error handler with fallback
      audio.onerror = () => {
        console.log('Primary audio source failed, trying alternative...');
        
        // Try alternative audio source
        const reciterFolder = quranApiService.getReciterFolder(reciterId);
        const alternativeUrl = quranApiService.getAlternativeAudioUrl(surahId, verseNumber, reciterFolder);
        console.log('Trying alternative audio from:', alternativeUrl);
        
        audio.src = alternativeUrl;
        
        // Secondary error handler
        audio.onerror = () => {
          console.error('Both audio sources failed');
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
      }, 10000); // 10 second timeout

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
  }, [surahId, reciterId, cleanup, audioState.isLoading]);

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
