include $(TOPDIR)/rules.mk

PKG_NAME:=luci-theme-lumos
PKG_VERSION:=1.0.0
PKG_RELEASE:=1
PKG_MAINTAINER:=xiaoqi <xiaoqi2020@github.com>
PKG_DESCRIPTION:=LumOS theme with glassmorphism effects for LuCI

include $(INCLUDE_DIR)/package.mk

define Package/luci-theme-lumos
  SECTION:=luci
  CATEGORY:=LuCI
  SUBMENU:=Themes
  TITLE:=LumOS Theme
  DEPENDS:=+luci-base
  PKGARCH:=all
endef

define Build/Prepare
endef

define Build/Compile
endef

define Package/luci-theme-lumos/install
	$(INSTALL_DIR) $(1)/www/luci-static/lumos/css
	$(INSTALL_DIR) $(1)/www/luci-static/lumos/js
	$(INSTALL_DIR) $(1)/www/luci-static/lumos/fonts
	$(INSTALL_DIR) $(1)/www/luci-static/lumos/icon
	$(INSTALL_DIR) $(1)/www/luci-static/lumos/img
	$(INSTALL_DIR) $(1)/www/luci-static/lumos/less
	$(CP) ./htdocs/luci-static/lumos/css/*.css $(1)/www/luci-static/lumos/css/
	$(CP) ./htdocs/luci-static/lumos/js/*.js $(1)/www/luci-static/lumos/js/
	$(CP) ./htdocs/luci-static/lumos/fonts/* $(1)/www/luci-static/lumos/fonts/
	$(CP) ./htdocs/luci-static/lumos/icon/* $(1)/www/luci-static/lumos/icon/
	$(CP) ./htdocs/luci-static/lumos/img/* $(1)/www/luci-static/lumos/img/
	$(CP) ./htdocs/luci-static/lumos/less/* $(1)/www/luci-static/lumos/less/
	$(CP) ./htdocs/luci-static/lumos/favicon.ico $(1)/www/luci-static/lumos/
	$(INSTALL_DIR) $(1)/usr/lib/lua/luci/view/themes/lumos
	$(CP) ./luasrc/view/themes/lumos/*.htm $(1)/usr/lib/lua/luci/view/themes/lumos/
	$(INSTALL_DIR) $(1)/usr/lib/lua/luci/themes
	$(CP) ./luasrc/themes/*.lua $(1)/usr/lib/lua/luci/themes/
	$(INSTALL_DIR) $(1)/etc/uci-defaults
	$(CP) ./root/etc/uci-defaults/* $(1)/etc/uci-defaults/
endef

$(eval $(call BuildPackage,luci-theme-lumos))