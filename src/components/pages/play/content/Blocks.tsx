import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Group, Text } from "react-konva";

// ===== 기본 설정 =====
const COLS = 10;
const ROWS = 20;
const TILE = 28; // 블록 크기(px)
const SPEED_MS = 550; // 자동 낙하 속도

type Cell = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7; // 0=빈칸, 1~7=블록색 인덱스

// 테트로미노 정의 (회전은 시계 방향 4상태)
const TETROS: Record<number, Cell[][][]> = {
    1: [ // I
        [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
        [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],
        [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
        [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],
    ],
    2: [ // O
        [[2,2],[2,2]], [[2,2],[2,2]], [[2,2],[2,2]], [[2,2],[2,2]],
    ],
    3: [ // T
        [[0,3,0],[3,3,3],[0,0,0]],
        [[0,3,0],[0,3,3],[0,3,0]],
        [[0,0,0],[3,3,3],[0,3,0]],
        [[0,3,0],[3,3,0],[0,3,0]],
    ],
    4: [ // J
        [[4,0,0],[4,4,4],[0,0,0]],
        [[0,4,4],[0,4,0],[0,4,0]],
        [[0,0,0],[4,4,4],[0,0,4]],
        [[0,4,0],[0,4,0],[4,4,0]],
    ],
    5: [ // L
        [[0,0,5],[5,5,5],[0,0,0]],
        [[0,5,0],[0,5,0],[0,5,5]],
        [[0,0,0],[5,5,5],[5,0,0]],
        [[5,5,0],[0,5,0],[0,5,0]],
    ],
    6: [ // S
        [[0,6,6],[6,6,0],[0,0,0]],
        [[0,6,0],[0,6,6],[0,0,6]],
        [[0,0,0],[0,6,6],[6,6,0]],
        [[6,0,0],[6,6,0],[0,6,0]],
    ],
    7: [ // Z
        [[7,7,0],[0,7,7],[0,0,0]],
        [[0,0,7],[0,7,7],[0,7,0]],
        [[0,0,0],[7,7,0],[0,7,7]],
        [[0,7,0],[7,7,0],[7,0,0]],
    ],
};

const COLORS: Record<Cell, string> = {
    0: "transparent",
    1: "#3bc7ff",
    2: "#ffd166",
    3: "#c084fc",
    4: "#60a5fa",
    5: "#f97316",
    6: "#22c55e",
    7: "#ef4444",
};

function emptyBoard(): Cell[][] {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

type Piece = { id: number; rot: 0|1|2|3; x: number; y: number }; // 좌상단 기준

function randomPiece(): Piece {
    const id = (Math.floor(Math.random()*7)+1) as 1|2|3|4|5|6|7;
    // 중앙 스폰
    const shape = TETROS[id][0];
    const width = shape[0].length;
    return { id, rot: 0, x: Math.floor((COLS - width)/2), y: -2 };
}

// 충돌 체크
function collides(board: Cell[][], p: Piece): boolean {
    const shape = TETROS[p.id][p.rot];
    for (let r=0; r<shape.length; r++) {
        for (let c=0; c<shape[r].length; c++) {
            const v = shape[r][c];
            if (!v) continue;
            const br = p.y + r, bc = p.x + c;
            if (bc < 0 || bc >= COLS || br >= ROWS) return true;
            if (br >= 0 && board[br][bc] !== 0) return true;
        }
    }
    return false;
}

// 보드에 고정
function merge(board: Cell[][], p: Piece): Cell[][] {
    const next = board.map(row => row.slice());
    const shape = TETROS[p.id][p.rot];
    for (let r=0; r<shape.length; r++) {
        for (let c=0; c<shape[r].length; c++) {
            if (!shape[r][c]) continue;
            const br = p.y + r, bc = p.x + c;
            if (br >= 0) next[br][bc] = p.id as Cell;
        }
    }
    return next;
}

// 라인 클리어
function clearLines(board: Cell[][]): { board: Cell[][]; cleared: number } {
    const remain = board.filter(row => row.some(v => v === 0));
    const cleared = ROWS - remain.length;
    const newRows = Array.from({ length: cleared }, () => Array(COLS).fill(0));
    return { board: [...newRows, ...remain], cleared };
}

const Blocks = () => {
    const [board, setBoard] = useState<Cell[][]>(emptyBoard());
    const [piece, setPiece] = useState<Piece>(randomPiece());
    const [score, setScore] = useState(0);
    const timerRef = useRef<number | null>(null);
    const [started, setStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const restart = () => {
        setBoard(emptyBoard());
        setPiece(randomPiece());
        setScore(0);
        setGameOver(false);
    };

    // 자동 낙하 루프
    useEffect(() => {
        if (!started || gameOver) {
            if (timerRef.current) clearInterval(timerRef.current);
            return;
        }

        const tick = () => {
            setPiece(prev => {
                const next = { ...prev, y: prev.y + 1 };
                if (collides(board, next)) {
                    // ── 추가: 위쪽(보드 바깥)으로 넘쳤는지 먼저 검사
                    const shape = TETROS[prev.id][prev.rot];
                    const overflow = shape.some((row, r) => row.some((v) => v && (prev.y + r) < 0));
                    if (overflow) {
                        setGameOver(true);
                        if (timerRef.current) clearInterval(timerRef.current);
                        return prev; // 진행 중단
                    }

                    // 고정
                    const merged = merge(board, prev);
                    const { board: clearedBoard, cleared } = clearLines(merged);
                    setBoard(clearedBoard);
                    if (cleared) setScore(s => s + [0, 100, 300, 500, 800][cleared] || 0);

                    // 새 피스 스폰 충돌 시에도 게임오버
                    const np = randomPiece();
                    if (collides(clearedBoard, np)) {
                        setGameOver(true);
                        if (timerRef.current) clearInterval(timerRef.current);
                        return prev;
                    }
                    return np;
                }
                return next;
            });
        };

        timerRef.current = window.setInterval(tick, SPEED_MS);
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [board, gameOver, started]);


    // 키 입력
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            // 시작 전: Enter로 시작
            if (!started) {
                if (e.key === "Enter") setStarted(true);
                return;
            }
            // 게임오버: Enter로 재시작
            if (gameOver) {
                if (e.key === "Enter") { restart(); setStarted(true); }
                return;
            }

            setPiece(prev => {
                let n = { ...prev };
                if (e.key === "ArrowLeft")  n = { ...n, x: n.x - 1 };
                if (e.key === "ArrowRight") n = { ...n, x: n.x + 1 };
                if (e.key === "ArrowDown")  n = { ...n, y: n.y + 1 };
                if (e.key === "ArrowUp" || e.key === " ") {
                    n = { ...n, rot: ((n.rot + 1) % 4) as 0|1|2|3 };
                }
                // 벽/충돌 시 원상복귀
                if (collides(board, n)) return prev;
                return n;
            });
        };

        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [board, gameOver, started]);

    // 현재 떨어지는 조각 + 보드 함께 그리기 위한 셀 맵
    const drawCells: { x: number; y: number; color: string }[] = [];

    // 고정 블록
    for (let r=0; r<ROWS; r++) {
        for (let c=0; c<COLS; c++) {
            const v = board[r][c];
            if (v) drawCells.push({ x: c, y: r, color: COLORS[v] });
        }
    }

    // 낙하 블록
    const shape = TETROS[piece.id][piece.rot];
    for (let r=0; r<shape.length; r++) {
        for (let c=0; c<shape[r].length; c++) {
            if (!shape[r][c]) continue;
            const br = piece.y + r, bc = piece.x + c;
            if (br >= 0) drawCells.push({ x: bc, y: br, color: COLORS[piece.id as Cell] });
        }
    }

    const W = COLS * TILE;
    const H = ROWS * TILE;

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="text-sm text-gray-600">Score: {score}</div>
            <Stage width={W} height={H}>
                <Layer listening={false}>
                    {/* 배경 그리드 */}
                    <Group>
                        {[...Array(ROWS)].map((_, r) =>
                            [...Array(COLS)].map((__, c) => (
                                <Rect
                                    key={`${r}-${c}`}
                                    x={c * TILE}
                                    y={r * TILE}
                                    width={TILE}
                                    height={TILE}
                                    fill={(r + c) % 2 === 0 ? "#f8fafc" : "#f1f5f9"}
                                    stroke="#e2e8f0"
                                    strokeWidth={1}
                                />
                            ))
                        )}
                    </Group>
                    {/* 블록 */}
                    <Group>
                        {drawCells.map((cell, i) => (
                            <Rect
                                key={i}
                                x={cell.x * TILE}
                                y={cell.y * TILE}
                                width={TILE}
                                height={TILE}
                                fill={cell.color}
                                stroke="#111827"
                                strokeWidth={0.8}
                                cornerRadius={4}
                                shadowColor="rgba(0,0,0,0.3)"
                                shadowBlur={3}
                                shadowOpacity={0.4}
                                shadowOffset={{x: 1, y: 1}}
                            />
                        ))}
                    </Group>
                    {!started && !gameOver && (
                        <Group>
                            <Rect x={0} y={0} width={W} height={H} fill="rgba(0,0,0,0.55)" />
                            <Text
                                x={0}
                                y={H/2 - 40}
                                width={W}
                                align="center"
                                text={"Enter로 시작하세요!"}
                                fontSize={22}
                                fill="#ffffff"
                                fontStyle="bold"
                            />
                        </Group>
                    )}
                    {gameOver && (
                        <Group>
                            <Rect x={0} y={0} width={W} height={H} fill="rgba(0,0,0,0.55)" />
                            <Text
                                x={0}
                                y={H / 2 - 40}
                                width={W}
                                align="center"
                                text={"GAME OVER\nEnter로 다시 시작하세요."}
                                fontSize={22}
                                fill="#ffffff"
                                fontStyle="bold"
                            />
                        </Group>
                    )}
                </Layer>
            </Stage>
            <p className="text-xs text-gray-500">← → 이동, ↑ 회전, ↓ 소프트드랍, Space도 회전</p>
            {gameOver && <p className="text-xs text-red-500">Enter로 다시 시작하세요.</p>}
        </div>
    );
};

export default Blocks;
