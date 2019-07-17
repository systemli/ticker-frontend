import 'leaflet/dist/leaflet.css';

// explicitly assign marker graphics due to problem with webpack serving
// see https://github.com/PaulLeCam/react-leaflet/issues/255
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
