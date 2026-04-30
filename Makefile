include $(TOPDIR)/rules.mk

PKG_NAME:=luci-theme-lumos
PKG_VERSION:=1.0.0
PKG_RELEASE:=1

include $(INCLUDE_DIR)/package.mk

define Package/luci-theme-lumos
  SECTION:=luci
  CATEGORY:=LuCI
  SUBMENU:=Themes
  TITLE:=LumOS Theme - Modern Immersive UI
  DEPENDS:=+luci-base
  PKGARCH:=all
endef

define Package/luci-theme-lumos/description
 LumOS Theme is a modern OpenWrt theme with:
 - Immersive lighting effects
 - Glassmorphism design
 - Smooth animations
 - Light/dark theme switching
endef

define Build/Compile
endef

define Package/luci-theme-lumos/install
	$(INSTALL_DIR) $(1)/usr/lib/lua/luci/view/themes/lumos
	$(INSTALL_DIR) $(1)/www/luci-static/lumos/css
	$(INSTALL_DIR) $(1)/www/luci-static/lumos/js
	$(INSTALL_DIR) $(1)/etc/uci-defaults
	
	$(INSTALL_DATA) $(PKG_BUILD_DIR)/luasrc/view/themes/lumos/header.htm $(1)/usr/lib/lua/luci/view/themes/lumos/
	$(INSTALL_DATA) $(PKG_BUILD_DIR)/luasrc/view/themes/lumos/footer.htm $(1)/usr/lib/lua/luci/view/themes/lumos/
	$(INSTALL_DATA) $(PKG_BUILD_DIR)/htdocs/luci-static/lumos/css/style.css $(1)/www/luci-static/lumos/css/
	$(INSTALL_DATA) $(PKG_BUILD_DIR)/htdocs/luci-static/lumos/css/dark.css $(1)/www/luci-static/lumos/css/
	$(INSTALL_DATA) $(PKG_BUILD_DIR)/htdocs/luci-static/lumos/css/light.css $(1)/www/luci-static/lumos/css/
	$(INSTALL_DATA) $(PKG_BUILD_DIR)/htdocs/luci-static/lumos/js/main.js $(1)/www/luci-static/lumos/js/
	$(INSTALL_DATA) $(PKG_BUILD_DIR)/root/etc/uci-defaults/luci-theme-lumos $(1)/etc/uci-defaults/
endef

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

$(eval $(call BuildPackage,luci-theme-lumos))