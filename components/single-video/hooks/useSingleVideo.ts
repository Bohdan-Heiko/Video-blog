import { useState } from "react"
import { AVPlaybackStatusSuccess, Video } from "expo-av"

import useBoolean from "@/hooks/useBoolean"
import { SingleVideoHooks } from "@/types/video"

export const useSingleVideo = ({
  videoRef
}: {
  videoRef: React.MutableRefObject<Video | null>
}): SingleVideoHooks => {
  const {
    setFalse: hideLoading,
    setTrue: showLoading,
    value: loadingValue
  } = useBoolean(true)
  const { setFalse: closePlayer, value: plauerValue } = useBoolean(true)

  const [status, setStatus] = useState<AVPlaybackStatusSuccess>()
  const [sliderValue, setSliderValue] = useState(4000)

  const IS_PLAYNG = status?.isLoaded && status.isPlaying

  const onPlay = () => {
    if (!videoRef.current) {
      return
    }
    if (IS_PLAYNG) {
      videoRef.current?.pauseAsync()
      videoRef.current?.setVolumeAsync(0)
    } else {
      videoRef.current?.playAsync()
      videoRef.current?.setVolumeAsync(1)
    }
  }

  const handleValueChange = (value: Array<number>) => {
    setSliderValue(value[0])
  }

  const setVideoPosition = async (position: number) => {
    if (videoRef.current) {
      await videoRef.current.setPositionAsync(position)
    }
  }

  //  Handles the completion of the slider. It sets the video position to the
  //  selected value multiplied by the duration of the video.
  const handleSlidingComplete = async (value: Array<number>) => {
    if (videoRef.current && status?.durationMillis) {
      setVideoPosition(value[0] * status.durationMillis)
    }
  }

  const handleCloseVideo = () => {
    closePlayer()
  }

  return {
    plauerValue,
    videoStatus: {
      onPlay,
      status,
      setStatus,
      handleCloseVideo,
      setVideoPosition
    },

    slider: {
      IS_PLAYNG,
      sliderValue,
      setSliderValue,
      handleValueChange,
      handleSlidingComplete
    },

    loader: {
      hideLoading,
      showLoading,
      loadingValue
    }
  }
}
