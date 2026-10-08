import { useEffect, useRef } from 'react'
import Hls from 'hls.js'

interface HLSVideoPlayerProps {
  src: string
  className?: string
  muted?: boolean
  autoPlay?: boolean
  loop?: boolean
  playsInline?: boolean
  scale?: string
}

export default function HLSVideoPlayer({
  src,
  className = '',
  muted = true,
  autoPlay = true,
  loop = true,
  playsInline = true,
  scale = '',
}: HLSVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(src)
      hls.attachMedia(video)

      return () => {
        hls.destroy()
      }
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      className={`${className} ${scale}`}
      style={{
        minWidth: '100%',
        minHeight: '100%',
        objectFit: 'cover',
      }}
    />
  )
}
