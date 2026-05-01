include $(TOPDIR)/rules.mk

PKG_NAME:=luci-theme-lumos
PKG_VERSION:=1.0.0
PKG_RELEASE:=1

include $(INCLUDE_DIR)/package.mk

define Package/luci-theme-lumos
  SECTION:=luci
  CATEGORY:=LuCI
  SUBMENU:=Themes
  TITLE:=LumOS Theme
  DEPENDS:=+luci-base
  PKGARCH:=all
endef

define Package/luci-theme-lumos/description
  LumOS theme with glassmorphism effects
endef

define Build/Prepare
endef

define Build/Compile
endef

define Package/luci-theme-lumos/install
	$(INSTALL_DIR) $(1)/www/luci-static/lumos
	$(CP) ./htdocs/luci-static/lumos/* $(1)/www/luci-static/lumos/
	$(INSTALL_DIR) $(1)/usr/lib/lua/luci/view/themes/lumos
	$(CP) ./luasrc/view/themes/lumos/* $(1)/usr/lib/lua/luci/view/themes/lumos/
	$(INSTALL_DIR) $(1)/etc/uci-defaults
	$(CP) ./root/etc/uci-defaults/* $(1)/etc/uci-defaults/
endef

$(eval $(call BuildPackage,luci-theme-lumos))