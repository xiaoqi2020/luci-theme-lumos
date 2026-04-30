include $(TOPDIR)/rules.mk

LUCI_TITLE:=LumOS Theme - Modern Immersive UI
LUCI_DESCRIPTION:=A beautiful, modern theme with glassmorphism effects and smooth animations for OpenWrt 19.07
LUCI_DEPENDS:=+luci-base
PKG_VERSION:=1.0.0
PKG_RELEASE:=1

include $(TOPDIR)/feeds/luci/luci.mk

define Package/luci-theme-lumos/postinst
#!/bin/sh
[ -n "${IPKG_INSTROOT}" ] || {
	/etc/uci-defaults/luci-theme-lumos
	rm -f /etc/uci-defaults/luci-theme-lumos
}
exit 0
endef

define Package/luci-theme-lumos/postrm
#!/bin/sh
uci set luci.themes.@luci-theme-bootstrap[0].mediaurlbase=/luci-static/bootstrap
uci commit luci
exit 0
endef