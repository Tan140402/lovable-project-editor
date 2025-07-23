import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				/* Space Theme Colors */
				space: {
					deep: 'hsl(var(--space-deep))',
					void: 'hsl(var(--space-void))'
				},
				nebula: {
					purple: 'hsl(var(--nebula-purple))',
					cyan: 'hsl(var(--nebula-cyan))'
				},
				star: {
					white: 'hsl(var(--star-white))'
				},
				energy: {
					glow: 'hsl(var(--energy-glow))'
				},
				cosmic: {
					accent: 'hsl(var(--cosmic-accent))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				/* Space Animations */
				'warp-jump': {
					'0%': { transform: 'scale(1) translateZ(0)', opacity: '1' },
					'50%': { transform: 'scale(0.1) translateZ(-1000px)', opacity: '0.3' },
					'100%': { transform: 'scale(1) translateZ(0)', opacity: '1' }
				},
				'star-pulse': {
					'0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
					'50%': { opacity: '1', transform: 'scale(1.2)' }
				},
				'orbit': {
					'0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
					'100%': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'50%': { transform: 'translateY(-20px) rotate(5deg)' }
				},
				'energy-flow': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				},
				'cosmic-drift': {
					'0%': { transform: 'translateX(-100px) translateY(50px)' },
					'50%': { transform: 'translateX(100px) translateY(-50px)' },
					'100%': { transform: 'translateX(-100px) translateY(50px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'warp-jump': 'warp-jump 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				'star-pulse': 'star-pulse 3s ease-in-out infinite',
				'orbit': 'orbit 20s linear infinite',
				'float': 'float 6s ease-in-out infinite',
				'energy-flow': 'energy-flow 3s ease-in-out infinite',
				'cosmic-drift': 'cosmic-drift 15s ease-in-out infinite'
			},
			backgroundImage: {
				'gradient-cosmic': 'var(--gradient-cosmic)',
				'gradient-warp': 'var(--gradient-warp)',
				'gradient-nebula': 'var(--gradient-nebula)'
			},
			boxShadow: {
				'cosmic': 'var(--shadow-cosmic)',
				'deep': 'var(--shadow-deep)',
				'glow-energy': 'var(--glow-energy)',
				'glow-accent': 'var(--glow-accent)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
