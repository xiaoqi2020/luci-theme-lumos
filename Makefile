#
# Copyright (C) 2026 xiaoqi
#
# This is free software, licensed under the Apache License, Version 2.0 .
#

include $(TOPDIR)/rules.mk

LUCI_TITLE:=Lumos Theme
LUCI_DEPENDS:=+curl +jsonfilter
PKG_VERSION:=1.1.0
PKG_RELEASE:=1

include $(TOPDIR)/feeds/luci/luci.mk

# call BuildPackage - OpenWrt buildroot signature