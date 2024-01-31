import {useEffect, useState} from 'react';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Platform} from 'react-native';

const API_KEY = '2dda918f299fb6e8325412499bf9a08a';

const useLocation = () => {
  const [location, setLocation] = useState({lat: 37.498095, long: 127.02761});
  const [addr, setAddr] = useState('');

  const requestLocationPermission = async () => {
    let res;
    if (Platform.OS === 'ios') {
      res = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      res = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }
    return res === RESULTS.GRANTED;
  };

  useEffect(() => {
    (async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        // Geolocation.getCurrentPosition(onSuccess, onError, {
        //   enableHighAccuracy: true,
        //   timeout: 15000,
        //   maximumAge: 10000,
        // });
      } else {
        console.log('Location permission not granted');
        // 여기에 권한이 거부되었을 때의 로직을 구현합니다.
      }
    })();
  }, []);

  const onSuccess = position => {
    setLocation({
      lat: position.coords.latitude,
      long: position.coords.longitude,
    });
  };

  const onError = error => {
    console.log('Location error:', error);
    // 여기에 오류 처리 로직을 구현합니다.
  };

  useEffect(() => {
    if (location.lat !== 0 && location.long !== 0) {
      getGeocodeKakao(location.lat, location.long);
    }
  }, [location.lat, location.long]);

  const getGeocodeKakao = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`,
        {
          headers: {
            Authorization: `KakaoAK ${API_KEY}`,
          },
        },
      );
      const address = response.data.documents[0]?.address_name;
      setAddr(address);
    } catch (error) {
      console.error('Kakao Geocoding error:', error);
    }
  };

  return {location, addr};
};

export default useLocation;
