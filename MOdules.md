> Major module: Use a Framework to build the backend.

> Minor module: Use a database for the backend.

> Major module: Standard user management, authentication, users across
tournaments

> Major module: Implementing a remote authentication

> Major module: Remote players

> Major module: Live chat.

> Minor Module: User and Game Stats Dashboards

> Major module: Implement Two-Factor Authentication (2FA) and JWT


path("2fa/", QrCode.as_view(), name='2fa'), (good)
path("activate2fa/", Activate2FA.as_view(), name='activate2fa'), (good)
path("refresh/", TokenRefreshView.as_view(), name='token_refresh'), (good)
path("verify/", TokenVerifyView.as_view(), name='token_verify'), (good)
path("check_otp/", CheckOtp.as_view(), name='check_otp/'), (good)
path("desactivate2fa/", Disable2FA.as_view(), name='desactivate2fa'), (good)
path("search/<str:query>", Search.as_view(), name='search'), (to test)
path("update_infos/", UpdateUserInfos.as_view(), name='update_infos'), (to test)
path("remove_friend/", RemoveFriend.as_view(), name='remove_friend'), (to test)
path("game_leaderboard/", GameLeaderboard.as_view(), name='game_leaderboard'), (to test)
path("game_invite/", NotificationGameInvite.as_view(), name='game_invite'), (to test)









