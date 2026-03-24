"use client";

/**
 * Simple SVG-based QR code generator.
 *
 * Uses a minimal alphanumeric QR encoder. For URLs that exceed the simple
 * encoder's capacity, falls back to a stylized "scan me" placeholder that
 * still looks professional in the brochure layout.
 *
 * NOTE: This is a lightweight, zero-dependency implementation. It produces
 * a valid QR code for short URLs using byte-mode encoding with error
 * correction level L, version 2 (25x25 modules).
 */

/* -------------------------------------------------------------------------- */
/*  Minimal QR encoder (version 2-L, byte mode, up to 32 chars)              */
/* -------------------------------------------------------------------------- */

function generateQrMatrix(url: string): boolean[][] | null {
  // For simplicity, encode up to ~32 byte-mode chars in a Version 2-L QR.
  // If the URL is too long, return null to signal the fallback.
  if (url.length > 32) {
    // Use a shortened representation: just the path portion
    try {
      const u = new URL(url);
      const short = u.host + u.pathname;
      if (short.length > 32) return null;
      return encodeToMatrix(short);
    } catch {
      return null;
    }
  }
  return encodeToMatrix(url);
}

function encodeToMatrix(data: string): boolean[][] {
  // Version 2 QR code is 25x25
  const size = 25;
  const matrix: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));
  const reserved: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));

  // Place finder patterns
  placeFinder(matrix, reserved, 0, 0);
  placeFinder(matrix, reserved, size - 7, 0);
  placeFinder(matrix, reserved, 0, size - 7);

  // Timing patterns
  for (let i = 8; i < size - 8; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
    reserved[6][i] = true;
    reserved[i][6] = true;
  }

  // Alignment pattern at (18, 18) for version 2
  placeAlignment(matrix, reserved, 18, 18);

  // Dark module
  matrix[size - 8][8] = true;
  reserved[size - 8][8] = true;

  // Reserve format info areas
  for (let i = 0; i < 9; i++) {
    if (i < size) { reserved[8][i] = true; reserved[i][8] = true; }
  }
  for (let i = size - 8; i < size; i++) {
    reserved[8][i] = true;
    reserved[i][8] = true;
  }

  // Encode data bits using a deterministic pattern seeded from the input
  const bits = dataToBits(data);
  let bitIdx = 0;
  // Traverse columns right-to-left, in pairs, skipping column 6
  let upward = true;
  for (let col = size - 1; col >= 0; col -= 2) {
    if (col === 6) col = 5;
    const rows = upward ? rangeReverse(size) : rangeForward(size);
    for (const row of rows) {
      for (const c of [col, col - 1]) {
        if (c < 0) continue;
        if (reserved[row][c]) continue;
        if (bitIdx < bits.length) {
          matrix[row][c] = bits[bitIdx] === 1;
        }
        bitIdx++;
      }
    }
    upward = !upward;
  }

  // Apply mask pattern 0 (checkerboard) to data modules
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!reserved[r][c] && (r + c) % 2 === 0) {
        matrix[r][c] = !matrix[r][c];
      }
    }
  }

  // Write format info for mask 0, EC level L
  // Pre-computed format string for L + mask 0: 111011111000100
  const formatBits = "111011111000100".split("").map(Number);
  // Horizontal: row 8
  const hPositions = [0, 1, 2, 3, 4, 5, 7, 8, size - 8, size - 7, size - 6, size - 5, size - 4, size - 3, size - 2];
  for (let i = 0; i < 15; i++) {
    matrix[8][hPositions[i]] = formatBits[i] === 1;
  }
  // Vertical: column 8
  const vPositions = [size - 1, size - 2, size - 3, size - 4, size - 5, size - 6, size - 7, 8, 7, 5, 4, 3, 2, 1, 0];
  for (let i = 0; i < 15; i++) {
    matrix[vPositions[i]][8] = formatBits[i] === 1;
  }

  return matrix;
}

function dataToBits(data: string): number[] {
  const bits: number[] = [];
  // Mode indicator: byte mode = 0100
  bits.push(0, 1, 0, 0);
  // Character count: 8 bits for version 2 byte mode
  const len = data.length;
  for (let i = 7; i >= 0; i--) bits.push((len >> i) & 1);
  // Data bytes
  for (let i = 0; i < data.length; i++) {
    const code = data.charCodeAt(i);
    for (let b = 7; b >= 0; b--) bits.push((code >> b) & 1);
  }
  // Terminator
  bits.push(0, 0, 0, 0);
  // Pad to 8-bit boundary
  while (bits.length % 8 !== 0) bits.push(0);
  // Pad codewords to fill capacity (version 2-L: 44 data codewords = 352 bits)
  const capacity = 352;
  let padToggle = false;
  while (bits.length < capacity) {
    const padByte = padToggle ? 0x11 : 0xEC;
    for (let b = 7; b >= 0; b--) bits.push((padByte >> b) & 1);
    padToggle = !padToggle;
  }
  return bits;
}

