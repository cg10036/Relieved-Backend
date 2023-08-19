const fs = require("fs");

const jsonData = JSON.parse(fs.readFileSync("mailbox.json"));
const placesData = jsonData.DATA;

// 사용자 현위치 (임의의 값)
// const userBox = [
//   { lat: 35.65, lng: 126.99 },
//   { lat: 37.625, lng: 127.026 },
// ];
// const userLatitude = 37.61;
// const userLongitude = 127.0126;

// 거리 계산 함수
function calculateDistance(lat1, lon1, lat2, lon2) {
  const dx = lat2 - lat1;
  const dy = lon2 - lon1;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance;
}

const mailbox = (req, res) => {
  // try {
  return res.json(placesData);

  // let { box: userBox, lat: userLatitude, lng: userLongitude } = req.body; // {box: ..., lat: ..., lng: ...}

  // const nearbyPlaces = placesData.filter((place) => {
  //   const latitude = parseFloat(place.wgsxpt);
  //   const longitude = parseFloat(place.wgsypt);

  //   // const distance = calculateDistance(
  //   //   userLatitude,
  //   //   userLongitude,
  //   //   latitude,
  //   //   longitude
  //   // );
  //   // return distance < 1.0; // 1km 이내의 장소

  //   return (
  //     userBox[0].lat <= latitude &&
  //     latitude <= userBox[1].lat &&
  //     userBox[0].lng <= longitude &&
  //     longitude <= userBox[1].lng
  //   );
  // });
  // nearbyPlaces.sort((a, b) => {
  //   return (
  //     calculateDistance(
  //       userLatitude,
  //       userLongitude,
  //       parseFloat(a.wgsxpt),
  //       parseFloat(a.wgsypt)
  //     ) -
  //     calculateDistance(
  //       userLatitude,
  //       userLongitude,
  //       parseFloat(b.wgsxpt),
  //       parseFloat(b.wgsypt)
  //     )
  //   );
  // });

  // // nearbyPlaces.forEach((place) => {
  // //   const latitude = parseFloat(place.wgsxpt);
  // //   const longitude = parseFloat(place.wgsypt);

  // //   console.log("장소명:", place.ansiminm);
  // //   console.log("주소:", place.addrdetail || place.ansimiaddr);
  // //   console.log("위도:", latitude);
  // //   console.log("경도:", longitude);
  // //   console.log(
  // //     "거리 (km):",
  // //     calculateDistance(userLatitude, userLongitude, latitude, longitude)
  // //   );
  // //   console.log("- - - - - - - - - - - - - - ");
  // // });
  // return res.json(nearbyPlaces);
  // } catch (error) {
  //   console.error("Error:", error);
  //   return res.status(500).send("Interval Server Error");
  // }
};

module.exports = {
  mailbox,
};
