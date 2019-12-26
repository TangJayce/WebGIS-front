import L from 'leaflet';

export default L.icon({
    iconUrl: require('../assets/position-icon.png'),
    iconAnchor: [15,15],
    shadowUrl: require('../assets/position-shadow.png'),
    popupAnchor: [0, -10],
    shadowAnchor: [17, 12]
});
