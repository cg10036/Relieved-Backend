const fs = require("fs");
const navermap = require("../utils/navermap");

let data = JSON.parse(fs.readFileSync("json/safe.json"))["DATA"];

const getDist = (x1, y1, x2, y2) =>
  Math.sqrt(
    Math.pow(Number.parseFloat(x1) - Number.parseFloat(x2), 2) +
      Math.pow(Number.parseFloat(y1) - Number.parseFloat(y2), 2)
  );

const getSafePlaces = (walk) => {
  let safe = [],
    visit = {};
  for (let leg of walk.legs) {
    for (let step of leg.steps) {
      if (!step.path) continue;
      let positions = step.path.split(" ").map((e) => {
        let tmp = e.split(",");
        return { lat: tmp[1], lng: tmp[0] };
      });
      for (let pos of positions) {
        for (let place of data) {
          let dist = getDist(place.latitude, place.longitude, pos.lat, pos.lng);
          // 0.1: 10km, 0.01: 1km, 0.001: 100m
          if (dist <= 0.002) {
            if (!visit[place.service_id]) {
              safe.push({ ...place, dist });
              visit[place.service_id] = { ...place, dist };
            } else if (visit[place.service_id].dist > dist) {
              for (let i = 0; i < safe.length; i++) {
                if (safe[i].service_id === place.service_id) {
                  safe[i].dist = dist;
                  break;
                }
              }
            }
          }
        }
      }
    }
  }

  return safe;
};

const walk = async (req, res) => {
  let { from, to } = req.body;
  if (
    typeof from !== "object" ||
    typeof from.lat !== "number" ||
    typeof from.lng !== "number" ||
    !(typeof from.name === "undefined" || typeof from.name === "string") ||
    typeof to !== "object" ||
    typeof to.lat !== "number" ||
    typeof to.lng !== "number" ||
    !(typeof to.name === "undefined" || typeof to.name === "string")
  ) {
    return res.status(400).json({ reason: "WRONG_BODY_TYPE" });
  }
  try {
    let walk = await navermap.getWalk(from, to);
    let safe = getSafePlaces(walk);

    // 0.1: 10km, 0.01: 1km, 0.001: 100m
    for (let i = 0; i < safe.length - 1; i++) {
      if (
        getDist(
          safe[i].latitude,
          safe[i].longitude,
          safe[i + 1].latitude,
          safe[i + 1].longitude
        ) < 0.005
      ) {
        if (safe[i].dist < safe[i + 1].dist) {
          safe.splice(i + 1, 1);
        } else {
          safe.splice(i, 1);
        }
      }
    }

    if (safe.length > 5) {
      safe = safe.slice(0, 5);
    }

    let result = await navermap.getWalk(
      from,
      ...safe.map((e) => ({
        lat: e.latitude,
        lng: e.longitude,
        name: e.remark,
      })),
      to
    );
    return res.json({ safe, result });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Interval Server Error");
  }
};

module.exports = {
  walk,
};
