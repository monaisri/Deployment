'use client'

import { useEffect, useState } from "react";
import { Play, Pause } from "lucide-react";

type BallType = 'none' | 'basketball' | 'football' | 'volleyball' | 'human';

// รูปอยู่ที่ public/animation/*.png
const BALL_IMAGES: Record<BallType, string> = {
  none: '',
  basketball: '/animation/basketball.png',
  football: '/animation/football.png',
  volleyball: '/animation/volleyball.png',
  human: '/animation/human.png',
};

const BALL_BUTTONS: { type: BallType; label: string }[] = [
  { type: 'none', label: 'None' },
  { type: 'basketball', label: 'Basketball' },
  { type: 'football', label: 'Football' },
  { type: 'volleyball', label: 'Volleyball' },
  { type: 'human', label: 'Human' },
];

// default
const FIELD_WIDTH = 640;
const FIELD_HEIGHT = 480;
const BALL_RADIUS = 60;
const VELOCITY = 100; // pixels/second

const FRAME_RATE = 50; // Frames/second
const FRAME_TIME = 1 / FRAME_RATE; // second

const X_VELOCITY = Math.round(VELOCITY * Math.sqrt(2));
const Y_VELOCITY = Math.round(VELOCITY * Math.sqrt(2));

const START_X = FIELD_WIDTH / 2 - BALL_RADIUS;
const START_Y = FIELD_HEIGHT / 2 - BALL_RADIUS;

export default function Page() {
  const [ballType, setBallType] = useState<BallType>('none');
  const [running, setRunning] = useState(false);

  const [x, setX] = useState(START_X);
  const [y, setY] = useState(START_Y);

  const [moveRight, setMoveRight] = useState(true);
  const [moveDown, setMoveDown] = useState(true);

  const [rotation, setRotation] = useState(0);
  const [spinSpeed, setSpinSpeed] = useState(0);

  // keyboard: Space = run/pause, 0-4 = เลือกลูกบอล
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        event.preventDefault();
        setRunning((prev) => !prev);
      }
      if (event.code === 'Digit0' || event.code === 'Numpad0') setBallType('none');
      if (event.code === 'Digit1' || event.code === 'Numpad1') setBallType('basketball');
      if (event.code === 'Digit2' || event.code === 'Numpad2') setBallType('football');
      if (event.code === 'Digit3' || event.code === 'Numpad3') setBallType('volleyball');
      if (event.code === 'Digit4' || event.code === 'Numpad4') setBallType('human');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const calculateNextFrame = () => {
    let xNew = x;
    let yNew = y;

    let currentSpinSpeed = spinSpeed;
    const impactSpin = Math.round(VELOCITY / 30);

    // X
    if (moveRight) {
      xNew = x + X_VELOCITY / FRAME_RATE;
      if (xNew >= FIELD_WIDTH - BALL_RADIUS * 2) {
        xNew = FIELD_WIDTH - BALL_RADIUS * 2;
        setMoveRight(false);
        currentSpinSpeed = impactSpin;
      }
    } else {
      xNew = x - X_VELOCITY / FRAME_RATE;
      if (xNew <= 0) {
        xNew = 0;
        setMoveRight(true);
        currentSpinSpeed = -impactSpin;
      }
    }

    // Y
    if (moveDown) {
      yNew = y + Y_VELOCITY / FRAME_RATE;
      if (yNew >= FIELD_HEIGHT - BALL_RADIUS * 2) {
        yNew = FIELD_HEIGHT - BALL_RADIUS * 2;
        setMoveDown(false);
        currentSpinSpeed = impactSpin;
      }
    } else {
      yNew = y - Y_VELOCITY / FRAME_RATE;
      if (yNew <= 0) {
        yNew = 0;
        setMoveDown(true);
        currentSpinSpeed = -impactSpin;
      }
    }

    setX(xNew);
    setY(yNew);

    setSpinSpeed(currentSpinSpeed);
    setRotation(rotation + currentSpinSpeed);
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (running) {
      timer = setTimeout(() => {
        calculateNextFrame();
      }, FRAME_TIME * 1000);
    }
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, x, y, moveRight, moveDown, rotation, spinSpeed]);

  const ballImage = BALL_IMAGES[ballType];

  return (
    <div className="mx-auto mt-4 w-fit">
      {/* field */}
      <div
        className="relative overflow-hidden rounded-xl border-2 border-black"
        style={{
          width: `${FIELD_WIDTH}px`,
          height: `${FIELD_HEIGHT}px`,
          backgroundImage: `url(/animation/field.png)`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {/* ball */}
        <div
          className="absolute rounded-full border border-black"
          style={{
            width: `${BALL_RADIUS * 2}px`,
            height: `${BALL_RADIUS * 2}px`,
            left: `${x}px`,
            top: `${y}px`,
            transform: `rotate(${rotation}deg)`,
            backgroundImage: ballImage ? `url(${ballImage})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      {/* controls */}
      <div className="mt-3 flex items-center justify-between gap-3">
        {/* play/pause */}
        <button
          type="button"
          onClick={() => setRunning(!running)}
          className={`inline-flex items-center gap-1.5 rounded-md px-4 py-2 font-medium text-white transition-colors ${
            running ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {running ? (
            <>
              <Pause className="size-4" /> PAUSE
            </>
          ) : (
            <>
              <Play className="size-4" /> RUN
            </>
          )}
        </button>

        {/* ball selector */}
        <div className="flex gap-1">
          {BALL_BUTTONS.map(({ type, label }) => {
            const active = ballType === type;
            const base = type === 'none' ? 'border-slate-500 text-slate-600' : 'border-blue-600 text-blue-600';
            const activeCls = type === 'none' ? 'bg-slate-500 text-white' : 'bg-blue-600 text-white';
            return (
              <button
                key={type}
                type="button"
                onClick={() => setBallType(type)}
                className={`rounded-md border px-3 py-2 text-sm transition-colors ${
                  active ? activeCls : `${base} hover:bg-slate-100`
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
