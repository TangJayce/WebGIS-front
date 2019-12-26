import http from "./http";

export const $login = (data) => {
    return http.post('/GisTask/LoginAPI',data)
};

export const $getGeoJSONByName = (map_name) => {
    return http.post('/GisTask/GetGeoJSON',{map_name})
};

export const $getLayerByName = (map_name, table_name) => {
    return http.post('/GisTask/GetLayerAPI',{map_name, table_name})
};

export const $getLayersName = (table_name) => {
    return http.post('/GisTask/SelectLayersNameAPI',{table_name})
};

export const $getPointsByName = (name) => {
    return http.post('/GisTask/ShowPointsByNameAPI',{name})
};

export const $getPoints = () => {
    return http.post('/GisTask/ShowPointsAPI',{})
};

export const $updatePoint = (id, description, time, latitude, longitude, name) => {
    return http.post('/GisTask/UpdatePointAPI',{point_id: id, description, time, latitude, longitude, name})
};

export const $deletePoint = (id) => {
    return http.post('/GisTask/DeletePointAPI',{point_id: id})
};
