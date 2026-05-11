import {
  createIcons,
  Search,
  Phone,
  ClipboardPaste,
  UserPlus,
  Bell,
  X,
  Video,
  VideoOff,
  RefreshCw,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Maximize,
  Copy,
  PhoneOff,
  Square,
  Send,
  Paperclip,
  ChevronLeft,
  Download,
  Play,
  Plus,
  Info,
  Monitor,
  MoreHorizontal,
  Mail,
  LayoutGrid,
  Share,
  Share2,
} from 'lucide';

// Mapping and exporting only used icons for tree-shaking
export const icons = {
  Search,
  Phone,
  ClipboardPaste,
  UserPlus,
  Bell,
  X,
  Info,
  Video,
  VideoOff,
  RefreshCw,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Maximize,
  Copy,
  PhoneOff,
  Square,
  Send,
  Paperclip,
  ChevronLeft,
  Download,
  Play,
  Plus,
  Monitor,
  MoreHorizontal,
  Mail,
  LayoutGrid,
  Share,
  Share2,
};

/**
 * Initialize Lucide icons for elements with data-lucide attribute.
 * Scans the passed in root element for elements with data-lucide
 * attribute and replaces them with corresponding SVG icons.
 * @param {HTMLElement} element - Optional root element to scope the scan (defaults to document.body)
 */
export function initIcons(element = document.body) {
  createIcons({
    icons,
    nameAttr: 'data-lucide',
    root: element,
    attrs: {
      'stroke-width': 2,
      width: 24,
      height: 24,
      class: 'lucide-icon',
    },
  });
}
