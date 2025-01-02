from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate , logout
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import datetime, timedelta
from rest_framework.views import APIView
from .models import Client , Friend, FriendShip, Notification , Search
from .serializers import ClientSignUpSerializer , SearchSerializer
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from game.models import Game
import requests
import os
from pathlib import Path
from django.db.models import Q
import pyotp
from django.db.models import Count
import qrcode
from dotenv import load_dotenv
from django.shortcuts import redirect
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.conf import settings
from .consumers import user_channel_name
from django.core.files.storage import default_storage


load_dotenv()
HOST_URL = os.getenv('HOST_URL', '')
DEFAULT_AVATAR = os.getenv('DEFAULT_AVATAR', '')
INTRA_TARGET = os.getenv('INTRA_TARGET', '')

class SignUpView(APIView):
    def post(self, request):
        username = request.data.get('username', '')
        if Client.objects.filter(username=username).exists():
            return Response(
                {"error": "Username already exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = ClientSignUpSerializer(data=request.data)
        if not serializer.is_valid():
            if ('username' in serializer.errors):
                return Response({'error': 'username: ' + serializer.errors['username'][0]}, status=status.HTTP_400_BAD_REQUEST)
            if ('email' in serializer.errors):
                return Response({'error': 'email: ' + serializer.errors['email'][0]}, status=status.HTTP_400_BAD_REQUEST)
            if ('password' in serializer.errors):
                return Response({'error': 'password: ' + serializer.errors['password'][0]}, status=status.HTTP_400_BAD_REQUEST)
            return Response({"error": "Invalid data format "}, status=status.HTTP_400_BAD_REQUEST)
        username = request.data.get('username', '')
        email = request.data.get('email', '')
        password = request.data.get('password', '')
        if not password.isalnum() or len(password) < 6:
            return Response({"error": "Password must be at least 8 characters and contain at least one letter and one number"}, status=status.HTTP_400_BAD_REQUEST)
        newpassword = request.data.get('newpassword', '')
        if password != newpassword:
            return Response({"error": "Passwords do not match "}, status=status.HTTP_400_BAD_REQUEST)
        if not username:
            return Response({"error": "Invalid username format "}, status=status.HTTP_400_BAD_REQUEST)
        if '@' not in email or '.' not in email.split('@')[-1]:
            return Response({"error": "Invalid email format "}, status=status.HTTP_400_BAD_REQUEST)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": "User created successfully "}, status=status.HTTP_201_CREATED)
        return Response({"error": "User Already signed up"}, status=status.HTTP_400_BAD_REQUEST)


class SignInView(APIView):
    def post(self, request):
        parse_login = request.data.get('login')
        password = request.data.get('password')

        if not parse_login or not password:
            return Response({'error': "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)

        if '@' in parse_login and '.' in parse_login:
            try:
                clients = Client.objects.filter(Q(email=parse_login) & ~Q(password=""))
                for user in clients:
                    username = user.username if authenticate(username=user.username, password=password) else None
            except Client.DoesNotExist:
                return Response({"error": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            username = parse_login
        client = authenticate(username=username, password=password)
        if client:
            refresh = RefreshToken.for_user(client)
            access = str(refresh.access_token)
            redirect_url = client.is_2fa_enabled and f'/2fa/{client.username}' or '/dashboard'
            response = Response({'success': 'Logged in successfully', 'redirect_url': redirect_url}, status=status.HTTP_200_OK)
            response.set_cookie(
                'client',
                access,
                httponly=True,
                samesite='None',
                secure=True,
            )
            response.set_cookie(
                'refresh',
                str(refresh),
                httponly=True,
                samesite='None',
                secure=True,
            )
            return response
        return Response({'error': "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)

class ExtractCodeFromIntraUrl(APIView):
    def get(self, request):
        code = request.GET.get('code')
        if not code:
            return Response({'error':  "Faced a code problem in the url"}, status=400)
        load_dotenv()
        # daba nprepariw request l intra bach exchangiw l code b access token
        INTRA_TARGET_VIEW = os.getenv('INTRA_TARGET_VIEW')
        CLIENT_ID = os.getenv('CLIENT_ID')
        SECRET_ID = os.getenv('SECRET_ID')
        token_url = os.getenv('INTRA_TARGET_VIEW')
        client_id = CLIENT_ID
        client_secret = SECRET_ID
        
        redirect_uri = f'{HOST_URL}/accounts/42school/login/callback/'
        # json li aytseft f request
        json_data = {
            'grant_type': 'authorization_code',
            'client_id': client_id,
            'client_secret': client_secret,
            'code': code,
            'redirect_uri': redirect_uri
        }
        headers = {'Content-Type': 'application/json'}
        # nsefto request l intra w n extractiw l user info b dak l access token li ayjina
        response = requests.post(token_url,json=json_data, headers=headers)
        if response.status_code != 200:
            return Response({'error':  "exchanging token problem with intra"}, status=400)
        data = response.json()
        access_token = data.get('access_token')
        # nakhod l user info bl  access token li jebt mn 3end intra
        user_url_intra = INTRA_TARGET
        user_info_response = requests.get(user_url_intra, headers={
            'Authorization': f'Bearer {access_token}'
        })
        user_data = user_info_response.json()
        user_email = user_data.get('email')
        username = user_data.get('login')
        user = Client.objects.filter(username=username).first()
        #ila makanch had l user ghaycreeyih bl infos d inta
        avatar = user_data.get('image', {}).get('versions', {}).get('large')
        if user is None:
            user = Client(email=user_email, username=username, avatar=avatar)
            user.save()
        #ila kan bnefs l infos ghay redirectih nichan l dashboard
        refresh = RefreshToken.for_user(user)
        access = str(refresh.access_token)
        if user.is_2fa_enabled:
            response = redirect(f'{HOST_URL}/2fa/{user}')
        else:
            response = redirect(f'{HOST_URL}/dashboard')
            response.set_cookie(
                'client',
                access,
                httponly=True,
                samesite='None',
                secure=True,
            )
            response.set_cookie(
                'refresh',
                str(refresh),
                httponly=True,
                samesite='None',
                secure=True,
            )
        return response

class VerifyTokenView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        if request.user.is_authenticated:
            return Response({'authenticated': True}, status=200)
        return Response({'error': 'Unauthorized'}, status=401)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        response = Response({'Logged out successfull': True}, status=200)
        response.delete_cookie('client')
        response.delete_cookie('refresh')
        return response
  
class GameLeaderboard(APIView):

    def get(self, request):
        try:
            game = list(Game.objects.values('player1_id', 'player2_id', 'xp_gained_player1', 'xp_gained_player2', 'winner', 'score_player1', 'score_player2', 'start_time', 'end_time'))
            player_xp = {}
            for g in game:
                if g['player1_id'] not in player_xp:
                    player_xp[g['player1_id']] = 0
                if g['player2_id'] not in player_xp:
                    player_xp[g['player2_id']] = 0
                player_xp[g['player1_id']] += g['xp_gained_player1']
                player_xp[g['player2_id']] += g['xp_gained_player2']
            sorted_xp = dict(sorted(player_xp.items(), key=lambda item: item[1], reverse=True))
            data = []
            for player_id, xp in sorted_xp.items():
                if not player_id:
                    continue
                player = Client.objects.get(id=player_id)
                data.append({
                    'id': player_id,
                    'username': player.username,
                    'avatar': player.avatar if player.avatar else DEFAULT_AVATAR,
                    'xp': xp
                })

            return Response({'game_xp': data[:5]}, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=400)

def get_game(user):
    try:
        game = list(Game.objects.filter(Q(player1_id=user) | Q(player2_id=user)).order_by('game_id'))
        r = []
        for g in game:
            player1 = g.player1_id if g.player1_id == user else g.player2_id
            player2 = g.player2_id if g.player2_id != user else g.player1_id


            if g.end_time:
                time_difference = abs(g.end_time - g.start_time)
            else:
                time_difference = timedelta(seconds=0)

            total_seconds = time_difference.total_seconds()
            hours = int(total_seconds // 3600)
            minutes = int((total_seconds % 3600) // 60)
            seconds = int(total_seconds % 60)

            formatted_duration = f"{hours}h {minutes}m {seconds}s" if hours else f"{minutes}m {seconds}s"

            r.append([
                {
                    'id': g.game_id,
                    'player1': {'username': player1.username, 'avatar': player1.avatar if player1.avatar else DEFAULT_AVATAR},
                    'player2': {'username': player2.username, 'avatar': player2.avatar if player2.avatar else DEFAULT_AVATAR},
                    'winner': g.winner.username,
                    'score_player1': g.score_player1 if player1 == g.player1_id else g.score_player2,
                    'score_player2': g.score_player2 if player1 == g.player1_id else g.score_player1,
                    'xp_gained_player1': g.xp_gained_player1 if player1 == g.player1_id else g.xp_gained_player2,
                    'xp_gained_player2': g.xp_gained_player2 if player1 == g.player1_id else g.xp_gained_player1,
                    'duration': formatted_duration,
                    'total_seconds': total_seconds,
                }
            ])
        return r
    except Exception as e:
        return Response({'error': str(e)}, status=400)

class DashboardView(APIView):
    def get(self, request):
        user = request.user
        if not user.is_authenticated:
            return Response({'error': 'Unauthorized', }, status=401)
        game = get_game(user)

        xp = []
        for g in game:
            xp.append(g[0]['xp_gained_player1'])

        return Response({
            'id': user.id,
            'email': user.email,
            'username': user.username,
            'avatar': user.avatar if user.avatar else DEFAULT_AVATAR,
            'twoFa': user.is_2fa_enabled,
            'bio': user.bio,
            'is_online': user.is_online,
            'matchePlayed': game,
            'matcheWon': len([g for g in game if g[0]['winner'] == user.username]),
            'matcheLost': len([g for g in game if g[0]['winner'] != user.username]),
            'xp': xp,
            'win_rate': len([g for g in game if g[0]['winner'] == user.username]) / len(game) * 100 if len(game) > 0 else 0,
            'average_xp': sum(xp) / len(xp) if len(xp) > 0 else 0,
            'total_time_spent': int(sum([g[0]['total_seconds'] for g in game]) // 3600) if int(sum([g[0]['total_seconds'] for g in game])) // 3600 > 0 else (sum([g[0]['total_seconds'] for g in game]) % 3600) // 60,
        })

class SendFriendRequest(APIView):
    def post(self, request):
        from_user = request.user

        to_user = request.data.get('to_user')

        if not to_user:
            return Response({'error': 'Recipient user ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            to_user = Client.objects.get(id=to_user)
        except Client.DoesNotExist:
            return Response({'error': 'Recipient user not found'}, status=status.HTTP_404_NOT_FOUND)

        if FriendShip.objects.filter(from_user=from_user, to_user=to_user).exists():
            return Response({'error': 'request already sent'}, status=400)

        # Create the friend request
        if not FriendShip.objects.filter(from_user=to_user, to_user=from_user).exists():
            FriendShip.objects.create(from_user=from_user, to_user=to_user)
        else:
            FriendShip.objects.filter(from_user=to_user, to_user=from_user).update(status='pending')

        # Check if a notification for this friend request already exists

        if not Notification.objects.filter(sender=from_user, message=f"{from_user.username} sent you a friend request ", receiver=to_user).exists():
            Notification.objects.create(sender=from_user, message=f"{from_user.username} sent you a friend request ", notification_type='friend_request', receiver=to_user)
        else:
            Notification.objects.filter(sender=from_user, message=f"{from_user.username} sent you a friend request ", notification_type='friend_request', receiver=to_user).update(is_read=False)
        return Response({'message': 'friend request sent successfully'})

class NotificationList(APIView):
    def get(self, request):
        notifications = Notification.objects.filter(receiver=request.user, is_read=False)
        data = [{'id': n.id, 'message': n.message, 'created_at': n.created_at, 'notification_type': n.notification_type, 'sender_id': n.sender_id} for n in notifications]
        return Response(data)

class NotificationGameInvite(APIView):
    def post(self, request):
        from_user = request.user
        to_user = request.data.get('to_user')
        try:
            to_user = Client.objects.get(id=to_user)
        except Client.DoesNotExist:
            return Response({'error': 'Recipient user not found'}, status=status.HTTP_404_NOT_FOUND)
        if not to_user:
            return Response({'error': 'Recipient user ID is required'}, status=status.HTTP_400_BAD_REQUEST)
        if not Notification.objects.filter(sender=from_user, message=f"{from_user.username} sent you a game invite ", receiver=to_user).exists():
            Notification.objects.create(sender=from_user, message=f"{from_user.username} sent you a game invite ", notification_type='game_invite', receiver=to_user)
            if Notification.objects.filter(sender=to_user, message=f"{to_user.username} sent you a game invite ", receiver=from_user , is_read=False).exists():
                Notification.objects.filter(sender=to_user, message=f"{to_user.username} sent you a game invite ", receiver=from_user).update(is_read=True)
                Notification.objects.filter(sender=from_user, message=f"{from_user.username} sent you a game invite ", receiver=to_user).update(is_read=True)
        else:
            if Notification.objects.filter(sender=to_user, message=f"{to_user.username} sent you a game invite ", receiver=from_user , is_read=False).exists():
                Notification.objects.filter(sender=to_user, message=f"{to_user.username} sent you a game invite ", receiver=from_user).update(is_read=True)
                Notification.objects.filter(sender=from_user, message=f"{from_user.username} sent you a game invite ", receiver=to_user).update(is_read=True)
            else:
                Notification.objects.filter(sender=from_user, message=f"{from_user.username} sent you a game invite ", receiver=to_user).update(is_read=False)
        return Response({'message': 'game invite sent successfully'})

class AcceptFriendRequest(APIView):
    def post(self, request):
        request_type = request.data.get('type')
        request_id = request.data.get('request_id')
        user_id = Notification.objects.get(id=request_id).sender.id
        to_user_id = Notification.objects.get(id=request_id).receiver.id
        try:
            if request_type == "game_invite":
                isread = Notification.objects.filter(id=request_id).update(is_read=True)
                return Response({'message': 'game invite accepted'},  status=200)

            friend_request = FriendShip.objects.get(from_user=user_id, to_user=to_user_id,status='pending')

            friend_request.status = 'accepted'
            friend_request.save()

            sender = friend_request.from_user
            receiver = friend_request.to_user
            Friend.objects.create(user=sender, friend=receiver,blocker=None)
            Friend.objects.create(user=receiver, friend=sender,blocker=None)
            Notification.objects.filter(receiver=request.user, sender=user_id, is_read=False).update(is_read=True)

            #get the channel layer
            channel_layer = get_channel_layer()
            #get the channel name of the sender and receiver from the user_channel_name dictionary
            sender_channel_name = user_channel_name.get(sender.id)
            receiver_channel_name = user_channel_name.get(receiver.id)
            #send a notification to the sender
            #hada hwa li sift l add friend request
            if receiver_channel_name:
                for channel in receiver_channel_name:
                    async_to_sync(channel_layer.send)(
                        channel,
                        {
                            'type': 'friend_request_accepted',
                            'friend': {
                                'id': sender.id,
                                'username': sender.username,
                                'avatar': sender.avatar if sender.avatar else DEFAULT_AVATAR,
                                # 'is_blocked': sender.is_blocked,
                                'is_blocked': False,
                                'is_online': sender.is_online
                            },
                        }
                    )
                # send a notification to the receiver
            if sender_channel_name:
                for channel in sender_channel_name:
                    async_to_sync(channel_layer.send)(
                        channel,
                        {
                            'type': 'friend_request_accepted',
                            'friend': {
                                'id': receiver.id,
                                'username': receiver.username,
                                'avatar': receiver.avatar if receiver.avatar else DEFAULT_AVATAR,
                                # 'is_blocked': receiver.is_blocked,
                                'is_blocked': False,
                                'is_online': receiver.is_online
                            },
                        }
                    )


            return Response({"message": "Friend request accepted "}, status=200)
        except FriendShip.DoesNotExist:
            return Response({"error": "Friend request not found "}, status=404)

class FriendsList(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        if not request.user.is_authenticated:
            return Response({'error': 'Unauthorized'}, status=401)
        user = request.user
        friends = Friend.objects.filter(user=user).select_related('friend')
        for friend in friends:
            friend.friend.is_online = friend.friend.is_online

        game = {}
        for friend in friends:
            game[friend.friend.id] = get_game(friend.friend)
        xp = {}
        for friend in friends:
            xp[friend.friend.id] = []
            for g in game[friend.friend.id]:
                xp[friend.friend.id].append(g[0]['xp_gained_player1'])

        data = [
            {
                'id': friend.friend.id,
                'username': friend.friend.username,
                'avatar': friend.friend.avatar if friend.friend.avatar else DEFAULT_AVATAR,
                'is_blocked': friend.is_blocked,
                'bio': friend.friend.bio,
                'is_online': friend.friend.is_online,
                'blocker': friend.blocker.username if friend.blocker else None,
                'matchePlayed': game[friend.friend.id],
                'matcheWon': len([g for g in game[friend.friend.id] if g[0]['winner'] == friend.friend.username]),
                'matcheLost': len([g for g in game[friend.friend.id] if g[0]['winner'] != friend.friend.username]),
                'xp': xp[friend.friend.id],
                'win_rate': len([g for g in game[friend.friend.id] if g[0]['winner'] == user.username]) / len(game) * 100 if len(game) > 0 else 0,
                'average_xp': sum(xp[friend.friend.id]) / len(xp[friend.friend.id]) if len(xp[friend.friend.id]) > 0 else 0,
                'total_time_spent': int(sum([g[0]['total_seconds'] for g in game[friend.friend.id]]) // 3600) if int(sum([g[0]['total_seconds'] for g in game[friend.friend.id]])) // 3600 > 0 else int((sum([g[0]['total_seconds'] for g in game[friend.friend.id]]) % 3600) // 60),
            }
            for friend in friends
        ]
        return Response({"data": data})

class Search(APIView):
    def get(self, request, query):
        clients = Client.objects.filter(username__icontains=query).exclude(id=request.user.id)
        data = [
            {
                'id': c.id,
                'username': c.username,
                'avatar': c.avatar if c.avatar else DEFAULT_AVATAR
            }
            for c in clients
        ]
        return Response(data)

class Profile(APIView):
    def get(self, request, *args, **kwargs):
        try:

            username = kwargs.get('username')
            user = Client.objects.get(username=username)
            me = request.user
            friendship_status = ''
            is_friend = Friend.objects.filter(Q(user=me, friend=user) | Q(user=me, friend=user)).exists()

            if is_friend:
                friendship_status = 'friends'
            else:

                friendship = FriendShip.objects.filter(from_user=me, to_user=user).first()

                if friendship is None:
                    friendship_status = 'not_friend'
                else:
                    friendship_status = 'pending' if friendship.status == 'pending' else 'not_friend'
                    
        except Client.DoesNotExist:
            return Response({'error': 'User not found'}, status=404)
        return Response({
            'id': user.id,
            'username': user.username,
            'avatar': user.avatar if user.avatar else DEFAULT_AVATAR,
            'friendship_status': friendship_status,
            'is_online': user.is_online,
            'bio': user.bio,
        })

class RemoveFriend(APIView):
    def post(self, request):
        friend_id = request.data.get('friend_id')
        try:
            friendship = FriendShip.objects.filter(
                        Q(from_user=request.user, to_user=friend_id) 
                        | Q(from_user=friend_id, to_user=request.user)).first()
            if friendship:
                friendship.delete()
            else:
                return Response({'error': 'Friendship not found'}, status=404)
            
            # remove the friend from the friends list
            Friend.objects.filter(user=request.user, friend=friend_id).delete()
            Friend.objects.filter(user=friend_id, friend=request.user).delete()
            friend_channel_name = user_channel_name.get(friend_id)
            channel_layer = get_channel_layer()
            if friend_channel_name:
                for channel in friend_channel_name:
                    async_to_sync(channel_layer.send)(
                        channel,
                        {
                            'type': 'friend_removed_you',
                            'friend': {
                                'id': request.user.id,
                            },
                        }
                    )
            return Response({'message': 'Friend removed successfully'}, status=200)

        except Friend.DoesNotExist:
            return Response({'error': 'Friend not found'}, status=404)

def generate_otp(username):
    secret_key = pyotp.random_base32()
    user = Client.objects.get(username=username)
    user.secret_key = secret_key
    user.save()

    url = pyotp.totp.TOTP(user.secret_key).provisioning_uri(name=user.username, issuer_name="ft_transcendence")
    qrcode_directory = "media/qr_codes/"
    if not os.path.exists(qrcode_directory):
        os.makedirs(qrcode_directory)
    path = os.path.join(qrcode_directory, f"{username}.png")
    if os.path.exists(path):
        os.remove(path)
    qrcode.make(url).save(path)


class QrCode(APIView):
    def get(self, request):
        generate_otp(username=request.user.username)
        qrcode_path = os.path.join(settings.MEDIA_ROOT, 'qr_codes', f'{request.user.username}.png')
        qrcode_url = qrcode_url = request.build_absolute_uri(settings.MEDIA_URL + f'qr_codes/{request.user.username}.png').replace("http://", "https://")
        return Response({'qrcode': qrcode_url})

class CheckOtp(APIView):
    def post(self, request):
        otp = request.data.get('otp')
        username = request.data.get('username')
        user = Client.objects.get(username=username)
        if not otp:
            return Response({'error': 'OTP is required'}, status=400)
            
        totp = pyotp.totp.TOTP(user.secret_key)
        if totp.verify(otp):
            # Set cookies after successful OTP verification
            refresh = RefreshToken.for_user(user)
            access = str(refresh.access_token)
            response = Response({
                'status': 'success',
                'redirect_url': '/dashboard'
            }, status=status.HTTP_200_OK)
            response.set_cookie('client', access, httponly=True, samesite='None', secure=True)
            response.set_cookie('refresh', str(refresh), httponly=True, samesite='None', secure=True)
            return response    
        return Response({
            'error': 'Invalid OTP'
        }, status=status.HTTP_400_BAD_REQUEST)

class Activate2FA(APIView):
    def post(self, request):
        otp = request.data.get('code')
        user = Client.objects.get(username=request.user.username)
        if not otp:
            return Response({'error': 'OTP is required'}, status=400)
        totp = pyotp.totp.TOTP(request.user.secret_key)

        if not totp.verify(otp):
            return Response({'error': 'Invalid OTP'}, status=400)
        user.is_2fa_enabled = True
        user.save()
        return Response({'message': '2FA enabled successfully', 'is_2fa_enabled': True})

class Disable2FA(APIView):
    def post(self, request):
        otp = request.data.get('code')
        user = Client.objects.get(username=request.user.username)

        if not otp:
            return Response({'error': 'OTP is required for desabling'}, status=400)
        totp = pyotp.totp.TOTP(request.user.secret_key)


        if not totp.verify(otp):
            return Response({'error': 'Invalid OTP'}, status=400)
        user.is_2fa_enabled = False
        user.secret_key = None
        user.save()


        from django.db import connection
        if connection.in_atomic_block:
            connection.commit()
    
        return Response({'message': '2FA disabled successfully', 'is_2fa_enabled': False})

class UpdateUserInfos(APIView):
    def post(self, request):
        user = request.user
        avatar = request.data.get('avatar')
        bio = request.data.get('bio')
        phone = request.data.get('phone')
        avatar_file = request.FILES.get('avatar')

        if avatar_file:
            file_path = default_storage.save(f"avatars/{avatar_file.name}", avatar_file)
            file_url = request.build_absolute_uri(default_storage.url(file_path))
            file_url = file_url.replace("http://", "https://")
            file_url = file_url.replace(":80", ":443")
            user.avatar = file_url

        if bio:
            user.bio = bio
        if phone:
            user.phone = phone
        user.save()
        user = Client.objects.get(id=user.id)  
        return Response(
            {
                'message': 'User infos updated successfully',
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'username': user.username,
                    'avatar': user.avatar
            },})