export default function haversine(startCoordinates, endCoordinates, options) {
  if (!startCoordinates || !endCoordinates) {
    console.log(
      "ERROR: haversine -> startCoordinates, endCoordinates",
      startCoordinates,
      endCoordinates
    );

    return 0;
  }
  var earthRadius = {
    km: 6371,
    mile: 3960,
    meter: 6371000
  };

  //  to radians
  Number.prototype.toRad = function() {
    return (this * Math.PI) / 180;
  };

  option = options || {};
  Radius =
    option.unit in earthRadius ? earthRadius[option.unit] : earthRadius.km;

  var start = startCoordinates;
  var end = endCoordinates;

  var x1 = end.latitude - start.latitude;
  var dLat = x1.toRad();
  var x2 = end.longitude - start.longitude;
  var dLon = x2.toRad();
  lat1 = start.latitude.toRad();
  lat2 = end.latitude.toRad();
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = Radius * c;

  return isNaN(d) ? 0 : d;
}

export const _toRadians = number => (number * Math.PI) / 180;

export const _calculateGreatCircleDistance = (locationA, locationZ) => {
  const lat1 = locationA.latitude;
  const lon1 = locationA.longitude;
  const lat2 = locationZ.latitude;
  const lon2 = locationZ.longitude;

  // DOCUMENTATION: http://www.movable-type.co.uk/scripts/latlong.html
  const p1 = _toRadians(lat1);
  const p2 = _toRadians(lat2);
  const deltagamma = _toRadians(lon2 - lon1);
  const R = 6371e3; // gives d in metres
  const d =
    Math.acos(
      Math.sin(p1) * Math.sin(p2) +
        Math.cos(p1) * Math.cos(p2) * Math.cos(deltagamma)
    ) * R;

  return isNaN(d) ? 0 : d;
};
