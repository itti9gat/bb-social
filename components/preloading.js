import { BounceLoader } from "react-spinners";

export default function Preloading() {
  return (
    <div>
        <BounceLoader className="py-2" color={'#36d7b7'} speedMultiplier={2} />
    </div>
  )
}
