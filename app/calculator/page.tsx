'use client'

import { useEffect, useReducer } from "react";

// state: 'first' --> 'operator' --> 'second' --> 'calculated'
type Phase = 'first' | 'operator' | 'second' | 'calculated';
type Op = '+' | '-' | '?';

type CalcState = {
  state: Phase;
  display: string;
  first: number;
  second: number;
  operator: Op;
};

type Action =
  | { type: 'number'; num: number }
  | { type: 'operator'; op: '+' | '-' }
  | { type: 'equal' }
  | { type: 'ce' };

const initialState: CalcState = {
  state: 'first',
  display: '0',
  first: 0,
  second: 0,
  operator: '?',
};

const calc = (a: number, b: number, op: Op) =>
  op === '+' ? a + b : op === '-' ? a - b : a;

const insertSeparator = (str: string, separator = ',', groupSize = 3) => {
  const isNegative = str.startsWith('-');
  const cleanStr = isNegative ? str.slice(1) : str;

  let result = "";
  let counter = 0;
  for (let i = cleanStr.length - 1; i >= 0; i--) {
    result = cleanStr[i] + result;
    if (i !== 0 && counter % groupSize === groupSize - 1) {
      result = separator + result;
    }
    counter++;
  }
  return isNegative ? '-' + result : result;
};

// equalClick เดิม
const equal = (s: CalcState): CalcState => {
  switch (s.state) {
    case 'operator': {
      const second = s.first;
      const first = calc(s.first, second, s.operator);
      return { ...s, first, second, display: String(first), state: 'calculated' };
    }
    case 'second': {
      const second = Number(s.display);
      const first = calc(s.first, second, s.operator);
      return { ...s, first, second, display: String(first), state: 'calculated' };
    }
    case 'calculated': {
      // กด = ซ้ำๆ
      const first = calc(s.first, s.second, s.operator);
      return { ...s, first, display: String(first) };
    }
    default:
      return s;
  }
};

const reducer = (s: CalcState, action: Action): CalcState => {
  switch (action.type) {
    case 'number': {
      const n = String(action.num);
      switch (s.state) {
        case 'first':
        case 'second':
          if (s.display === '0') return { ...s, display: n };
          if (s.display.length < 9) return { ...s, display: s.display + n };
          return s;
        case 'operator':
          return { ...s, display: n, state: 'second' };
        case 'calculated':
          return { ...s, display: n, state: 'first' };
      }
      return s;
    }
    case 'operator': {
      switch (s.state) {
        case 'first':
        case 'calculated':
          return { ...s, first: Number(s.display), operator: action.op, state: 'operator' };
        case 'operator':
          return { ...s, operator: action.op };
        case 'second': {
          const r = equal(s);
          return { ...r, first: Number(r.display), operator: action.op, state: 'operator' };
        }
      }
      return s;
    }
    case 'equal':
      return equal(s);
    case 'ce':
      return initialState;
  }
};

export default function Page() {
  const [s, dispatch] = useReducer(reducer, initialState);

  // keyboard
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code.startsWith('Digit')) {
        dispatch({ type: 'number', num: Number(e.code.replace('Digit', '')) });
      } else if (e.code.startsWith('Numpad') && e.code.length === 7) {
        dispatch({ type: 'number', num: Number(e.code.replace('Numpad', '')) });
      } else if (e.key === '-' || e.code === 'Minus' || e.code === 'NumpadSubtract') {
        dispatch({ type: 'operator', op: '-' });
      } else if (e.key === '+' || e.code === 'NumpadAdd') {
        dispatch({ type: 'operator', op: '+' });
      } else if (e.key === 'Enter' || e.key === '=' || e.code === 'NumpadEnter') {
        dispatch({ type: 'equal' });
      } else if (e.key === 'Escape' || e.code === 'KeyC') {
        dispatch({ type: 'ce' });
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const num = (n: number) => dispatch({ type: 'number', num: n });

  return (
    <div className="calc-body">
      <div className="calc">
        <div className="calc-outer">
          <div className="calc-inner">
            <div className="calc-screen">{insertSeparator(s.display)}</div>

            <div className="calc-row">
              <button className="calc-green" disabled>MC</button>
              <button className="calc-green" disabled>MR</button>
              <button className="calc-green" disabled>M+</button>
              <button className="calc-green" disabled>M-</button>
              <button className="calc-red" onClick={() => dispatch({ type: 'ce' })}>CE</button>
            </div>
            <div className="calc-row">
              <button className="calc-purple" onClick={() => num(7)}>7</button>
              <button className="calc-purple" onClick={() => num(8)}>8</button>
              <button className="calc-purple" onClick={() => num(9)}>9</button>
              <button className="calc-green" disabled>/</button>
              <button className="calc-green" disabled>root</button>
            </div>
            <div className="calc-row">
              <button className="calc-purple" onClick={() => num(4)}>4</button>
              <button className="calc-purple" onClick={() => num(5)}>5</button>
              <button className="calc-purple" onClick={() => num(6)}>6</button>
              <button className="calc-green" disabled>X</button>
              <button className="calc-green" disabled>%</button>
            </div>
            <div className="calc-row">
              <button className="calc-purple" onClick={() => num(1)}>1</button>
              <button className="calc-purple" onClick={() => num(2)}>2</button>
              <button className="calc-purple" onClick={() => num(3)}>3</button>
              <button className="calc-green" onClick={() => dispatch({ type: 'operator', op: '-' })}>-</button>
              <button className="calc-green" disabled>1/x</button>
            </div>
            <div className="calc-row">
              <button className="calc-purple" onClick={() => num(0)}>0</button>
              <button className="calc-purple" disabled>.</button>
              <button className="calc-purple" disabled>+/-</button>
              <button className="calc-green" onClick={() => dispatch({ type: 'operator', op: '+' })}>+</button>
              <button className="calc-green" onClick={() => dispatch({ type: 'equal' })}>=</button>
            </div>
          </div>
          <div className="calc-student">68100663 โมไนย ศรีนวล</div>
        </div>
      </div>
    </div>
  );
}
