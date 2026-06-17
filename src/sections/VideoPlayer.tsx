import { useState, useRef, useEffect, useCallback } from 'react';
import Hls from 'hls.js';
import { Play, PictureInPicture, Maximize, Loader2, AlertCircle, Volume2, VolumeX, Pause } from 'lucide-react';
import { motion } from 'framer-motion';
import { channels } from '@/data';

interface VideoPlayerProps {
  selectedChannel: string | null;
}

type Status = 'idle' | 'loading' | 'playing' | 'error';

export default function VideoPlayer({ selectedChannel }: VideoPlayerProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(-1); // -1 = Auto
  const [levels, setLevels] = useState<{ height: number; index: number }[]>([]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Resolve the channel object from its id
  const channel = channels.find((c) => c.id === selectedChannel) ?? null;

  // ---------- Core: load & play the stream ----------
  const loadStream = useCallback((url: string, fallbackList: string[] = []) => {
    const video = videoRef.current;
    if (!video) return;

    // Tear down any previous HLS instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    setStatus('loading');
    setErrorMsg('');
    setLevels([]);
    setSelectedLevel(-1);

    const tryNativePlay = () => {
      // Native HLS (Safari / iOS)
      video.src = url;
      video.play().catch(() => {/* autoplay may be blocked until user gesture */});
    };

    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true, lowLatencyMode: true });
      hlsRef.current = hls;
      hls.loadSource(url);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        // Build the quality list from the available levels
        const lvls = hls.levels
          .map((l, index) => ({ height: l.height, index }))
          .filter((l) => l.height > 0);
        // De-dupe by height, keep highest first
        const seen = new Set<number>();
        const unique = lvls
          .filter((l) => (seen.has(l.height) ? false : (seen.add(l.height), true)))
          .sort((a, b) => b.height - a.height);
        setLevels(unique);
        video.play().catch(() => {/* gesture may be needed */});
      });

      hls.on(Hls.Events.ERROR, (_evt, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              // try recovery once, otherwise fall through to fallback
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              // Try the next fallback URL if any remain
              hls.destroy();
              hlsRef.current = null;
              if (fallbackList.length > 0) {
                const [next, ...rest] = fallbackList;
                setTimeout(() => loadStream(next, rest), 600);
              } else {
                setStatus('error');
                setErrorMsg('This stream is currently offline or region-blocked. Try another channel.');
              }
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      tryNativePlay();
    } else {
      setStatus('error');
      setErrorMsg('HLS is not supported in this browser.');
    }
  }, []);

  // React to channel selection
  useEffect(() => {
    const streamUrl = channel?.streamUrl;
    if (streamUrl) {
      loadStream(streamUrl, channel?.fallbackUrls ?? []);
    } else {
      // No stream selected — stop & clean up
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      const video = videoRef.current;
      if (video) {
        video.removeAttribute('src');
        video.load();
      }
      setStatus('idle');
    }
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel?.id]);

  // Mark status playing once the video actually plays
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlaying = () => setStatus('playing');
    const onPlay = () => setIsPaused(false);
    const onPause = () => setIsPaused(true);
    const onWaiting = () => setStatus('loading');
    video.addEventListener('playing', onPlaying);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('waiting', onWaiting);
    return () => {
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('waiting', onWaiting);
    };
  }, [channel?.id]);

  // Track fullscreen state
  useEffect(() => {
    const onFs = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  // ---------- Controls ----------
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  const togglePiP = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await video.requestPictureInPicture();
      }
    } catch {
      /* PiP not supported / blocked */
    }
  };

  const toggleFullscreen = async () => {
    const el = containerRef.current;
    if (!el) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await el.requestFullscreen();
      }
    } catch {
      /* fullscreen blocked */
    }
  };

  // Apply a chosen quality level to the HLS instance
  const setQuality = (levelIndex: number) => {
    setSelectedLevel(levelIndex);
    if (hlsRef.current) {
      // -1 = Auto (ABR), otherwise lock to that level
      hlsRef.current.currentLevel = levelIndex;
    }
  };

  return (
    <div className="space-y-3">
      {/* Video Container */}
      <div
        ref={containerRef}
        className="relative w-full aspect-video rounded-2xl overflow-hidden border shadow-card"
        style={{ backgroundColor: '#000', borderColor: 'var(--border)' }}
      >
        {/* The video element is always mounted so refs stay stable */}
        <video
          ref={videoRef}
          className={`w-full h-full object-contain bg-black ${status === 'idle' ? 'hidden' : ''}`}
          autoPlay
          playsInline
          muted={isMuted}
          poster={channel?.poster}
        />

        {/* IDLE / SELECT CHANNEL overlay */}
        {status === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ backgroundColor: 'var(--accent-soft)' }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: 'var(--accent)' }}
              />
              <span className="font-semibold text-sm" style={{ color: 'var(--accent)' }}>
                Live
              </span>
            </motion.div>
            {channel ? (
              <p className="text-sm text-center" style={{ color: 'var(--text-muted)' }}>
                Ready: <span style={{ color: 'var(--text)' }} className="font-medium">{channel.name}</span>
              </p>
            ) : (
              <p className="text-sm text-center" style={{ color: 'var(--text-muted)' }}>
                Pick a channel below to start watching
              </p>
            )}
          </div>
        )}

        {/* LOADING overlay */}
        {status === 'loading' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40">
            <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--accent)' }} />
            <p className="text-white text-xs">Loading stream…</p>
          </div>
        )}

        {/* ERROR overlay */}
        {status === 'error' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60 px-4">
            <AlertCircle className="w-8 h-8 text-red-400" />
            <p className="text-red-300 text-sm text-center">{errorMsg}</p>
            {channel?.streamUrl && (
              <button
                onClick={() => loadStream(channel.streamUrl!, channel?.fallbackUrls ?? [])}
                className="mt-1 px-4 py-1.5 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: 'var(--accent-soft)',
                  border: '1px solid var(--accent)',
                  color: 'var(--accent)',
                }}
              >
                Retry
              </button>
            )}
          </div>
        )}

        {/* Top-left LIVE badge while playing */}
        {status === 'playing' && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur rounded-full">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-400 font-semibold text-[11px]">LIVE</span>
          </div>
        )}

        {/* Center play/pause button while playing */}
        {status === 'playing' && (
          <button
            onClick={togglePlayPause}
            className="absolute inset-0 flex items-center justify-center group"
            aria-label="Play / Pause"
          >
            <span className="w-14 h-14 rounded-full bg-black/40 backdrop-blur border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              {isPaused ? (
                <Play className="w-6 h-6 text-white ml-1" fill="white" />
              ) : (
                <Pause className="w-6 h-6 text-white" fill="white" />
              )}
            </span>
          </button>
        )}

        {/* Quality + controls overlay (bottom) */}
        {status === 'playing' && (
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center gap-2 flex-wrap justify-center mb-2">
              <button
                onClick={() => setQuality(-1)}
                className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
                  selectedLevel === -1
                    ? 'bg-emerald-500 text-white'
                    : 'bg-black/40 text-slate-300 border border-white/15 hover:border-white/40'
                }`}
              >
                Auto
              </button>
              {levels.map((l) => (
                <button
                  key={l.index}
                  onClick={() => setQuality(l.index)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
                    selectedLevel === l.index
                      ? 'bg-emerald-500 text-white'
                      : 'bg-black/40 text-slate-300 border border-white/15 hover:border-white/40'
                  }`}
                >
                  {l.height}p
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 justify-center">
              <button
                onClick={toggleMute}
                className="p-2 rounded-full bg-black/40 border border-white/15 text-slate-300 hover:text-white transition-colors"
                aria-label="Mute / Unmute"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Now Playing label */}
      {channel && (
        <div className="flex items-center justify-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
          <span className="truncate max-w-[280px] font-medium" style={{ color: 'var(--text)' }}>
            {channel.name}
          </span>
        </div>
      )}

      {/* External Control Buttons */}
      <div className="flex items-center gap-3 justify-center">
        <button
          onClick={togglePiP}
          disabled={status !== 'playing'}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            color: 'var(--text-muted)',
          }}
        >
          <PictureInPicture className="w-4 h-4" />
          PiP
        </button>
        <button
          onClick={toggleFullscreen}
          disabled={status !== 'playing'}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            color: 'var(--text-muted)',
          }}
        >
          <Maximize className="w-4 h-4" />
          {isFullscreen ? 'Exit' : 'Fullscreen'}
        </button>
      </div>
    </div>
  );
}
