export default function Clouds({ count = 3, showBird = true }) {
  const clouds = Array.from({ length: count })
  return (
    <div className="clouds-layer" aria-hidden="true">
      {clouds.map((_, i) => (
        <div
          key={i}
          className={`cloud cloud-${i % 3}`}
          style={{
            top: `${10 + i * 9}%`,
            animationDuration: `${50 + i * 18}s`,
            animationDelay: `${-i * 12}s`,
          }}
        />
      ))}
      {showBird && (
        <svg className="bird bird-1" viewBox="0 0 40 20" width="34">
          <path d="M0 10 Q10 0 20 10 Q30 0 40 10" stroke="#4A5A6A" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      )}
      {showBird && (
        <svg className="bird bird-2" viewBox="0 0 40 20" width="24">
          <path d="M0 10 Q10 0 20 10 Q30 0 40 10" stroke="#4A5A6A" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      )}
    </div>
  )
}
