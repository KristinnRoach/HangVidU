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
  Facebook,
  Instagram,
  Monitor,
  MoreHorizontal,
  Mail,
  LayoutGrid
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
  Facebook,
  Instagram,
  Monitor,
  MoreHorizontal,
  Mail,
  LayoutGrid
};

/**
 * Initialize Lucide icons for elements with data-lucide attribute.
 * Scans the entire document by default.
 * @param {HTMLElement} element - Optional root element to scope the scan.
 */
export function initIcons(element = document.body) {
  createIcons({
    icons,
    nameAttr: 'data-lucide',
    attrs: {
      'stroke-width': 2,
      'width': 24,
      'height': 24,
      'class': 'lucide-icon'
    }
  });
}
