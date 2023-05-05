export default function Card({children, noPadding}) {

  let padding = "p-3"
  if (noPadding) {
    padding = ""
  }

  return (
      <div className={`bg-white shadow-md mb-3 rounded-md ${padding}`}>
      {children}
      </div>
  )
}
