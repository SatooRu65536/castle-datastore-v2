import markerCastleBlack from '@/assets/markers/castle-black.png';
import markerCastleBlue from '@/assets/markers/castle-blue.png';
import markerCastleGreen from '@/assets/markers/castle-green.png';
import markerCastleRed from '@/assets/markers/castle-red.png';
// import markerCastleYellow from '@/assets/markers/castle-yellow.png';
import markerCastleEdit from '@/assets/markers/castle-edit.png';
import markerStar from '@/assets/markers/star.png';
import markerPoint from '@/assets/markers/point.png';

export const MARKERS = [
  markerPoint,
  markerStar,
  markerCastleGreen,
  markerCastleBlue,
  markerCastleRed,
  markerCastleBlack,
] as const;
export const MARKER_SELECT = markerCastleEdit;
