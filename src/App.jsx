import { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";

const YOUTUBE_VIDEO_ID = "DtvfN4nirdc";

const MILESTONES = [
  {
    count: 3,
    title: "You Are SVEJI",
    message:
      "ყოჩაღ ანანო პირველი ეტაპი გაიარე და პირველი სამი ყვავილი მოკრიფე, მინდა იცოდე რო ყველაზე სვეჟი და ყველაზე დედისმტყვნელი ქალი ხარ ვისაც კი ვიცნობ",
  },
  {
    count: 6,
    title: "Can't get you out of my head",
    message:
      "მეორე ეტაპიც გაიარეეე სვეჟ, ძალიან ვეცადე რო ეს გოგონა შენთვის მომესგავსებინა. მთლად არ გგავს მარა, მასაც ცისფერი თვალები და ღია თმები აქვს. მინდა იცოდე რო საოცარი ქალი ხარ, ალბათ ფიქრობ გავიდა ამდენი ხანი, ნელ-ნელა დამავიწყდი ან გამიარა შენზე ფიქრმა. 10 წუთი არ გადის რო ტვინში არ მყავდე.",
  },
  {
    count: 9,
    title: "You Will Achieve Greatness",
    message:
      "უი მესემაე ეტაპზეც მოხვედი ანანო, ეს იცი რომელი ეტაიპიაა?? ის ეტაპია, როცა შენ სიცოცხლეში ყველაზე დიდი წარმატებას მიაღწევ (შემდეგი 4 წლის მანძილზე)",
  },
  {
    count: 12,
    title: "Girl who Shines",
    message:
      "ვახხ აქამდეც მოხვედიიიი?? მინდა იცოდე რო შენი კეთილშობილი გულით სხვებსაც აკეთილშობილებ, იმენა ანათებ სვეჟ. შენზე რო ვფიქრობ სულ მეღიმება.",
  },
  {
    count: 15,
    title: "Gratitude",
    message:
      "მეხუთე ეტაპზე ხარ ანანო, ამ ეტაპზე მინდა მადლობა გითხრა ვაბშე ყველაფრისთვის",
  },
  {
    count: 18,
    title: "Apology",
    message:
      "ამ ეტაპზე კი მინდა ბოდიში მოგიხადო ყველა ცუდისთვის რაც გამიკეთებია, უბრალოდ მინდა იცოდე რო უსაზღვრო სიყვარული მაქ გულში შენი. დღე არ გავა რო შენზე არ ვილოცო ჩემო პატარა, რო კარგად იყო და არანაირ შარში არასდრო არ გაეხვეე. თამაში დასრულდა შენ გამარჯვებულიხარ ხარ და ყოველთვის გამარჯვებული იქნები!!!!",
  },
];

const FLOWER_KINDS = ["daisy", "tulip", "poppy", "bluebell"];
const SPAWN_INTERVAL = 900;
const MAX_FLOWERS = 8;
const WALK_MS = 1200;

function Anano({ x, y, facing }) {
  return (
    <div
      className="anano"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -85%) scaleX(${facing})`,
      }}
    >
      <div className="name-badge">Anano</div>
      <svg
        className="anano-svg"
        viewBox="0 0 120 160"
        width="110"
        height="146"
        aria-label="Anano"
      >
        {/* back hair */}
        <ellipse cx="60" cy="58" rx="34" ry="36" fill="#f6d65a" />
        {/* dress */}
        <path
          d="M40 100 Q60 92 80 100 L92 150 Q60 158 28 150 Z"
          fill="#ffb3c1"
          stroke="#e58aa0"
          strokeWidth="1.2"
        />
        {/* sleeves */}
        <ellipse cx="34" cy="104" rx="9" ry="7" fill="#ffffff" />
        <ellipse cx="86" cy="104" rx="9" ry="7" fill="#ffffff" />
        {/* arms */}
        <path
          d="M30 108 Q24 124 30 138"
          stroke="#fbd7c0"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M90 108 Q96 124 90 138"
          stroke="#fbd7c0"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        {/* hands */}
        <circle cx="30" cy="140" r="4" fill="#fbd7c0" />
        <circle cx="90" cy="140" r="4" fill="#fbd7c0" />
        {/* neck */}
        <rect x="55" y="86" width="10" height="10" fill="#fbd7c0" />
        {/* face */}
        <circle cx="60" cy="64" r="26" fill="#fde2d0" />
        {/* front hair fringe */}
        <path
          d="M34 58 Q40 36 60 34 Q80 36 86 58 Q80 50 70 50 Q62 50 58 56 Q52 50 44 52 Q38 54 34 58 Z"
          fill="#f6d65a"
        />
        {/* side hair strands */}
        <path
          d="M34 62 Q28 90 36 102"
          stroke="#f6d65a"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M86 62 Q92 90 84 102"
          stroke="#f6d65a"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        {/* top knot */}
        <circle cx="60" cy="32" r="8" fill="#f6d65a" />
        <circle cx="60" cy="28" r="3" fill="#ff8fab" />
        {/* eyes */}
        <ellipse cx="50" cy="68" rx="3.6" ry="4.4" fill="#ffffff" />
        <ellipse cx="70" cy="68" rx="3.6" ry="4.4" fill="#ffffff" />
        <circle cx="50" cy="68.5" r="2.8" fill="#2a8edb" />
        <circle cx="70" cy="68.5" r="2.8" fill="#2a8edb" />
        <circle cx="50.7" cy="67.8" r="0.9" fill="#ffffff" />
        <circle cx="70.7" cy="67.8" r="0.9" fill="#ffffff" />
        {/* lashes */}
        <path
          d="M46.5 65 L48 66.5"
          stroke="#3a1c2a"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <path
          d="M73.5 65 L72 66.5"
          stroke="#3a1c2a"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        {/* cheeks */}
        <circle cx="44" cy="76" r="3.5" fill="#ffb3c1" opacity="0.7" />
        <circle cx="76" cy="76" r="3.5" fill="#ffb3c1" opacity="0.7" />
        {/* smile */}
        <path
          d="M54 80 Q60 84 66 80"
          stroke="#c14a6a"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function Flower({ kind }) {
  if (kind === "tulip") {
    return (
      <svg viewBox="0 0 40 60" width="40" height="60">
        <path
          d="M20 58 L20 32"
          stroke="#3a8a3a"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M20 48 Q12 44 10 36"
          stroke="#3a8a3a"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M20 18 Q10 22 12 34 Q16 30 20 32 Q24 30 28 34 Q30 22 20 18 Z"
          fill="#ff5a8a"
          stroke="#c93366"
          strokeWidth="1"
        />
        <path
          d="M20 18 Q18 24 20 32 Q22 24 20 18 Z"
          fill="#ffd1dc"
          opacity="0.7"
        />
      </svg>
    );
  }
  if (kind === "poppy") {
    return (
      <svg viewBox="0 0 40 60" width="40" height="60">
        <path
          d="M20 58 L20 32"
          stroke="#3a8a3a"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="20" cy="22" r="11" fill="#e83a3a" />
        <circle cx="14" cy="20" r="6" fill="#e83a3a" />
        <circle cx="26" cy="20" r="6" fill="#e83a3a" />
        <circle cx="20" cy="14" r="6" fill="#e83a3a" />
        <circle cx="20" cy="22" r="3.5" fill="#3a1c2a" />
        <circle cx="20" cy="22" r="1.5" fill="#f6d65a" />
      </svg>
    );
  }
  if (kind === "bluebell") {
    return (
      <svg viewBox="0 0 40 60" width="40" height="60">
        <path
          d="M20 58 L20 28"
          stroke="#3a8a3a"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M14 20 Q20 8 26 20 Q26 28 20 30 Q14 28 14 20 Z"
          fill="#5aa0ff"
          stroke="#3a6fb8"
          strokeWidth="1"
        />
        <ellipse cx="20" cy="30" rx="3" ry="1.5" fill="#ffd1dc" />
      </svg>
    );
  }
  // daisy
  return (
    <svg viewBox="0 0 40 60" width="40" height="60">
      <path
        d="M20 58 L20 30"
        stroke="#3a8a3a"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <ellipse
          key={deg}
          cx="20"
          cy="14"
          rx="3.5"
          ry="8"
          fill="#ffffff"
          stroke="#e8e0c5"
          strokeWidth="0.8"
          transform={`rotate(${deg} 20 22)`}
        />
      ))}
      <circle cx="20" cy="22" r="5" fill="#f6d65a" />
      <circle cx="20" cy="22" r="2" fill="#e0a830" />
    </svg>
  );
}

function Bouquet({ count }) {
  const stems = Math.min(count, 12);
  return (
    <svg viewBox="0 0 80 80" width="64" height="64" className="bouquet-svg">
      {/* wrap */}
      <path
        d="M28 58 L52 58 L58 76 L22 76 Z"
        fill="#fff"
        stroke="#c98aa8"
        strokeWidth="1.5"
      />
      <path d="M28 58 L52 58" stroke="#c98aa8" strokeWidth="1.5" />
      {/* stems */}
      {Array.from({ length: stems }).map((_, i) => {
        const angle = -40 + (80 / Math.max(1, stems - 1)) * i;
        const rad = (angle * Math.PI) / 180;
        const x = 40 + Math.sin(rad) * 18;
        const y = 28 - Math.cos(rad) * 18;
        const kind = FLOWER_KINDS[i % FLOWER_KINDS.length];
        const colors = {
          daisy: "#ffffff",
          tulip: "#ff5a8a",
          poppy: "#e83a3a",
          bluebell: "#5aa0ff",
        };
        return (
          <g key={i}>
            <path
              d={`M40 58 Q${(40 + x) / 2} ${(58 + y) / 2 + 4} ${x} ${y}`}
              stroke="#3a8a3a"
              strokeWidth="1.4"
              fill="none"
            />
            <circle
              cx={x}
              cy={y}
              r="4"
              fill={colors[kind]}
              stroke="#3a1c2a"
              strokeWidth="0.4"
            />
            {kind === "daisy" && (
              <circle cx={x} cy={y} r="1.5" fill="#f6d65a" />
            )}
          </g>
        );
      })}
    </svg>
  );
}

function App() {
  const [flowers, setFlowers] = useState([]);
  const [collected, setCollected] = useState(0);
  const [unlocked, setUnlocked] = useState([]);
  const [activeMilestone, setActiveMilestone] = useState(null);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [anano, setAnano] = useState({ x: 50, y: 70, facing: 1 });
  const walkTimerRef = useRef(null);

  const spawnFlower = useCallback(() => {
    setFlowers((prev) => {
      if (prev.length >= MAX_FLOWERS) return prev;
      const id = Date.now() + Math.random();
      const flower = {
        id,
        left: Math.random() * 80 + 10,
        top: Math.random() * 40 + 45,
        kind: FLOWER_KINDS[Math.floor(Math.random() * FLOWER_KINDS.length)],
      };
      return [...prev, flower];
    });
  }, []);

  useEffect(() => {
    if (!started || activeMilestone) return;
    const interval = setInterval(spawnFlower, SPAWN_INTERVAL);
    return () => clearInterval(interval);
  }, [started, activeMilestone, spawnFlower]);

  const pickFlower = (flower) => {
    if (walkTimerRef.current) return;
    setAnano((prev) => ({
      x: flower.left,
      y: flower.top - 4,
      facing: flower.left < prev.x ? -1 : 1,
    }));
    walkTimerRef.current = setTimeout(() => {
      setFlowers((prev) => prev.filter((f) => f.id !== flower.id));
      setCollected((prev) => {
        const next = prev + 1;
        const milestone = MILESTONES.find(
          (m) => m.count === next && !unlocked.includes(m.count),
        );
        if (milestone) {
          setUnlocked((u) => [...u, milestone.count]);
          setActiveMilestone(milestone);
        }
        return next;
      });
      walkTimerRef.current = null;
    }, WALK_MS);
  };

  useEffect(() => () => clearTimeout(walkTimerRef.current), []);

  const closeMilestone = () => setActiveMilestone(null);
  const toggleMute = () => setMuted((m) => !m);

  const nextMilestone = MILESTONES.find((m) => !unlocked.includes(m.count));
  const finished = collected === 18;

  if (!started) {
    return (
      <div className="screen start-screen">
        <div className="start-card">
          <h1>A Journey for Anano</h1>
          <p className="subtitle">For Anano Simonishvili</p>
          <p>
            Help Anano pick the wildflowers as they bloom across the meadow.
            Each one is a step closer to you. Six milestones await — six things
            I want you to know.
          </p>
          <div className="how-to">
            <p className="how-to-title">How to play</p>
            <ul>
              <li>
                🌸 <strong>Click a flower</strong> — Anano will walk over and
                pick it.
              </li>
              <li>
                💐 Every <strong>3 flowers</strong> unlocks a milestone message.
              </li>
              <li>
                ❤️ Reach <strong>18 flowers</strong> to read all six.
              </li>
            </ul>
          </div>
          <p className="music-note">
            🎵 With music by Mgzavrebi — არადა მიყვარხარ
          </p>
          <button className="primary" onClick={() => setStarted(true)}>
            Begin the Journey
          </button>
        </div>
      </div>
    );
  }

  const muteParam = muted ? "&mute=1" : "";
  const youtubeSrc = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&modestbranding=1&playsinline=1${muteParam}`;

  return (
    <div className="screen game-screen">
      <header className="hud">
        <div className="counter">
          <span className="big">{collected}</span>
          <span className="label">flowers picked</span>
        </div>
        <div className="progress">
          {MILESTONES.map((m) => (
            <div
              key={m.count}
              className={`pip ${unlocked.includes(m.count) ? "on" : ""}`}
              title={`Milestone at ${m.count}`}
            />
          ))}
        </div>
        <div
          className="bouquet-wrap"
          aria-label={`${collected} flowers in bouquet`}
        >
          <Bouquet count={collected} />
        </div>
        <div className="counter right">
          <span className="big">
            {nextMilestone ? nextMilestone.count - collected : "✓"}
          </span>
          <span className="label">
            {nextMilestone ? "until next milestone" : "all milestones reached"}
          </span>
        </div>
      </header>

      <main className="field">
        <div className="sun" />
        <svg className="hills" viewBox="0 0 100 30" preserveAspectRatio="none">
          <path d="M0 18 Q25 8 50 16 T100 14 L100 30 L0 30 Z" fill="#7bc97b" />
          <path d="M0 24 Q30 16 60 22 T100 20 L100 30 L0 30 Z" fill="#5fb05f" />
        </svg>
        <div className="grass-decor" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              style={{
                left: `${(i * 7.3) % 100}%`,
                bottom: `${(i % 3) * 10 + 4}%`,
              }}
            >
              ❀
            </span>
          ))}
        </div>

        {collected === 0 && !finished && (
          <div className="hint">
            <span className="hint-arrow">👇</span>
            <span>Click a flower — Anano will walk over and pick it</span>
          </div>
        )}

        {finished && (
          <div className="finale">
            <h2>ყოჩაღ სვეჟ შენ მოიგეეე ტოო!!!!</h2>
            <p>იმენა ანათებ</p>
          </div>
        )}

        {flowers.map((f) => (
          <button
            key={f.id}
            className="flower"
            style={{ left: `${f.left}%`, top: `${f.top}%` }}
            onClick={() => pickFlower(f)}
            aria-label={`Pick ${f.kind}`}
          >
            <Flower kind={f.kind} />
          </button>
        ))}

        <Anano x={anano.x} y={anano.y} facing={anano.facing} />
      </main>

      <button
        className="mute-btn"
        onClick={toggleMute}
        aria-label={muted ? "Unmute" : "Mute"}
      >
        {muted ? "🔇" : "🔊"}
      </button>

      <iframe
        className="yt-audio"
        src={youtubeSrc}
        title="background music"
        allow="autoplay; encrypted-media"
        frameBorder="0"
      />

      {activeMilestone && (
        <div className="modal-backdrop" onClick={closeMilestone}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
          >
            <div className="modal-badge">Milestone {activeMilestone.count}</div>
            <h2>{activeMilestone.title}</h2>
            <p>{activeMilestone.message}</p>
            <button className="primary" onClick={closeMilestone}>
              Keep Going
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
