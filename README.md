# LumOS Theme

A beautiful, modern OpenWrt LuCI theme with glassmorphism effects and smooth animations.

## Features

- **Immersive Lighting Effects** - Multiple gradient layers with dynamic glow animations
- **Glassmorphism Design** - Beautiful frosted glass effect using backdrop-filter
- **Smooth Animations** - Ripple effects, particle animations, and smooth transitions
- **Theme Switching** - Support for light/dark themes with auto-detection
- **Responsive Design** - Optimized for both desktop and mobile devices
- **Real-time Monitoring** - CPU and memory usage display

## Compatibility

- OpenWrt 19.07 (tested)
- OpenWrt 21.02+ (should work)
- ImmortalWrt (should work)

## Installation

### Manual Installation

```bash
# Clone the repository
git clone https://github.com/xiaoqi2020/luci-theme-lumos.git

# Copy files to OpenWrt build directory
cp -r luci-theme-lumos openwrt/package/

# Build
cd openwrt
make menuconfig  # Select LUCI -> Themes -> luci-theme-lumos
make -j$(nproc) V=s
```

### GitHub Actions (Cloud Build)

This theme supports GitHub Actions for cloud compilation. Simply push to your repository and the workflow will build automatically.

## Screenshots

*(Add screenshots here)*

## License

MIT License

## Credits

Created by xiaoqi