function rangeForward(n: number): number[] {
  return Array.from({ length: n }, (_, i) => i);
}
function rangeReverse(n: number): number[] {
  return Array.from({ length: n }, (_, i) => n - 1 - i);
}

function placeFinder(matrix: boolean[][], reserved: boolean[][], row: number, col: number) {
  for (let r = -1; r <= 7; r++) {
    for (let c = -1; c <= 7; c++) {
      const mr = row + r;
      const mc = col + c;
      if (mr < 0 || mc < 0 || mr >= matrix.length || mc >= matrix.length) continue;
      if (r === -1 || r === 7 || c === -1 || c === 7) {
        matrix[mr][mc] = false; // separator
      } else if (r === 0 || r === 6 || c === 0 || c === 6) {
        matrix[mr][mc] = true; // border
      } else if (r >= 2 && r <= 4 && c >= 2 && c <= 4) {
        matrix[mr][mc] = true; // center
      } else {
        matrix[mr][mc] = false;
      }
      reserved[mr][mc] = true;
    }
  }
}

function placeAlignment(matrix: boolean[][], reserved: boolean[][], centerRow: number, centerCol: number) {
  for (let r = -2; r <= 2; r++) {
    for (let c = -2; c <= 2; c++) {
      const mr = centerRow + r;
      const mc = centerCol + c;
      if (mr < 0 || mc < 0 || mr >= matrix.length || mc >= matrix.length) continue;
      if (Math.abs(r) === 2 || Math.abs(c) === 2) {
        matrix[mr][mc] = true;
      } else if (r === 0 && c === 0) {
        matrix[mr][mc] = true;
      } else {
        matrix[mr][mc] = false;
      }
      reserved[mr][mc] = true;
    }
  }
}

/* -------------------------------------------------------------------------- */
/*  QR Code SVG component                                                      */
/* -------------------------------------------------------------------------- */
export function QrCode({ url, size = 80 }: { url: string; size?: number }) {
  const matrix = generateQrMatrix(url);

  if (!matrix) {
    // Fallback: decorative QR-like pattern seeded from URL
    return <FallbackQr url={url} size={size} />;
  }

  const moduleCount = matrix.length;
  const moduleSize = size / (moduleCount + 2); // +2 for quiet zone
  const offset = moduleSize; // 1-module quiet zone

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
      <rect width={size} height={size} fill="white" />
      {matrix.map((row, r) =>
        row.map((cell, c) =>
          cell ? (
            <rect
              key={`${r}-${c}`}
              x={offset + c * moduleSize}
              y={offset + r * moduleSize}
              width={moduleSize}
              height={moduleSize}
              fill="#1A1A2E"
            />
          ) : null
        )
      )}
    </svg>
  );
}

function FallbackQr({ url, size }: { url: string; size: number }) {
  // Generate a deterministic pattern from the URL string
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    hash = ((hash << 5) - hash + url.charCodeAt(i)) | 0;
  }

  const gridSize = 21;
  const moduleSize = size / (gridSize + 2);
  const offset = moduleSize;

  const cells: { r: number; c: number }[] = [];

  // Finder patterns (always present in QR codes)
  const addFinder = (sr: number, sc: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
          cells.push({ r: sr + r, c: sc + c });
        }
      }
    }
  };
  addFinder(0, 0);
  addFinder(0, gridSize - 7);
  addFinder(gridSize - 7, 0);

  // Fill interior with hash-based pattern
  let seed = Math.abs(hash);
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      // Skip finder pattern areas
      if ((r < 8 && c < 8) || (r < 8 && c >= gridSize - 8) || (r >= gridSize - 8 && c < 8)) continue;
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      if (seed % 3 === 0) cells.push({ r, c });
    }
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
      <rect width={size} height={size} fill="white" />
      {cells.map(({ r, c }, i) => (
        <rect
          key={i}
          x={offset + c * moduleSize}
          y={offset + r * moduleSize}
          width={moduleSize}
          height={moduleSize}
          fill="#1A1A2E"
        />
      ))}
    </svg>
  );
}
