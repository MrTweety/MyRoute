export default function haversine(startCoordinates, endCoordinates, options) {
  if (!startCoordinates || !endCoordinates) {
    console.log(
      "ERROR: haversine -> startCoordinates, endCoordinates",
      startCoordinates,
      endCoordinates
    );

    return 0;
  }

  //  to radians
  Number.prototype.toRad = function() {
    return (this * Math.PI) / 180;
  };

  const earthRadius = {
    km: 6371,
    mile: 3960,
    meter: 6371000
  };

  option = options || {};
  Radius =
    option.unit in earthRadius ? earthRadius[option.unit] : earthRadius.km;

  const start = startCoordinates;
  const end = endCoordinates;

  const dLat = (end.latitude - start.latitude).toRad();
  const dLon = (end.longitude - start.longitude).toRad();
  const lat1 = start.latitude.toRad();
  const lat2 = end.latitude.toRad();
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = Radius * c; // Radius: km: 6371, meter: 6371000, mile: 3960

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
