import PlayIcon from "./PlayIcon"
import PauseIcon from "./PauseIcon"


export default function PlayButton({isPlaying, callMySound }) {

  return (
    <div>
      <button onClick={() => callMySound()}>
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
    </div>
  )
}
