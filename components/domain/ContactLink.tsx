import { Phone, MessageCircle, Navigation, Instagram, Facebook } from 'lucide-react'

type ContactType = 'phone' | 'whatsapp' | 'waze' | 'instagram' | 'facebook'

interface ContactLinkProps {
  type: ContactType
  value: string
  label?: string
}

const CONFIG: Record<
  ContactType,
  {
    label: string
    icon: React.ReactNode
    getHref: (v: string) => string
    bgClass: string
    textClass: string
  }
> = {
  phone: {
    label: 'שיחה',
    icon: <Phone size={18} />,
    getHref: (v) => `tel:${v.replace(/\D/g, '')}`,
    bgClass: 'bg-green-50',
    textClass: 'text-green-600',
  },
  whatsapp: {
    label: 'וואטסאפ',
    icon: <MessageCircle size={18} />,
    getHref: (v) => `https://wa.me/${v.replace(/\D/g, '')}`,
    bgClass: 'bg-green-50',
    textClass: 'text-green-600',
  },
  waze: {
    label: 'Waze',
    icon: <Navigation size={18} />,
    getHref: (v) => v,
    bgClass: 'bg-cyan-light',
    textClass: 'text-cyan-dark',
  },
  instagram: {
    label: 'אינסטגרם',
    icon: <Instagram size={18} />,
    getHref: (v) =>
      v.startsWith('http') ? v : `https://instagram.com/${v.replace('@', '')}`,
    bgClass: 'bg-pink-50',
    textClass: 'text-pink-600',
  },
  facebook: {
    label: 'פייסבוק',
    icon: <Facebook size={18} />,
    getHref: (v) => v,
    bgClass: 'bg-blue-light',
    textClass: 'text-blue',
  },
}

export default function ContactLink({ type, value, label }: ContactLinkProps) {
  if (!value) return null
  const config = CONFIG[type]
  if (!config) return null

  return (
    <a
      href={config.getHref(value)}
      target={type === 'phone' ? '_self' : '_blank'}
      rel="noopener noreferrer"
      className={[
        'flex flex-col items-center justify-center gap-1.5 rounded-xl p-3 transition-opacity hover:opacity-80 tap-highlight-none',
        config.bgClass,
        config.textClass,
      ].join(' ')}
    >
      {config.icon}
      <span className="text-xs font-medium">{label ?? config.label}</span>
    </a>
  )
}
