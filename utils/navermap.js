const fetch = require("node-fetch");

let page_uid = "",
  NNB = "";
const userAgent =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.15";

const setNNB = async () => {
  let resp = await fetch("https://lcs.naver.com/m", {
    headers: {
      "user-agent": userAgent,
    },
  });
  NNB = resp.headers.raw()["set-cookie"].map((e) => e.split(";")[0])[0];
};

const getWalk = async (...places) => {
  await setNNB();
  let res = await fetch(
    `https://map.naver.com/p/api/directions/walk?o=all&l=${encodeURIComponent(
      places
        .map(
          (e) =>
            `${e.lng},${e.lat}${e.name ? `,${encodeURIComponent(e.name)}` : ``}`
        )
        .join(";")
    )}`,
    {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "ko-KR,ko;q=0.8,en-US;q=0.6,en;q=0.4",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        Cookie: NNB,
        Expires: "Sat, 01 Jan 2000 00:00:00 GMT",
        Pragma: "no-cache",
        "User-Agent": userAgent,
      },
    }
  );
  let json = await res.json();
  return json.routes[0];
};

module.exports = {
  getWalk,
};
