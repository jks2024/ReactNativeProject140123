import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';

const ProfileHeader = ({member, onEditProfile}) => {
  console.log('ProfileHeader', member.image);
  return (
    <View style={styles.header}>
      {member.image && (
        <Avatar rounded source={{uri: member.image}} size="large" />
      )}
      <View style={styles.userInfo}>
        <Text style={styles.username}>{member.name}</Text>
        <Text style={styles.email}>{member.email}</Text>
      </View>
      <TouchableOpacity
        style={styles.editProfileButton}
        onPress={onEditProfile}>
        <Text style={styles.editProfileText}>프로필 수정</Text>
      </TouchableOpacity>
    </View>
  );
};

// 스타일 정의 (MyInfoScreen의 스타일에서 프로필 관련 스타일을 여기로 옮깁니다)
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: 16,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
  },
  editProfileButton: {
    marginTop: 20,
    marginLeft: 'auto',
    padding: 8,
    borderRadius: 8,
  },
  editProfileText: {
    color: 'royalblue',
  },
});

export default ProfileHeader;
