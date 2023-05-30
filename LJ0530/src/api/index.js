import request from "./request.js";
//获取城市信息
export const getCityInfo = (city) => {
  if (
    request.get(
      `geocode/geo?address=${city}&key=你的高德地图API`
    )
  ) {
    return request.get(
      `geocode/geo?address=${city}&key=你的高德地图API`
    );
  } else {
    return "数据不存在";
  }
};

//通过城市名称或id获取当天天气信息
export const getWeatherInfo = (city) => {
  return request.get(
    `weather/weatherInfo?city=${city}&key=你的高德地图API`
  );
};

//通过城市id获取最近四天的信息
export const getNearWeatherInfo = (id) => {
  return request.get(
    `weather/weatherInfo?city=${id}&key=你的高德地图API&extensions=all`
  );
};
