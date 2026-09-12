export default function Ocean({ tone = 'day' }) {
  return (
    <div className={`ocean ocean-${tone}`} aria-hidden="true">
      <div className="wave wave-back" />
      <div className="wave wave-mid" />
      <div className="wave wave-front" />
      <div className="foam-line" />
    </div>
  )
}
